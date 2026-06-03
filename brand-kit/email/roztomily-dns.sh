#!/usr/bin/env bash
#
# roztomily-dns.sh — script the Cloudflare DNS side of the Zoho Mail migration
# for roztomilygroup.com. The Zoho ACCOUNT side (signup, pay, create mailboxes,
# generate the verification TXT + DKIM value) is browser-only and must be done
# first — this script only edits Cloudflare DNS.
#
# ──────────────────────────────────────────────────────────────────────────
#  SAFETY
#  The website contact form sends through Resend, which lives entirely on the
#  `send.roztomilygroup.com` subdomain (its own MX + SPF) plus `resend._domainkey`.
#  This script NEVER reads, edits, or deletes any record whose name contains
#  "send." or "_domainkey" (except the new `zoho._domainkey` it adds). It only
#  ever touches: apex MX, apex SPF TXT, apex zoho-verification TXT,
#  `zoho._domainkey`, and `_dmarc`. A guard aborts if any target drifts.
# ──────────────────────────────────────────────────────────────────────────
#
# USAGE
#   export CF_API_TOKEN=...                  # token scoped to this zone:
#                                            #   Zone > DNS > Edit
#                                            #   Zone > Email Routing > Edit
#
#   ./roztomily-dns.sh status                # show current mail-related records (read-only)
#
#   export ZOHO_VERIFICATION_TXT='zoho-verification=zb########.zmverify.zoho.com'
#   ./roztomily-dns.sh verify                # DRY RUN — preview adding the verify TXT
#   ./roztomily-dns.sh verify  --apply       # actually add it; then Verify in Zoho + create mailboxes
#
#   export ZOHO_DKIM_VALUE='v=DKIM1; k=rsa; p=MIGf...'   # from Zoho console
#   ./roztomily-dns.sh cutover               # DRY RUN — preview the full mail cutover
#   ./roztomily-dns.sh cutover --apply       # disable routing, swap MX, SPF, DKIM, DMARC
#
#   ./roztomily-dns.sh check                 # dig MX/TXT to confirm propagation
#
# Optional overrides:
#   ZONE=roztomilygroup.com          # the domain
#   ZOHO_DC=com                      # Zoho data centre: com | eu | in | com.au | jp ...
#   DMARC_RUA=hello@roztomilygroup.com
#
set -euo pipefail

# ── config ────────────────────────────────────────────────────────────────
ZONE="${ZONE:-roztomilygroup.com}"
ZOHO_DC="${ZOHO_DC:-com}"
DMARC_RUA="${DMARC_RUA:-hello@roztomilygroup.com}"
API="https://api.cloudflare.com/client/v4"

CMD="${1:-help}"
APPLY=0
[[ "${2:-}" == "--apply" ]] && APPLY=1

# Zoho mail hosts by data centre
MX1="mx.zoho.${ZOHO_DC}"
MX2="mx2.zoho.${ZOHO_DC}"
MX3="mx3.zoho.${ZOHO_DC}"
SPF_INCLUDE="include:zoho.${ZOHO_DC}"

# ── colours / logging ───────────────────────────────────────────────────────
c_red=$'\033[31m'; c_grn=$'\033[32m'; c_yel=$'\033[33m'; c_dim=$'\033[2m'; c_off=$'\033[0m'
say()  { printf '%s\n' "$*"; }
ok()   { printf '%s✓%s %s\n' "$c_grn" "$c_off" "$*"; }
warn() { printf '%s!%s %s\n' "$c_yel" "$c_off" "$*"; }
die()  { printf '%s✗ %s%s\n' "$c_red" "$*" "$c_off" >&2; exit 1; }
plan() { printf '%s» would %s%s\n' "$c_dim" "$*" "$c_off"; }

# ── Cloudflare API helper ───────────────────────────────────────────────────
cf() { # cf METHOD PATH [json-body]
  local method="$1" path="$2" body="${3:-}"
  local args=(-s -X "$method" "${API}${path}"
    -H "Authorization: Bearer ${CF_API_TOKEN}"
    -H "Content-Type: application/json")
  [[ -n "$body" ]] && args+=(--data "$body")
  curl "${args[@]}"
}
cf_ok() { # assert .success==true, else print errors and die
  jq -e '.success' >/dev/null 2>&1 || true
  local out; out="$(cat)"
  if [[ "$(jq -r '.success' <<<"$out")" != "true" ]]; then
    say "$out" | jq -r '.errors[]? | "  CF error \(.code): \(.message)"' >&2
    die "Cloudflare API call failed."
  fi
  say "$out"
}

# ── lazy API bootstrap (token + zone id + record cache) ─────────────────────
# Only commands that hit Cloudflare call this; `help` and `check` don't need it.
ZONE_ID=""; ALL_RECORDS=""
bootstrap_api() {
  [[ -n "$ZONE_ID" ]] && return 0
  [[ -n "${CF_API_TOKEN:-}" ]] || die "CF_API_TOKEN is not set. Create a token scoped to ${ZONE} (Zone>DNS>Edit + Zone>Email Routing>Edit) and export it."
  ZONE_ID="$(cf GET "/zones?name=${ZONE}&status=active" | jq -r '.result[0].id // empty')"
  [[ -n "$ZONE_ID" ]] || die "Could not find an active zone for ${ZONE}. Is the token scoped to it?"
  ALL_RECORDS="$(cf GET "/zones/${ZONE_ID}/dns_records?per_page=200" | jq -c '.result')"
}

# Guard: a record name is "safe to touch" only if it is exactly one of our targets.
# Anything containing send. or a non-zoho _domainkey is explicitly protected.
is_protected() { # name -> 0 if protected (must NOT touch)
  local n="${1,,}"
  [[ "$n" == *"send."* ]] && return 0
  [[ "$n" == *"_domainkey"* && "$n" != "zoho._domainkey.${ZONE}" && "$n" != "zoho._domainkey" ]] && return 0
  case "$n" in
    *amazonses*|*resend*) return 0 ;;
  esac
  return 1
}
assert_unprotected() {
  is_protected "$1" && die "REFUSING to modify protected record '$1' (contact-form / Resend infra)."
  return 0
}

rec_field() { jq -r "$1" <<<"$ALL_RECORDS"; }

# ── commands ────────────────────────────────────────────────────────────────
cmd_status() {
  bootstrap_api
  say "Zone: ${ZONE}  (id ${ZONE_ID:0:8}…)"
  say "Data centre: zoho.${ZOHO_DC}  →  MX ${MX1}/${MX2}/${MX3}"
  say ""
  say "── Apex MX ──"
  rec_field '.[] | select(.type=="MX" and (.name=="'"$ZONE"'")) | "  [\(.priority)] \(.content)"' || true
  say "── Apex SPF (v=spf1) ──"
  rec_field '.[] | select(.type=="TXT" and .name=="'"$ZONE"'" and (.content|test("v=spf1"))) | "  \(.content)"' || true
  say "── Zoho verification / DKIM / DMARC ──"
  rec_field '.[] | select(.type=="TXT" and ((.content|test("zoho-verification")) or (.name|test("zoho._domainkey")) or (.name|test("_dmarc")))) | "  \(.name): \(.content)"' || true
  say "── Email Routing ──"
  local er; er="$(cf GET "/zones/${ZONE_ID}/email/routing" | jq -r '.result.enabled // "unknown"')"
  say "  enabled: ${er}"
  say ""
  say "${c_dim}── PROTECTED (never touched) ──${c_off}"
  rec_field '.[] | select((.name|test("send\\.")) or (.name|test("resend._domainkey"))) | "  \(.type) \(.name): \(.content[0:48])…"' || true
}

cmd_verify() {
  bootstrap_api
  [[ -n "${ZOHO_VERIFICATION_TXT:-}" ]] || die "Set ZOHO_VERIFICATION_TXT='zoho-verification=zb….zmverify.zoho.com' (from Zoho's verify-domain screen)."
  [[ "$ZOHO_VERIFICATION_TXT" == zoho-verification=* ]] || die "ZOHO_VERIFICATION_TXT should start with 'zoho-verification='."
  assert_unprotected "$ZONE"

  # already present?
  local existing
  existing="$(rec_field '.[] | select(.type=="TXT" and .name=="'"$ZONE"'" and .content=="'"$ZOHO_VERIFICATION_TXT"'") | .id')"
  if [[ -n "$existing" ]]; then ok "Verification TXT already present — nothing to do."; return; fi

  if [[ $APPLY -eq 0 ]]; then
    plan "CREATE TXT @ = \"${ZOHO_VERIFICATION_TXT}\""
    warn "Dry run. Re-run with --apply to make the change."
    return
  fi
  cf POST "/zones/${ZONE_ID}/dns_records" \
    "$(jq -nc --arg c "$ZOHO_VERIFICATION_TXT" '{type:"TXT",name:"'"$ZONE"'",content:$c,ttl:300}')" | cf_ok >/dev/null
  ok "Added verification TXT. Now go to Zoho → Verify, then create the hello@/info@ mailboxes BEFORE running cutover."
}

cmd_cutover() {
  bootstrap_api
  [[ -n "${ZOHO_DKIM_VALUE:-}" ]] || warn "ZOHO_DKIM_VALUE not set — DKIM step will be skipped (you can re-run cutover later just for DKIM)."

  say "Planned mail cutover for ${ZONE} (DC: zoho.${ZOHO_DC})"
  say ""

  # 1) Disable Email Routing
  local er_enabled
  er_enabled="$(cf GET "/zones/${ZONE_ID}/email/routing" | jq -r '.result.enabled // false')"
  if [[ "$er_enabled" == "true" ]]; then
    if [[ $APPLY -eq 1 ]]; then
      cf POST "/zones/${ZONE_ID}/email/routing/disable" "" | cf_ok >/dev/null
      ok "Disabled Cloudflare Email Routing."
    else
      plan "DISABLE Cloudflare Email Routing"
    fi
  else
    ok "Email Routing already disabled."
  fi

  # 2) Delete apex MX records that point at *.mx.cloudflare.net (old routing)
  while read -r id name content; do
    [[ -z "$id" ]] && continue
    assert_unprotected "$name"
    if [[ $APPLY -eq 1 ]]; then
      cf DELETE "/zones/${ZONE_ID}/dns_records/${id}" | cf_ok >/dev/null
      ok "Deleted old routing MX ${content}"
    else
      plan "DELETE apex MX ${content} (old Cloudflare routing)"
    fi
  done < <(rec_field '.[] | select(.type=="MX" and .name=="'"$ZONE"'" and (.content|test("mx.cloudflare.net"))) | "\(.id) \(.name) \(.content)"')

  # 3) Add Zoho MX ×3 (skip any already correct)
  add_mx() { # host priority
    local host="$1" pri="$2" id
    id="$(rec_field '.[] | select(.type=="MX" and .name=="'"$ZONE"'" and .content=="'"$host"'") | .id')"
    if [[ -n "$id" ]]; then ok "MX ${host} already present."; return; fi
    assert_unprotected "$ZONE"
    if [[ $APPLY -eq 1 ]]; then
      cf POST "/zones/${ZONE_ID}/dns_records" \
        "$(jq -nc --arg h "$host" --argjson p "$pri" '{type:"MX",name:"'"$ZONE"'",content:$h,priority:$p,ttl:300}')" | cf_ok >/dev/null
      ok "Added MX ${host} (priority ${pri})"
    else
      plan "CREATE MX ${host} priority ${pri}"
    fi
  }
  add_mx "$MX1" 10
  add_mx "$MX2" 20
  add_mx "$MX3" 50

  # 4) Apex SPF → Zoho (update the single apex v=spf1 TXT; never the send.* one)
  local spf_id spf_content new_spf="v=spf1 ${SPF_INCLUDE} ~all"
  spf_id="$(rec_field '.[] | select(.type=="TXT" and .name=="'"$ZONE"'" and (.content|test("v=spf1"))) | .id' | head -1)"
  spf_content="$(rec_field '.[] | select(.type=="TXT" and .name=="'"$ZONE"'" and (.content|test("v=spf1"))) | .content' | head -1)"
  if [[ -n "$spf_id" ]]; then
    assert_unprotected "$ZONE"
    if [[ "$spf_content" == "$new_spf" ]]; then
      ok "Apex SPF already correct."
    elif [[ $APPLY -eq 1 ]]; then
      cf PUT "/zones/${ZONE_ID}/dns_records/${spf_id}" \
        "$(jq -nc --arg c "$new_spf" '{type:"TXT",name:"'"$ZONE"'",content:$c,ttl:300}')" | cf_ok >/dev/null
      ok "Updated apex SPF: ${spf_content}  →  ${new_spf}"
    else
      plan "UPDATE apex SPF: \"${spf_content}\"  →  \"${new_spf}\""
    fi
  else
    if [[ $APPLY -eq 1 ]]; then
      cf POST "/zones/${ZONE_ID}/dns_records" \
        "$(jq -nc --arg c "$new_spf" '{type:"TXT",name:"'"$ZONE"'",content:$c,ttl:300}')" | cf_ok >/dev/null
      ok "Created apex SPF ${new_spf}"
    else
      plan "CREATE apex SPF \"${new_spf}\""
    fi
  fi

  # 5) DKIM at zoho._domainkey
  if [[ -n "${ZOHO_DKIM_VALUE:-}" ]]; then
    local dk_name="zoho._domainkey.${ZONE}" dk_id
    assert_unprotected "$dk_name"
    dk_id="$(rec_field '.[] | select(.type=="TXT" and (.name=="zoho._domainkey.'"$ZONE"'" or .name=="zoho._domainkey")) | .id' | head -1)"
    if [[ -n "$dk_id" ]]; then
      [[ $APPLY -eq 1 ]] && { cf PUT "/zones/${ZONE_ID}/dns_records/${dk_id}" "$(jq -nc --arg c "$ZOHO_DKIM_VALUE" '{type:"TXT",name:"zoho._domainkey",content:$c,ttl:300}')" | cf_ok >/dev/null; ok "Updated DKIM zoho._domainkey"; } || plan "UPDATE DKIM zoho._domainkey"
    else
      [[ $APPLY -eq 1 ]] && { cf POST "/zones/${ZONE_ID}/dns_records" "$(jq -nc --arg c "$ZOHO_DKIM_VALUE" '{type:"TXT",name:"zoho._domainkey",content:$c,ttl:300}')" | cf_ok >/dev/null; ok "Added DKIM zoho._domainkey"; } || plan "CREATE DKIM zoho._domainkey = \"${ZOHO_DKIM_VALUE:0:32}…\""
    fi
  fi

  # 6) DMARC (monitor mode)
  local dmarc="v=DMARC1; p=none; rua=mailto:${DMARC_RUA}; fo=1" dm_id
  dm_id="$(rec_field '.[] | select(.type=="TXT" and (.name=="_dmarc.'"$ZONE"'" or .name=="_dmarc")) | .id' | head -1)"
  if [[ -n "$dm_id" ]]; then
    ok "DMARC already present (left as-is)."
  else
    [[ $APPLY -eq 1 ]] && { cf POST "/zones/${ZONE_ID}/dns_records" "$(jq -nc --arg c "$dmarc" '{type:"TXT",name:"_dmarc",content:$c,ttl:300}')" | cf_ok >/dev/null; ok "Added DMARC (p=none monitor)"; } || plan "CREATE DMARC \"${dmarc}\""
  fi

  say ""
  if [[ $APPLY -eq 1 ]]; then
    ok "Cutover applied. Click 'Verify DKIM' in Zoho. Then run: ./roztomily-dns.sh check"
  else
    warn "Dry run only. Re-run with --apply to execute the cutover above."
  fi
}

cmd_check() {
  say "── dig MX ${ZONE} ──"; dig +short MX "$ZONE" | sort -n || true
  say "── dig TXT ${ZONE} (SPF) ──"; dig +short TXT "$ZONE" | grep -i spf1 || say "  (none)"
  say "── dig TXT zoho._domainkey ──"; dig +short TXT "zoho._domainkey.${ZONE}" | head -1 || say "  (none)"
  say "── dig TXT _dmarc ──"; dig +short TXT "_dmarc.${ZONE}" || say "  (none)"
  say "── dig MX send.${ZONE} (Resend — should be UNCHANGED) ──"; dig +short MX "send.${ZONE}" || say "  (none)"
}

case "$CMD" in
  status)  cmd_status ;;
  verify)  cmd_verify ;;
  cutover) cmd_cutover ;;
  check)   cmd_check ;;
  *) grep -E '^#( |$)' "$0" | sed -E 's/^# ?//' | sed -n '1,60p' ;;
esac

# Roztomily Email — Zoho Mail Lite setup

Everything to stand up real `@roztomilygroup.com` mailboxes. Do the steps in order.
DNS for `roztomilygroup.com` lives on **Cloudflare**. The website + contact form are
unaffected as long as you follow the **DO NOT TOUCH** rule below.

---

## ⛔ DO NOT TOUCH (read first)

The contact form sends through **Resend**, which lives entirely on the
`send.roztomilygroup.com` subdomain. While editing DNS you must **never delete or change**:

- any record under **`send.`** (e.g. `send` MX, `send` TXT/SPF)
- the **`resend._domainkey`** TXT record

We only ever touch **root-domain** records (`@`) and add new Zoho records. If you leave
the `send.*` and `resend._domainkey` records alone, the website keeps working.

---

## What it costs

- **Zoho Mail Lite ≈ ₦770 per mailbox / month** (10GB + IMAP per box).
- Starting with **2 mailboxes** (`hello@`, `info@`) → **≈ ₦1,500 / month**.
- **Annual billing is ~15% cheaper** than monthly. Exact naira shows at checkout.
- Add more mailboxes anytime at the same per-box rate.

---

## Step 1 — Sign up + add the domain

1. Go to **zoho.com/mail** → **Business Email** → choose **Mail Lite** → pick
   **2 users** → monthly or annual.
2. When asked, **add an existing domain**: `roztomilygroup.com`
   (do NOT buy a new domain, do NOT use a zoho.com address).
3. Zoho gives you a **verification TXT value** that looks like
   `zoho-verification=zb########.zmverify.zoho.com`. Copy it.
4. Note which **data centre** Zoho puts you in (shown in the console / URL — `.com`,
   `.eu`, `.in`, etc.). If it's **not** `.com`, swap the hostnames in Step 3 + 4
   accordingly (`mx.zoho.eu`, `include:zoho.eu`, etc.). **Always match Zoho's console,
   not the defaults below.**

## Step 2 — Verify the domain (Cloudflare)

In **Cloudflare → roztomilygroup.com → DNS → Records**, add:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| TXT  | `@`  | `zoho-verification=zb########.zmverify.zoho.com` (value from Step 1.3) | DNS only |

Back in Zoho, click **Verify**. Then **create the two mailboxes** —
`hello@roztomilygroup.com` and `info@roztomilygroup.com` — **before** switching MX
(so mail has somewhere to land the moment delivery flips).

## Step 3 — Turn off the old mail routing (the step people miss)

The root domain currently receives mail via **Cloudflare Email Routing**. That must be
disabled first or the new MX won't take effect.

1. Cloudflare → **Email** → **Email Routing** → **Disable / turn off**.
   (This releases the `route1/2/3.mx.cloudflare.net` MX records.)
2. If any `route*.mx.cloudflare.net` **MX** records remain on `@`, **delete them**.
   (Leave every `send.*` record exactly as-is.)

## Step 4 — Point mail at Zoho

Add these to Cloudflare DNS (global `.com` DC values shown — swap if your DC differs):

| Type | Name | Content | Priority | Proxy |
|------|------|---------|----------|-------|
| MX  | `@` | `mx.zoho.com`  | 10 | DNS only |
| MX  | `@` | `mx2.zoho.com` | 20 | DNS only |
| MX  | `@` | `mx3.zoho.com` | 50 | DNS only |

**SPF** — update the existing root `@` TXT that starts with `v=spf1` (do not create a
second one) to include Zoho:

```
v=spf1 include:zoho.com ~all
```

**DKIM** — Zoho console → **DKIM** generates a value. Add it as:

| Type | Name | Content |
|------|------|---------|
| TXT | `zoho._domainkey` | (long `v=DKIM1; k=rsa; p=...` value from Zoho) |

Then in Zoho click **Verify DKIM**.

## Step 5 — (Recommended) DMARC

There is currently **no DMARC record**. Add one so the domain reports cleanly and
isn't easily spoofed. Start in monitor mode:

| Type | Name | Content |
|------|------|---------|
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:hello@roztomilygroup.com; fo=1` |

(After a couple of weeks of clean reports you can tighten `p=none` → `p=quarantine`.)

## Step 6 — Verify it works

- DNS can take 5–30 min (Cloudflare is usually minutes).
- Send a test **to** `hello@roztomilygroup.com` from your Gmail → it should arrive in Zoho webmail.
- Reply **from** Zoho → it should land in Gmail without a spam flag.
- Submit the **website contact form** once → confirm it still delivers (proves Resend untouched).

---

## How the team reads the mail (no Gmail setup needed)

Simplest and recommended — works on any phone/PC, nothing to configure:

- **Webmail:** sign in at **mail.zoho.com** with the mailbox address + password.
- **Mobile:** install **Zoho Mail** (iOS / Android), log in, done.

> Optional: pulling a Zoho box into Gmail/Outlook is possible on Lite (IMAP), but it's
> slower to receive and fiddlier to set up. Only do it if a specific person insists on
> living inside Gmail — ask and we'll add those steps.

---

## Signatures

- `brand-kit/email/signatures-ready.html` — open in a browser, copy the block for
  `hello@` / `info@` / a named person, paste into **Zoho → Settings → Signatures**
  (use the source/`< >` view to paste HTML).
- `brand-kit/email/signature-template.html` — master with `{{NAME}}/{{TITLE}}/{{EMAIL}}/{{PHONE}}`
  placeholders for any new team member.
- The logo loads live from `roztomilygroup.com`, so it shows in every client without
  attaching an image.

## Letterhead

- `brand-kit/letterhead.html` — open in a browser, replace the sample body, then
  **Print → Save as PDF** (A4, margins None). Header, red rule, and footer repeat on
  every page automatically.

---

## Quick reference — what changed on DNS

Added: `@` verification TXT, `@` MX ×3 (Zoho), `zoho._domainkey` DKIM, `_dmarc` TXT,
updated root SPF.
Removed: Cloudflare Email Routing + its `route*.mx.cloudflare.net` MX.
**Untouched (critical): everything under `send.` and `resend._domainkey`.**

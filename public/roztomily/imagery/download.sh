#!/usr/bin/env bash
# Roztomily imagery — bulk download from curated Unsplash candidates.
#
# Usage:
#   cd /Users/fubara/duna-site/public/roztomily/imagery
#   bash download.sh
#
# Each Unsplash photo URL works as `https://unsplash.com/photos/<id>/download?force=true`
# which 302-redirects to the original CDN file. curl follows the redirect with -L.

set -e

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

fetch() {
  local id="$1"; local out="$2"
  echo "→ $out"
  curl -fSL --silent --show-error -o "$out" "https://unsplash.com/photos/${id}/download?force=true" || echo "  FAILED: $id"
}

# ── /hero — Lagos cityscape + golden hour (8 candidates) ────────────
mkdir -p hero
fetch kF0-RhpHhRA      hero/01-tunde-buremo-bridge.jpg
fetch xayCN6mrMZ8      hero/02-tunde-buremo-bridge-wide.jpg
fetch n8DxalbQBic      hero/03-tunde-buremo-aerial.jpg
fetch 9ySEZ-ugtJA      hero/04-nupo-deyon-daniel-skyline.jpg
fetch 67ruAEYmp4c      hero/05-nupo-deyon-daniel-aerial.jpg
fetch EMjpo0YjHPw      hero/06-malik-buraimoh-boats.jpg
fetch ZpF8dEG9-mg      hero/07-remy-ajenifuja-sunset.jpg
fetch FW0OPLFOOXI      hero/08-remy-ajenifuja-sunset-2.jpg

# ── /hero — footer/evening variants (4 dusk candidates) ─────────────
fetch 0EhDwwtMDks      hero/footer-01-seun-idowu-nightlapse.jpg
fetch Ww2j734hEcA      hero/footer-02-opeyemi-adisa-bridge-night.jpg
fetch yE5NqpDDPNY      hero/footer-03-sokmean-nou-ocean-sunset.jpg
fetch vjC77fkKJRY      hero/footer-04-miguel-almeida-water.jpg

# ── /about — about-hero + studio context (8 candidates) ─────────────
mkdir -p about
fetch fGd8paHzN98      about/01-obinna-okerekeocha-urban.jpg
fetch cFT_Xq4XyA0      about/02-opeyemi-adisa-street.jpg
fetch vvQW-3yfuos      about/03-namnso-ukpanah-traffic.jpg
fetch t6nqZ0n3i-k      about/04-joshua-oluwagbemiga-danfo.jpg
fetch jcQdBcW7Tmw      about/05-babatunde-olajide-yellow-vehicle.jpg
fetch WSu7qcT3rVg      about/06-sheyi-owolabi-yellow-vehicles.jpg
fetch K32RRhbupME      about/07-muhammad-taha-ibrahim-street.jpg
fetch pwMCmK_6-OI      about/08-dami-akinbode-yellow-vans.jpg

# ── /editorial — portraits + studio (8 candidates) ──────────────────
mkdir -p editorial
fetch 2EGNqazbAMk      editorial/01-elizeu-dias-smile.jpg
fetch Ba1eGcAFj5w      editorial/02-shedrack-salami-portrait.jpg
fetch RLhR1rYPcIU      editorial/03-micheal-ogungbe-arms-crossed.jpg
fetch O28j0TmwqRc      editorial/04-blessing-olarewaju-umbrella.jpg
fetch BbcYuLpSO98      editorial/05-micheal-ogungbe-candid.jpg
fetch 10fvuGtnoEM      editorial/06-nana-o-portrait.jpg
fetch 2FPV2fMoHZo      editorial/07-opeyemi-adisa-clock-tower.jpg
fetch cebfd5BgDC8      editorial/08-tunde-buremo-monochrome.jpg

echo ""
echo "✓ Done."
echo "Run a Squoosh pass on /hero/*.jpg before committing — target ≤500KB."
echo "Logos and textures aren't included here — see SOURCES.md."

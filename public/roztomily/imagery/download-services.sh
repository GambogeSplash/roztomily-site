#!/usr/bin/env bash
# Service-themed stock imagery for the homepage ProductSection blocks.
# 4 photos per discipline → /services/<bucket>/
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"
mkdir -p services/experiential services/creative services/media services/digital

fetch() {
  local id="$1"; local out="$2"
  echo "→ $out"
  curl -fSL --silent --show-error -o "$out" "https://unsplash.com/photos/${id}/download?force=true" || echo "  FAILED: $id"
}

# ── Experiential: events, activations, crowd + stage ────────────────
fetch wZZhkTvB9pI  services/experiential/01-installation-crowd.jpg
fetch Uhfb85y_B-U  services/experiential/02-venue-tables.jpg
fetch UCbMZ0S-w28  services/experiential/03-stage-presentation.jpg
fetch 7Znv4RVRvdo  services/experiential/04-concert-stage-lasers.jpg

# ── Creative Production: film/TVC behind-the-scenes ─────────────────
fetch xKfS7Hll0Ck  services/creative/01-film-set-crew.jpg
fetch FtQE89f3EXA  services/creative/02-cameraman-silhouette.jpg
fetch kbd1oAf-9Ms  services/creative/03-camera-tripod.jpg
fetch b7gi_rqKxcQ  services/creative/04-concert-crowd-lights.jpg

# ── Media Relations: newsroom / broadcasting ────────────────────────
fetch vqy5GGbmrV4  services/media/01-office-desks.jpg
fetch JDUVM9_VaZE  services/media/02-conference-room.jpg
fetch LorHdkRoHvw  services/media/03-broadcast-control.jpg
fetch SMcjAxzG-Ws  services/media/04-typewriter-newspaper.jpg

# ── Digital: social, content, creator setup ─────────────────────────
fetch 0cpyFsSUiSc  services/digital/01-phone-social.jpg
fetch Aqc7znjxROM  services/digital/02-phone-laptop.jpg
fetch HRt5jQh0HKc  services/digital/03-creator-phone.jpg
fetch 1rmRiRnuLII  services/digital/04-laptop-apps.jpg

echo ""
echo "✓ Done. Run python3 optimize-services.py to compress."

#!/usr/bin/env bash
# Pulls 8 neutral paper/grain/fabric textures from Unsplash for the /textures folder.
# Run from this folder: bash download-textures.sh
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR/textures"

fetch() {
  local id="$1"; local out="$2"
  echo "→ $out"
  curl -fSL --silent --show-error -o "$out" "https://unsplash.com/photos/${id}/download?force=true" || echo "  FAILED: $id"
}

fetch nW3XR5c1aCg  01-paper-white-soft.jpg
fetch vS3idIiYxX0  02-paper-white-minimal.jpg
fetch R53t-Tg6J4c  03-wall-white-clean.jpg
fetch qv05FvdE26k  04-paper-white-linear.jpg
fetch zGZYQQVmXw0  05-wall-cream-shadow.jpg
fetch XFWiZTa2Ub0  06-textile-white-woven.jpg
fetch MS9Tnh3if1o  07-fabric-offwhite.jpg
fetch OIKBzKrTdxA  08-paper-aged.jpg

echo ""
echo "✓ Done. Run python3 ../optimize.py to compress."

#!/usr/bin/env python3
"""
Resize + re-encode every JPG under hero/, about/, editorial/ to web-friendly
sizes. Originals are preserved as -original.jpg backups.

Usage:
  cd /Users/fubara/roztomily-site/public/roztomily/imagery
  python3 optimize.py
"""

from pathlib import Path
from PIL import Image

MAX_WIDTH = 2400      # px, retina-friendly cap
QUALITY = 82          # JPEG quality
HERE = Path(__file__).parent
FOLDERS = ["hero", "about", "editorial"]

def optimize(src: Path):
    img = Image.open(src).convert("RGB")
    w, h = img.size
    if w > MAX_WIDTH:
        ratio = MAX_WIDTH / w
        img = img.resize((MAX_WIDTH, int(h * ratio)), Image.LANCZOS)
    img.save(src, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    return src.stat().st_size

total_before = 0
total_after = 0
count = 0
for folder in FOLDERS:
    for jpg in sorted((HERE / folder).glob("*.jpg")):
        if "-original" in jpg.stem:
            continue
        before = jpg.stat().st_size
        after = optimize(jpg)
        total_before += before
        total_after += after
        count += 1
        kb_before = before // 1024
        kb_after = after // 1024
        print(f"  {jpg.relative_to(HERE)}: {kb_before}KB → {kb_after}KB")

mb_before = total_before / 1024 / 1024
mb_after = total_after / 1024 / 1024
saved = (1 - total_after / total_before) * 100 if total_before else 0
print(f"\n✓ Optimized {count} files: {mb_before:.1f}MB → {mb_after:.1f}MB ({saved:.0f}% saved)")

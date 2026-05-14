#!/usr/bin/env python3
"""
Strip white/near-white backgrounds from logo PNGs in this folder.
Produces -transparent.png versions you can swap into lib/clients.ts.

Usage:
  cd /Users/fubara/duna-site/public/roztomily/logos
  python3 strip-bg.py

Behavior:
  · Reads every *.png in the current folder (skips files already ending in -transparent.png)
  · Treats pixels with RGB > THRESHOLD as background → makes them transparent
  · Writes <name>-transparent.png alongside
"""

from PIL import Image
from pathlib import Path

THRESHOLD = 235   # 0-255. Higher = stricter (only pure-white removed).
HERE = Path(__file__).parent

def strip_bg(src: Path):
    img = Image.open(src).convert("RGBA")
    pixels = img.getdata()
    new_pixels = []
    for r, g, b, a in pixels:
        if r > THRESHOLD and g > THRESHOLD and b > THRESHOLD:
            new_pixels.append((255, 255, 255, 0))   # transparent
        else:
            new_pixels.append((r, g, b, a))
    img.putdata(new_pixels)
    out = src.with_name(f"{src.stem}-transparent.png")
    img.save(out, "PNG", optimize=True)
    return out

count = 0
for png in sorted(HERE.glob("*.png")):
    if "-transparent" in png.stem:
        continue
    out = strip_bg(png)
    print(f"  {png.name}  →  {out.name}")
    count += 1

print(f"\n✓ Processed {count} logos.")
print("Update lib/clients.ts to point each src at the -transparent.png variant.")

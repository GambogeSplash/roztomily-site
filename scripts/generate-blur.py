#!/usr/bin/env python3
"""
Generate base64-encoded blur placeholders for every image in public/.
Output: lib/blur-data.json — a flat map from "/public/..." path → data URI.

Used by lib/blur.ts (helper) to feed next/image's `placeholder="blur"`.
Run when you add new images:  python3 scripts/generate-blur.py
"""

from __future__ import annotations
from pathlib import Path
from PIL import Image
from typing import Optional
import base64
import io
import json

ROOT = Path(__file__).parent.parent
PUBLIC = ROOT / "public"
OUT = ROOT / "lib" / "blur-data.json"

# 10×10 is enough for a soft blur preview; next/image scales it up + blurs it.
TILE = (12, 9)

# Image types we care about
EXTS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}

def blur_data_uri(path: Path) -> Optional[str]:
    try:
        img = Image.open(path).convert("RGB")
        img.thumbnail((40, 40), Image.LANCZOS)
        img = img.resize(TILE, Image.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, "JPEG", quality=50, optimize=True)
        b64 = base64.b64encode(buf.getvalue()).decode("ascii")
        return f"data:image/jpeg;base64,{b64}"
    except Exception as e:
        print(f"  ! skipped {path.name}: {e}")
        return None

def main():
    blur_map: dict[str, str] = {}
    files = [p for p in PUBLIC.rglob("*") if p.is_file() and p.suffix.lower() in EXTS]
    print(f"Scanning {len(files)} images under public/...")
    for p in sorted(files):
        rel = "/" + p.relative_to(PUBLIC).as_posix()
        uri = blur_data_uri(p)
        if uri:
            blur_map[rel] = uri
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(blur_map, indent=0))
    total_bytes = sum(len(v) for v in blur_map.values())
    print(f"\nWrote {len(blur_map)} blur URIs to {OUT.relative_to(ROOT)}")
    print(f"Total payload: {total_bytes // 1024}KB (gzipped much smaller)")

if __name__ == "__main__":
    main()

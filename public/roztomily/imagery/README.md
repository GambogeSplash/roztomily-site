# Roztomily imagery library

Drop new assets into the folder that matches their purpose. Each folder has its own naming and dimension rules so the site can absorb them with no code changes.

---

## `/hero` — painterly + photographic page leads

**Used by:** homepage Hero, /about hero, /forms/get-in-touch hero.
**Aspect / size:** 1440×900 minimum, ideally 2880×1800 retina. Cropped centre.
**File names:** `hero-<scene>.avif` (preferred) + `.jpg` fallback. Example:
  - `hero-lagos-sunset.avif`
  - `hero-eyo-festival.avif`
  - `hero-studio-floor.avif`
**Style direction:** Lagos-flavored Ghibli — sunset palettes, atmospheric landscapes with cultural anchors (Tafawa Balewa Square horizon, Lekki coastline, Bar Beach silhouettes, Eyo masquerades, Lagos market rooflines).

**Sourcing prompts (Midjourney / SD):**
- "lagos market sunset, ghibli style painterly, studio ghibli, wide cinematic, golden hour"
- "lekki coastline at dusk, soft painterly illustration, hand-painted, no text, atmospheric"
- "tafawa balewa square evening, ghibli matte painting, warm colour palette"
- "eyo festival lagos, painterly cultural illustration, soft colours, no people in foreground"

**Don't use:** literal compliance/SaaS landscapes; anything with visible text or logos.

---

## `/activations` — real campaign + event photography

**Used by:** project case studies, homepage projects-row, blog hero images, About selected work.
**Aspect / size:** 4:3 or 16:10 preferred. 2000px wide minimum.
**File names:** `<client>-<event>-<sequence>.jpg`. Example:
  - `kerrygold-mall-activation-01.jpg`
  - `valuejet-press-launch-03.jpg`
  - `bord-bia-mixers-final-02.jpg`

**Source:** in-house photography from past Roztomily campaigns. Where licensing allows, request from clients. For new work, brief the photographer for landscape 4:3 + portrait 5:7 of every activation.

**Don't use:** stock photos labelled "African event" or "Africa marketing" — they read as generic.

---

## `/editorial` — portraits + behind-the-scenes

**Used by:** /about team grid, blog author byline, press quotes.
**Aspect / size:** Portraits 5:7 or 1:1, 1200px+. Wide BTS 16:9.
**File names:** `<person>-<scene>.jpg` for portraits, `bts-<project>-<seq>.jpg` for BTS.

**Style direction:** moody natural light, single subject, clean background. Pair with a relaxed, unbranded environment (studio floor, location scout, late-night creative session). Avoid stiff corporate posing.

---

## `/textures` — grain, paper, fabric, atmospheric overlays

**Used by:** decorative section dividers, optional hero overlay layers, dark inverse band backgrounds.
**Size:** seamless tiles or 2000×2000 unique. Greyscale or low-saturation.
**File names:** `texture-<kind>-<variant>.jpg`. Example:
  - `texture-paper-warm.jpg`
  - `texture-grain-fine.jpg`
  - `texture-canvas-cream.jpg`

**Sources:** Texturelabs (free), Hero Patterns, Adobe Capture from real paper/fabric scans.

---

## `/illustrations` — abstract marks, Lagos-flavored vector

**Used by:** decorative section accents, blog inline figures, "what we believe" pictograms.
**Format:** SVG only. Single-colour using `currentColor` so the design system can recolour them.
**File names:** `illu-<concept>.svg`. Example:
  - `illu-lagos-rooftops.svg`
  - `illu-megaphone-marquee.svg`
  - `illu-handshake-warm.svg`

**Style direction:** thick-stroke linework or solid silhouettes. Lagos cultural references where applicable (danfo silhouette, Lekki bridge, jollof pot, asoebi pattern motif).

**Sourcing:** commission a Nigerian illustrator (Niyi Okeowo, Diana Ejaita, Tobi Onabolu style references) OR draw in Figma using the existing brand red `#dc2c25`.

---

## `/client-logos` — current and past client brand marks

**Used by:** TrustedBy marquee, footer credits, about-page client wall.
**Format:** SVG preferred, single-colour using `currentColor`. PNG @ 200px tall as fallback.
**File names:** `<client-slug>.svg`. Example:
  - `kerrygold.svg`
  - `valuejet.svg`
  - `bord-bia.svg`
  - `premier-cool.svg`
  - `bet9ja.svg`
  - `morning-fresh.svg`

**Action item:** request vector logos from each existing client. PZ Cussons, Cussons Baby, Mamador, Joy, Kings, BoardBia are already in `public/logos/` (PNG @ 300×300). Convert these to SVG when possible.

---

## `/about` — studio, team, founder shots

**Used by:** /about page hero, "Strategy. Creativity. Execution." square image, footer marginalia.
**Aspect / size:** 1:1 square minimum 1200px for cards. 21:9 banner for hero.
**File names:** `studio-<scene>.jpg`, `team-<person>.jpg`, `founder-<name>.jpg`.

**Style:** see `/editorial`. Match the dignity of agency work, not the awkwardness of corporate-headshot templates.

---

## `/stock-references` — Unsplash / Pexels collections we trust

A short list of trusted sources for stop-gap imagery while we wait for original assets.

**Lagos + Nigeria photographers (Unsplash):**
- @yvettemt (Yvette de Wit)
- @ladibrand
- @nupo
- @t_jacquelyn

**Collections:**
- "Made in Lagos" (Unsplash)
- "African creatives at work" (Pexels)
- "West African markets" (Pexels)

**Search prompts that consistently return good results:**
- "Lagos balcony golden hour"
- "Nigerian creative studio"
- "African event production"
- "West Africa golden hour street"

Stage anything from this folder into the right destination folder above when used, with proper attribution recorded in `/stock-references/attribution.md`.

---

## Naming + housekeeping

- `kebab-case` everywhere. No spaces, no underscores.
- AVIF + JPG/PNG fallback for everything heavier than 50 KB.
- Compress all raster originals through Squoosh before commit. Target ≤ 500 KB for hero, ≤ 200 KB for thumbnails.
- Keep originals + source files (Figma, PSD) in `~/Dropbox/Roztomily/_originals/` — never inside `public/`.

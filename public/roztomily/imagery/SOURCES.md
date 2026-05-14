# Roztomily — Curated imagery sources

Compiled 2026-05-14 from Unsplash + Pexels deep search. Every link below is **free for commercial use, no attribution required** under the Unsplash license, but we should still credit photographers in `stock-references/attribution.md` as a courtesy.

Workflow:
1. Click the URL → on Unsplash, click **Download** → choose **Large** or **Original** size.
2. Save into the appropriate bucket below using the suggested filename.
3. Run through Squoosh (avif + jpg fallback at ≤ 500 KB).
4. Wire into the site (or just drop the file using the canonical name — most slots auto-resolve).

---

## 🎯 Priority 1 — Hero painterly replacement

**Current state:** `/public/images/hero-landscape.avif` is a duna reference asset. Used at the top of `/`, `/about`, and `/contact`.

**Honest note:** True Lagos-flavored painterly Ghibli-style imagery is **not available on free stock**. The realistic options are:
- **(A) Substitute:** use a high-impact real Lagos golden-hour photo (recommended)
- **(B) Generate:** Midjourney / Sora with the prompts in `README.md`
- **(C) Commission:** a Nigerian illustrator (Diana Ejaita, Niyi Okeowo, Tobi Onabolu references)

### Option A — Real Lagos photography candidates

Top picks for the hero slot (atmospheric, wide, recognizable):

| Photographer | URL | Why |
|---|---|---|
| Tunde Buremo | https://unsplash.com/photos/kF0-RhpHhRA | Iconic Lagos bridge over water — strong horizon |
| Tunde Buremo | https://unsplash.com/photos/xayCN6mrMZ8 | Companion frame, slightly wider |
| Tunde Buremo | https://unsplash.com/photos/n8DxalbQBic | Aerial of busy Lagos — editorial wide angle |
| Nupo Deyon Daniel | https://unsplash.com/photos/9ySEZ-ugtJA | Lagos skyline, blue sky daytime |
| Nupo Deyon Daniel | https://unsplash.com/photos/67ruAEYmp4c | Aerial city buildings |
| Obinna Okerekeocha | https://unsplash.com/photos/fGd8paHzN98 | Dense urban aerial, wide composition |
| Malik Buraimoh | https://unsplash.com/photos/EMjpo0YjHPw | Boats + city bridge (third mainland feel) |
| Seun Idowu | https://unsplash.com/photos/0EhDwwtMDks | Night time-lapse, dramatic atmosphere |
| Opeyemi Adisa | https://unsplash.com/photos/Ww2j734hEcA | Bridge at night |

**Save as:** `public/roztomily/imagery/hero/hero-lagos-bridge.avif` (+ `.jpg` fallback)

---

## 🎯 Priority 2 — Footer painterly replacement

**Current state:** `/public/images/footer-landscape.avif` is a duna reference asset.

Footer needs an evening/dusk vibe with horizontal composition. Best candidates:

| Photographer | URL | Why |
|---|---|---|
| Tunde Buremo | https://unsplash.com/photos/xayCN6mrMZ8 | Wide bridge over water — works horizontally |
| Seun Idowu | https://unsplash.com/photos/0EhDwwtMDks | Night cityscape — moody, atmospheric |
| Opeyemi Adisa | https://unsplash.com/photos/Ww2j734hEcA | Bridge at night — strong silhouette |

**Save as:** `public/roztomily/imagery/hero/footer-lagos-evening.avif` (+ `.png` fallback)

---

## 🎯 Priority 3 — About page hero

**Current state:** `/public/images/about-hero.png` is a duna reference asset.

Consider something more "studio life" or panoramic that feels editorial:

| Photographer | URL | Why |
|---|---|---|
| Nupo Deyon Daniel | https://unsplash.com/photos/9ySEZ-ugtJA | Wide Lagos skyline |
| Joshua Oluwagbemiga | https://unsplash.com/photos/t6nqZ0n3i-k | Yellow danfo — quintessential Lagos street object |
| Babatunde Olajide | https://unsplash.com/photos/jcQdBcW7Tmw | Single yellow vehicle — graphic Lagos symbol |
| Opeyemi Adisa | https://unsplash.com/photos/cFT_Xq4XyA0 | Busy Lagos street — alive |
| Muhammad-Taha Ibrahim | https://unsplash.com/photos/K32RRhbupME | Daily urban life — people + vehicles |

**Save as:** `public/roztomily/imagery/about/about-hero.avif`

---

## 🎯 Priority 4 — Editorial portraits / team / BTS

For the future /about team grid, blog bylines, press quotes:

| Photographer | URL | Why |
|---|---|---|
| Elizeu Dias | https://unsplash.com/photos/2EGNqazbAMk | Natural smile, candid energy |
| Shedrack Salami | https://unsplash.com/photos/Ba1eGcAFj5w | Professional but warm, natural light |
| Micheal Ogungbe | https://unsplash.com/photos/RLhR1rYPcIU | Confident posture, editorial without stiffness |
| Blessing Olarewaju | https://unsplash.com/photos/O28j0TmwqRc | Creative personality, environmental |
| Micheal Ogungbe | https://unsplash.com/photos/BbcYuLpSO98 | Candid lifestyle moment |
| nana o. | https://unsplash.com/photos/10fvuGtnoEM | Quiet outdoor portrait |

**Save into:** `public/roztomily/imagery/editorial/<person-or-scene>.jpg`

---

## 🎯 Priority 5 — Textures (decorative)

Free seamless paper + grain textures for dividers, hero overlays, the dark inverse band:

| Source | URL | Format | License |
|---|---|---|---|
| **Unsplash – Paper Texture** | https://unsplash.com/s/photos/paper-texture | JPG | Free, no attribution |
| **Unsplash – Grain Texture** | https://unsplash.com/s/photos/grain-texture | JPG | Free, no attribution |
| **EveryTexture – Paper grain (smooth)** | https://everytexture.com/everytexture-com-stock-paper-texture-00083/ | 2448×3264 JPG, seamless variants | Free, personal + commercial |
| **EveryTexture – Noisy grain paper** | https://everytexture.com/everytexture-com-stock-paper-texture-00025/ | Multi-size, seamless | Free, no attribution |
| **Lost & Taken** | https://lostandtaken.com/ | 30+ paper packs | Free with attribution |

**Save as:** `public/roztomily/imagery/textures/texture-paper-warm.jpg`, `texture-grain-fine.jpg`, etc.

---

## 🔍 Bonus — Lagos collections worth browsing manually

These are search routes, not specific picks. Worth scrolling for one-offs:

- https://unsplash.com/s/photos/lagos – 638 Lagos photos
- https://unsplash.com/s/photos/nigeria – 500+ general Nigeria
- https://unsplash.com/s/photos/lagos-skyline – skyline-specific
- https://unsplash.com/s/photos/nigerian-culture – culture moments
- https://unsplash.com/s/photos/african-market – West African markets

---

## ⚠️ The painterly problem (read this)

The duna reference imagery we're currently using (`hero-landscape.avif`, `footer-landscape.avif`, `about-hero.png`) is a **specific aesthetic** — painted Ghibli-style atmospheric matte landscapes. There is **no free stock equivalent** for this style with Lagos cultural anchors.

If we want to keep that painterly look authentically:

**Recommended path: Midjourney generation**
Prompts that have worked well for similar briefs (drop into Midjourney v6+):

```
lagos market sunset, ghibli style painterly, studio ghibli matte painting, wide cinematic, golden hour --ar 16:9 --style raw
```

```
lekki coastline at dusk, hand-painted illustration, soft atmospheric, warm palette, no text, no people in foreground --ar 16:9
```

```
tafawa balewa square evening, ghibli matte painting, warm tropical palette, painterly, soft brushwork --ar 21:9
```

```
eyo festival lagos street, painterly cultural illustration, soft afternoon light, no faces, atmospheric distance --ar 16:9
```

Generate at the largest sizes (--ar 21:9 for hero, --ar 16:9 for footer). Save and upscale to 2880px wide minimum. Then run through Squoosh.

**Alternative paths:**
- **Commission:** Diana Ejaita (Nigerian-Italian, painterly), Niyi Okeowo (Lagos-based digital painter), or Tobi Onabolu. Budget: ~$400–$1200 per hero illustration.
- **Stockcake / Adobe Stock:** paid AI-generated Lagos painterly options exist there if budget allows.
- **Hybrid:** Use the Tunde Buremo + Nupo Deyon Daniel Lagos photography for now (free, immediate), commission painterly art for v2 launch.

---

## Attribution checklist

Even though Unsplash doesn't require attribution, log every used image in `stock-references/attribution.md`:

```
## Used images
- hero/hero-lagos-bridge.avif — Tunde Buremo via Unsplash (https://unsplash.com/photos/kF0-RhpHhRA) — used on / and /contact hero
- footer/footer-lagos-evening.avif — Seun Idowu via Unsplash (https://unsplash.com/photos/0EhDwwtMDks) — used in SiteFooter
```

This keeps us clean if license terms change in the future.

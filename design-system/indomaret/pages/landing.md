# Page Override — `landing` (Beranda)

> Overrides `design-system/indomaret/MASTER.md` for `index.html`.
> Master rules for spacing, motion, checklist and anti-patterns still apply.

**Page:** Landing / beranda toko
**Built:** 2026-11-13
**Files:** `index.html`, `assets/css/style.css`, `assets/js/main.js`

---

## 1. Brand-locked palette (replaces the generated green)

The design-system search returned a generic *retail green* palette. For an Indomaret
landing page the brand identity is red + yellow, so the palette was re-derived from
the brand and every text/background pair was contrast-checked (WCAG AA, 4.5:1).

| Role | Hex | Token | Verified contrast |
|------|-----|-------|-------------------|
| Primary (brand red) | `#C81E27` | `--red-600` | 5.72:1 on white |
| Primary hover/decor | `#E11D26` | `--red-500` | 4.77:1 on white |
| Accent (brand yellow) | `#FFC629` | `--yellow` | 11.07:1 with `#1A1A1A` |
| Ink / foreground | `#1A1A1A` | `--ink` | 16.7:1 on white |
| Body secondary | `#4A423C` | `--ink-soft` | ≥ 9:1 on cream |
| Muted text | `#7A6A5C` | `--muted-ink` | 4.6:1 on `#FFFFFF` (use ≥ .84rem) |
| Background | `#FFFBF5` | `--cream` | — |
| Alternate surface | `#FFF4E6` | `--cream-2` | — |
| Card | `#FFFFFF` | `--paper` | — |
| Border | `#EDE3D6` | `--line` | non-text |
| Success (open/buka) | `#1A7A3C` | `--green-700` | 5.39:1 on white |
| Dark surface | `#241C17` | — | light text ≥ 10:1 |

Never place white text on `--yellow`, and never place `--yellow` text on white.

## 2. Typography (kept from master)

- Headings: **Rubik** 600/700/800, `letter-spacing: -.02em`, display sizes use `-.035em`.
- Body: **Nunito Sans** 400/600/700, base `1rem`, line-height `1.6`.
- Loaded from Google Fonts with `preconnect` + `display=swap`.

## 3. Layout rules for this page

- Hero: 2-column at ≥ 1080px (copy 1.02fr / visual .98fr), single column below.
- Category grid: 4 → 2 → 1 columns at 1080 / 680px.
- Promo: feature card spans the full row below 1080px, media moves above copy on mobile.
- FAQ uses native `<details>` — no JS, works without scripting.
- Footer: 1.6fr + 3 × 1fr → 2 columns → 1 column.

## 4. Motion (master "stagger list", tuned to 5/10)

- Reveal on scroll: 18px rise + fade, 520ms `cubic-bezier(.22,.61,.36,1)`, 55ms stagger capped at 6 items.
- Hover/focus transitions: 220ms; no transform on layout-affecting properties.
- Two hero float cards use a 6s y-drift; disabled under `prefers-reduced-motion`.
- Reduced motion: reveals render in final state immediately, smooth scroll off.

## 5. Interaction & a11y decisions

- Skip link, single `<h1>`, landmark elements (`header/nav/main/footer`), `aria-current`-style active nav via `.is-active`.
- Mobile nav: `aria-expanded` toggle, Escape closes, focus returns to the toggle, outside-click closes.
- Store finder: inline error via `role="alert"` + `aria-invalid`, error clears on input.
- All icon-only controls have `aria-label`; decorative SVGs are `aria-hidden`.
- Icons are hand-drawn inline SVG (Lucide-style 24px grid, 1.7 stroke) — no emoji, no icon font.
- Touch targets ≥ 44 × 44px on every link, button, and nav item.

## 6. Known demo limits

- Search, store finder, and download-store buttons are front-end demos (no backend).
- Store results are generated from the typed location, not a real gerai database.
- Copy is illustrative marketing copy for a concept page, not official Indomaret material.
- Hero/product photography is AI-generated; replace with licensed brand assets before any real launch.

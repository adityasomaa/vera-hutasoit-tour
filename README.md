# Vera Bali Tour

A 7-page bilingual marketing site for a (fictional) small Bali tour operator, built as a front-end demo.

**Live:** https://vera-hutasoit-tour.vercel.app

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 · TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion | `motion` (Framer Motion 12) |
| Icons | `lucide-react` |
| Fonts | Outfit (display) + Plus Jakarta Sans (body) via `next/font` |
| Imagery | 100% hand-authored inline SVG — no stock photos, no external asset requests |

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, why-us, three tour formats, destination bento, process, stats, testimonials |
| `/about` | Story, values, timeline, team, certifications |
| `/tour` | The three formats in detail, comparison table, ready-made packages, FAQ |
| `/testimonial` | Featured drag-carousel + filterable masonry of reviews |
| `/contact` | Contact cards, validated form, opening hours, drawn map, socials |
| `/privacy-policy` | Full privacy policy with sticky table of contents |
| `/terms-of-use` | Full terms with sticky table of contents |

## Feature notes

**Two distinct loaders.** `IntroLoader` runs on a fresh load of the site (so also whenever someone lands directly on `/`): brand mark, progress counter, phase labels, then a curved wave lift-off. `PageCurtain` handles route-to-route navigation and enforces a strict order so nothing is ever seen mid-change:

1. **close** — panel rises and fully covers the viewport
2. **swap** — `router.push()` fires only once the panel is opaque
3. **scroll** — the new page is jumped to the top, still hidden
4. **open** — the panel lifts away, revealing a page already at the top

Landing on `/` reuses the brand mark so the curtain echoes the arrival loader; every other route shows the destination's name. Browser back/forward is handled too — the curtain drops in place and then reveals.

**Tour request modal.** Opened from the navbar dropdown (each of the three tour types), the tour cards, the comparison table, the packages grid and the footer. Three steps with per-step validation, tour type and package name pre-filled from wherever it was launched, plus a success state that hands off to WhatsApp.

**Bilingual (EN default / ID).** A single typed dictionary drives every string, including both legal documents. The Indonesian copy is written in a warm, conversational-but-polite register rather than stiff formal Indonesian. The floating switch sits bottom-left; the choice is stored in a strictly-necessary cookie.

**Functional cookie consent.** Four categories (necessary / preferences / analytics / marketing). Optional scripts are genuinely only injected into the DOM after consent, and are removed — along with their cookies — the moment consent is withdrawn. `track()`, `remember()` and `recall()` are no-ops unless the relevant category is on. Preferences are re-openable at any time from the footer or either legal page.

**Motion & interaction.** Magnetic buttons with a cursor-tracking light, 3D tilt + spotlight cards, word-by-word headline reveals, scroll-linked progress bar, cursor glow, animated SVG scenes, seamless marquees, staggered reveals, blob fields and a paper grain overlay. Everything collapses gracefully under `prefers-reduced-motion`.

**Responsive.** Single-column mobile, two-up tablet, full bento/grid layouts on desktop. The hamburger opens a full-width sheet with an expandable Tour submenu that launches the same request modal.

## Palettes

Three connected "fun" palettes, all tropical-adjacent so they read as one system:

- **Lagoon** `#0FB5AE` — primary, trust, water
- **Coral** `#FF6B57` — energy, calls to action, sunset
- **Sunbeam** `#FFC53D` — warmth, accents, frangipani

Neutrals: **Ink** `#06171D` (deep sea night) and **Sand** `#FFF8EE` (volcanic beach cream).

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm start       # serve the production build
```

## Disclaimer

Vera Bali Tour is a fictional brand. Prices, testimonials, addresses, phone numbers and illustrations are placeholders. No form on this site transmits or stores data.

# Vera Bali Tour

A bilingual marketing site for a small Bali tour operator, built as a front-end demonstration.

**Live:** https://vera-hutasoit-tour.vercel.app

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 · TypeScript |
| Styling | Tailwind CSS v4, CSS-first `@theme` tokens in OKLCH |
| Motion | `motion` (Framer Motion 12) |
| Imagery | Hand-authored inline SVG. No stock photos, no external asset requests |

## Routes

| Route | Purpose |
|---|---|
| `/` | Home — hero, about, tour packages, testimonials, contact form |
| `/about` | Story, values, timeline, team, credentials |
| `/tour` | The three formats, comparison table, FAQ |
| `/tour/private` · `/tour/sharing` | Browsable catalogue, three tours each |
| `/tour/[format]/[slug]` | Tour detail: itinerary, inclusions, booking rail |
| `/testimonial` | Filterable guest reviews |
| `/contact` | Channels, form, opening hours, drawn map |
| `/privacy-policy` · `/terms-of-use` | Legal, with a sticky table of contents |

## Design system

**Colour strategy: restrained.** Warm tinted neutrals carry about 85% of every surface. Lagoon is the single working colour (~12%). Coral and Sunbeam are rare accents (~3% combined) with one job each: coral marks the booking action, sunbeam marks ratings. All colour is flat — there are no gradients anywhere in the project.

Tokens are OKLCH, defined in `src/app/globals.css`. Neutrals are tinted toward the brand hue rather than pure grey, and neither pure black nor pure white appears.

Structure comes from hairlines and spacing rather than cards and shadows. Type is Outfit for display and Plus Jakarta Sans for body, with body measure capped at 62–70ch.

**Motion is deliberately sparse.** Scroll reveals travel 14px on an ease-out curve; hovers are colour and a 3% image scale. There is no cursor glow, no floating blobs, no paper grain, no 3D tilt and no shine sweep.

## Feature notes

**Two loaders.** `IntroLoader` runs on a fresh load of the site, so also when someone lands directly on `/`. `PageCurtain` handles route-to-route navigation and enforces a strict order so nothing is ever seen mid-change:

1. **close** — the panel rises and fully covers the viewport
2. **swap** — `router.push()` fires only once the panel is opaque
3. **scroll** — the new page is jumped to the top, still hidden
4. **open** — the panel lifts away, revealing a page already at the top

Browser back and forward are handled too, and timers re-arm on `visibilitychange` so a transition started just before a tab switch cannot freeze.

**Booking always ends in WhatsApp.** There is no backend, so rather than faking a "message sent" state, every form composes a readable message and hands off to `wa.me`. Tour detail pages prefill the tour name and price; the contact form prefills name, dates, group size and message; the custom tour form prefills destinations, dates, length, group size and budget.

**Tour navigation.** The Tour dropdown routes Private and Sharing to their own catalogue pages and opens the request form only for Customized, since that is the one format without a fixed catalogue.

**Bilingual, EN default.** One typed dictionary drives every string including both legal documents. Indonesian copy is written in a warm, conversational-but-polite register rather than stiff formal Indonesian. The choice is stored in a strictly-necessary cookie.

**Functional cookie consent.** Four categories. Optional scripts are only injected into the DOM after consent and are removed, with their cookies, the moment consent is withdrawn. `track()`, `remember()` and `recall()` are no-ops unless their category is on.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm start
```

## Disclaimer

Vera Bali Tour is a demonstration brand. Prices, testimonials, addresses and illustrations are placeholders. No form on this site stores or transmits data to a server.

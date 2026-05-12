---

<p align="center">
  <strong>TS Aromatics — UX Case Study (v2)</strong>
  <br>
  <sub>Designed & engineered by <strong>Prabhakar Kumar</strong> at <strong>Chiti Technologies</strong></sub>
</p>

---

> **Studio:** Chiti Technologies — Design & Engineering Studio  
> **Designer:** Prabhakar Kumar  
> **Client:** TS Aromatics  
> **Version:** v2 (Static HTML — Enhanced Bento, Simulation Layer, Molecular Explorer)  
> **Date:** May 2026  

*This case study documents the evolution from v1's foundational UX into a sensory simulation layer — heat-driven environments, Canvas 2D globe visualization, molecular constellation exploration, and haptic audio feedback. A portfolio artifact showcasing Chiti Technologies' design-to-engineering pipeline.*

---

## Project Overview

**Client**: TS Aromatics (Tanishq, Suruchi, Abhinav — family business)  
**Sector**: B2B Essential Oils & Botanical Ingredients  
**Primary Audience**: Manufacturers, wellness founders, formulators, procurement teams  
**Demo Type**: Static multi-page HTML demo (pre-Next.js migration)  
**Design System**: Chiti V3 (8pt grid, glassmorphism, spring animations, haptic feedback)  
**Role**: Design system implementation, front-end development, UX architecture  
**Studio**: Chiti Technologies

## Problem

TS Aromatics entered a competitive B2B essential oils market where buyers needed to trust a new supplier. The primary challenges were:

1. **Trust deficit**: New supplier without established B2B procurement relationships
2. **Documentation gap**: Buyers expect COA, MSDS, GC/MS reports — not just product photos
3. **Conversion friction**: No clear pathway from "browsing oil" to "requesting a sample/quote"
4. **Mobile discovery**: 40%+ of initial enquiries coming from Instagram/Facebook mobile traffic
5. **Bilingual market**: Hindi-speaking founders and English-speaking procurement teams both target users

## Design Goals

1. Communicate **trust, purity, and technical authority** through visual design
2. Make **scientific data accessible** without overwhelming non-technical buyers
3. Create a **handholding experience** from first visit to sample request
4. Build **educational authority** through Academy content and GC/MS transparency
5. Future-proof with **dark/light mode, reduced motion, and i18n**

## Phase 1: Foundation (2026-05-07)

### Information Architecture

```
Homepage (index.html)
├── Hero with video background
├── Trust Pillars (3 cards)
├── Product Teaser (4 oils with real photography)
├── Why TS Aromatics (bento grid: chromatogram, batch, ticker, support)
├── Academy Knowledge Base (3 articles, modal + dedicated page)
├── Technical Documentation Library (glass cards with 3D tilt)
├── Social Proof Grid
├── Contact/Quote Form
│   └── Cart-based product interest (dynamic items list from localStorage)
├── Cart Float (fixed bottom-left, all pages)
│   └── Slide-out panel with items + remove + clear
├── WhatsApp Float (fixed bottom-right)
├── Technical Concierge (fixed bottom-right)
└── Footer with heat slider, globe, clocks, trust bar, scroll-track

Products (products.html)
├── Hero + Filters + Search
├── Product Grid (50+ oils)
│   └── Add to Enquiry button per card
├── Product Detail Modal
│   ├── Tech Specs (extraction, refractive index, etc.)
│   ├── Chemical Profile (progress bars)
│   ├── GC/MS download modal
│   ├── WhatsApp sample CTA
│   └── Enquiry button
├── Quote modal (quick-select + submit form)
├── Cart Float (fixed bottom-left)
├── Technical Concierge
└── Footer with heat slider

Product Detail (product-detail.html)
├── Image carousel
├── Product info + botanical name + purity badges
├── Chemical Profile with progress bars
├── Batch Transparency (select batch → compound breakdown)
├── COA download / Print COA
├── Tech Deep-Dive (2 Academy articles)
├── Sidebar CTAs (sample, quote, spec, GC/MS, Add to Enquiry)
├── Certifications grid
├── Cart Float (fixed bottom-left)
├── Technical Concierge
└── Footer with heat slider

Legal (privacy.html, terms.html, thank-you.html)
```

### Visual Identity
- **Primary CTA**: Deep Amber (`#BF6F00`) — desire and premium positioning
- **Secondary**: Earthy Green (`#2C5F2D`) — trust and nature
- **Brand Red** (`#F0421B` / `#A70D09`) — interactive accent, logo-derived
- **Typography**: Outfit (headings), Playfair Display (hero), Inter (body)
- **Glassmorphism**: Warm Sand at 10% opacity with 12px blur
- **Dark Mode**: Default for B2B professional feel; Light mode for accessibility

## Phase 1.5: Content & Footer Overhaul (2026-05-10)

### Product Teaser Upgrade

Replaced placeholder images with 4 real JPEGs (Coconut, Avocado, Almond, Jojoba) stored at `demo/v2/images/products/`. Each card has a B2B description covering origin, extraction, key constituents, and application — bilingual (EN + HI).

### Aromatics Academy Expansion

**Problem**: Single article card on homepage with no way to read full content.

**Solution**: 3 full-length B2B articles (~800 words each) stored in `products-data.js` under `window.academyArticleContent`. Shared data architecture:

```
academyArticleContent = {
  a1: { title, subtitle, author, date, readTime, sections: [{heading, body}...], keyTakeaways: [...] },
  a2: { ... },
  a3: { ... }
}
```

**Two access paths**:
1. **Modal overlay** on index.html — CSS-animated (backdrop blur, spring scale-in), dismiss on backdrop click / Escape / X button
2. **Dedicated page** `academy-article.html?id=a1` — responsive layout with hero, section dividers, related articles, theme toggle

**Article data shared** via `window.academyArticleContent` loaded by both pages from `products-data.js`. No duplication.

### Footer Overhaul

Replaced basic footer with a world-class 4-column mega-grid benchmark:

```  
┌──────────────────────────────────────────────────────────────┐
│                    HEAT SLIDER (full-width)                   │
├────────────┬──────────┬──────────────┬───────────────────────┤
│  Company   │ Products │  Academy     │  Trust Bar            │
│  - About   │ - Oils   │  - Articles  │  - ISO 9001 (green)   │
│  - Why Us  │ - Blends │  - Glossary  │  - GMP (green)        │
│  - Sourcing│         │              │  - IFRA 2026 (green)   │
│            │          │              │  - Organic (green)     │
├────────────┴──────────┴──────────────┴───────────────────────┤
│  GLOBE + CLOCKS     │  NEWSLETTER   │  CURRENCY  │  SOCIAL   │
│  [SVG rotating]     │  [input +     │  [switcher]│  [icons]  │
│  IST 10:30 PM       │   submit]     │            │           │
│  EDT 1:00 PM        │              │            │           │
│  CET 7:00 PM        │              │            │           │
├──────────────────────────────────────────────────────────────┤
│  KINETIC SCROLL-TRACK (tied to page scroll %, full-width)    │
├──────────────────────────────────────────────────────────────┤
│  Copyright + i18n toggle + compliance badges                 │
└──────────────────────────────────────────────────────────────┘
```

**Features**:
- **SVG Globe** — Rotating continents, atmospheric glow, node dots
- **World Clocks** — IST (India), EDT (US), CET (Europe) with 12h/24h format
- **Interactive Trust Bar** — 4 certification pills with green dot indicators, hover highlight
- **Kinetic Scroll-Track** — `.gf-scroll-track` with `--scroll-pct` driven by window scroll, gradient fill
- **Newsletter Form** — Email input + arrow submit. Console log on submit
- **Currency Switcher** — 6-currency selector (USD, EUR, GBP, INR, AED, SGD)
- **Social Links** — LinkedIn, Instagram, YouTube Material Symbol icons

**i18n**: 20+ keys for footer content (EN + HI), persisted to localStorage.

### Footer Heat Slider — "Pan Temperature"

**Concept**: The footer is the "pan bottom" — a heat source. The Canvas bubble animation (`fluid-sim.js`) represents distillation vapor. A slider controls heat = bubble production rate.

**Physics changes to `lib/webgl/fluid-sim.js`:**
- Added `heat: 40` property (0–100 range)
- Added `setHeat(value)` — clamps, updates heat level
- **Speed multiplier**: `heatMul = 0.2 + (heat/100) * 2.8` → bubble rise speed ranges from 0.2× (cold) to 3× (max)
- **Dynamic count**: target = `5 + (heat/100) * 55` → 5 bubbles at min, 60 at max. Added/removed 1 per frame when deviating ≥2 from target

**Slider UI** (`.gf-heat-band`): First child of `.gf-inner`, spanning full width above the 4-column grid. Rounded card with:
- 6px gradient track driven by `--fill-pct` CSS var
- 22px amber thumb with glow shadow
- COLD / HOT endcaps in monospace
- Heat-responsive background: `rgba(50,80,120,0.08)` at 0% → `rgba(240,66,27,0.08)` at 100%
- `--fill-color`, `--hot-color`, `--heat-border`, `--thumb-glow` interpolate amber → brand-red `#F0421B`

**Cross-page**: Slider HTML on all 3 footer instances (index, product-detail, academy-article). Functional only on index (FluidSim), visual-only elsewhere.

## Phase 2: Technical Premium UX (2026-05-09)

### User Research Insights (Inferred from Procurement Behaviour)

1. **B2B buyers need data, not just images** — they evaluate multiple suppliers before requesting samples
2. **Batch traceability is a trust signal** — showing batch IDs and analysis dates says "we track quality"
3. **Documentation access reduces friction** — buyers who can preview COA/GC/MS data are more likely to enquire
4. **"Try before commit" reduces anxiety** — sample programs convert better when the cost is applicable to first order
5. **Technical users want fast access to specs** — refractive index, optical rotation, and constituent percentages are standard evaluation criteria
6. **Non-technical users need guidance** — educational content and concierge support bridge the knowledge gap

### Feature Rationale

| Feature | User Need | UX Solution |
|---------|-----------|-------------|
| Lab-Monospace Font | Technical users scanning spec data | `--font-mono: 'JetBrains Mono', ...` for all numerical values |
| Compliance Badge Footer | Trust verification at purchase decision | ISO 9001, GMP, IFRA 2026 pills with green dot indicators |
| Sample Credit Banner | Reduce sample-request anxiety | "100% deductible from first bulk order" with science icon |
| Data-Overlay | Visual differentiation from competitors | 20% opacity molecular SVG over product images |
| Transparency Toggle | Power users who want GC/MS at-a-glance | Card flip showing batch ID, compounds, freshness timer |
| Technical Concierge | Multi-path support without leaving page | Floating widget → WhatsApp / GC/MS modal |

### Why Us Bento Grid — Industrial Precision

**Structure**: Asymmetric bento grid replacing the old split-layout (lab SVG + text + ticker).

```
┌──────────────────────┬────────────────┬────────────────┐
│   HEADER (kicker + title + subtitle)     full width     │
├──────────────────────┼────────────────┼────────────────┤
│   CHROMATOGRAM ●     │ BATCH          │ LIVE LEAD TIME │
│   [Canvas GC/MS      │ TRANSPARENCY ● │ ROTTERDAM 14d  │
│    animated peaks]   │ REF_ID, PURITY │ ETA Jun 2–8    │
│                      │ 1,8-CINEOLE    │ [cycles 4s]    │
│                      │ [live counter] │                │
├──────────────────────┼────────────────┼────────────────┤
│   LIVE BATCH SPECS   │ TECHNICAL CONCIERGE              │
│   [LabTicker typing] │ [circular video loop]            │
└──────────────────────┴────────────────┴────────────────┘
```

**Features**:
- **Chromatogram** (`components/why-chromatogram.js`): 2D Canvas with 6 Gaussian peaks, baseline sine noise, subtle glow animation, peak labels. 60fps, `devicePixelRatio`-aware.
- **Laser Quality Scanner**: 2px gradient line (`--primary` → `--brand-red`) positioned at scroll-bottom edge. Activates cells below it (`.scanned` class → opacity 0.7→1.0, border brightens). `IntersectionObserver` + `requestAnimationFrame`-throttled scroll listener.
- **Blueprint background**: `repeating-linear-gradient` graph-paper grid (40px spacing). Mouse parallax via `--mouse-x/y` CSS shift.
- **Micro-borders + corner brackets**: Every cell gets `border-radius: 1.5rem`, glass background. Corner brackets via `::before` pseudo-element with 4 stop-gradient lines.
- **Lead Time ticker**: Cycles through 5 ports (Rotterdam, NY, Singapore, Dubai, Sydney) every 4s with day count + ETA.
- **Batch Transparency**: Static data card with REF_ID, purity, compound percentages. Live-updating "GC/MS Verified · X mins ago" counter.
- **Human Support video**: 130px circular video from Mixkit (royalty-free lab scientist), autoplay muted loop, hover zoom + overlay.
- **Responsive**: Single-column stack on ≤768px.

### Doc-Library 3D Glassmorphism

**Upgrades to `.doc-card`:**
- `backdrop-filter: blur(12px)` for glass depth
- Hover: `translateY(-4px) scale(1.01)`, deep shadow glow, border brightens to amber
- **3D tilt**: JS mouse-tracking sets `--rx`/`--ry` CSS vars → `rotateX`/`rotateY` up to ±6°, `perspective(1200px)`
- **Technical Pulse badge**: `.doc-pulse` with green `live-dot` + "LIVE VERIFIED: May 10, 2026" monospace, added to all 7 doc-cards
- Grid min-width bump: 230px → 260px for wider cards

**Tilt behavior**: Only one card tilts at a time. Resets on mouseleave. Zero dependency — pure CSS + vanilla JS.

### Molecular Overlay Design

The `molecular-overlay.svg` was designed to evoke:
- **Scientific rigor** — abstract molecular network with nodes and connecting lines
- **Natural chemistry** — organic, non-symmetrical layout with varied node sizes
- **Subtle presence** — 20% max opacity so it never competes with product photography
- **Brand alignment** — strokes use `#2F4F4F` (Dark Slate Gray, the `--tech-text` colour)

### Transparency Toggle Interaction Flow

```
User clicks toggle → toggle.active
  ├── product-card.card-flip (front→back)
  │   ├── Carousel slides hidden (.card-front)
  │   ├── Badge hidden (.card-front)
  │   ├── Product info hidden (.card-front)
  │   └── GC/MS mini-summary shown (.card-back)
  │       ├── Batch ID (monospace)
  │       ├── Purity score badge
  │       ├── Top 3 compounds + percentages
  │       └── Batch freshness (pulsing green dot + days label)
  └── data-overlay.visible
      └── Molecular pattern at 20% opacity
```

### Batch Freshness Algorithm

```
days = (now - analysis_date) / (1000 * 60 * 60 * 24)
if days <= 30  → "X days (Current)"
if days <= 90  → "X days (Recent)"  
if days > 90   → "X days (Archive)"
```

### Concierge Widget Design

**Position**: Fixed bottom-right, `5.5rem` from bottom (above WhatsApp float at 1.5rem)  
**Icon**: `support_agent` Material Symbol  
**Panel animation**: `scale(0.9→1) + translateY(10px→0)` with spring easing, 300ms  
**Path mapping**:
- Sourcing → WhatsApp with product name pre-filled
- Documentation → Opens existing GC/MS form modal
- Sample → WhatsApp with product context

### i18n Implementation

- All 7 pages have EN + HI translation objects
- Language toggle persists via `localStorage` (`tsa-demo-lang`)
- `data-i18n` attributes on all translatable elements
- `applyLanguage()` swaps `innerHTML` on all `[data-i18n]` elements
- Concierge widget, compliance bar, and sample credit all have `data-i18n` support

### Contact Form Architecture

| Form | Location | Fields | Action |
|------|----------|--------|--------|
| `#leadForm` | `index.html` | name, email, **cart items**, quantity, message | Console log + Cart.clear() → redirect to thank-you.html |
| `#quoteForm` | `products.html` | company, email, volume, message | Console log + alert (quote modal) |
| `#gcmsForm` | Both product pages | gcmsName, gcmsEmail, gcmsCompany | Console log + alert (secure link placeholder) |

## Phase 3: Cart / Multi-Product Enquiry System (2026-05-10)

### Solution: Persistent Cart System

A shared `window.Cart` module in `cart.js` with localStorage persistence, decoupled from any single page.

```
localStorage('tsa-cart')
        │
        ▼
   cart.js ◄─── cart-updated event ───► page components
        │                                    │
        ├── Cart float (badge count)          ├── Enquiry buttons (add/remove toggle)
        ├── Cart panel (item list + remove)   ├── Enquiry form (item list + remove)
        └── Submits Cart.items() in payload   └── All stay in sync
```

**Key Design Decisions**:

| Decision | Rationale |
|----------|-----------|
| localStorage over sessionStorage | Cart persists across browsing sessions |
| `cart-updated` CustomEvent | Decouples state from UI |
| Float button, bottom-left | Avoids clash with WhatsApp (bottom-right) |
| Red "in-cart" state | Clear visual distinction — `--brand-red` signals "selected" |

## Molecular Explorer — Phase 0 ("Steroids")

Five baseline fixes (2026-05-10) before visual upgrades.

| # | Change | UX Impact |
|---|--------|-----------|
| 0.1 | Fixed `rgba(hex)` bug — `hexToRgb()` helper + `--mol-color-rgb` | Pill active state now shows colored background tint |
| 0.2 | Node pulse animation on hover | Constellation nodes feel alive |
| 0.3 | Bidirectional highlight (pill ↔ node) | Filter pills and nodes visually connected |
| 0.4 | Hover tooltip (floating glass card) | Surfaces molecule `desc`/`therapeutic` data |
| 0.5 | Hindi i18n for explorer | Completes coverage |

## Molecular Explorer — Phase 1 ("Constellation")

| # | Feature | UX Impact |
|---|---------|-----------|
| 1.5 | Click node filters grid | Single-click constellation node → product filter |
| 1.2 | SVG connection lines | Reveals hidden chemical network |
| 1.4 | Molecule detail panel | Slide-out card with data + linked products |
| 1.3 | Molecule search bar | Filters nodes/pills/edges by name |
| 1.1 | Force-directed layout | Organic node positions via spring simulation |

## Molecular Explorer — Phase 3 ("Synesthesia")

| # | Feature | UX Impact |
|---|---------|-----------|
| 3.2 | GC/MS Spectrum in detail panel | Real batch data per molecule |
| 3.4 | Export Profile (PNG) | Shareable molecule card, pure Canvas 2D |
| 3.1 | Sonification | Sine wave per molecule, respects reduced-motion |
| 3.3 | Molecule Comparison (up to 3) | Side-by-side evaluation for formulators |

## Accessibility

- Dark/light mode with `prefers-color-scheme`
- Tiered reduced motion: preserves fade, disables spring/scale
- ARIA labels on all interactive elements
- Focus trap in product detail modal
- Skip carousel autoplay on hover
- Semantic HTML: `main`, `nav`, `section`, `article`, `footer`

## Mobile Responsiveness

| Breakpoint | Behaviour |
|------------|-----------|
| 980px | Stack nav, 2-column grid, single-column detail |
| 768px | Why Us bento → single-column, section titles scale down |
| 620px | 1-column grid, full-width filters |
| 480px | Smaller body text, reduced padding |

## Performance

- Google Fonts with `display=swap`
- Video backgrounds with gradient fallback
- Product images `loading="lazy"`
- Single `products-data.js` for all data
- Zero external dependencies beyond Google Fonts + Material Icons

## Architecture Decisions (2026-05-10)

| Decision | Rationale |
|----------|-----------|
| Vanilla JS over GSAP | Zero external dependencies; IntersectionObserver + CSS transitions |
| 2D Canvas over WebGL for chromatogram | Lighter, sufficient for sine-wave visualization |
| Generic sine-wave peaks over real GC/MS data | Visual effect without mapping real batch data |
| Slider visual-only on non-homepage pages | FluidSim only runs on index.html |
| Mixkit video for lab technician | Free license, direct MP4 URL |
| Laser drives `.scanned` class activation | Clean progressive enhancement, no JS animation timeline |
| 3D tilt on doc-cards, not why-cells | Keeps precision-industrial cells flat/professional |

## Architecture Decisions (2026-05-10)

| Decision | Rationale |
|----------|-----------|
| Vanilla JS over GSAP | Zero external dependencies; IntersectionObserver + CSS transitions |
| 2D Canvas over WebGL for chromatogram | Lighter, sufficient for sine-wave visualization |
| Generic sine-wave peaks over real GC/MS data | Visual effect without mapping real batch data |
| Slider visual-only on non-homepage pages | FluidSim only runs on index.html |
| Mixkit video for lab technician | Free license, direct MP4 URL |
| Laser drives `.scanned` class activation | Clean progressive enhancement, no JS animation timeline |
| 3D tilt on doc-cards, not why-cells | Keeps precision-industrial cells flat/professional |

## Phase 4: Simulation Layer (2026-05-10 Follow-up)

### Live Lead Time Globe

**Problem**: The lead time cell was a text-only ticker with no visual sense of global reach. Procurement buyers evaluating logistics needed to *feel* the network, not just read port names.

**Solution**: Canvas 2D rotating 3D globe with simplified continent outlines, port markers, and animated route arcs.

**Rendering pipeline**:
```
[lon,lat] continent data → lonLatTo3D() → rotateY(angle) → perspective projection → 2D screen
```

- 8 simplified continent polygons (~12–40 vertices each)
- 5 port markers + India origin dot
- Active port: 22px radial gradient glow + 5px amber dot
- Route arc: dashed quadratic bezier from India to active port
- Continuous rotation at 0.006 rad/frame, accelerates to 0.025 on port change
- `z>2` visibility threshold + 0.6 rad initial rotation for optimal Europe/Asia view

**Why Canvas 2D over SVG/Three.js**:
- True 3D perspective projection requires vertex math — Canvas gives pixel control
- No SVG path data dependency for continents
- Lighter than Three.js for a 140px viewport
- Matches "technical control room" aesthetic

### Boiling Point Shift

**Problem**: The heat slider affected only the slider card itself. The footer environment didn't respond to the heat metaphor — it stayed static regardless of temperature.

**Solution**: Three distinct heat states transform the entire footer environment:

| Heat | Footer | Watermark | System Status |
|------|--------|-----------|---------------|
| 0% | `#05080f` deep navy | No glow | Normal green pulse |
| 50% | `#080706` warm | 30px amber glow | Normal |
| 80% | Warm shift | 48px glow | **Vibration** + amber dot |
| >90% | `#120a06` intense | 60px glow + **SVG heat haze** | Vibration + amber glow |

**Heat haze technique**: SVG `feTurbulence` (fractalNoise, baseFrequency 0.02 0.06) + `feDisplacementMap` (scale 3) — subtle shimmer without obscuring readability. The same displacement technique used across Awwwards winners for "extreme heat" effects.

### Haptic Audio — Glassy Pop

**Problem**: The bubble physics engine was visual-only. Popping bubbles had no tactile/sonic feedback, missing a premium sensory layer.

**Solution**: Lazily-initialised Web Audio API sine oscillator (800–1200Hz, 50ms, gain 0.06) triggered on bubble hover-pop.

**Implementation pattern**:
- `AudioContext` created on first user gesture (never on page load — respects browser policy)
- `FluidSim.popBubble` monkey-patched with hover-distance check (only fires on intentional pops, not surface threshold pops)
- State persisted via `localStorage('tsa-heat-sound')`
- Speaker toggle icon reuses Material Symbols pattern from Molecular Explorer sonification

**Why this works**:
- 50ms glassy "tink" at low volume (−40dB) is tactile, not musical — felt more than heard
- Only plays on user-initiated pops (hover), not automated surface pops — prevents noise fatigue
- Lazy AudioContext ensures no resource waste on non-interactive sessions

### LIVE PURITY FEED — Scroll

**Problem**: The feed grew unbounded as entries accumulated (up to 12 rows), pushing hero layout down over time.

**Solution**: `max-height: 200px` + `overflow-y: auto` on `.purity-feed-ticker`, with auto-scroll to top on each 10s tick.

**Design**: Thin custom scrollbar (4px, `rgba(255,255,255,.08)` thumb) matches dark theme. No data changes — 12-entry cap and render format preserved.

## Future Enhancements

### Phase 2.5 — Technical Premium Polish (Applied 2026-05-09)

| Fix | Rationale |
|-----|-----------|
| Modal entry animation (spring scale+opacity) | Smooth HUD-style projection |
| Card stagger on load only | Search/filter no longer re-stagger |
| `will-change: transform` on animated elements | Compositor-hinted 60fps mobile |
| `:active` press states on all interactive | Tactile feedback |
| Tiered `prefers-reduced-motion` | Fade preserved, spring/scale disabled |
| Split easing curves | Spring for transforms, ease for opacity/bg |
| Softer haptic (800Hz→400Hz) | Less aggressive, more premium |
| Concierge panel → opacity/pointer-events | Smooth open/close |

### Phase 4 — "Alchemist's Console" (Awwwards Benchmark Vision)

**Tier 1** (Next sprint, no WebGL):
1. GSAP Flip transitions — morph chips → molecular backdrop
2. Scan-line shader on GC/MS specs — pure CSS overlay
3. Terminal auth on GC/MS download — setTimeout chain
4. Extraction preloader — SVG botanical → oil drop → ripples

**Tier 2** (2-3 sprints):
1. Physics-based Venn filter (Three.js/PixiJS)
2. Product galaxy view — toggle between grid and 3D nodes

**Tier 3** (3-6 months):
1. Three.js infinite scroll with botanical particles
2. Orbital navigation menu
3. Holographic product view with scanner shader
4. Sonification engine (per-molecule harmonic frequencies)

**UX Innovation Map**:

| Element | Old Model | Simulation Model |
|---------|-----------|-----------------|
| Scrolling | Vertical text | Deep Dive camera into 3D particles |
| Navigation | Sticky text menu | Orbital Interface |
| Product List | Card grid | Force-Directed Galaxy |
| Details | Modal overlay | Projected HUD |
| Form | Standard inputs | Command Line Prompt |
| Preloader | Spinning loader | Extraction sequence |

### Cart Roadmap

1. Quantity per item
2. Cart summary badge on product cards
3. 7-day cart expiry
4. Shareable enquiry list
5. Bulk "add all filtered" action
6. Per-item notes
7. Wishlist vs. Enquiry separation
8. Unify with quote modal

## Next Steps (Immediate)

1. Verify heat slider + bubble physics + boiling point shift across Chromium, Firefox, Safari
2. Verify haptic audio context creation on first gesture (mobile Safari strict autoplay policy)
3. Verify globe continent rendering at 768px breakpoint (180px canvas)
4. Verify purity feed scrollbar appears correctly at 7+ entries
5. Confirm Mixkit video loads on production network (no CORS)
6. Swap generic Mixkit video with custom-branded lab concierge asset (future)

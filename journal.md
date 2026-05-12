---
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/images/logo-dark.svg">
    <img src="/images/logo.svg" alt="TS Aromatics" height="48">
  </picture>
</p>

<p align="center">
  <strong>TS Aromatics v3 — Technical Journal</strong>
  <br>
  <sub>Designed & engineered by <strong>Prabhakar Kumar</strong> at <strong>Chiti Technologies</strong></sub>
</p>

---

## Studio Statement

**Chiti Technologies** is a design and engineering studio that builds digital experiences at the intersection of sensorial craft and technical rigor. Every pixel, every animation curve, and every architecture decision in this project reflects a philosophy: technology should feel alive.

This journal documents not just what was built, but *why* and *how* — the design rationale, the trade-offs, the edge cases solved. It is intended as a portfolio artifact and a technical reference for anyone inheriting the work.

> **Designer:** Prabhakar Kumar  
> **Studio:** Chiti Technologies  
> **Client:** TS Aromatics  
> **Built:** May 2026  

---

## Project Identity

| Attribute | Detail |
|---|---|
| **Project** | TS Aromatics v3 — B2B Essential Oils Procurement Platform |
| **Design Language** | Dark-first, ambient, heat-reactive, amber-lit |
| **Core Experience** | Technical transparency meets sensory immersion |
| **Target User** | Manufacturers, wellness founders, formulators |
| **Locale Support** | English, Hindi |

---

## Build Status

| Check | Status |
|---|---|
| `npx next build` | ✅ Zero errors |
| Static pages (SSG) | 73 products + 8 articles |
| Dynamic routes | Home, products listing, academy listing, why-us, contact |
| TypeScript | Strict mode — `strict: true` |
| Bundle | Turbopack dev, production build via Next.js compiler |

---

## Quick Stack Reference

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (`@theme inline`) |
| 3D Viz | Three.js + React Three Fiber + Drei |
| 2D Canvas | Custom Canvas 2D (chromatogram, globe arcs, bubble sim) |
| Animation | Framer Motion 12 |
| i18n | next-intl v4 (EN/HI) |
| Validation | Zod v4 |
| Database | Prisma v7 (schema-only, static data active) |

---

## Table of Contents

- [Studio Statement](#studio-statement)
- [Project Identity](#project-identity)
- [Build Status](#build-status)
- [Quick Stack Reference](#quick-stack-reference)
1. [Project Charter](#1-project-charter)
2. [Tech Stack & Why](#2-tech-stack--why)
3. [Directory Structure](#3-directory-structure)
4. [Architecture Decisions](#4-architecture-decisions)
5. [Data Layer](#5-data-layer)
6. [Routes & Rendering](#6-routes--rendering)
7. [Component Catalogue](#7-component-catalogue)
   - 7.1 [Chromatogram.tsx](#71-chromatogramtsx)
   - 7.2 [GlobeGL.tsx](#72-globegltsx)
   - 7.3 [MolecularExplorer3D.tsx](#73-molecularexplorer3dtsx)
   - 7.4 [FluidSim.tsx](#74-fluidsimtsx)
   - 7.5 [ProductDetail.tsx](#75-productdetailtsx)
   - 7.6 [WhyTeaser / WhyBento](#76-whyteaser--whybento)
8. [Design System](#8-design-system)
9. [i18n System](#9-i18n-system)
10. [Context System](#10-context-system)
11. [Known Issues & Risks](#11-known-issues--risks)
12. [Onboarding Workflow](#12-onboarding-workflow)

---

## 1. Project Charter

**TS Aromatics v3** is a buyer-facing procurement platform for premium essential oils and botanical ingredients. It targets manufacturers, wellness founders, and formulators who need:

- **Technical transparency** — GC/MS documentation for every batch, Certificate of Analysis, spec sheets
- **Ingredient intelligence** — molecular explorer for compound-level comparison across products
- **B2B flexibility** — enquiry cart system, sample-to-bulk onboarding
- **Educational depth** — academy articles on terpenes, purity, formulation chemistry

The site is **purely client-side static data** — no backend calls. Prisma schema exists for future database integration.

---

## 2. Tech Stack & Why

### Core

| Technology | Version | Role | Why |
|---|---|---|---|
| **Next.js** | 16.2.6 | Framework | App Router, SSG for product/article pages, Turbopack dev |
| **TypeScript** | 5.x | Language | Strict mode throughout — `strict: true` in tsconfig |
| **React** | 19.2.4 | UI library | Latest stable with React Server Components |
| **Tailwind CSS** | 4.x | Styling | `@theme inline` CSS-first config, no tailwind.config.* file |

### Data & Validation

| Library | Version | Role |
|---|---|---|
| **Zod** | ^4.4.3 | Server-side form validation (contact form) |
| **Prisma** | 7.8.0 | Schema-only — client not yet generated; static data layer used instead |
| **gray-matter** | ^4.0.3 | MDX frontmatter parsing |
| **next-mdx-remote** | ^6.0.0 | MDX rendering (potential academy content pipeline) |

### Visualization

| Library | Version | Role |
|---|---|---|
| **Three.js** | 0.184.0 | 3D molecular explorer + globe.gl dependency |
| **@react-three/fiber** | 9.6.1 | React bindings for Three.js |
| **@react-three/drei** | 10.7.7 | R3F helpers (OrbitControls, etc.) |
| **globe.gl** | 2.45.3 | 3D globe visualization for lead times |
| **Framer Motion** | 12.38.0 | Page transitions, scroll animations, entrance effects |
| **lucide-react** | 1.14.0 | Icon library |
| **sonner** | 2.0.7 | Toast notifications |

### i18n

| Library | Version | Role |
|---|---|---|
| **next-intl** | 4.11.2 | Internationalization — EN/HI locales, cookie-based detection |

### Dev Tools

| Tool | Version | Role |
|---|---|---|
| **ESLint** | 9.x | Flat config (`eslint.config.mjs`) with `core-web-vitals` + TypeScript rules |
| **PostCSS** | — | With `@tailwindcss/postcss` plugin (v4-style) |
| **ts-node** | 10.9.2 | Running Prisma seed scripts |

---

## 3. Directory Structure

```
v3/
├── AGENTS.md              # AI agent reference (concise architecture overview)
├── CLAUDE.md              # Claude-specific pointer → AGENTS.md
├── journal.md             # THIS FILE — full technical documentation
├── messages/              # i18n JSON files
│   ├── en.json            # English (~200 keys)
│   └── hi.json            # Hindi (parallel structure)
├── prisma/                # Database schema (NOT yet active)
│   ├── schema.prisma      # 6 models: Product, Batch, GcmsAnalysis, Lead, etc.
│   └── seed.ts            # Static data → Prisma upsert
├── public/
│   ├── images/            # SVGs, product photos, hero video
│   │   ├── products/      # Per-product botanical SVGs + product.jpg
│   │   └── sections/      # Section background images (12 SVGs)
│   └── textures/earth/    # Globe textures (resized to 4096×2048)
│       ├── earth-albedo.jpg
│       ├── earth-bump.jpg
│       ├── earth-night-lights.png
│       ├── earth-land-ocean-mask.png
│       └── clouds-earth.png
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # Tailwind v4 @theme inline + glass utility + animations
│   │   ├── layout.tsx     # Root layout (fonts, ServiceWorkerCleanup)
│   │   ├── page.tsx       # redirect('/en')
│   │   ├── actions/
│   │   │   └── contact.ts # Zod-validated server action
│   │   └── [locale]/      # Dynamic locale segment
│   │       ├── layout.tsx # Providers, Header, Footer, Toaster, CartFloat, etc.
│   │       ├── page.tsx   # Homepage (Hero, TrustPillars, ..., FluidSimManager)
│   │       ├── academy/, contact/, products/, why-us/
│   ├── components/
│   │   ├── academy/       # ArticleCard, AcademyList, ArticleDetail
│   │   ├── contact/       # ContactForm (useActionState, Zod)
│   │   ├── effects/       # FluidSim, HeatProvider, TypewriterBatch, CartFloat, ChatBot, etc.
│   │   ├── home/          # 13+ components (Hero, Chromatogram, GlobeGL, WhyTeaser, etc.)
│   │   ├── layout/        # Header, Footer
│   │   ├── molecules/     # MolecularExplorer3D (R3F), MolDetailPanel, ChemicalSignature
│   │   └── products/      # ProductCard, ProductGrid, ProductDetail, GcmsViewer, etc.
│   ├── contexts/          # enquiry.tsx, sound.tsx
│   ├── data/              # Static data (products, gcms, academy, productMeta — all .ts files)
│   ├── i18n/request.ts    # next-intl config
│   ├── middleware.ts      # Locale routing (next-intl)
│   └── types/index.ts     # Shared TS interfaces
├── next.config.ts         # next-intl plugin, image formats
├── tsconfig.json          # Strict TS, @/ → src/* paths
├── postcss.config.mjs     # @tailwindcss/postcss plugin
└── eslint.config.mjs      # Flat config
```

---

## 4. Architecture Decisions

### 4.1 — Full Static Data Layer

**Decision:** All product, GC/MS, academy, and molecular data lives in `.ts` files under `src/data/`. No database queries at runtime.

**Why:** The catalog (~73 products, 47 GC/MS analyses, 8 articles) is small enough to bundle at build time. This gives:
- Zero database latency
- SSG for product/article detail pages (73 + 8 static paths)
- Instant page loads on CDN
- Simplified deployment (no DB setup needed)

**Trade-off:** Updating product data requires a code change + rebuild. A headless CMS or Prisma integration would be needed for dynamic updates.

**When to revisit:** If product catalog exceeds ~200 entries or requires frequent live updates.

### 4.2 — Prisma Schema-Only

**Decision:** `prisma/schema.prisma` defines the database schema, but the Prisma client is NOT generated. The current data layer uses in-memory static files.

**Why:** Schema was designed pro-actively for future backend migration. The static layer provides an identical interface (`getProductBySlug()`, `getGcmsData()`) so switching to Prisma means changing only the data functions, not the components.

**To activate Prisma:**
```bash
npx prisma generate
npx ts-node prisma/seed.ts
# Then swap data functions in src/data/ to use prisma client
```

### 4.3 — Canvas 2D for Visualizations (Not SVG, Not WebGL)

**Decision:** Chromatogram, GC/MS viewer, bubble simulation, and globe use `<canvas>` with 2D context (`CanvasRenderingContext2D`). No SVG or WebGL for these.

**Why:**
- Better performance for per-frame pixel updates (scan line animation, bubble physics, globe rotation)
- Full control over rendering (EMG peak shapes, custom dash patterns on globe arcs, heat-driven bubble parameters)
- No DOM diffing overhead per animation frame
- Smaller bundle than SVG for heavy animations

**Exceptions:**
- `MolecularExplorer3D.tsx` uses WebGL via React Three Fiber (needs 3D rendering for molecule constellation)
- `GlobeGL.tsx` uses `globe.gl` which wraps Three.js (needs 3D globe with orthographic rotation)

### 4.4 — next-intl for i18n

**Decision:** Locale detection via `cookie > accept-language > 'en'`. Middleware rewrites all paths (`/en/products`, `/hi/products`).

**Why:**
- Server-side locale detection (no client-side flash)
- Cookie persistence for user preference
- `useTranslations()` hook integrates naturally with React Server Components
- No route param drilling for locale in most components (useLocale() hook)

### 4.5 — Enquiry Cart as Context

**Decision:** Shopping-cart-style enquiry system via React Context (`EnquiryContext`). Product cards have "Add to Enquiry" buttons; a floating cart icon shows count; the contact form pre-fills from cart items.

**Why:**
- B2B buying is quote-based, not checkout-based. A traditional Stripe cart doesn't fit.
- Context keeps it simple — no state management library needed for a single-page cart.
- The contact form server action receives cart data as hidden fields, accessible via Prisma's Lead → LeadItem relation.

### 4.6 — Heat System for Ambient Effects

**Decision:** Scroll position maps to a "heat" value (20–100) via `HeatProvider`. This drives:
- `FluidSim` bubble animation intensity (count, speed, wobble)
- CSS `--watermark-glow` opacity
- CSS `--heat-haze` SVG feTurbulence filter

**Why:** Creates a unified ambient effect that responds to user attention — scrolling deeper = more intensity. Treats the entire page as a sensory system, not individual animations.

### 4.7 — Full-Bleed Canvas Sizing

**Decision:** Canvas elements fill their container via CSS (`w-full h-full` on canvas, parent uses `flex-1` in a `flex-col` card). JavaScript only sets the drawing buffer size (`canvas.width = cw * dpr`).

**Why:** Previously, JS was setting both CSS dimensions and drawing buffer via inline styles. This caused issues when sibling components (GlobeGL) loaded asynchronously and changed the grid row height, stranding the canvas at a stale CSS size of 400px. Pure CSS sizing fixes this — the canvas grows immediately as the container grows, and the drawing buffer catches up via ResizeObserver.

---

## 5. Data Layer

### 5.1 — Product Data (`src/data/products.ts`)

- **533 lines**, 73 products
- Interface: `Product` (17 fields including `name`, `imgKey`, `botanicalName`, `specs`, `gcmsBatchId`, `badgeRule`, `molecules[]`, `category`)
- Categories: Floral, Wellness, Mint, Industrial, Citrus, Spice, Woods, Carrier Oils, Butters, Extracts, Aloe
- Helpers: `getAllProducts()`, `getProductBySlug()`, `getCategories()`
- Badge rules: Compound threshold badges ("High-Cineole" when 1,8-Cineole > 70%, etc.)
- Image paths: Category SVGs + per-product botanical SVGs + product photos for top oils

### 5.2 — GC/MS Data (`src/data/gcms.ts`)

- **510 lines**, 47 batch analyses
- Interface: `GcmsEntry` (oil name, analysis date, purity score, 2–4 compounds)
- Each compound: name, percentage, status (Premium / Trace / Low)
- Helpers: `getGcmsData(batchId)`, `getAllGcmsData()`
- Product-GC/MS linkage: `products.ts:gcmsBatchIds` maps product slugs to batch IDs

### 5.3 — Academy Data (`src/data/academy.ts`)

- **116 lines**, 8 articles
- Interface: `AcademyArticle` (id, title, tag, desc, img, difficulty) + `ArticleContent` (heroImg, author, sections[])
- Topics: Supplier selection, purity 101, quality process, terpenes, carrier chemistry, phototoxicity, GC/MS reading, eucalyptus cineole

### 5.4 — Product Meta (`src/data/productMeta.ts`)

- **154 lines**
- Procurement info per category: MOQ, lead time, packaging options, payment terms, samples, shelf life, origin
- COA builder: Generates 14-parameter Certificate of Analysis tables (appearance through PAH content)
- Origin map: 64 product-to-country mappings
- Related products: Same-category or shared-molecule lookup

### 5.5 — Molecule Data (`src/data/academy.ts` export)

- Re-exported from `src/data/academy.ts` → 35 molecule profiles
- Used by `MolecularExplorer3D.tsx` for force-directed graph nodes
- Properties: name, tag, description, therapeutic uses, found-in product list, color, IFRA limits, edge weights

---

## 6. Routes & Rendering

| Path | Type | Page Component | Data Dependencies |
|---|---|---|---|
| `/` | Static (redirect) | `page.tsx` | None — `redirect('/en')` |
| `/[locale]` | Dynamic | `[locale]/page.tsx` | i18n messages |
| `/[locale]/products` | Dynamic | `products/page.tsx` | `getAllProducts()` (73 products) |
| `/[locale]/products/[slug]` | **SSG** (73 paths) | `products/[slug]/page.tsx` | `getProductBySlug()`, `getGcmsData()`, `getAllProducts()` |
| `/[locale]/academy` | Dynamic | `academy/page.tsx` | `getAllArticles()` (8 articles) |
| `/[locale]/academy/[id]` | **SSG** (8 paths) | `academy/[id]/page.tsx` | `getArticleById()`, `getArticleContent()` |
| `/[locale]/why-us` | Dynamic | `why-us/page.tsx` | i18n messages |
| `/[locale]/contact` | Dynamic | `contact/page.tsx` | i18n messages |

**SSG routes** use `generateStaticParams()` to pre-render all paths at build time. These are static HTML files served from the CDN.

**Dynamic routes** are server-rendered on demand. No ISR configured (all data is static, so revalidation isn't needed).

---

## 7. Component Catalogue

### 7.1 — Chromatogram.tsx

**File:** `src/components/home/Chromatogram.tsx` (352 lines)

A Canvas 2D simulated GC/MS chromatogram that runs in the bento card on the home page and why-us page.

**Features:**
- 8 synthetic peaks with real-world retention times (5.21–21.73 min)
- EMG (Exponentially Modified Gaussian) peak shapes via an analytical formula + numerical `erf()` approximation
- Animated scan: 600ms inject → 5s scan → 800ms hold → instant reset (loops indefinitely)
- Hover detection: maps mouse position to nearest peak; shows tooltip (name, RT, area%, height)
- Responsive: `ResizeObserver` + HiDPI (`devicePixelRatio`) support
- Styled as instrument readout: horizontal grid, vertical retention time grid, baseline, tick marks, method footer

**Canvas sizing architecture:**
- Container: `flex-1 min-h-[400px] w-full` — fills remaining flex space in parent card, minimum 400px
- Canvas: `w-full h-full` — CSS controls display size
- `resize()` function: reads `container.clientWidth/clientHeight`, sets `canvas.width/height * dpr` — only the drawing buffer
- ResizeObserver + initial `resize()` + rAF fallback

**Animation loop:**
```typescript
phase: 'inject' | 'scan' | 'hold' | 'reset'
inject → scan (progress 0→1 over 5000ms) → hold (800ms) → reset → inject...
```
Each frame checks `cx <= scanX` to progressively reveal peaks as the scan line sweeps right.

**Hover interaction:**
- `mousemove` event → `getPeakAtMouse()` checks horizontal distance from each peak center (within `width * 5` factor)
- Tooltip drawn directly on canvas (not a DOM overlay) — positioned to avoid edges
- Peak hover highlight: brighter stroke (alpha 0.85), wider line (2px), intensified fill gradient

**Layout constants (proportional to canvas height):**
```
HDR = 0.055    // Header: "GC/MS Analysis" + batch ref + purity badge
G_TOP = 0.075  // Graph area top
G_BOT = 0.86   // Graph baseline — 86% of canvas, leaving 14% for axis + method
```

**Key technical details:**
- Fluid font scaling: `FONT(h, base) = max(base, round(h * base / 400))px` — text size proportional to canvas height
- Peak rendering: EMG function sampled at 1px intervals, cumulative gradient fill from peak shape to baseline
- Purity badge: rounded rect with green tint at top-right
- Grid: 5 horizontal gridlines, vertical lines every 2.5 min
- Method line: column type, injection info, date, compound count at the bottom
- No inline annotations (removed in favor of hover-only identification — cleaner graph)

### 7.2 — GlobeGL.tsx

**File:** `src/components/home/GlobeGL.tsx` (179 lines)

3D globe visualization using the `globe.gl` library for lead times / sourcing map.

**Critical initialization:**
```typescript
const globe = new Globe(element, {
  width: w,
  height: h,
  // ...
});
```
The `new` keyword is REQUIRED — `globe.gl`'s TypeScript declaration has only a `new` signature (it's a kapsule). Calling it without `new` doesn't initialize the Three.js scene.

**Textures:**
- Earth albedo (diffuse map): `/textures/earth/earth-albedo.jpg` (4096×2048 — resized from original 8192×4096 to prevent WebGL context loss)
- Bump map: `/textures/earth/earth-bump.jpg` (4096×2048 — resized from original 21600×10800)
- Night lights, land-ocean mask, clouds also loaded

**Texture loading:**
```typescript
function imgUrl(path: string): string {
  return new URL(path, window.location.origin).href;
}
```
Absolute URLs are required for Three.js texture loading — relative paths don't resolve correctly in all environments.

**Arc animation:**
- 5 ports (Rotterdam, NY, Singapore, Dubai, Sydney) radiating from India (lat 22, lon 78)
- Active port arcs: `['#ffb873', 'rgba(255,184,115,0.1)']` — solid orange to transparent
- Inactive: `['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.02)']` — subtle white
- `arcAltitude: 0.4`, `arcStroke: 1.5`
- `arcDashLength` + `arcDashGap` + `arcDashAnimateTime: 5000` for flowing dash animation on active arcs

**Points:**
- Origin point: `#ff6464` (red)
- Active port: `#ffb873` (orange glow)
- Inactive ports: `#555` (dim gray)
- Point radius: 0.8

**Sizing:**
- Container: `w-[160px] h-[160px] md:w-[200px] md:h-[200px]`
- Globe fills the container via `globe.width(w)` and `globe.height(h)` in ResizeObserver callback

**Camera:**
- `globe.pointOfView({ lat: 22, lng: 78, altitude: 2.0 })` — centered on India
- Auto-rotate: `globe.controls().autoRotate = true; globe.controls().autoRotateSpeed = 0.5;`
- `globe.controls().minPolarAngle = Math.PI / 3.5; globe.controls().maxPolarAngle = Math.PI / 2.5;`

**Cleanup:**
```typescript
return () => {
  globe._destructor();
  ro.disconnect();
};
```

### 7.3 — MolecularExplorer3D.tsx

**File:** `src/components/molecules/MolecularExplorer3D.tsx` (502 lines)

React Three Fiber force-directed molecular constellation graph.

**Data:** 35 molecule nodes from `MoleculeData.ts`, but only 15 displayed at a time (filtered by `visibleMols` property).

**Force layout:** Self-contained implementation (not using d3-force):
- 60 iterations per layout run
- Coulomb repulsion: `F = k_rep / d²`
- Spring attraction on weighted edges: `F = k_spring * (d - restLength)`
- Gravity pull to center: `F = k_gravity * d`
- Cooling factor: reduces forces every 10 iterations
- Result: 3D positions stored in `nodePositions` ref

**Components inside the R3F canvas:**
- `<MoleculeSphere>` — individual molecular node with:
  - `Float` from Drei for floating animation (sin wave + time offset)
  - Hover: scale lerp (1→1.4), emissive intensity increase, glow ring (ring geometry with alpha fade)
  - Click: sets selected, color pulse
  - IFRA restricted molecules get a red torus ring
  - Web Audio API sonifier: plays sine tone (frequency based on molecule index) on hover enter/exit
- `<WeightedEdgeLines>` — `THREE.LineSegments` with BufferGeometry
  - Per-vertex alpha based on edge weight
  - Brighter when adjacent node is hovered/active
  - Dashed pattern for weaker connections
- `<OrbitControls>` — auto-rotate when idle, zoom enabled, pan disabled

**Props (all optional):**
- `selectedMol`, `hoveredMol`, `moleculeCounts`, `weightedEdges`, `molTags`, `showIFRA`, `sonifierEnabled`
- Manages its own state when props are not provided (controlled/ uncontrolled pattern)

### 7.4 — FluidSim.tsx

**File:** `src/components/effects/FluidSim.tsx` (300 lines)

Canvas 2D heat-driven bubble simulation.

**Bubble lifecycle:**
1. Spawn at bottom of canvas with random x, size (6–30px), speed, wobble
2. Float upward with sinusoidal wobble and alpha oscillation (sparkle)
3. On click: pop animation — 8 burst particles, flash, bubble removed
4. Off-screen or alpha → 0: recycled

**Heat integration (prop: `heat`, 20–100):**
- Higher heat → more bubbles (count: 10→40), faster rise (speed × 1.5), faster wobble
- Heat also affects alpha baseline (0.3→0.5) and sparkle frequency

**Palette:** 9 warm tones (`#5C3317` brown → `#D4AF37` gold → `#FFF8DC` cream)

**Performance:** Uses `requestAnimationFrame`, caches canvas size, recycles bubble objects. At 40 bubbles + burst particles, remains at 60fps.

### 7.5 — ProductDetail.tsx

**File:** `src/components/products/ProductDetail.tsx` (238 lines)

Full product detail page with specs, GC/MS visualization, batch card, procurement, COA preview, and related products.

**Layout:** 5-column CSS grid (`lg:grid-cols-5 gap-10`):
- Left (2 cols): Product image + GC/MS viewer
- Right (3 cols): Specs table, benefits, uses, batch card, procurement, COA, enquiry toggle

**GC/MS integration:**
```typescript
const showGcms = gcms && gcms.compounds.length > 0;
```
Renders `GcmsViewer` component with the product's GC/MS analysis data. Falls back silently if no GC/MS batch linked.

**Enquiry cart:**
```tsx
const { addItem, removeItem, isInCart } = useEnquiry();
const inCart = isInCart(product.id);
```
Button toggles between "Add to Enquiry" and "Added ✓" states.

**Related products:** `ProductRelatedGrid` — up to 4 products from same category or with shared molecules.

### 7.6 — WhyTeaser / WhyBento

**Files:** `src/components/home/WhyTeaser.tsx` (253 lines), `WhyBento.tsx` (455 lines)

Identical bento grid layout, except:
- `WhyTeaser`: Used on home page with scroll-triggered entrance + "Full Technical Profile" CTA link
- `WhyBento`: Standalone on `/why-us` page

**Grid:** `grid-cols-[1.4fr_1fr_1fr] gap-4 max-md:grid-cols-1`

| Cell | Content | Notes |
|---|---|---|
| Column 1, rows 1–2 | **Chromatogram** | `row-span-2`, `flex flex-col` with label strip at top |
| Column 2, row 1 | **Batch Transparency** | Static data (ref, purity, top 3 compounds) |
| Column 3, row 1 | **Lead Time** | GlobeGL + port rotation + ETA |
| Column 2, row 2 | **Batch Specs** | TypewriterBatch (cycling through 5 datasets) |
| Column 3, row 2 | **Technical Concierge** | Circular video thumbnail with hover overlay |

**Chromatogram card sizing:**
The chromatogram's parent card uses `flex flex-col` so the label strip takes its natural height and the `Chromatogram` component fills remaining space via `flex-1 min-h-[400px]`. The grid's `row-span-2` determines the total card height based on the tallest cells in both rows. If GlobeGL loads asynchronously, the grid row expands, the card grows, and the chromatogram canvas fills the new space (CSS handles display, ResizeObserver handles drawing buffer).

---

## 8. Design System

### 8.1 — Theme Tokens

Tailwind v4 `@theme inline` in `src/app/globals.css`:

```css
@theme inline {
  --font-heading: 'Outfit', sans-serif;
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --color-primary: #BF6F00;
  --color-primary-light: #ffb873;
  --color-secondary: #2C5F2D;
  --color-accent-green: #4caf50;
  --color-gold: #D4AF37;

  --color-bg-base: #0a0806;
  --color-glass: rgba(245, 239, 232, 0.06);
  --color-text-main: #e8d5c4;
  --color-border: rgba(245, 239, 232, 0.08);
  --color-muted: rgba(245, 239, 232, 0.5);

  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
```

### 8.2 — Dark/Light Theme

Toggle via `data-theme` attribute on `<html>` (set by Header theme toggle, persisted in localStorage):

| Token | Dark | Light |
|---|---|---|
| `--color-bg-base` | `#0a0806` | `#F9F7F1` |
| `--color-glass` | `rgba(245,239,232,0.06)` | `rgba(255,255,255,0.62)` |
| `--color-surface-1` | `#1a1410` | `#ffffff` |
| `--color-border` | `rgba(245,239,232,0.08)` | `rgba(84,68,54,0.28)` |
| `--color-text-main` | `#e8d5c4` | `#19120b` |

### 8.3 — Glass Utility

```css
.glass {
  background: var(--color-glass);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
}
```

### 8.4 — Typography Scale

| Name | Size |
|---|---|
| `text-3xs` | 0.625rem (10px) |
| `text-2xs` | 0.6875rem (11px) |
| `text-xs` | 0.75rem (12px) |
| `text-sm` | 0.875rem (14px) |
| `text-base` | 1rem (16px) |
| ... | ... |
| `text-3xl` | 2rem (32px) |

---

## 9. i18n System

**Implementation:** `next-intl` v4

**Locale detection chain:**
1. Cookie `NEXT_LOCALE` (set when user toggles locale in Header)
2. `Accept-Language` HTTP header
3. Fallback: `'en'`

**Middleware** (`src/middleware.ts`):
```typescript
import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
  locales: ['en', 'hi'],
  defaultLocale: 'en',
});
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```
Note: `textures` path is NOT in the exclusion list here — it was added during development to prevent `next-intl` from redirecting `/textures/earth/...` to `/en/textures/earth/...`. Check current middleware for this override.

**Usage in components:**
```typescript
import { useTranslations } from 'next-intl';
const t = useTranslations('hero');
// t('title') → reads messages.en.json → hero.title
```

**Translation files:**
- `messages/en.json` — ~200 keys across 15 namespaces
- `messages/hi.json` — parallel structure, ~175 keys

---

## 10. Context System

### EnquiryContext (`src/contexts/enquiry.tsx`)
- Type: Shopping-cart-style enquiry system
- State: `items[]` (product IDs + metadata)
- Methods: `addItem`, `removeItem`, `clearAll`, `isInCart`, `count`
- Integration: Product cards show "Add to Enquiry" / "Added ✓"; CartFloat displays count; ContactForm receives cart items as hidden fields
- No persistence (cleared on refresh)

### SoundContext (`src/contexts/sound.tsx`)
- Type: AudioContext-based sound effects
- State: `soundOn` boolean, persisted to localStorage
- Methods: `playPop()` — triggers bubble pop sound via oscillator + gain envelope
- Integration: FluidSim bubbles play sound on pop

### HeatContext (`src/components/effects/HeatProvider.tsx`)
- Type: Scroll-driven heat value
- State: `heat` (20–100), derived from scroll position
- Side effects: Sets CSS custom properties `--watermark-glow`, `--watermark-opacity`, `--heat-haze` on `<html>`
- Integration: FluidSimManager reads heat → passes to FluidSim; Footer heat slider overrides scroll value

---

## 11. Known Issues & Risks

### Active Issues

| Issue | Status | Description |
|---|---|---|
| **`turbopack.root` warning** | Non-blocking | Multiple lockfiles detected (root + v3/). Cosmetic — set prop in next.config.ts to silence. |
| **`middleware` deprecated** | Non-blocking | Rename to `proxy.ts` in future Next.js update. Current middleware still works. |
| **`images.unsplash.com` DNS errors** | Academy teaser | Some article images reference unsplash URLs that may fail in restricted network environments. Fallback images should be added. |
| **Prisma client not generated** | Expected | `prisma generate` hasn't been run. All data uses static files. |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| GlobeGL WebGL context loss | Low (textures resized) | Globe goes blank | Textures downsized to 4096×2048 (was 8192×4096, 21600×10800) |
| Canvas sizing race on mount | Medium | Chromium canvas at 400px instead of full height | CSS-based canvas sizing (`w-full h-full`, `flex-1`) — ResizeObserver catches async expansion |
| i18n key mismatch | Low | Missing translations for new components | Run `lint` or script to check key coverage across EN/HI |
| Heat slider + scroll conflict | Low | Value jumps between scroll and slider | Slider sets `overriding` flag to disable scroll updates while dragging |

---

## 12. Onboarding Workflow

### Day 1 — Setup

```bash
cd C:\Users\User\Documents\Projects\TSA\demo\v3
npm install                # Install dependencies
npm run dev                # Start Turbopack dev server at localhost:3000
npx next build             # Verify zero-error production build
```

### Day 1–2 — Read & Explore

1. Read this `journal.md` (you're doing it now)
2. Read `AGENTS.md` — quick reference for AI-assisted development
3. Explore the route tree: `src/app/[locale]/page.tsx` is the home page composition
4. Read a product detail page: `src/data/products.ts` → `src/components/products/ProductDetail.tsx`
5. Read the chromatogram: it's the most technically complex Canvas 2D component
6. Read GlobeGL.tsx — tricky initialization pattern (`new` keyword)

### Day 2–3 — Make a Change

1. **Add a product:** Edit `src/data/products.ts` — add an entry to the `products` array
2. **Add an article:** Edit `src/data/academy.ts` — add an entry + sections
3. **Add a translation key:** Edit `messages/en.json` + `messages/hi.json`
4. **Create a new component:** Follow the patterns in existing components (useTranslations, 'use client' for interactive, glass styling)

### Architecture Patterns to Follow

- **Static data:** Always add new data to `src/data/` files, never hardcode in components
- **Canvas sizing:** `flex-col` container → `flex-1 min-h-[XXX]` child → canvas with `w-full h-full` + ResizeObserver for drawing buffer
- **Text on canvas:** Use the fluid font formula `max(base, round(h * base / 400))px` for proportional scaling
- **i18n:** Always use `useTranslations()` and `t('key')` — never hardcode user-facing strings
- **CSS:** Use Tailwind classes + `@theme` tokens. Avoid inline styles. New glass effects go in `globals.css`.
- **Animations:** Framer Motion for UI transitions (entrance, hover, layout). Canvas for continuous animations (bubbles, scan line, globe).

### Build & Deploy

```bash
npm run build    # Production build — must pass with zero errors
npm run start    # Serve production build locally
```

**Pre-commit checklist:**
- [ ] `npx next build` passes
- [ ] No TypeScript errors (`strict: true` in tsconfig)
- [ ] i18n keys added to both `en.json` and `hi.json`
- [ ] Canvas components handle ResizeObserver properly
- [ ] GlobeGL textures are 4096×2048 or smaller (not the original 8192×4096)

---

> **Document maintained by:** Chiti Technologies — Design & Engineering Studio  
> **Designer:** Prabhakar Kumar  
> **Last updated:** 2026-05-13  
> **Portfolio:** [github.com/prabhakarmdes12-cmyk](https://github.com/prabhakarmdes12-cmyk)  
> **Questions?** Start with this journal, then read the component file directly.  
> *Every line of code is a design decision. Every design decision is documented.*

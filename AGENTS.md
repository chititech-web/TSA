<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# TS Aromatics v3 — Quick Reference (AI Agent)

> **Full documentation → `journal.md`** — read that first for comprehensive technical details.  
> This file is a terse summary for AI-assisted workflows.

## Stack
- Next.js 16.2.6 (App Router, Turbopack)
- TypeScript strict mode
- Tailwind CSS v4 (`@theme inline` in globals.css)
- next-intl v4 (i18n: EN/HI)
- Framer Motion v12
- React Three Fiber + Drei (MolecularExplorer3D)
- Zod v4 (server-side validation)
- Prisma v7 (schema-only, no generated client yet)
- sonner (toasts)

## Routes

| Path | Type | Component |
|---|---|---|
| `/` | Static (redirect) | → `/en` |
| `/[locale]` | Dynamic | Hero, TrustPillars, WhyBento (preview), MolecularExplorer3D |
| `/[locale]/why-us` | Dynamic | WhyBento (full page, standalone) |
| `/[locale]/products` | Dynamic | ProductGrid (search + category filter + card grid) |
| `/[locale]/products/[slug]` | SSG | ProductDetail (specs, GC/MS, benefits, uses) |
| `/[locale]/academy` | Dynamic | AcademyList (article cards) |
| `/[locale]/academy/[id]` | SSG | ArticleDetail (hero + sections) |
| `/[locale]/contact` | Dynamic | ContactForm (Server Action + Zod) |

## Data Layer (static, build-time)
- `src/data/products.ts` — 73 products, specs, badge rules, categories
- `src/data/gcms.ts` — 65 GC/MS analyses with compound breakdowns
- `src/data/academy.ts` — 8 articles with full content sections
- `src/data/academy.ts` (re-export) — `moleculeData` with 35 molecule profiles

## Components

### Layout
- **Header** — glass fixed nav, locale-aware links (useLocale()), mobile hamburger
- **Footer** — 4-column grid, system status (green dot), watermark glow + feTurbulence heat haze

### Home
- **Hero** — headline + CTAs from i18n
- **TrustPillars** — 3 glass cards (Shield, Flask, Factory)
- **WhyBento** — chromatogram Canvas 2D + LeadGlobe Canvas 2D + batch transparency + specs + concierge
- **MolecularExplorer3D** — React Three Fiber constellation with 15 molecule nodes, connecting edges, hover/click detail

### Products
- **ProductCard** — glass card with image, badge, botanical name, tags
- **ProductGrid** — client search/filter with category tabs
- **ProductDetail** — full product detail page with GC/MS bars, specs, badge rules

### Academy
- **ArticleCard** — glass card with difficulty badge, tag, image
- **AcademyList** — article grid
- **ArticleDetail** — hero + sections with icons

### Effects
- **FluidSim** — Canvas 2D bubble simulation (heat-driven, 0.5–0.9 alpha, scroll-scaling)
- **FluidSimManager** — connects useHeat to FluidSim
- **useHeat** — scroll-driven heat value (20–100), sets --watermark-glow, --heat-haze

### Contact
- **ContactForm** — Server Action with Zod validation, 6 fields, useActionState

## Known Warnings (non-blocking)
1. `turbopack.root` — multiple lockfiles detected; not configured (cosmetic)
2. `middleware` deprecated — rename to `proxy.ts` in future (Next.js 16)

## Build Status
- `npx next build` — ✅ zero errors
- All routes compile (3 dynamic, 3 SSG, 1 static)
- SSG routes use `generateStaticParams` for all 73 products + 8 articles

## i18n
- `messages/en.json` and `messages/hi.json` — 50+ keys each
- `src/i18n/request.ts` — `getRequestConfig`
- `src/middleware.ts` — locale detection (cookie > accept-language > 'en')
- All components import from 'next-intl': `useTranslations`, `useLocale`

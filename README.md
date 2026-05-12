<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 60" width="0" height="0"/>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/images/logo-dark.svg">
    <img src="/images/logo.svg" alt="TS Aromatics" height="48">
  </picture>
</p>

<p align="center">
  <strong>Premium Essential Oils · B2B Procurement Platform</strong>
  <br>
  <sub>Designed & crafted by <strong>Prabhakar Kumar</strong> at <strong>Chiti Technologies</strong></sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind v4">
  <img src="https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/build-passing-4caf50?style=flat-square" alt="Build Passing">
</p>

---

## Overview

TS Aromatics v3 is a **buyer-facing procurement platform** for premium essential oils and botanical ingredients — built for manufacturers, wellness founders, and formulators who demand technical transparency and ingredient intelligence.

The platform delivers GC/MS documentation, molecular-level compound exploration, an enquiry-based B2B cart system, and an educational academy — all within a sensorial, heat-reactive interface.

---

## Design Philosophy

| Principle | Application |
|---|---|
| **Ambient Intelligence** | Scroll-driven heat system drives bubble physics, glow opacity, and turbulence — the page breathes with user attention |
| **Technical Transparency** | Canvas 2D chromatograms with real EMG peak shapes, live GC/MS data bars, and globe sourcing visualization |
| **Dark-First Sensibility** | A warm, amber-lit dark mode with full light theme toggle — every color tokenized for consistency |
| **B2B Flow** | Enquiry cart context, Zod-validated server actions, and procurement metadata per category |

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16.2.6 (App Router, Turbopack) | SSG for 73 product + 8 article pages |
| **Language** | TypeScript 5 (strict) | Type-safe throughout |
| **Styling** | Tailwind CSS v4 (`@theme inline`) | Token-based design system |
| **3D Viz** | Three.js + React Three Fiber + Drei | Molecular constellation explorer |
| **2D Viz** | Canvas 2D (custom) | Chromatogram, globe arcs, bubble sim |
| **Animation** | Framer Motion 12 | Page transitions, scroll entrances |
| **i18n** | next-intl v4 | English / Hindi with cookie-based detection |
| **Validation** | Zod v4 | Server-side contact form |
| **Database** | Prisma v7 (schema-only) | Future-ready, static data for now |
| **Icons** | lucide-react + custom SVGs | Consistent iconography |
| **Toasts** | sonner | User feedback |

---

## Features

- **Interactive Chromatogram** — Canvas 2D simulated GC/MS with animated scan line, EMG peak shapes, and hover-to-identify tooltips
- **3D Molecular Explorer** — Force-directed graph of 35 molecules with weighted edges, hover glow, IFRA restriction rings
- **Global Sourcing Globe** — 3D globe with animated arc dashes from India to 5 international ports
- **Heat-Driven Fluid Simulation** — Bubble count, speed, and wobble respond to scroll depth
- **Dark / Light Theme** — Fully tokenized toggle with localStorage persistence
- **Enquiry Cart** — Context-based B2B cart that pre-fills the contact form
- **Product Catalog** — 73 products with GC/MS data, COA builder, badge rules, and procurement info
- **Academy** — 8 articles with rich content sections
- **i18n** — Full English and Hindi locale support

---

## Getting Started

```bash
cd demo/v3
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app redirects to `/en`.

---

## Build

```bash
npm run build    # Zero-error production build
npm run start    # Serve production build
```

---

## Project Structure

```
src/
├── app/              # Next.js App Router (routes, layout, globals.css)
│   ├── [locale]/     # Dynamic locale routing
│   └── actions/      # Server actions (Zod contact form)
├── components/       # React components by domain
│   ├── home/         # Hero, Chromatogram, GlobeGL, WhyBento, etc.
│   ├── products/     # ProductCard, ProductGrid, ProductDetail, GcmsViewer
│   ├── academy/      # ArticleCard, AcademyList, ArticleDetail
│   ├── molecules/    # MolecularExplorer3D (R3F), MolDetailPanel
│   ├── layout/       # Header, Footer
│   ├── effects/      # FluidSim, HeatProvider, TypewriterBatch, CartFloat
│   └── contact/      # ContactForm
├── contexts/         # EnquiryContext, SoundContext
├── data/             # Static data (73 products, 47 GC/MS, 8 articles, 35 molecules)
├── i18n/             # next-intl config
├── types/            # Shared TypeScript interfaces
└── middleware.ts     # Locale routing
```

---

## Credits

**Design & Development** — [Prabhakar Kumar](https://github.com/prabhakarmdes12-cmyk)  
**Studio** — Chiti Technologies  
**Client** — TS Aromatics  

*Built with Next.js 16, TypeScript, Tailwind CSS v4, and a lot of ambient warmth.*

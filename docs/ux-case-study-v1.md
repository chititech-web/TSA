---

<p align="center">
  <strong>TS Aromatics — UX Case Study</strong>
  <br>
  <sub>Designed & engineered by <strong>Prabhakar Kumar</strong> at <strong>Chiti Technologies</strong></sub>
</p>

---

> **Studio:** Chiti Technologies — Design & Engineering Studio  
> **Designer:** Prabhakar Kumar  
> **Client:** TS Aromatics  
> **Version:** v1 (Static HTML Demo)  
> **Date:** May 2026  

*This case study documents the full UX lifecycle — from trust-deficit research through sensory simulation design. It serves as both a portfolio artifact and a decision log for the design studio's approach to B2B procurement experiences.*

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
Homepage (demo/index.html)
├── Hero with video background
├── Trust Pillars (3 cards)
├── Product Teaser (4 oils)
├── Why TS Aromatics
├── Academy Knowledge Base
├── Technical Documentation Library
├── Social Proof Grid
├── Contact/Quote Form
│   └── Cart-based product interest (dynamic items list)
├── Cart Float (fixed bottom-left, all pages)
│   └── Slide-out panel with items + remove + clear
├── Footer

Products (demo/products.html)
├── Hero + Filters + Search
├── Product Grid (50+ oils)
│   └── Add to Enquiry button per card
├── Product Detail Modal
│   ├── Tech Specs (extraction, refractive index, etc.)
│   ├── Chemical Profile (progress bars)
│   ├── GC/MS download modal
│   ├── WhatsApp sample CTA
│   └── Enquiry button
├── Cart Float (fixed bottom-left)
└── Footer

Product Detail (demo/product-detail.html)
├── Image carousel
├── Product info + botanical name + purity badges
├── Chemical Profile with progress bars
├── Batch Transparency (select batch → compound breakdown)
├── COA download / Print COA
├── Tech Deep-Dive (2 Academy articles)
├── Sidebar CTAs (sample, quote, spec, GC/MS, Add to Enquiry)
├── Certifications grid
├── Cart Float (fixed bottom-left)
└── Footer

Legal (privacy.html, terms.html, thank-you.html)
```

### Visual Identity
- **Primary CTA**: Deep Amber (`#BF6F00`) — desire and premium positioning
- **Secondary**: Earthy Green (`#2C5F2D`) — trust and nature
- **Brand Red** (`#F0421B` / `#A70D09`) — interactive accent, logo-derived
- **Typography**: Outfit (headings), Playfair Display (hero), Inter (body)
- **Glassmorphism**: Warm Sand at 10% opacity with 12px blur
- **Dark Mode**: Default for B2B professional feel; Light mode for accessibility

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

### Molecular Overlay Design

The `molecular-overlay.svg` was designed to evoke:
- **Scientific rigor** — abstract molecular network with nodes and connecting lines
- **Natural chemistry** — organic, non-symmetrical layout with varied node sizes
- **Subtle presence** — 20% max opacity so it never competes with product photography
- **Brand alignment** — strokes use `#2F4F4F` (Dark Slate Gray, the `--tech-text` colour)

The SVG uses:
- 12 circles (nodes) at 7-11px radius
- 12 connecting lines
- 5 translucent gradient circles for depth (8% opacity)
- `.6px` stroke width for delicate appearance

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

Rationale: essential oils have shelf lives of 1-3 years after distillation, but buyers prefer "current year" batches. The 30/90-day thresholds align with quarterly batch planning cycles.

### Concierge Widget Design

**Position**: Fixed bottom-right, `5.5rem` from bottom (above WhatsApp float at 1.5rem)  
**Icon**: `support_agent` Material Symbol  
**Panel animation**: `scale(0.9→1) + translateY(10px→0)` with spring easing, 300ms  
**Dismissal**: Click outside, Escape key, or clicking a path  
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
- Legal pages (privacy, terms) had broken Devanagari — fixed with proper Hindi

### Contact Form Architecture

| Form | Location | Fields | Action |
|------|----------|--------|--------|
| `#leadForm` | `demo/index.html` | name, email, interest, message | Console log → redirect to thank-you.html |
| `#quoteForm` | Root `index.html` | fullName, businessName, email, phone, source, **cart items**, message | Console log + alert |
| `#leadMagnetForm` | Root `index.html` | leadName, leadEmail | Console log + alert (PDF download placeholder) |
| `#gcmsForm` | Both product pages | gcmsName, gcmsEmail, gcmsCompany | Console log + alert (secure link placeholder) |

All forms are demo-only with no backend. Production should integrate with Formspree, Web3Forms, or a custom API endpoint.

## Phase 3: Cart / Multi-Product Enquiry System (2026-05-10)

### Problem
The original contact form had a checkbox grid limited to 10 products, creating friction:
1. **Scalability** — hardcoding checkboxes for 51+ products is unwieldy
2. **Cross-page workflow** — users browse products on `demo/products.html` but must remember what they liked when they reach the form
3. **Add/remove friction** — no way to remove a product from an enquiry without resetting the entire form
4. **Mobile UX** — checkbox grids are hard to use on small screens

### Solution: Persistent Cart System

**Architecture**: A shared `window.Cart` module in `demo/cart.js` with localStorage persistence, decoupled from any single page.

```
localStorage('tsa-cart')
        │
        ▼
   cart.js ◄─── cart-updated event ───► page components
        │                                    │
        ├── Cart float (badge count)          ├── Enquiry buttons (add/remove toggle)
        ├── Cart panel (item list + remove)   ├── Enquiry form (item list + remove)
        └── Demo note (localStorage visible)  └── All stay in sync
```

**Key Design Decisions**:

| Decision | Rationale |
|----------|-----------|
| localStorage over sessionStorage | Cart persists across browsing sessions — users can leave and return |
| Self-contained module (no framework) | Works with vanilla JS on all pages without a build step |
| `cart-updated` CustomEvent | Decouples state from UI — any component can listen without direct coupling |
| Float button, bottom-left | Avoids clash with WhatsApp float (bottom-right); follows thumb zone for mobile |
| Slide-out panel (spring animation) | Same `panelIn` keyframes as concierge for visual consistency |
| 400 Hz haptic on cart interactions | Matches rest of app's haptic tone (vs. 800 Hz for regular clicks) |
| Red "in-cart" state | Clear visual distinction — red (`--brand-red`) signals "this is selected" |

### Cart Interaction Flow

```
User on Products page
  │
  ├── Clicks "Add to Enquiry"
  │   ├── Button text → "Remove from Enquiry"
  │   ├── Button background → red (--brand-red)
  │   ├── Cart badge increments (+1)
  │   ├── 400 Hz haptic tick
  │   └── localStorage updated
  │
  ├── Clicks cart float button
  │   └── Panel slides up (spring ease, 300ms)
  │       ├── Lists all added products with names
  │       ├── Each item has a remove (×) button
  │       ├── "View Enquiry Form" link → homepage contact section
  │       └── "Clear All" button empties cart
  │
  └── Visits product detail page
      └── Sidebar shows "Add to Enquiry" / "Remove from Enquiry"
          (pre-populated from cart state)

User navigates to Contact form
  │
  └── Product interest field shows cart items dynamically
      ├── Each item has a remove button (×)
      ├── Empty cart → "Browse products" link
      └── On submit → Cart.items() mapped to payload.interests
```

### Cart System Components

| Component | File | Location | Behaviour |
|-----------|------|----------|-----------|
| Cart state module | `demo/cart.js` | Inline IIFE | `add`, `remove`, `has`, `toggle`, `items`, `count`, `clear` |
| Enquiry button (card) | Card template | `.enquiry-btn` inside `.card-actions` | Toggle text/class; reads `data-id`, `data-name` |
| Enquiry button (detail) | `#detailEnquiryBtn` | Sidebar CTAs | Toggle icon + text; bound on product load |
| Cart float | `.cart-float` | Fixed bottom-left (z-index 89) | Toggles `.open` on `#cartPanel`; badge auto-updates |
| Cart panel | `#cartPanel` | Fixed above float (z-index 92) | Renders item list, remove buttons, footer CTAs |
| Enquiry form list | `#cartEnquiryList` | Inside `#cartEnquiryField` | Renders items with remove; empty state with browse link |

### CSS Architecture (Cart)

All cart styles are inlined per-page (no shared CSS file):
- `index.html` — uses `--p-ease-spring`, `--p-brand-red`, `--accent-deep-amber` (design tokens)
- `demo/products.html` — uses `var(--ease-spring)`, `var(--brand-red)`, `var(--deep-amber)` (shorthand tokens)
- `demo/product-detail.html` — same shorthand tokens as products

The `enquiry-btn.in-cart` state uses `!important` to override the button's default border/background regardless of specificity order.

## Accessibility

- Dark/light mode with `prefers-color-scheme` support
- Reduced motion: `prefers-reduced-motion` disables spring animations
- ARIA labels on all interactive elements (carousel buttons, nav toggles, concierge)
- Focus trap in product detail modal
- Skip carousel autoplay on hover
- Semantic HTML structure with `main`, `nav`, `section`, `article`, `footer`

## Mobile Responsiveness

- **980px breakpoint**: Stack nav, 2-column product grid, single-column detail
- **620px breakpoint**: 1-column product grid, full-width filters and search, mobile-first filter order
- **768px breakpoint**: Section title scale-down, condensed batch rows
- **480px breakpoint**: Smaller body text, reduced card padding

## Performance Considerations

- Google Fonts loaded with `display=swap` for text visibility during load
- Video backgrounds use `preload="auto"` and fallback to CSS gradient
- Product images use `loading="lazy"` for below-fold content
- GC/MS database and Academy articles loaded from single `products-data.js` file
- No external dependencies beyond Google Fonts and Material Icons

## Future Enhancements

### Cart System Roadmap

1. **Quantity per item** — Allow users to specify sample/bulk quantity per product in the cart panel
2. **Cart summary on product cards** — Show a small count badge on each product card indicating "2 in enquiry"
3. **Persisted cart expiry** — Auto-clear cart after 7 days of inactivity to avoid stale enquiries
4. **Share enquiry list** — Generate a shareable link with cart items pre-filled (useful for team procurement)
5. **Bulk actions** — "Add all filtered results to enquiry" button on the catalog toolbar
6. **Cart item notes** — Per-item text field for application notes or specific documentation requests
7. **Wishlist vs. Enquiry separation** — Save-for-later vs. ready-to-submit distinction

### General Roadmap

1. **Backend integration**: Formspree/Web3Forms for lead capture + auto-reply
2. **Real GC/MS data**: Replace 4 demo batches with full 51-product coverage
3. **Dynamic batch freshness alerts**: "New batch available" notifications for repeat buyers
4. **Product comparison tool**: Side-by-side spec comparison for procurement teams
5. **WhatsApp API**: Two-way chat integration instead of pre-filled message links
6. **Calendly deep link**: Replace placeholder with real consultation booking page
7. **Google Analytics + UTM**: Track source quality across Indiamart, Instagram, Facebook, referrals
8. **Next.js migration**: Component-based architecture with Chiti V3 design system

## Metrics to Track (Post-Launch)

- **Sample request conversion rate** (% of visitors who click "Request Sample")
- **GC/MS modal completion rate** (% who open vs. who submit the form)
- **Concierge widget engagement** (click rate, most-used path)
- **Transparency Toggle usage** (how many power users activate data view)
- **Language toggle usage** (% Hindi vs. English)
- **Mobile vs. desktop form submission rate**
- **WhatsApp click-to-chat conversion**
- **Bounce rate by source channel**

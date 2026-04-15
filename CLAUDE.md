# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Quick Reference

- **Live**: https://crown-crumb-ja.vercel.app
- **Repo**: https://github.com/Empower21/crown-crumb-ja
- **Dev**: `npm run dev` (port 3000)
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Deploy**: `npx vercel --prod`

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- React 19 + `motion` library (NOT framer-motion — React 19 compatible)
- Claude API (Haiku 4.5) for DeeDee chatbot
- Vercel deployment with edge middleware for geo-detection
- Static product catalog in TypeScript files (no database)
- Shopping cart with WhatsApp checkout (localStorage persistence)
- ISR-cached exchange rate API for multi-currency display

## Architecture

### Data Flow

All product/pricing data lives in `src/data/*.ts` files — no database. Products have real JMD prices. The geo-currency system works as:

1. **Edge middleware** (`middleware.ts`) reads Vercel's `x-vercel-ip-country` header, sets `cc-country` cookie
2. **Exchange rate API** (`src/app/api/exchange-rates/route.ts`) fetches rates from exchangerate-api.com with 24hr ISR cache, falls back to hardcoded rates
3. **`useGeoPrice` hook** reads the cookie + cached rates, provides `formatGeoPrice()` which shows JMD-only for Jamaican visitors or `J$7,500 (~US$48)` for international visitors
4. **`CurrencySelector`** in the header lets users manually override their detected country

### Delivery Calculator

Zone-based delivery with dynamic surcharges. Config in `src/data/delivery-config.ts`:
- 5 zones: Kingston Metro, Rest of Jamaica (by parish), Caribbean, North America, UK & Europe
- Surcharges: fuel (configurable %), peak season (auto-activates by date), bulky item, rush delivery
- `calculateDelivery()` in `src/hooks/useDeliveryCalculator.ts` is the core function
- Products with `bulkyItem: true` incur extra shipping (canopy tent, digital signage, pedestal stand)

### Component Conventions

- All client components use `'use client'` directive
- Icons: `lucide-react` exclusively — do not add other icon libraries
- Animations: `motion/react` for scroll-linked effects, CSS transitions for simple hover/appear
- `AnimatedSection` wraps sections for intersection-observer fade-in
- `ContainerScrollAnimation` wraps sections for 3D perspective scroll effects

## Brand System

- **Primary**: #CCFF00 (`crown-lime`) — CTAs, accents, highlights, prices
- **Secondary**: #B8A9E8 (`crown-lavender`) — headings, decorative
- **Background**: #0A0A0A (`crown-dark`), #1A1A1A (`crown-dark-card`), #2A2A2A (`crown-dark-surface`)
- **Text**: #FAFAFA (`crown-white`), #A0A0A0 (`crown-muted`)
- **Fonts**: Space Grotesk (`font-heading`), Inter (`font-sans`)
- **Logo**: `public/flexicon.webp` (compact, 428 bytes) for header/footer; `public/logo.png` (full wordmark) for hero/OG
- Dark-mode-first design. All brand tokens in `src/app/globals.css` via `@theme inline`.

## Contact Info

- **Email**: crowncrumb@outlook.com
- **WhatsApp**: +1 876-338-8183 (NEVER display as visible text)
- **Instagram**: @crowncrumbja
- **Owner**: Danielle Lawrence (Founder & Creative Director)

## Environment Variables

- `ANTHROPIC_API_KEY` — Claude API key (server-side only, for DeeDee chatbot)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp number (hidden, behind buttons only)
- `NEXT_PUBLIC_SITE_URL` — Production URL

## Critical Rules

1. **WhatsApp number is NEVER displayed as visible text** — only behind buttons via `whatsappLink()` in `src/lib/utils.ts`
2. **Tailwind v4** — brand tokens defined in `globals.css` via `@theme inline`, NOT in tailwind.config. There is no `tailwind.config.ts`.
3. **DeeDee chatbot uses Haiku 4.5** for cost efficiency — do not change model without approval
4. **JMD is always the primary price** — use `formatGeoPrice()` from `useGeoPrice` hook for display (handles both JMD-only and international conversion). Use `formatPrice()`/`formatJMD()` from utils only for non-UI contexts (WhatsApp messages, etc.)
5. **Product images** in `public/products/` organized by category slug subfolder with descriptive filenames
6. **Products with `bulkyItem: true`** get extra delivery surcharges — flag any large/heavy products
7. **Middleware uses `x-vercel-ip-country` header** (NOT the deprecated `request.geo` API removed in Next.js 15+)
8. **`motion/react`** is the import path for animations (NOT `framer-motion` — that's incompatible with React 19)
9. **Delivery config** (`src/data/delivery-config.ts`) is where Danielle adjusts fuel surcharge %, peak season dates, and zone rates — keep this file clean and well-commented

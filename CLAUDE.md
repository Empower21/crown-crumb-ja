@AGENTS.md

# Crown Crumb JA

## Quick Reference
- **Live**: https://crown-crumb-ja.vercel.app
- **Repo**: https://github.com/Empower21/crown-crumb-ja
- **Dev**: `npm run dev` (port 3000)
- **Build**: `npm run build`
- **Deploy**: `npx vercel --prod`

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Claude API (Haiku 4.5) for DeeDee chatbot
- Vercel deployment with GitHub integration
- Static product catalog (no database)
- Inquiry-based ordering via WhatsApp + contact form

## Brand System
- **Primary**: #CCFF00 (crown-lime) — CTAs, accents, highlights
- **Secondary**: #B8A9E8 (crown-lavender) — headings, decorative
- **Background**: #0A0A0A (crown-dark), #1A1A1A (cards), #2A2A2A (surfaces)
- **Fonts**: Space Grotesk (headings, --font-heading), Inter (body, --font-sans)
- Dark-mode-first design

## Key Files
- `src/data/products.ts` — Product catalog (11 products, 5 categories)
- `src/data/categories.ts` — Category definitions
- `src/app/api/chat/route.ts` — DeeDee chatbot API
- `src/components/chat/DeeDeeWidget.tsx` — Chat widget UI
- `src/lib/utils.ts` — WhatsApp link utility (number hidden behind buttons)

## Environment Variables
- `ANTHROPIC_API_KEY` — Claude API key (server-side only)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — Danielle's WhatsApp (hidden, never displayed)
- `NEXT_PUBLIC_SITE_URL` — Production URL

## Critical Rules
1. NEVER display the WhatsApp number as visible text — only behind buttons via `whatsappLink()` utility
2. Tailwind v4 — brand tokens defined in `globals.css` via `@theme inline`, NOT in tailwind.config
3. DeeDee uses Haiku 4.5 for cost efficiency — do not change to a more expensive model without approval
4. All product images in `public/products/` organized by category with descriptive filenames

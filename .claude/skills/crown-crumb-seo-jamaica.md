---
name: crown-crumb-seo-jamaica
description: Activates for Crown Crumb JA SEO optimization, metadata, structured data, Jamaica market optimization, and performance budgets.
metadata:
  tags: crown-crumb, seo, jamaica, metadata, performance, structured-data
---

## Activation
This skill activates when working on Crown Crumb JA SEO, metadata, Open Graph tags, structured data, or performance optimization.

---

## SEO Metadata

### Target Keywords
- "pop-up supplies Jamaica"
- "baking packaging Kingston"
- "event tent Jamaica"
- "bakery supplies Jamaica"
- "food packaging Jamaica"
- "display stands Kingston"
- "Crown Crumb"
- "baking kits Caribbean"

### Structured Data
- **Schema**: `LocalBusiness` with Kingston, Jamaica address
- **Fields**: name, address, phone, founder, areaServed, priceRange
- **Location**: Root layout.tsx via Next.js Script component

### Open Graph
- Optimize OG images for WhatsApp sharing (critical in Jamaica market)
- Include `og:title`, `og:description`, `og:image`, `og:url`
- Locale: `en_JM`
- Each page should have unique OG title and description

### Next.js Metadata API
- Use `export const metadata: Metadata` for all pages
- Root defaults in `src/app/layout.tsx`
- Template pattern: `'%s | Crown Crumb JA'`
- Override per-page in individual `page.tsx` files

### Sitemap & Robots
- Generate `robots.ts` and `sitemap.ts` in app directory
- Include all product pages in sitemap

---

## Performance Budget

### Core Web Vitals Targets
| Metric | Target |
|--------|--------|
| LCP | Under 2.5 seconds |
| First Load | Under 500KB |
| FID | Under 100ms |

### Images
- Format: WebP with JPEG fallback (Next.js `<Image>` handles automatically)
- **All images must use `sizes` attribute** for responsive loading
- Don't serve oversized images — use appropriate dimensions
- 39 product images in `public/products/` (total ~5.4MB, lazy-loaded)

### Fonts
- Loading: `display: 'swap'` to prevent FOIT (Flash of Invisible Text)
- Load only needed weights via `next/font/google`
- Fonts: Space Grotesk (headings) + Inter (body)

### JavaScript
- Use Server Components by default
- Only add `'use client'` when interactivity is required
- Code-split with dynamic imports for heavy components
- Currently 5 client components: Header, CategoryFilter, ProductDetail, ContactForm, DeeDeeWidget

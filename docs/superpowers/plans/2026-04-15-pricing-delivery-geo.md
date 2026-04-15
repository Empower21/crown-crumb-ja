# Pricing, Delivery Calculator & Geo-Currency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add real JMD pricing to all products, 3 new products with images, a dynamic delivery calculator with zone-based surcharges, and automatic currency conversion for international visitors using Vercel edge geo-detection.

**Architecture:** Next.js middleware reads Vercel's `request.geo.country` and sets a cookie. An ISR-cached API route fetches exchange rates from exchangerate-api.com (24hr TTL). Client components read the cookie + cached rates to display approximate converted prices alongside JMD. Delivery calculator uses a config-driven zone/surcharge system.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Vercel Edge Middleware, exchangerate-api.com (free tier)

---

## File Structure

### New Files
| File | Responsibility |
|---|---|
| `middleware.ts` | Edge geo-detection, sets `cc-country` cookie |
| `src/data/delivery-config.ts` | Delivery zones, base rates, surcharges, parish mapping, peak seasons |
| `src/data/currency-config.ts` | Country-to-currency mapping, fallback rates, formatting helpers |
| `src/app/api/exchange-rates/route.ts` | ISR-cached exchange rate fetcher |
| `src/hooks/useGeoPrice.ts` | Client hook: reads country cookie + cached rates, formats prices |
| `src/hooks/useDeliveryCalculator.ts` | Client hook: calculates delivery cost for zone + cart items |
| `src/components/products/DeliveryEstimator.tsx` | Compact delivery cost widget for product page |
| `src/components/cart/DeliveryBreakdown.tsx` | Full delivery breakdown in cart drawer |
| `src/components/layout/CurrencySelector.tsx` | Header country/currency override dropdown |

### Modified Files
| File | Changes |
|---|---|
| `src/types/index.ts` | Add `bulkyItem` to Product, add delivery/currency types |
| `src/data/products.ts` | Add 3 new products, set all 12 prices, add bulkyItem flags |
| `src/data/categories.ts` | Add 2 new categories (`cold-chain`, `canopy-tents`), update counts |
| `src/data/vendor-kits.ts` | Update kit prices, add ice-packs + canopy to kits |
| `src/lib/utils.ts` | Add `formatGeoPrice()` helper |
| `src/components/products/ProductCard.tsx` | Show geo-converted price |
| `src/app/products/[slug]/ProductDetail.tsx` | Add delivery estimator, geo price, update delivery info box |
| `src/components/cart/CartDrawer.tsx` | Add delivery breakdown, geo-converted totals |
| `src/components/layout/Header.tsx` | Add CurrencySelector |
| `src/app/layout.tsx` | No changes needed (middleware handles cookie externally) |

### Image Operations
| Operation | Source | Destination |
|---|---|---|
| Copy | `../../Images/IMG_0645.JPG` | `public/products/chalkboard-stands/boxed-set.jpg` |

---

## Task 1: Update Types

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Add bulkyItem flag and new category slugs to types**

```typescript
// src/types/index.ts — full file replacement

export type CategorySlug =
  | 'display-signage'
  | 'packaging'
  | 'baking-supplies'
  | 'digital-tools'
  | 'vendor-kits'
  | 'cold-chain'
  | 'canopy-tents';

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  features: string[];
  images: string[];
  specs?: Record<string, string>;
  tags: string[];
  price: number | null;
  comparePrice?: number | null;
  inStock: boolean;
  bulkyItem?: boolean;
}

export interface VendorKit {
  slug: string;
  name: string;
  tagline: string;
  jamaicaMeaning: string;
  tier: 'beginner' | 'intermediate' | 'expert';
  description: string;
  includedProductSlugs: string[];
  price: number | null;
  image: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  heroImage: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  quote: string;
  image?: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ChecklistCategory {
  name: string;
  icon: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  label: string;
  essential: boolean;
}

export type DeliveryZoneId =
  | 'kingston-metro'
  | 'rest-of-jamaica'
  | 'caribbean'
  | 'north-america'
  | 'uk-europe';

export interface DeliveryZone {
  id: DeliveryZoneId;
  name: string;
  baseRate: number;
  perAdditionalItem: number;
  freeShippingThreshold: number | null;
  estimatedDays: string;
}

export interface DeliveryResult {
  zone: DeliveryZone;
  baseRate: number;
  fuelSurcharge: number;
  peakSurcharge: number;
  bulkyItemSurcharge: number;
  rushSurcharge: number;
  total: number;
  isFreeShipping: boolean;
}

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

export interface ExchangeRates {
  [currencyCode: string]: number; // JMD to target currency
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds (no consumers of new types yet, existing types unchanged)

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add delivery, currency, and bulkyItem types"
```

---

## Task 2: Copy Missing Image & Add New Products

**Files:**
- Copy: `../../Images/IMG_0645.JPG` → `public/products/chalkboard-stands/boxed-set.jpg`
- Modify: `src/data/products.ts`
- Modify: `src/data/categories.ts`
- Modify: `src/data/vendor-kits.ts`

- [ ] **Step 1: Copy the missing image**

```bash
cp "C:\Users\amdre\OneDrive\Desktop\AI ARCHITECTURE SOLUTIONS - GTM\Crown Crumb JA\Images\IMG_0645.JPG" "C:\Users\amdre\OneDrive\Desktop\AI ARCHITECTURE SOLUTIONS - GTM\Crown Crumb JA\crown-crumb-ja\public\products\chalkboard-stands\boxed-set.jpg"
```

- [ ] **Step 2: Update products.ts — set all prices, add bulkyItem flags, add 3 new products, add missing image**

Replace the full `products` array in `src/data/products.ts`:

```typescript
import { Product } from '@/types';

export const products: Product[] = [
  // Display & Signage
  {
    slug: 'mini-chalkboard-stands',
    name: 'Mini Chalkboard Stands',
    category: 'display-signage',
    description:
      'Set of 20 mini chalkboard signs on wooden sticks with removable bases. Perfect for labelling baked goods, prices, and flavours at your pop-up table. Chalk markers included.',
    features: [
      '20 pieces per set',
      'Removable base — use as table sign or plant/food marker',
      'Reusable — just wipe clean',
      'Sturdy wooden base stands',
      'Perfect for bakery displays, charcuterie boards, and events',
    ],
    images: [
      '/products/chalkboard-stands/dimensions.jpg',
      '/products/chalkboard-stands/bakery-use.jpg',
      '/products/chalkboard-stands/event-use.jpg',
      '/products/chalkboard-stands/charcuterie-use.jpg',
      '/products/chalkboard-stands/removable.jpg',
      '/products/chalkboard-stands/boxed-set.jpg',
    ],
    specs: {
      Quantity: '20 pieces',
      'Board Size': '3.3" x 2.3"',
      'Total Height': '7.5"',
      'Base Width': '1.4"',
    },
    tags: ['chalkboard', 'signs', 'labels', 'pricing', 'display'],
    price: 7500,
    inStock: true,
  },
  {
    slug: 'adjustable-pedestal-stand',
    name: 'Adjustable Pedestal Sign Stand',
    category: 'display-signage',
    description:
      'Height-adjustable pedestal stand with rotatable display board and weighted base. Perfect for menus, flash sale announcements, and promotions at your pop-up booth.',
    features: [
      'Adjustable height: 35.98" to 48.26"',
      'Rotatable display angle',
      'Heavy weighted base (fill with sand or water)',
      'Sleek matte black finish',
      'Easy assembly — no tools needed',
      'Perfect for restaurants, exhibitions, and outdoor events',
    ],
    images: [
      '/products/pedestal-stands/three-stands.jpg',
      '/products/pedestal-stands/features.jpg',
      '/products/pedestal-stands/use-cases.jpg',
      '/products/pedestal-stands/weighted-base.jpg',
    ],
    specs: {
      'Height Range': '35.98" — 48.26"',
      'Display Size': '9.76" x 12.12"',
      Colour: 'Matte Black',
      'Base Type': 'Weighted (sand/water fill)',
    },
    tags: ['stand', 'signage', 'menu', 'adjustable', 'pedestal'],
    price: 16500,
    inStock: true,
    bulkyItem: true,
  },
  {
    slug: 'chalk-markers',
    name: 'Chalk Markers — 12 Colours',
    category: 'display-signage',
    description:
      'Vibrant liquid chalk markers in 12 colours. Write on chalkboard signs, glass, mirrors, and more. Easy to wipe clean. Perfect companion for our chalkboard stands.',
    features: [
      '12 vibrant colours included',
      'Works on chalkboard, glass, mirrors, and non-porous surfaces',
      'Easy to wipe clean with damp cloth',
      'Fine tip for detailed writing',
      'Non-toxic and odourless',
    ],
    images: ['/products/chalk-markers/markers-12-colors.jpg'],
    specs: {
      Quantity: '12 markers',
      Colours: 'Assorted (see image)',
      'Tip Type': 'Fine tip',
      Surface: 'Chalkboard, glass, mirrors',
    },
    tags: ['chalk', 'markers', 'colours', 'writing', 'signs'],
    price: 4500,
    inStock: true,
  },
  {
    slug: 'wooden-display-risers',
    name: 'Wooden Display Risers',
    category: 'display-signage',
    description:
      '3-tier solid wood display risers with a beautiful burnt wood finish. Create stunning tiered displays for cupcakes, pastries, perfumes, and products at your pop-up.',
    features: [
      '3-tier nested set',
      'Burnt wood finish — rustic charm',
      'Solid wood construction',
      'No installation required',
      'Eco-friendly and reusable',
      'Perfect for tiered product displays',
    ],
    images: ['/products/display-risers/wood-risers.jpg'],
    specs: {
      'Set Size': '3 tiers (nested)',
      Material: 'Solid burnt wood',
      Style: 'Rustic / artisan',
    },
    tags: ['display', 'wood', 'risers', 'tiered', 'rustic'],
    price: 14500,
    inStock: true,
  },

  // Packaging
  {
    slug: 'dome-containers',
    name: 'Dome Display Containers',
    category: 'packaging',
    description:
      'Elegant clear dome containers with gold bases — perfect for individual cupcakes, macarons, truffles, and single-serve pastries. PET material, stackable for display.',
    features: [
      'Clear dome top for full visibility',
      'Gold base for elegant presentation',
      'PET material — transparent and bright',
      'Easy to use and stackable',
      'Multiple uses: desserts, cakes, bread, cookies',
      'Food-safe materials',
    ],
    images: [
      '/products/dome-containers/dimensions.jpg',
      '/products/dome-containers/with-desserts.jpg',
    ],
    specs: {
      'Base Diameter': '6.8cm / 2.68"',
      'Dome Height': '4.5cm / 1.77"',
      Material: 'PET (food-safe)',
      'Base Colour': 'Gold',
    },
    tags: ['dome', 'container', 'macaron', 'display', 'gold', 'cupcake'],
    price: 5800,
    inStock: true,
  },
  {
    slug: 'handmade-sealed-bags',
    name: '"Hand Made" Sealed Bags with Stickers',
    category: 'packaging',
    description:
      'Translucent sealed bags with polka dot pattern and matching "Hand Made" stickers. Perfect for cupcakes, cookies, and individual pastries. Professional artisan look.',
    features: [
      'Translucent polka dot design',
      '"Hand Made" branded stickers included',
      'Self-sealing closure',
      'Fits standard cupcakes and cookies',
      'Professional artisan presentation',
    ],
    images: ['/products/sealed-bags/handmade-bags.jpg'],
    specs: {
      Pattern: 'Polka dot translucent',
      Closure: 'Self-sealing',
      Stickers: 'Included',
    },
    tags: ['bags', 'stickers', 'handmade', 'cupcake', 'cookie', 'packaging'],
    price: 3500,
    inStock: true,
  },

  // Baking Supplies
  {
    slug: 'cupcake-baking-cups',
    name: 'Cupcake Baking Cups with Dome Lids — 50pc',
    category: 'baking-supplies',
    description:
      'Premium aluminium baking cups with clear dome lids and sporks. Gold interior, oven-safe up to 482\u00b0F. Perfect for cupcakes, cr\u00e8me br\u00fbl\u00e9e, and individual desserts. 50-piece set.',
    features: [
      '50 aluminium cups with dome lids',
      'Black sporks included',
      'Gold interior for premium look',
      'Oven, BBQ, air fryer, and refrigerator safe',
      'Baking temperature up to 482\u00b0F',
      'Perfect for gifting and pop-up sales',
    ],
    images: [
      '/products/baking-cups/set-50pc.jpg',
      '/products/baking-cups/in-use.jpg',
    ],
    specs: {
      Quantity: '50 cups + lids + sporks',
      Material: 'Aluminium (gold interior)',
      'Max Temp': '482\u00b0F / 250\u00b0C',
      'Safe For': 'Oven, BBQ, Air Fryer, Refrigerator',
    },
    tags: ['baking', 'cupcake', 'cups', 'dome', 'lids', 'aluminium'],
    price: 6500,
    inStock: true,
  },
  {
    slug: 'baking-cups-100pc',
    name: 'Baking Cups Set — 100pc (Gold & Black)',
    category: 'baking-supplies',
    description:
      'Large 100-piece set of aluminium baking cups with clear dome lids and sporks. Gold and black colourway for a premium look. Bulk pack for serious bakers and event vendors.',
    features: [
      '100 aluminium cups with dome lids',
      'Sporks included',
      'Gold and black colourway',
      'Oven, BBQ, air fryer, and refrigerator safe',
      'Bulk pack — ideal for events and catering',
      'Stackable for easy storage',
    ],
    images: ['/products/baking-kits/all-in-one-set.jpg'],
    specs: {
      Quantity: '100 cups + lids + sporks',
      Material: 'Aluminium (gold & black)',
      'Max Temp': '482\u00b0F / 250\u00b0C',
      'Safe For': 'Oven, BBQ, Air Fryer, Refrigerator',
    },
    tags: ['baking', 'cupcake', 'cups', 'bulk', '100pc', 'gold', 'black'],
    price: 8500,
    inStock: true,
  },

  // Digital Tools
  {
    slug: 'digital-signage-display',
    name: 'Digital Signage Table Talker',
    category: 'digital-tools',
    description:
      'Dual 8-inch touchscreen HD digital signage display. Replace paper menus and signs with dynamic content. Built-in CMS, phone charging capability, and fire-resistant ABS construction.',
    features: [
      'Dual 8-inch touchscreen HD displays',
      'Free CMS for images, videos, and text',
      'Smart split-screen mode (1, 2, or 3 screens)',
      'Built-in phone charging cable',
      '23200mAh battery — lasts all day',
      'Fire-resistant ABS construction',
      'Drive up to 50% sales growth',
    ],
    images: [
      '/products/digital-signage/cafe-use.jpg',
      '/products/digital-signage/features.jpg',
      '/products/digital-signage/display-modes.jpg',
      '/products/digital-signage/split-screen.jpg',
    ],
    specs: {
      'Screen Size': 'Dual 8-inch HD touchscreen',
      Battery: '23200mAh',
      Material: 'Fire-resistant ABS',
      Charging: 'Built-in cable for customer phones',
      CMS: 'Free — images, videos, text',
    },
    tags: ['digital', 'signage', 'menu', 'display', 'touchscreen', 'table'],
    price: 125000,
    inStock: true,
    bulkyItem: true,
  },
  {
    slug: 'pocket-camera',
    name: 'Pocket Camera Gimbal',
    category: 'digital-tools',
    description:
      'Handheld pocket camera with built-in gimbal for smooth video. 2+8GB memory, USB-C transfer, fill light for night mode. Perfect for capturing content at your pop-up events.',
    features: [
      '2+8GB memory, supports up to 128GB',
      'USB-C transfer and memory card reader',
      'Built-in fill light for night shots',
      'Compact pocket size',
      'Smooth gimbal stabilisation',
      'Perfect for social media content creation',
    ],
    images: [
      '/products/pocket-camera/specs.jpg',
      '/products/pocket-camera/night-mode.jpg',
    ],
    specs: {
      Memory: '2+8GB (expandable to 128GB)',
      Transfer: 'USB-C',
      'Fill Light': 'Built-in',
      'Best For': 'Pop-up content, social media',
    },
    tags: ['camera', 'gimbal', 'video', 'content', 'social media'],
    price: 55000,
    inStock: true,
  },

  // Cold Chain & Transport
  {
    slug: 'ice-pack-sheets',
    name: 'Ice Pack Sheets — 144 Cells',
    category: 'cold-chain',
    description:
      'Reusable dry ice pack sheets with 144 cells across 6 sheets. Soak in water, freeze, and cut to size. Keeps baked goods, drinks, and perishables cold during transport and at your pop-up. No mess, no melting water.',
    features: [
      '6 sheets with 144 cells total',
      'Reusable — just re-soak and refreeze',
      'Cut to any size needed',
      'No mess — no melting water like regular ice',
      'Lightweight and easy to store',
      'Perfect for food transport and pop-up cold displays',
    ],
    images: [
      '/products/cold-chain/ice-packs-sheets.jpg',
      '/products/cold-chain/ice-packs-comparison.jpg',
      '/products/cold-chain/ice-packs-instructions.jpg',
    ],
    specs: {
      Quantity: '6 sheets (144 cells)',
      Type: 'Dry ice pack (reusable)',
      Activation: 'Soak 5 min, freeze 6+ hours',
      'Best For': 'Food transport, cold displays',
    },
    tags: ['ice', 'cold', 'transport', 'delivery', 'reusable', 'sheets'],
    price: 5500,
    inStock: true,
  },

  // Canopy & Shelter
  {
    slug: 'popup-canopy-tent',
    name: 'Pop-Up Canopy Tent — 10x10 ft',
    category: 'canopy-tents',
    description:
      'Portable 10x10 ft pop-up canopy tent with carry bag and weighted sandbags. Durable steel frame, UV-resistant top, and reinforced corners. Sets up in minutes — essential shelter for outdoor markets and events.',
    features: [
      '10x10 ft coverage area',
      'Durable steel frame with reinforced corners',
      'UV-resistant canopy top',
      'Weighted sandbags included for stability',
      'Carry bag for easy transport',
      'Sets up in under 5 minutes',
    ],
    images: [
      '/products/canopy-tents/canopy-tent.jpg',
      '/products/canopy-tents/canopy-outdoor.jpg',
    ],
    specs: {
      Size: '10 x 10 ft',
      Frame: 'Steel (powder-coated)',
      Canopy: 'UV-resistant polyester',
      Includes: 'Carry bag + 4 weighted sandbags',
    },
    tags: ['canopy', 'tent', 'shelter', 'outdoor', 'popup', 'market'],
    price: 48000,
    inStock: true,
    bulkyItem: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
}
```

- [ ] **Step 3: Update categories.ts — add 2 new categories, update counts**

Replace the full `categories` array in `src/data/categories.ts`:

```typescript
import { Category } from '@/types';

export const categories: Category[] = [
  {
    slug: 'display-signage',
    name: 'Display & Signage',
    description:
      'Chalkboard stands, pedestal displays, wooden risers, and chalk markers to showcase your products beautifully.',
    icon: 'LayoutGrid',
    heroImage: '/products/chalkboard-stands/bakery-use.jpg',
    productCount: 4,
  },
  {
    slug: 'packaging',
    name: 'Packaging Solutions',
    description:
      'Dome containers, sealed bags, and presentation packaging to make your baked goods irresistible.',
    icon: 'Package',
    heroImage: '/products/dome-containers/with-desserts.jpg',
    productCount: 2,
  },
  {
    slug: 'baking-supplies',
    name: 'Baking Supplies',
    description:
      'Premium aluminium baking cups, dome lids, and everything you need for professional-grade baking.',
    icon: 'ChefHat',
    heroImage: '/products/baking-cups/in-use.jpg',
    productCount: 2,
  },
  {
    slug: 'digital-tools',
    name: 'Digital Tools',
    description:
      'Digital signage displays and pocket cameras to elevate your vendor presence and content game.',
    icon: 'Monitor',
    heroImage: '/products/digital-signage/cafe-use.jpg',
    productCount: 2,
  },
  {
    slug: 'cold-chain',
    name: 'Cold Chain & Transport',
    description:
      'Ice pack sheets and cold chain solutions to keep your baked goods fresh during transport and at your pop-up.',
    icon: 'Snowflake',
    heroImage: '/products/cold-chain/ice-packs-sheets.jpg',
    productCount: 1,
  },
  {
    slug: 'canopy-tents',
    name: 'Canopy & Shelter',
    description:
      'Portable canopy tents and shelter for outdoor markets, festivals, and events. Set up in minutes.',
    icon: 'Tent',
    heroImage: '/products/canopy-tents/canopy-tent.jpg',
    productCount: 1,
  },
  {
    slug: 'vendor-kits',
    name: 'Vendor Kits',
    description:
      'Curated bundles for every stage of your vendor journey \u2014 from first market to full festival anchor.',
    icon: 'Gift',
    heroImage: '/products/customers/popup-booth.jpg',
    productCount: 3,
  },
];
```

- [ ] **Step 4: Update vendor-kits.ts — set prices, add ice-packs and canopy to kits**

Replace the full `vendorKits` array in `src/data/vendor-kits.ts`:

```typescript
import { VendorKit } from '@/types';

export const vendorKits: VendorKit[] = [
  {
    slug: 'likkle-but-tallawah',
    name: 'Likkle But Tallawah',
    tagline: 'First time at the market? Step out with confidence.',
    jamaicaMeaning: 'Small but powerful \u2014 Jamaican proverb',
    tier: 'beginner',
    description:
      'Perfect for the vendor testing the waters \u2014 first craft fair, school gate sale, or community market. The essentials to label, display, and package your goods from day one.',
    includedProductSlugs: [
      'mini-chalkboard-stands',
      'chalk-markers',
      'handmade-sealed-bags',
      'dome-containers',
    ],
    price: 17500,
    image: '/products/chalkboard-stands/event-use.jpg',
  },
  {
    slug: 'run-di-vibes',
    name: 'Run Di Vibes',
    tagline: 'You know the scene. Now it is time to own it.',
    jamaicaMeaning: 'Set the atmosphere \u2014 Caribbean slang',
    tier: 'intermediate',
    description:
      'For the vendor who has done a few events and is ready to build a real presence. Adds tiered displays, professional signage, premium baking supplies, and cold chain to your setup.',
    includedProductSlugs: [
      'mini-chalkboard-stands',
      'chalk-markers',
      'handmade-sealed-bags',
      'dome-containers',
      'wooden-display-risers',
      'adjustable-pedestal-stand',
      'cupcake-baking-cups',
      'ice-pack-sheets',
    ],
    price: 48000,
    image: '/products/display-risers/wood-risers.jpg',
  },
  {
    slug: 'big-tings-a-gwaan',
    name: 'Big Tings A Gwaan',
    tagline: 'Full setup. Zero compromise. Every event, every time.',
    jamaicaMeaning: 'Major things are happening \u2014 top Jamaican expression',
    tier: 'expert',
    description:
      'The complete professional vendor ecosystem. Digital signage, content creation camera, canopy shelter, cold chain, and every product we offer \u2014 for the vendor anchoring a market or running a catering booth at a festival.',
    includedProductSlugs: [
      'mini-chalkboard-stands',
      'chalk-markers',
      'handmade-sealed-bags',
      'dome-containers',
      'wooden-display-risers',
      'adjustable-pedestal-stand',
      'cupcake-baking-cups',
      'ice-pack-sheets',
      'popup-canopy-tent',
      'digital-signage-display',
      'pocket-camera',
    ],
    price: 245000,
    image: '/products/digital-signage/cafe-use.jpg',
  },
];

export function getVendorKitBySlug(slug: string): VendorKit | undefined {
  return vendorKits.find((k) => k.slug === slug);
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds, static pages generated including new product slugs (`ice-pack-sheets`, `popup-canopy-tent`, `baking-cups-100pc`)

- [ ] **Step 6: Commit**

```bash
git add public/products/chalkboard-stands/boxed-set.jpg src/data/products.ts src/data/categories.ts src/data/vendor-kits.ts
git commit -m "feat: add 3 new products, set all JMD prices, add 2 categories"
```

---

## Task 3: Delivery Configuration & Calculator Hook

**Files:**
- Create: `src/data/delivery-config.ts`
- Create: `src/hooks/useDeliveryCalculator.ts`

- [ ] **Step 1: Create delivery-config.ts**

```typescript
// src/data/delivery-config.ts
import type { DeliveryZone, DeliveryZoneId } from '@/types';

export const deliveryZones: Record<DeliveryZoneId, DeliveryZone> = {
  'kingston-metro': {
    id: 'kingston-metro',
    name: 'Kingston Metro',
    baseRate: 1050,
    perAdditionalItem: 260,
    freeShippingThreshold: 15000,
    estimatedDays: '1-2 business days',
  },
  'rest-of-jamaica': {
    id: 'rest-of-jamaica',
    name: 'Rest of Jamaica',
    baseRate: 1950,
    perAdditionalItem: 455,
    freeShippingThreshold: 25000,
    estimatedDays: '2-4 business days',
  },
  caribbean: {
    id: 'caribbean',
    name: 'Caribbean',
    baseRate: 5850,
    perAdditionalItem: 1300,
    freeShippingThreshold: null,
    estimatedDays: '7-14 business days',
  },
  'north-america': {
    id: 'north-america',
    name: 'North America',
    baseRate: 9750,
    perAdditionalItem: 1950,
    freeShippingThreshold: null,
    estimatedDays: '10-21 business days',
  },
  'uk-europe': {
    id: 'uk-europe',
    name: 'UK & Europe',
    baseRate: 12350,
    perAdditionalItem: 2600,
    freeShippingThreshold: null,
    estimatedDays: '14-28 business days',
  },
};

export const deliveryConfig = {
  fuelSurchargePercent: 8,
  peakSeasons: [
    { name: 'Christmas', start: '11-15', end: '01-05', surchargePercent: 15 },
    { name: 'Easter', start: '03-28', end: '04-15', surchargePercent: 10 },
    { name: 'Independence', start: '08-01', end: '08-10', surchargePercent: 10 },
  ],
  rushDeliveryMultiplier: 1.5,
  bulkyItemSurcharge: { local: 500, international: 2500 },
};

export const jamaicaParishes: Record<DeliveryZoneId, string[]> = {
  'kingston-metro': ['Kingston', 'St. Andrew', 'St. Catherine'],
  'rest-of-jamaica': [
    'St. Thomas',
    'Portland',
    'St. Mary',
    'St. Ann',
    'Trelawny',
    'St. James',
    'Hanover',
    'Westmoreland',
    'St. Elizabeth',
    'Manchester',
    'Clarendon',
  ],
  caribbean: [],
  'north-america': [],
  'uk-europe': [],
};

// Map ISO country codes to delivery zones
export const countryToZone: Record<string, DeliveryZoneId> = {
  JM: 'kingston-metro', // default for Jamaica, user picks parish to refine
  TT: 'caribbean',
  BB: 'caribbean',
  BS: 'caribbean',
  KY: 'caribbean',
  AG: 'caribbean',
  GD: 'caribbean',
  LC: 'caribbean',
  VC: 'caribbean',
  DM: 'caribbean',
  KN: 'caribbean',
  GY: 'caribbean',
  SR: 'caribbean',
  US: 'north-america',
  CA: 'north-america',
  GB: 'uk-europe',
  IE: 'uk-europe',
  FR: 'uk-europe',
  DE: 'uk-europe',
  NL: 'uk-europe',
  ES: 'uk-europe',
};

export function isLocalZone(zoneId: DeliveryZoneId): boolean {
  return zoneId === 'kingston-metro' || zoneId === 'rest-of-jamaica';
}
```

- [ ] **Step 2: Create useDeliveryCalculator hook**

```typescript
// src/hooks/useDeliveryCalculator.ts
'use client';

import { useMemo } from 'react';
import type { CartItem, DeliveryResult, DeliveryZoneId } from '@/types';
import { deliveryZones, deliveryConfig, isLocalZone } from '@/data/delivery-config';

function isInPeakSeason(date: Date): number {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const mmdd = `${mm}-${dd}`;

  for (const season of deliveryConfig.peakSeasons) {
    const wrapsYear = season.end < season.start; // e.g. 11-15 to 01-05
    if (wrapsYear) {
      if (mmdd >= season.start || mmdd <= season.end) return season.surchargePercent;
    } else {
      if (mmdd >= season.start && mmdd <= season.end) return season.surchargePercent;
    }
  }
  return 0;
}

export function calculateDelivery(
  zoneId: DeliveryZoneId,
  items: CartItem[],
  rushDelivery = false
): DeliveryResult {
  const zone = deliveryZones[zoneId];
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  // Check free shipping
  const isFreeShipping =
    zone.freeShippingThreshold !== null && subtotal >= zone.freeShippingThreshold;

  if (isFreeShipping) {
    return {
      zone,
      baseRate: 0,
      fuelSurcharge: 0,
      peakSurcharge: 0,
      bulkyItemSurcharge: 0,
      rushSurcharge: 0,
      total: 0,
      isFreeShipping: true,
    };
  }

  // Base rate + per-additional-item
  const baseRate =
    totalItems <= 1
      ? zone.baseRate
      : zone.baseRate + (totalItems - 1) * zone.perAdditionalItem;

  // Fuel surcharge
  const fuelSurcharge = Math.round(
    baseRate * (deliveryConfig.fuelSurchargePercent / 100)
  );

  // Peak season surcharge
  const peakPercent = isInPeakSeason(new Date());
  const peakSurcharge = Math.round(baseRate * (peakPercent / 100));

  // Bulky item surcharge
  const bulkyCount = items.filter((item) => item.product.bulkyItem).length;
  const bulkySurchargePerItem = isLocalZone(zoneId)
    ? deliveryConfig.bulkyItemSurcharge.local
    : deliveryConfig.bulkyItemSurcharge.international;
  const bulkyItemSurcharge = bulkyCount * bulkySurchargePerItem;

  // Rush delivery
  const subtotalBeforeRush =
    baseRate + fuelSurcharge + peakSurcharge + bulkyItemSurcharge;
  const rushSurcharge =
    rushDelivery && zoneId === 'kingston-metro'
      ? Math.round(
          subtotalBeforeRush * (deliveryConfig.rushDeliveryMultiplier - 1)
        )
      : 0;

  return {
    zone,
    baseRate,
    fuelSurcharge,
    peakSurcharge,
    bulkyItemSurcharge,
    rushSurcharge,
    total: subtotalBeforeRush + rushSurcharge,
    isFreeShipping: false,
  };
}

export function useDeliveryCalculator(
  zoneId: DeliveryZoneId,
  items: CartItem[],
  rushDelivery = false
): DeliveryResult {
  return useMemo(
    () => calculateDelivery(zoneId, items, rushDelivery),
    [zoneId, items, rushDelivery]
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/data/delivery-config.ts src/hooks/useDeliveryCalculator.ts
git commit -m "feat: add delivery zone config and calculator hook"
```

---

## Task 4: Currency Configuration, Exchange Rate API & Geo Hook

**Files:**
- Create: `src/data/currency-config.ts`
- Create: `src/app/api/exchange-rates/route.ts`
- Create: `src/hooks/useGeoPrice.ts`
- Modify: `src/lib/utils.ts`

- [ ] **Step 1: Create currency-config.ts**

```typescript
// src/data/currency-config.ts
import type { CurrencyInfo, ExchangeRates } from '@/types';

export const currencyMap: Record<string, CurrencyInfo> = {
  JM: { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar' },
  US: { code: 'USD', symbol: 'US$', name: 'US Dollar' },
  CA: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  GB: { code: 'GBP', symbol: '\u00a3', name: 'British Pound' },
  IE: { code: 'GBP', symbol: '\u00a3', name: 'British Pound' },
  TT: { code: 'TTD', symbol: 'TT$', name: 'Trinidad Dollar' },
  BB: { code: 'BBD', symbol: 'BDS$', name: 'Barbados Dollar' },
};

export const defaultCurrency: CurrencyInfo = {
  code: 'USD',
  symbol: 'US$',
  name: 'US Dollar',
};

// Fallback rates: JMD to target currency (approximate, used if API fails)
export const fallbackRates: ExchangeRates = {
  USD: 0.00641,   // 1 JMD = 0.00641 USD (1 USD ~= 156 JMD)
  CAD: 0.00884,   // 1 JMD = 0.00884 CAD
  GBP: 0.00512,   // 1 JMD = 0.00512 GBP
  TTD: 0.0435,    // 1 JMD = 0.0435 TTD
  BBD: 0.01282,   // 1 JMD = 0.01282 BBD
};

export function getCurrencyForCountry(countryCode: string): CurrencyInfo {
  return currencyMap[countryCode] || defaultCurrency;
}
```

- [ ] **Step 2: Create exchange rate API route with ISR caching**

```typescript
// src/app/api/exchange-rates/route.ts
import { NextResponse } from 'next/server';
import { fallbackRates } from '@/data/currency-config';

export const revalidate = 86400; // 24 hours

export async function GET() {
  try {
    const res = await fetch(
      'https://api.exchangerate-api.com/v4/latest/JMD',
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) {
      return NextResponse.json({ rates: fallbackRates, source: 'fallback' });
    }

    const data = await res.json();
    const rates = {
      USD: data.rates.USD,
      CAD: data.rates.CAD,
      GBP: data.rates.GBP,
      TTD: data.rates.TTD,
      BBD: data.rates.BBD,
    };

    return NextResponse.json({ rates, source: 'live' });
  } catch {
    return NextResponse.json({ rates: fallbackRates, source: 'fallback' });
  }
}
```

- [ ] **Step 3: Create useGeoPrice hook**

```typescript
// src/hooks/useGeoPrice.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CurrencyInfo, ExchangeRates } from '@/types';
import { getCurrencyForCountry, fallbackRates } from '@/data/currency-config';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

interface GeoPriceState {
  country: string;
  currency: CurrencyInfo;
  rates: ExchangeRates;
  isJamaica: boolean;
  loading: boolean;
}

export function useGeoPrice() {
  const [state, setState] = useState<GeoPriceState>({
    country: 'JM',
    currency: { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar' },
    rates: fallbackRates,
    isJamaica: true,
    loading: true,
  });

  useEffect(() => {
    const country = getCookie('cc-country') || 'JM';
    const currency = getCurrencyForCountry(country);

    // Fetch exchange rates
    fetch('/api/exchange-rates')
      .then((res) => res.json())
      .then((data) => {
        setState({
          country,
          currency,
          rates: data.rates,
          isJamaica: country === 'JM',
          loading: false,
        });
      })
      .catch(() => {
        setState({
          country,
          currency,
          rates: fallbackRates,
          isJamaica: country === 'JM',
          loading: false,
        });
      });
  }, []);

  const setCountry = useCallback((countryCode: string) => {
    setCookie('cc-country', countryCode, 365);
    const currency = getCurrencyForCountry(countryCode);
    setState((prev) => ({
      ...prev,
      country: countryCode,
      currency,
      isJamaica: countryCode === 'JM',
    }));
  }, []);

  const formatGeoPrice = useCallback(
    (jmdAmount: number | null): string => {
      if (jmdAmount === null) return 'Price TBD';
      const jmd = `J$${jmdAmount.toLocaleString('en-JM')}`;
      if (state.isJamaica) return jmd;

      const rate = state.rates[state.currency.code];
      if (!rate) return jmd;

      const converted = Math.round(jmdAmount * rate);
      return `${jmd} (~${state.currency.symbol}${converted.toLocaleString()})`;
    },
    [state.isJamaica, state.rates, state.currency]
  );

  return { ...state, setCountry, formatGeoPrice };
}
```

- [ ] **Step 4: Add formatGeoPrice standalone utility to utils.ts**

Add at the end of `src/lib/utils.ts`:

```typescript
export function convertJmdTo(
  jmdAmount: number,
  rate: number,
  symbol: string
): string {
  const converted = Math.round(jmdAmount * rate);
  return `~${symbol}${converted.toLocaleString()}`;
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add src/data/currency-config.ts src/app/api/exchange-rates/route.ts src/hooks/useGeoPrice.ts src/lib/utils.ts
git commit -m "feat: add currency config, exchange rate API, and geo price hook"
```

---

## Task 5: Edge Middleware for Geo-Detection

**Files:**
- Create: `middleware.ts` (project root, next to `next.config.ts`)

- [ ] **Step 1: Create middleware.ts**

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Only set cookie if not already present (respect manual override)
  if (!request.cookies.get('cc-country')) {
    const country = request.geo?.country || 'JM';
    response.cookies.set('cc-country', country, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  // Run on all pages except API routes, static files, and Next.js internals
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|products/).*)'],
};
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds. Middleware is detected by Next.js automatically.

- [ ] **Step 3: Commit**

```bash
git add middleware.ts
git commit -m "feat: add edge middleware for geo-detection"
```

---

## Task 6: Currency Selector Component

**Files:**
- Create: `src/components/layout/CurrencySelector.tsx`
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Create CurrencySelector component**

```tsx
// src/components/layout/CurrencySelector.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useGeoPrice } from '@/hooks/useGeoPrice';

const countries = [
  { code: 'JM', flag: '\ud83c\uddef\ud83c\uddf2', label: 'Jamaica (JMD)' },
  { code: 'US', flag: '\ud83c\uddfa\ud83c\uddf8', label: 'USA (USD)' },
  { code: 'CA', flag: '\ud83c\udde8\ud83c\udde6', label: 'Canada (CAD)' },
  { code: 'GB', flag: '\ud83c\uddec\ud83c\udde7', label: 'UK (GBP)' },
  { code: 'TT', flag: '\ud83c\uddf9\ud83c\uddf9', label: 'Trinidad (TTD)' },
  { code: 'BB', flag: '\ud83c\udde7\ud83c\udde7', label: 'Barbados (BBD)' },
];

export function CurrencySelector() {
  const { country, currency, setCountry } = useGeoPrice();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = countries.find((c) => c.code === country) || countries[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-crown-muted hover:text-crown-lime transition-colors rounded-lg hover:bg-crown-dark-surface"
        aria-label="Change currency"
      >
        <Globe size={14} />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{currency.code}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-crown-dark-card border border-crown-dark-surface rounded-xl shadow-2xl overflow-hidden z-50">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCountry(c.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                c.code === country
                  ? 'bg-crown-lime/10 text-crown-lime'
                  : 'text-crown-muted hover:text-crown-white hover:bg-crown-dark-surface'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add CurrencySelector to Header**

In `src/components/layout/Header.tsx`, add the import at the top:

```typescript
import { CurrencySelector } from '@/components/layout/CurrencySelector';
```

Then insert `<CurrencySelector />` inside the `<div className="flex items-center gap-3">` block, right before the cart button. Find this code (around line 53):

```tsx
          <div className="flex items-center gap-3">
            {/* Cart button */}
```

Replace with:

```tsx
          <div className="flex items-center gap-3">
            <CurrencySelector />
            {/* Cart button */}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/CurrencySelector.tsx src/components/layout/Header.tsx
git commit -m "feat: add currency selector to header with geo-detection"
```

---

## Task 7: Delivery Estimator Component

**Files:**
- Create: `src/components/products/DeliveryEstimator.tsx`

- [ ] **Step 1: Create DeliveryEstimator component**

```tsx
// src/components/products/DeliveryEstimator.tsx
'use client';

import { useState } from 'react';
import { Truck, Zap } from 'lucide-react';
import type { Product, DeliveryZoneId } from '@/types';
import { calculateDelivery } from '@/hooks/useDeliveryCalculator';
import { deliveryZones, jamaicaParishes } from '@/data/delivery-config';
import { useGeoPrice } from '@/hooks/useGeoPrice';
import { formatJMD } from '@/lib/utils';

const allParishes = [
  ...jamaicaParishes['kingston-metro'],
  ...jamaicaParishes['rest-of-jamaica'],
];

function parishToZone(parish: string): DeliveryZoneId {
  if (jamaicaParishes['kingston-metro'].includes(parish)) return 'kingston-metro';
  return 'rest-of-jamaica';
}

export function DeliveryEstimator({ product }: { product: Product }) {
  const { country } = useGeoPrice();
  const isJamaica = country === 'JM';

  const [selectedParish, setSelectedParish] = useState('Kingston');
  const [selectedZone, setSelectedZone] = useState<DeliveryZoneId>(
    isJamaica ? 'kingston-metro' : 'north-america'
  );
  const [rushDelivery, setRushDelivery] = useState(false);

  const zoneId = isJamaica ? parishToZone(selectedParish) : selectedZone;
  const result = calculateDelivery(
    zoneId,
    [{ product, quantity: 1 }],
    rushDelivery
  );

  return (
    <div className="bg-crown-dark-card rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-bold text-crown-white">
        <Truck size={16} className="text-crown-lime" />
        Delivery Estimate
      </div>

      {isJamaica ? (
        <select
          value={selectedParish}
          onChange={(e) => setSelectedParish(e.target.value)}
          className="w-full bg-crown-dark-surface border border-crown-dark-surface rounded-lg px-3 py-2 text-sm text-crown-white focus:border-crown-lime focus:outline-none"
        >
          {allParishes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      ) : (
        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value as DeliveryZoneId)}
          className="w-full bg-crown-dark-surface border border-crown-dark-surface rounded-lg px-3 py-2 text-sm text-crown-white focus:border-crown-lime focus:outline-none"
        >
          {Object.values(deliveryZones)
            .filter((z) => z.id !== 'kingston-metro' && z.id !== 'rest-of-jamaica')
            .map((z) => (
              <option key={z.id} value={z.id}>
                {z.name}
              </option>
            ))}
        </select>
      )}

      {result.isFreeShipping ? (
        <p className="text-sm text-crown-lime font-bold">Free delivery!</p>
      ) : (
        <div className="space-y-1 text-xs text-crown-muted">
          <div className="flex justify-between">
            <span>Base delivery</span>
            <span className="text-crown-white">{formatJMD(result.baseRate)}</span>
          </div>
          {result.fuelSurcharge > 0 && (
            <div className="flex justify-between">
              <span>Fuel surcharge</span>
              <span className="text-crown-white">{formatJMD(result.fuelSurcharge)}</span>
            </div>
          )}
          {result.peakSurcharge > 0 && (
            <div className="flex justify-between">
              <span>Peak season</span>
              <span className="text-crown-white">{formatJMD(result.peakSurcharge)}</span>
            </div>
          )}
          {result.bulkyItemSurcharge > 0 && (
            <div className="flex justify-between">
              <span>Bulky item</span>
              <span className="text-crown-white">{formatJMD(result.bulkyItemSurcharge)}</span>
            </div>
          )}
          {result.rushSurcharge > 0 && (
            <div className="flex justify-between">
              <span>Rush delivery</span>
              <span className="text-crown-white">{formatJMD(result.rushSurcharge)}</span>
            </div>
          )}
          <div className="flex justify-between pt-1 border-t border-crown-dark-surface font-bold">
            <span className="text-crown-white">Total delivery</span>
            <span className="text-crown-lime">{formatJMD(result.total)}</span>
          </div>
        </div>
      )}

      <p className="text-xs text-crown-muted">
        Estimated: {result.zone.estimatedDays}
      </p>

      {zoneId === 'kingston-metro' && (
        <label className="flex items-center gap-2 text-xs text-crown-muted cursor-pointer">
          <input
            type="checkbox"
            checked={rushDelivery}
            onChange={(e) => setRushDelivery(e.target.checked)}
            className="accent-crown-lime"
          />
          <Zap size={12} className="text-amber-400" />
          Rush delivery (same/next day)
        </label>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/products/DeliveryEstimator.tsx
git commit -m "feat: add delivery estimator component with dynamic surcharges"
```

---

## Task 8: Delivery Breakdown Component for Cart

**Files:**
- Create: `src/components/cart/DeliveryBreakdown.tsx`

- [ ] **Step 1: Create DeliveryBreakdown component**

```tsx
// src/components/cart/DeliveryBreakdown.tsx
'use client';

import { useState } from 'react';
import { Truck } from 'lucide-react';
import type { CartItem, DeliveryZoneId } from '@/types';
import { calculateDelivery } from '@/hooks/useDeliveryCalculator';
import { jamaicaParishes } from '@/data/delivery-config';
import { useGeoPrice } from '@/hooks/useGeoPrice';
import { formatJMD } from '@/lib/utils';

const allParishes = [
  ...jamaicaParishes['kingston-metro'],
  ...jamaicaParishes['rest-of-jamaica'],
];

function parishToZone(parish: string): DeliveryZoneId {
  if (jamaicaParishes['kingston-metro'].includes(parish)) return 'kingston-metro';
  return 'rest-of-jamaica';
}

const internationalZones: { id: DeliveryZoneId; name: string }[] = [
  { id: 'caribbean', name: 'Caribbean' },
  { id: 'north-america', name: 'North America' },
  { id: 'uk-europe', name: 'UK & Europe' },
];

export function DeliveryBreakdown({ items }: { items: CartItem[] }) {
  const { country } = useGeoPrice();
  const isJamaica = country === 'JM';

  const [selectedParish, setSelectedParish] = useState('Kingston');
  const [selectedZone, setSelectedZone] = useState<DeliveryZoneId>(
    isJamaica ? 'kingston-metro' : 'north-america'
  );

  const zoneId = isJamaica ? parishToZone(selectedParish) : selectedZone;
  const result = calculateDelivery(zoneId, items);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-bold text-crown-white">
        <Truck size={14} className="text-crown-lime" />
        Delivery
      </div>

      {isJamaica ? (
        <select
          value={selectedParish}
          onChange={(e) => setSelectedParish(e.target.value)}
          className="w-full bg-crown-dark border border-crown-dark-surface rounded-lg px-2 py-1.5 text-xs text-crown-white focus:border-crown-lime focus:outline-none"
        >
          {allParishes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      ) : (
        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value as DeliveryZoneId)}
          className="w-full bg-crown-dark border border-crown-dark-surface rounded-lg px-2 py-1.5 text-xs text-crown-white focus:border-crown-lime focus:outline-none"
        >
          {internationalZones.map((z) => (
            <option key={z.id} value={z.id}>
              {z.name}
            </option>
          ))}
        </select>
      )}

      {result.isFreeShipping ? (
        <p className="text-xs text-crown-lime font-bold">Free delivery!</p>
      ) : (
        <div className="space-y-0.5 text-xs text-crown-muted">
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="text-crown-white">{formatJMD(result.total)}</span>
          </div>
          <p className="text-[10px]">
            Est. {result.zone.estimatedDays}
          </p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/cart/DeliveryBreakdown.tsx
git commit -m "feat: add delivery breakdown component for cart drawer"
```

---

## Task 9: Integrate Geo Pricing into ProductCard

**Files:**
- Modify: `src/components/products/ProductCard.tsx`

- [ ] **Step 1: Update ProductCard to use geo pricing**

Replace the full file `src/components/products/ProductCard.tsx`:

```tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useGeoPrice } from '@/hooks/useGeoPrice';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { formatGeoPrice } = useGeoPrice();

  return (
    <div className="bg-crown-dark-card rounded-2xl overflow-hidden border border-crown-dark-surface hover:border-crown-lime/30 transition-all duration-300 h-full flex flex-col group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-bold text-crown-lime uppercase tracking-wider">
          {product.category.replace(/-/g, ' ')}
        </span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading text-lg font-bold text-crown-white mt-1 group-hover:text-crown-lime transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-crown-muted mt-2 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-heading text-lg font-bold text-crown-lime">
            {formatGeoPrice(product.price)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-2 px-4 py-2 bg-crown-lime text-crown-dark text-sm font-bold rounded-full hover:bg-crown-lime/90 transition-colors"
          >
            <ShoppingBag size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/products/ProductCard.tsx
git commit -m "feat: integrate geo pricing into product cards"
```

---

## Task 10: Integrate Geo Pricing & Delivery into ProductDetail

**Files:**
- Modify: `src/app/products/[slug]/ProductDetail.tsx`

- [ ] **Step 1: Update ProductDetail — add geo pricing, delivery estimator, update info box**

Replace the full file `src/app/products/[slug]/ProductDetail.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, ShoppingBag, MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useGeoPrice } from '@/hooks/useGeoPrice';
import { DeliveryEstimator } from '@/components/products/DeliveryEstimator';
import type { Product } from '@/types';
import { products } from '@/data/products';

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const { addItem, setIsOpen } = useCart();
  const { formatGeoPrice } = useGeoPrice();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product);
    setIsOpen(true);
  };

  return (
    <section className="py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-crown-muted hover:text-crown-lime transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-crown-dark-card">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                      i === activeImage
                        ? 'border-crown-lime'
                        : 'border-crown-dark-surface hover:border-crown-muted'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-crown-lime uppercase tracking-wider">
                {product.category.replace(/-/g, ' ')}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white mt-2">
                {product.name}
              </h1>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-heading text-2xl font-bold text-crown-lime">
                  {formatGeoPrice(product.price)}
                </span>
              </div>
            </div>

            <p className="text-crown-muted leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="font-heading text-sm font-bold text-crown-white uppercase tracking-wider mb-3">
                Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-crown-muted">
                    <Check size={16} className="text-crown-lime mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            {product.specs && (
              <div>
                <h3 className="font-heading text-sm font-bold text-crown-white uppercase tracking-wider mb-3">
                  Specifications
                </h3>
                <div className="bg-crown-dark-card rounded-xl p-4 space-y-2">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-crown-muted">{key}</span>
                      <span className="text-crown-white font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-crown-lime text-crown-dark font-bold rounded-full hover:bg-crown-lime/90 transition-all"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <a
                href={whatsappLink(
                  `Hi Crown Crumb! I'm interested in the ${product.name}. Can I get pricing and availability?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#25D366] text-[#25D366] font-bold rounded-full hover:bg-[#25D366]/10 transition-all"
              >
                <MessageCircle size={18} />
                Ask on WhatsApp
              </a>
            </div>

            {/* Delivery Estimator */}
            <DeliveryEstimator product={product} />

            {/* Payment info */}
            <div className="bg-crown-dark-card rounded-xl p-4 space-y-2 text-xs text-crown-muted">
              <p><span className="text-crown-white font-bold">Payment:</span> Bank Deposit (NCB/Scotiabank) or Online Payment.</p>
              <p><span className="text-crown-white font-bold">Currency:</span> All prices in Jamaican Dollars (JMD). International visitors see approximate conversions.</p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-crown-white mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
                  <div className="bg-crown-dark-card rounded-2xl overflow-hidden border border-crown-dark-surface hover:border-crown-lime/30 transition-all">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-bold text-crown-white group-hover:text-crown-lime transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm text-crown-lime mt-1 font-bold">
                        {formatGeoPrice(p.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/products/[slug]/ProductDetail.tsx
git commit -m "feat: integrate geo pricing and delivery estimator into product detail"
```

---

## Task 11: Integrate Delivery Breakdown into Cart Drawer

**Files:**
- Modify: `src/components/cart/CartDrawer.tsx`

- [ ] **Step 1: Update CartDrawer — add delivery breakdown, geo pricing**

Replace the full file `src/components/cart/CartDrawer.tsx`:

```tsx
'use client';

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice, whatsappLink } from '@/lib/utils';
import { useGeoPrice } from '@/hooks/useGeoPrice';
import { DeliveryBreakdown } from '@/components/cart/DeliveryBreakdown';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice, clearCart } =
    useCart();
  const { formatGeoPrice } = useGeoPrice();

  if (!isOpen) return null;

  const checkoutMessage = items
    .map(
      (item) =>
        `- ${item.product.name} x${item.quantity}${item.product.price ? ` (${formatPrice(item.product.price * item.quantity)})` : ' (Price TBD)'}`
    )
    .join('\n');

  const whatsappCheckout = whatsappLink(
    `Hi Crown Crumb! I'd like to order:\n\n${checkoutMessage}\n\nTotal: ${totalPrice > 0 ? formatPrice(totalPrice) : 'Please confirm pricing'}\n\nPlease confirm availability and total with delivery.`
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-crown-dark-card border-l border-crown-dark-surface shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-crown-dark-surface">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-crown-lime" />
            <h2 className="font-heading text-lg font-bold text-crown-white">
              Your Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-crown-muted hover:text-crown-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={48} className="text-crown-dark-surface mx-auto mb-4" />
              <p className="text-crown-muted text-sm">Your cart is empty</p>
              <p className="text-crown-muted text-xs mt-1">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.slug}
                  className="flex gap-4 p-3 bg-crown-dark-surface rounded-xl"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-crown-white truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-crown-lime mt-0.5">
                      {formatGeoPrice(item.product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                        className="p-1 bg-crown-dark rounded-md text-crown-muted hover:text-crown-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold text-crown-white w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                        className="p-1 bg-crown-dark rounded-md text-crown-muted hover:text-crown-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.slug)}
                        className="ml-auto p-1 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-crown-dark-surface space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-crown-muted">Subtotal</span>
              <span className="font-heading text-lg font-bold text-crown-lime">
                {totalPrice > 0 ? formatGeoPrice(totalPrice) : 'Pricing TBD'}
              </span>
            </div>

            <DeliveryBreakdown items={items} />

            <a
              href={whatsappCheckout}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-[#25D366] text-white text-center font-bold rounded-full hover:bg-[#22c55e] transition-colors"
            >
              Checkout via WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="block w-full py-2 text-sm text-crown-muted hover:text-red-400 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/cart/CartDrawer.tsx
git commit -m "feat: integrate delivery breakdown and geo pricing into cart drawer"
```

---

## Task 12: Final Build, Visual Verification & Deploy

**Files:** None (verification only)

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Build succeeds with all 12 product detail pages generated (including 3 new ones)

- [ ] **Step 2: Start dev server and verify**

Run: `npm run dev`

Check these pages in browser:
1. `http://localhost:3000/products` — all 12 products show with real JMD prices
2. `http://localhost:3000/products/ice-pack-sheets` — new product page loads with 3 images
3. `http://localhost:3000/products/popup-canopy-tent` — new product page loads with 2 images
4. `http://localhost:3000/products/baking-cups-100pc` — new product page loads with 1 image
5. `http://localhost:3000/products/mini-chalkboard-stands` — 6 images in gallery (including new boxed-set.jpg)
6. `http://localhost:3000/vendor-kits` — all 3 kits show prices (J$17,500 / J$48,000 / J$245,000)
7. Header shows currency selector (globe icon + flag)
8. Product detail pages show delivery estimator with parish dropdown
9. Cart drawer shows delivery breakdown when items added
10. Filter by new categories (cold-chain, canopy-tents) works on products page

- [ ] **Step 3: Push and deploy**

```bash
git push origin master
```

Verify Vercel auto-deploys. Check live site at `https://crown-crumb-ja.vercel.app/products`.

- [ ] **Step 4: Verify geo-detection on live site**

Visit `https://crown-crumb-ja.vercel.app` — since you're in the US/Jamaica, check that:
- Currency selector appears in header
- Switching to "USA (USD)" shows `J$7,500 (~US$48)` format on product cards
- Switching back to "Jamaica (JMD)" shows `J$7,500` only
- Delivery estimator on product detail shows parish dropdown for Jamaica, zone dropdown for international

---

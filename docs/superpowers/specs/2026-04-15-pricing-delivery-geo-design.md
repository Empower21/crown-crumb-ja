# Crown Crumb JA — Pricing, Delivery Calculator & Geo-Currency

**Date:** 2026-04-15
**Status:** Approved
**Approach:** Edge Middleware (Vercel request.geo + ISR-cached exchange rates)

---

## 1. Product Catalog & Image Updates

### 3 New Products

| Product | Slug | Category | Images |
|---|---|---|---|
| Ice Pack Sheets (6 sheets, 144 cells) | `ice-pack-sheets` | `cold-chain` | `cold-chain/ice-packs-sheets.jpg`, `cold-chain/ice-packs-comparison.jpg`, `cold-chain/ice-packs-instructions.jpg` |
| Pop-Up Canopy Tent (10x10 ft) | `popup-canopy-tent` | `canopy-tents` | `canopy-tents/canopy-tent.jpg`, `canopy-tents/canopy-outdoor.jpg` |
| Baking Cups Set 100pc (gold/black) | `baking-cups-100pc` | `baking-supplies` | `baking-kits/all-in-one-set.jpg` |

### 2 New Categories

| Slug | Name | Icon | Hero Image |
|---|---|---|---|
| `cold-chain` | Cold Chain & Transport | `Snowflake` | `cold-chain/ice-packs-sheets.jpg` |
| `canopy-tents` | Canopy & Shelter | `Tent` | `canopy-tents/canopy-tent.jpg` |

### Image Fix

- Copy `Images/IMG_0645.JPG` → `public/products/chalkboard-stands/boxed-set.jpg`
- Add to `mini-chalkboard-stands` images array

### Vendor Kit Updates

- **Run Di Vibes** (intermediate): add `ice-pack-sheets`
- **Big Tings A Gwaan** (expert): add `ice-pack-sheets` + `popup-canopy-tent`

### Category Count Updates

- `baking-supplies`: 1 → 2
- New: `cold-chain`: 1
- New: `canopy-tents`: 1
- `vendor-kits`: stays at 3

---

## 2. Pricing Structure

All prices in JMD. Based on market research: Amazon source price x 2-3x markup covering Jamaica import duty (20-25%), GCT (15%), shipping, brokerage, and profit margin.

### Individual Products

| Slug | Product | JMD Price |
|---|---|---|
| `mini-chalkboard-stands` | Mini Chalkboard Stands (20pc) | 7,500 |
| `adjustable-pedestal-stand` | Adjustable Pedestal Sign Stand | 16,500 |
| `chalk-markers` | Chalk Markers — 12 Colours | 4,500 |
| `wooden-display-risers` | Wooden Display Risers (3-tier) | 14,500 |
| `dome-containers` | Dome Display Containers (50pc) | 5,800 |
| `handmade-sealed-bags` | "Hand Made" Sealed Bags (100pc) | 3,500 |
| `cupcake-baking-cups` | Cupcake Baking Cups (50pc) | 6,500 |
| `digital-signage-display` | Digital Signage Table Talker | 125,000 |
| `pocket-camera` | Pocket Camera Gimbal | 55,000 |
| `ice-pack-sheets` | Ice Pack Sheets (144 cells) | 5,500 |
| `popup-canopy-tent` | Pop-Up Canopy Tent (10x10) | 48,000 |
| `baking-cups-100pc` | Baking Cups Set 100pc | 8,500 |

### Vendor Kits (bundled ~16-18% discount)

| Slug | Kit | Included | Kit Price |
|---|---|---|---|
| `likkle-but-tallawah` | Likkle But Tallawah | chalkboard-stands, chalk-markers, sealed-bags, dome-containers | 17,500 |
| `run-di-vibes` | Run Di Vibes | above + display-risers, pedestal-stand, baking-cups-50pc, ice-packs | 48,000 |
| `big-tings-a-gwaan` | Big Tings A Gwaan | above + digital-signage, pocket-camera, canopy-tent | 245,000 |

### Product Flags

Add `bulkyItem: boolean` to Product type. Flagged products:
- `popup-canopy-tent`
- `digital-signage-display`
- `adjustable-pedestal-stand`

---

## 3. Delivery Calculator

### Zone Definitions

| Zone ID | Zone Name | Coverage | Estimated Delivery |
|---|---|---|---|
| `kingston-metro` | Kingston Metro | Kingston, St. Andrew, St. Catherine | 1-2 business days |
| `rest-of-jamaica` | Rest of Jamaica | Remaining 11 parishes | 2-4 business days |
| `caribbean` | Caribbean | TT, BB, BS, KY, AG, GD, LC, VC, DM, KN, GY, SR | 7-14 business days |
| `north-america` | North America | US, CA | 10-21 business days |
| `uk-europe` | UK & Europe | GB, IE, FR, DE, NL, ES | 14-28 business days |

### Base Rates (with 30% uplift for fuel/congestion)

| Zone | Base Rate (JMD) | Per Additional Item (JMD) | Free Shipping Threshold |
|---|---|---|---|
| Kingston Metro | 1,050 | 260 | J$15,000 |
| Rest of Jamaica | 1,950 | 455 | J$25,000 |
| Caribbean | 5,850 | 1,300 | None |
| North America | 9,750 | 1,950 | None |
| UK & Europe | 12,350 | 2,600 | None |

### Dynamic Surcharges

| Factor | Trigger | Surcharge |
|---|---|---|
| Fuel surcharge | Always-on, configurable % | Default 8% on base rate |
| Peak season | Date ranges (auto-activate) | +15% Christmas (Nov 15 - Jan 5), +10% Easter (Mar 28 - Apr 15), +10% Independence (Aug 1 - Aug 10) |
| Bulky item | Product `bulkyItem: true` | +J$500 local / +J$2,500 international |
| Rush delivery | Customer opt-in, Kingston Metro only | +50% on total delivery cost |

### Configuration Object

All delivery config lives in `src/data/delivery-config.ts`:

```typescript
export const deliveryConfig = {
  fuelSurchargePercent: 8,
  peakSeasons: [
    { name: 'Christmas', start: '11-15', end: '01-05', surchargePercent: 15 },
    { name: 'Easter', start: '03-28', end: '04-15', surchargePercent: 10 },
    { name: 'Independence', start: '08-01', end: '08-10', surchargePercent: 10 },
  ],
  rushDeliveryMultiplier: 1.5,
  bulkyItemSurcharge: { local: 500, international: 2500 },
  zones: { /* rates as above */ },
  jamaicaParishes: {
    'kingston-metro': ['Kingston', 'St. Andrew', 'St. Catherine'],
    'rest-of-jamaica': ['St. Thomas', 'Portland', 'St. Mary', 'St. Ann',
      'Trelawny', 'St. James', 'Hanover', 'Westmoreland',
      'St. Elizabeth', 'Manchester', 'Clarendon'],
  },
};
```

### Delivery Display (transparent breakdown)

```
Delivery to: St. Andrew, Kingston
-----------------------------------
Base delivery          J$1,050
Fuel surcharge (8%)       J$84
Bulky item (Canopy)      J$500
-----------------------------------
Total delivery         J$1,634
-----------------------------------
Estimated: 1-2 business days
```

### UX Placement

- **Product page**: compact delivery estimator below "Add to Cart" — parish/country dropdown
- **Cart drawer**: full breakdown with all surcharges itemized
- Free shipping badge on product cards when order exceeds zone threshold

---

## 4. Geo-Based Currency Detection

### Architecture

1. **Next.js Middleware** (`middleware.ts`): reads `request.geo.country`, sets `cc-country` cookie
2. **API Route** (`/api/exchange-rates`): fetches from exchangerate-api.com, cached with ISR (revalidate: 86400 — 24 hours)
3. **Client hook** (`useGeoPrice`): reads cookie + cached rates, returns formatted prices
4. **Manual override**: country selector in header, persists to cookie

### Currency Mapping

| Country Codes | Currency | Symbol |
|---|---|---|
| JM (default) | JMD | J$ |
| US | USD | US$ |
| CA | CAD | CA$ |
| GB, IE | GBP | £ |
| TT | TTD | TT$ |
| BB | BBD | BDS$ |
| All others | USD | US$ |

### Display Rules

- JMD is ALWAYS the primary price — bold, first
- Converted price: smaller, parentheses, prefixed with `~`
- Jamaican visitors: JMD only, no conversion shown
- International visitors: `J$7,500 (~US$48)`
- Header shows detected country flag + currency, clickable to override
- Delivery zone auto-selects from detected country (user can change)
- Fallback: Jamaica/JMD if geo fails

### Exchange Rate Caching

- Free tier of exchangerate-api.com (1,500 requests/month)
- ISR revalidation every 24 hours = ~30 requests/month — well within limit
- Rates stored as `{ USD: 0.00641, CAD: 0.00884, GBP: 0.00512, TTD: 0.0435, BBD: 0.01282 }` (JMD → target)
- Fallback hardcoded rates if API is unreachable

---

## 5. Files to Create/Modify

### New Files

| File | Purpose |
|---|---|
| `src/data/delivery-config.ts` | Delivery zones, rates, surcharges, parish mapping |
| `src/data/exchange-rates.ts` | Currency mapping, fallback rates, types |
| `src/hooks/useGeoPrice.ts` | Client hook: reads country cookie + rates, returns formatted price |
| `src/hooks/useDeliveryCalculator.ts` | Client hook: calculates delivery cost for cart items + zone |
| `src/components/products/DeliveryEstimator.tsx` | Compact delivery calculator on product page |
| `src/components/cart/DeliveryBreakdown.tsx` | Full delivery cost breakdown in cart |
| `src/components/layout/CurrencySelector.tsx` | Header country/currency override dropdown |
| `src/app/api/exchange-rates/route.ts` | ISR-cached exchange rate API route |
| `middleware.ts` | Geo-detection, sets cc-country cookie |

### Modified Files

| File | Changes |
|---|---|
| `src/types/index.ts` | Add `bulkyItem` to Product, add DeliveryZone/CurrencyConfig types |
| `src/data/products.ts` | Add 3 new products, set all 12 prices, add bulkyItem flags |
| `src/data/categories.ts` | Add 2 new categories, update product counts |
| `src/data/vendor-kits.ts` | Update kit prices, add ice-packs + canopy to kits |
| `src/lib/utils.ts` | Add `formatGeoPrice()` helper alongside existing `formatJMD()` |
| `src/components/products/ProductCard.tsx` | Show real prices with geo conversion |
| `src/components/products/ProductDetail.tsx` | Add delivery estimator, show prices |
| `src/components/cart/CartDrawer.tsx` | Add delivery breakdown, show converted totals |
| `src/components/layout/Header.tsx` | Add CurrencySelector |
| `src/app/layout.tsx` | Provide geo context |

### Image Operations

| Operation | Source | Destination |
|---|---|---|
| Copy | `Images/IMG_0645.JPG` | `public/products/chalkboard-stands/boxed-set.jpg` |

---

## 6. Non-Goals

- No database — all pricing stays in static TypeScript files
- No payment processing — checkout continues via WhatsApp
- No full i18n/translation — English only, currency conversion only
- No admin panel — Danielle edits `delivery-config.ts` and `products.ts` directly
- No real-time inventory tracking

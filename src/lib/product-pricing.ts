// src/lib/product-pricing.ts
//
// Display-shape helpers for product pricing. Catalogue cards and detail-page
// headings need to render different things depending on whether a product is:
//   - Single-priced (no priceTiers)         → just the price
//   - Tiered by quantity (no rental tier)   → "From J$X"
//   - Sold OR rented (has a rentalPeriod)   → "Buy J$X / Rent J$Y per …"
//
// The dual buy-or-rent shape is real for the 10x30 canopy tent. Forcing it
// into a "From" label is misleading both directions — purchase is more
// expensive than rental, but rental isn't a quantity tier of purchase.

import type { Product, PriceTier } from '@/types';

export type PriceDisplay =
  | { kind: 'single'; price: number | null }
  | { kind: 'tiered'; from: number }
  | { kind: 'buy-or-rent'; buy: number; rent: number; rentPeriod: string };

export function getPriceDisplay(product: Product): PriceDisplay {
  const tiers = product.priceTiers ?? [];
  if (tiers.length === 0) {
    return { kind: 'single', price: product.price };
  }

  const purchaseTiers = tiers.filter((t): t is PriceTier & { priceJMD: number } =>
    !t.rentalPeriod && !t.quoteOnly && t.priceJMD !== null,
  );
  const rentalTiers = tiers.filter((t): t is PriceTier & { priceJMD: number; rentalPeriod: string } =>
    !!t.rentalPeriod && t.priceJMD !== null,
  );

  if (rentalTiers.length > 0 && purchaseTiers.length > 0) {
    // Pick the cheapest of each side so labels are honest minimums
    const buy = Math.min(...purchaseTiers.map((t) => t.priceJMD));
    const rentTier = rentalTiers.reduce((acc, t) => (t.priceJMD < acc.priceJMD ? t : acc));
    return {
      kind: 'buy-or-rent',
      buy,
      rent: rentTier.priceJMD,
      rentPeriod: rentTier.rentalPeriod,
    };
  }

  // Pure quantity tiers — first tier is the entry/cheapest by data convention
  const fromPrice = purchaseTiers[0]?.priceJMD ?? product.price;
  if (fromPrice == null) return { kind: 'single', price: null };
  return { kind: 'tiered', from: fromPrice };
}

// src/lib/pricing-engine.ts
//
// Dynamic pricing engine for Crown Crumb JA.
//
// Takes the static floor price from src/data/products.ts and applies
// adjustable levers (margin, fuel, peak, bulky, rush) to produce a final
// price per product per destination zone. Pure functions, no I/O —
// consumed by the /admin/pricing dashboard and the CSV export route.

import type { Product, VendorKit } from '@/types';
import { deliveryConfig, deliveryZones, isLocalZone } from '@/data/delivery-config';
import type { DeliveryZoneId } from '@/types';

export interface PricingLevers {
  /** Multiplier applied to base price. 1.0 = no change, 1.15 = +15% margin. */
  marginMultiplier: number;
  /** Fuel surcharge as a decimal (0.08 = 8%). Applied to base + delivery. */
  fuelSurchargePct: number;
  /** Peak season toggle — when true, applies peakSurchargePct. */
  peakSeasonActive: boolean;
  /** Peak season surcharge (0.15 = 15% — Christmas default). */
  peakSurchargePct: number;
  /** Rush delivery — 1.5x delivery multiplier. */
  rushDelivery: boolean;
}

export const defaultLevers: PricingLevers = {
  marginMultiplier: 1.0,
  fuelSurchargePct: deliveryConfig.fuelSurchargePercent / 100,
  peakSeasonActive: false,
  peakSurchargePct: 0.15, // Christmas peak from delivery-config.ts
  rushDelivery: false,
};

export interface PriceBreakdown {
  base: number;              // floor price from products.ts
  adjustedBase: number;      // base × marginMultiplier
  fuelAmount: number;        // surcharge on adjustedBase
  peakAmount: number;        // surcharge on adjustedBase (if active)
  productSubtotal: number;   // adjustedBase + fuel + peak
  deliveryBase: number;      // zone base rate
  deliveryFuel: number;      // fuel on delivery
  deliveryBulky: number;     // flat bulky fee (local or intl)
  deliveryRush: number;      // rush multiplier delta
  deliveryTotal: number;     // all delivery components
  isFreeShipping: boolean;
  landedTotal: number;       // productSubtotal + deliveryTotal
}

/**
 * Calculate the full price breakdown for one product in one zone.
 *
 * Formula:
 *   adjustedBase    = base × marginMultiplier
 *   productSubtotal = adjustedBase × (1 + fuelPct + (peakActive ? peakPct : 0))
 *   delivery        = (zoneBase × (1 + fuelPct) + bulkyFlat) × (rush ? 1.5 : 1)
 *   landed          = productSubtotal + delivery    (free ship if base ≥ threshold)
 */
export function calculatePrice(
  product: Pick<Product, 'price' | 'bulkyItem'>,
  zoneId: DeliveryZoneId,
  levers: PricingLevers = defaultLevers,
): PriceBreakdown {
  const base = product.price ?? 0;
  const adjustedBase = base * levers.marginMultiplier;

  const fuelAmount = adjustedBase * levers.fuelSurchargePct;
  const peakAmount = levers.peakSeasonActive
    ? adjustedBase * levers.peakSurchargePct
    : 0;
  const productSubtotal = adjustedBase + fuelAmount + peakAmount;

  const zone = deliveryZones[zoneId];
  const local = isLocalZone(zoneId);

  // Free-shipping check uses the adjusted base (the price the customer sees)
  const isFreeShipping =
    zone.freeShippingThreshold !== null &&
    adjustedBase >= zone.freeShippingThreshold;

  const deliveryBase = isFreeShipping ? 0 : zone.baseRate;
  const deliveryFuel = deliveryBase * levers.fuelSurchargePct;
  const deliveryBulky = product.bulkyItem
    ? local
      ? deliveryConfig.bulkyItemSurcharge.local
      : deliveryConfig.bulkyItemSurcharge.international
    : 0;

  const deliverySubtotal = deliveryBase + deliveryFuel + deliveryBulky;
  const deliveryRush = levers.rushDelivery
    ? deliverySubtotal * (deliveryConfig.rushDeliveryMultiplier - 1)
    : 0;

  const deliveryTotal = deliverySubtotal + deliveryRush;
  const landedTotal = productSubtotal + deliveryTotal;

  return {
    base,
    adjustedBase: round(adjustedBase),
    fuelAmount: round(fuelAmount),
    peakAmount: round(peakAmount),
    productSubtotal: round(productSubtotal),
    deliveryBase: round(deliveryBase),
    deliveryFuel: round(deliveryFuel),
    deliveryBulky,
    deliveryRush: round(deliveryRush),
    deliveryTotal: round(deliveryTotal),
    isFreeShipping,
    landedTotal: round(landedTotal),
  };
}

/**
 * Apply levers to a vendor kit (no zone, no delivery — kit pricing is flat).
 */
export function calculateKitPrice(
  kit: Pick<VendorKit, 'price'>,
  levers: PricingLevers = defaultLevers,
): Pick<PriceBreakdown, 'base' | 'adjustedBase' | 'fuelAmount' | 'peakAmount' | 'productSubtotal'> {
  const base = kit.price ?? 0;
  const adjustedBase = base * levers.marginMultiplier;
  const fuelAmount = adjustedBase * levers.fuelSurchargePct;
  const peakAmount = levers.peakSeasonActive
    ? adjustedBase * levers.peakSurchargePct
    : 0;
  return {
    base,
    adjustedBase: round(adjustedBase),
    fuelAmount: round(fuelAmount),
    peakAmount: round(peakAmount),
    productSubtotal: round(adjustedBase + fuelAmount + peakAmount),
  };
}

/** Check if today falls in an active peak season window. */
export function isPeakSeasonToday(date = new Date()): { active: boolean; name?: string; surchargePct?: number } {
  const mmdd = `${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
  for (const season of deliveryConfig.peakSeasons) {
    if (isDateInRange(mmdd, season.start, season.end)) {
      return { active: true, name: season.name, surchargePct: season.surchargePercent / 100 };
    }
  }
  return { active: false };
}

// Handles ranges that cross year boundary (e.g., Christmas 11-15 → 01-05)
function isDateInRange(mmdd: string, start: string, end: string): boolean {
  if (start <= end) return mmdd >= start && mmdd <= end;
  return mmdd >= start || mmdd <= end;
}

function round(n: number): number {
  return Math.round(n);
}

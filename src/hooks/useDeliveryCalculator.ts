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

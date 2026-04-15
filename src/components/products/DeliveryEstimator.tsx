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

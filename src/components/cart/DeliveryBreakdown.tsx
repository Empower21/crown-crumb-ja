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

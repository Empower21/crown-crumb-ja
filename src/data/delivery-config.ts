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

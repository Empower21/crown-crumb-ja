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

// Fallback rates: JMD to target currency (used if exchangerate-api is unreachable).
// Refreshed from https://api.exchangerate-api.com/v4/latest/JMD on 2026-04-30.
// The /api/exchange-rates route fetches live values daily (24hr ISR cache).
export const fallbackRates: ExchangeRates = {
  USD: 0.00637,   // 1 JMD = 0.00637 USD (1 USD ~= J$157)
  CAD: 0.00871,   // 1 JMD = 0.00871 CAD (1 CAD ~= J$115)
  GBP: 0.00471,   // 1 JMD = 0.00471 GBP (1 GBP ~= J$212)
  TTD: 0.0433,    // 1 JMD = 0.0433 TTD  (1 TTD ~= J$23)
  BBD: 0.0127,    // 1 JMD = 0.0127 BBD  (1 BBD ~= J$79)
};

export function getCurrencyForCountry(countryCode: string): CurrencyInfo {
  return currencyMap[countryCode] || defaultCurrency;
}

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

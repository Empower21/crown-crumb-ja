// src/hooks/useGeoPrice.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CurrencyInfo, ExchangeRates } from '@/types';
import { getCurrencyForCountry, fallbackRates } from '@/data/currency-config';

const COUNTRY_CHANGED_EVENT = 'cc-country-changed';

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
    const syncFromCookie = (rates: ExchangeRates) => {
      const country = getCookie('cc-country') || 'JM';
      const currency = getCurrencyForCountry(country);
      setState({
        country,
        currency,
        rates,
        isJamaica: country === 'JM',
        loading: false,
      });
    };

    // Fetch exchange rates once, then sync from cookie
    let currentRates = fallbackRates;
    fetch('/api/exchange-rates')
      .then((res) => res.json())
      .then((data) => {
        currentRates = data.rates ?? fallbackRates;
        syncFromCookie(currentRates);
      })
      .catch(() => {
        syncFromCookie(currentRates);
      });

    // Re-sync whenever ANY component fires the country-changed event.
    // This is the cross-component bridge — without it, each useGeoPrice()
    // caller has isolated state and the dropdown only updates the header.
    const handler = () => syncFromCookie(currentRates);
    window.addEventListener(COUNTRY_CHANGED_EVENT, handler);
    return () => window.removeEventListener(COUNTRY_CHANGED_EVENT, handler);
  }, []);

  const setCountry = useCallback((countryCode: string) => {
    setCookie('cc-country', countryCode, 365);
    // Broadcast to every other useGeoPrice hook instance on the page
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(COUNTRY_CHANGED_EVENT, { detail: countryCode }));
    }
  }, []);

  /**
   * Format a JMD amount in the visitor's chosen currency only.
   * - Jamaica visitors: "J$7,500"
   * - Everyone else:    "US$48" (just the converted value, rounded up to whole units)
   */
  const formatGeoPrice = useCallback(
    (jmdAmount: number | null): string => {
      if (jmdAmount === null) return 'Price TBD';
      if (state.currency.code === 'JMD') {
        return `${state.currency.symbol}${jmdAmount.toLocaleString('en-JM')}`;
      }
      const rate = state.rates[state.currency.code];
      if (!rate) {
        return `J$${jmdAmount.toLocaleString('en-JM')}`;
      }
      const converted = Math.ceil(jmdAmount * rate);
      return `${state.currency.symbol}${converted.toLocaleString()}`;
    },
    [state.rates, state.currency],
  );

  return { ...state, setCountry, formatGeoPrice };
}

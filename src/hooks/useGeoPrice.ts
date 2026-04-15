// src/hooks/useGeoPrice.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CurrencyInfo, ExchangeRates } from '@/types';
import { getCurrencyForCountry, fallbackRates } from '@/data/currency-config';

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
    const country = getCookie('cc-country') || 'JM';
    const currency = getCurrencyForCountry(country);

    // Fetch exchange rates
    fetch('/api/exchange-rates')
      .then((res) => res.json())
      .then((data) => {
        setState({
          country,
          currency,
          rates: data.rates,
          isJamaica: country === 'JM',
          loading: false,
        });
      })
      .catch(() => {
        setState({
          country,
          currency,
          rates: fallbackRates,
          isJamaica: country === 'JM',
          loading: false,
        });
      });
  }, []);

  const setCountry = useCallback((countryCode: string) => {
    setCookie('cc-country', countryCode, 365);
    const currency = getCurrencyForCountry(countryCode);
    setState((prev) => ({
      ...prev,
      country: countryCode,
      currency,
      isJamaica: countryCode === 'JM',
    }));
  }, []);

  const formatGeoPrice = useCallback(
    (jmdAmount: number | null): string => {
      if (jmdAmount === null) return 'Price TBD';
      const jmd = `J$${jmdAmount.toLocaleString('en-JM')}`;
      if (state.isJamaica) return jmd;

      const rate = state.rates[state.currency.code];
      if (!rate) return jmd;

      const converted = Math.round(jmdAmount * rate);
      return `${jmd} (~${state.currency.symbol}${converted.toLocaleString()})`;
    },
    [state.isJamaica, state.rates, state.currency]
  );

  return { ...state, setCountry, formatGeoPrice };
}

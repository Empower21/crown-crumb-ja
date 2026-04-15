// src/app/api/exchange-rates/route.ts
import { NextResponse } from 'next/server';
import { fallbackRates } from '@/data/currency-config';

export const revalidate = 86400; // 24 hours

export async function GET() {
  try {
    const res = await fetch(
      'https://api.exchangerate-api.com/v4/latest/JMD',
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) {
      return NextResponse.json({ rates: fallbackRates, source: 'fallback' });
    }

    const data = await res.json();
    const rates = {
      USD: data.rates.USD,
      CAD: data.rates.CAD,
      GBP: data.rates.GBP,
      TTD: data.rates.TTD,
      BBD: data.rates.BBD,
    };

    return NextResponse.json({ rates, source: 'live' });
  } catch {
    return NextResponse.json({ rates: fallbackRates, source: 'fallback' });
  }
}

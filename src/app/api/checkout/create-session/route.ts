import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { products } from '@/data/products';
import type { Product } from '@/types';
import { fallbackRates, getCurrencyForCountry } from '@/data/currency-config';

export const runtime = 'nodejs';

interface CheckoutBody {
  items: {
    slug: string;
    quantity: number;
    /** When the slug refers to a tier variant (e.g. "dome-containers::10"), this carries the runtime price/name. */
    variantPriceJMD?: number | null;
    variantName?: string;
  }[];
  /** Visitor's selected country (sent from client cookie). When absent, we read the cookie server-side. */
  country?: string;
}

// Stripe presentment currencies we expose. Keep in sync with currencyMap in
// currency-config.ts. JMD is the canonical base; the others are conversions.
const SUPPORTED_CURRENCIES = ['JMD', 'USD', 'CAD', 'GBP', 'TTD', 'BBD'] as const;
type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

/**
 * POST /api/checkout/create-session
 *
 * Creates a Stripe Checkout Session in the visitor's preferred currency.
 *
 * Currency selection (in priority order):
 *   1. body.country (sent by the client from the cc-country cookie)
 *   2. cookie header on the request
 *   3. default JMD
 *
 * The product catalogue is priced in JMD. We convert to the chosen currency
 * using live exchange rates (24hr ISR-cached via /api/exchange-rates) and
 * fall back to hardcoded rates if the FX call fails.
 *
 * Payment methods are selected dynamically via Stripe Dashboard settings —
 * don't hardcode payment_method_types here.
 */
export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!body.items?.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const country = (body.country ?? readCountryFromCookie(request) ?? 'JM').toUpperCase();
  const targetCurrency = getCurrencyForCountry(country).code as SupportedCurrency;
  const safeCurrency: SupportedCurrency = SUPPORTED_CURRENCIES.includes(targetCurrency)
    ? targetCurrency
    : 'JMD';

  // Live FX rate (24hr ISR cached); falls back to hardcoded values if API fails.
  const rate = await getJmdToCurrencyRate(safeCurrency);

  const lineItems: Array<{
    price_data: {
      currency: string;
      product_data: { name: string; images?: string[] };
      unit_amount: number;
    };
    quantity: number;
  }> = [];

  for (const item of body.items) {
    const baseSlug = item.slug.split('::')[0];
    const product: Product | undefined = products.find((p) => p.slug === baseSlug);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${item.slug}` }, { status: 400 });
    }

    const priceJMD = item.variantPriceJMD ?? product.price;
    if (priceJMD === null || priceJMD <= 0) {
      return NextResponse.json(
        { error: `Cannot charge for ${product.name} — price unavailable` },
        { status: 400 },
      );
    }

    // Convert JMD → target currency, then to smallest currency unit (cents).
    // Math.round avoids drift; Stripe rejects fractional minor units.
    const unitAmount = Math.round(priceJMD * rate * 100);

    lineItems.push({
      price_data: {
        currency: safeCurrency.toLowerCase(),
        product_data: {
          name: item.variantName ?? product.name,
          images: product.images.length > 0 ? [absoluteImageUrl(product.images[0])] : undefined,
        },
        unit_amount: unitAmount,
      },
      quantity: item.quantity,
    });
  }

  const origin = new URL(request.url).origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: {
        // Where we ship — mirrors countryToZone in delivery-config
        allowed_countries: ['JM', 'US', 'CA', 'GB', 'TT', 'BB', 'BS', 'KY'],
      },
      phone_number_collection: { enabled: true },
      billing_address_collection: 'auto',
      automatic_tax: { enabled: false },
      metadata: {
        source: 'crown-crumb-ja-web',
        country,
        presentment_currency: safeCurrency,
        // Useful for reconciliation against your JMD catalogue
        jmd_to_currency_rate: String(rate),
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe did not return a redirect URL' }, { status: 502 });
    }
    return NextResponse.json({ url: session.url, currency: safeCurrency });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    console.error('[checkout] Stripe error:', message);
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again or contact us.' },
      { status: 500 },
    );
  }
}

// --- helpers --------------------------------------------------------------

function readCountryFromCookie(request: Request): string | null {
  const cookie = request.headers.get('cookie') ?? '';
  const match = cookie.match(/(?:^|;\s*)cc-country=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Returns the rate to convert 1 JMD into the target currency. JMD → JMD = 1.
 * Live rates are fetched from exchangerate-api via our cached /api/exchange-rates
 * route; falls back to hardcoded values in currency-config.ts on failure.
 */
async function getJmdToCurrencyRate(currency: SupportedCurrency): Promise<number> {
  if (currency === 'JMD') return 1;
  try {
    // Use the public API so this still works in serverless without process.env config
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://crown-crumb-ja.vercel.app';
    const res = await fetch(`${base}/api/exchange-rates`, { next: { revalidate: 86400 } });
    if (res.ok) {
      const data = (await res.json()) as { rates?: Record<string, number> };
      const live = data.rates?.[currency];
      if (typeof live === 'number' && live > 0) return live;
    }
  } catch {
    // fall through to fallback
  }
  return fallbackRates[currency] ?? 1;
}

/**
 * Stripe requires publicly-reachable image URLs. Dev-only localhost paths
 * won't render on the hosted checkout — but the redirect still works, so
 * this is a cosmetic-only concern in dev.
 */
function absoluteImageUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://crown-crumb-ja.vercel.app';
  if (path.startsWith('http')) return path;
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { products } from '@/data/products';
import type { Product } from '@/types';

export const runtime = 'nodejs';

interface CheckoutBody {
  items: {
    slug: string;
    quantity: number;
    /** When the slug refers to a tier variant (e.g. "dome-containers::10"), this carries the runtime price/name. */
    variantPriceJMD?: number | null;
    variantName?: string;
  }[];
  country?: string;
}

/**
 * POST /api/checkout/create-session
 *
 * Creates a Stripe Checkout Session for the user's cart and returns the URL
 * for client-side redirect. We charge in JMD (Jamaican Dollar) because:
 *   1. It matches our canonical product data (src/data/products.ts)
 *   2. Stripe supports JMD as a presentment currency
 *   3. The customer's card issuer handles FX; no rounding drift between UI and charge
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

  // Build line items. For each cart item we look up the real product (to get
  // the name/image) and use the runtime price — either the product's single
  // price, or the tier price captured at "add to cart" time.
  const lineItems: Array<{
    price_data: {
      currency: string;
      product_data: { name: string; images?: string[] };
      unit_amount: number;
    };
    quantity: number;
  }> = [];

  for (const item of body.items) {
    // Tier variants use slug like "dome-containers::10" — the base slug is before "::"
    const baseSlug = item.slug.split('::')[0];
    const product: Product | undefined = products.find((p) => p.slug === baseSlug);
    if (!product) {
      return NextResponse.json(
        { error: `Unknown product: ${item.slug}` },
        { status: 400 },
      );
    }

    const priceJMD = item.variantPriceJMD ?? product.price;
    if (priceJMD === null || priceJMD <= 0) {
      return NextResponse.json(
        { error: `Cannot charge for ${product.name} — price unavailable` },
        { status: 400 },
      );
    }

    const displayName = item.variantName ?? product.name;

    lineItems.push({
      price_data: {
        currency: 'jmd',
        product_data: {
          name: displayName,
          images: product.images.length > 0 ? [absoluteImageUrl(product.images[0])] : undefined,
        },
        unit_amount: priceJMD * 100, // Stripe uses smallest currency unit — JMD cents
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
        country: body.country ?? 'unknown',
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe did not return a redirect URL' }, { status: 502 });
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    // Don't leak secret-key issues to the client — log server-side
    console.error('[checkout] Stripe error:', message);
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again or contact us.' },
      { status: 500 },
    );
  }
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

// src/lib/stripe.ts
//
// Server-side Stripe client. Instantiated lazily so the module can be
// imported in code paths that don't actually use Stripe (preventing crashes
// when STRIPE_SECRET_KEY is missing during local dev without card payments).

import Stripe from 'stripe';

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      'STRIPE_SECRET_KEY is not set. Add it to .env.local to enable card payments.',
    );
  }
  cached = new Stripe(key);
  return cached;
}

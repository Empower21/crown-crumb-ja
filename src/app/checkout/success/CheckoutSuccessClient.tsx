'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

/**
 * Clears the cart once the customer lands on the success page. Stripe
 * guarantees this URL is only reached after a confirmed payment intent.
 * Pure side-effect component — renders nothing.
 */
export function CheckoutSuccessClient() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return null;
}

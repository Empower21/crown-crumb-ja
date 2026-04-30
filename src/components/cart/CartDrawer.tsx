'use client';

import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice, whatsappLink, whatsappMobileLink, isMobileBrowser } from '@/lib/utils';
import { useGeoPrice } from '@/hooks/useGeoPrice';
import { DeliveryBreakdown } from '@/components/cart/DeliveryBreakdown';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice, clearCart } =
    useCart();
  const { formatGeoPrice, country } = useGeoPrice();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Build the cart payload Stripe needs (used by both checkout flows)
  const buildCheckoutPayload = () => ({
    country,
    items: items.map((item) => {
      const isVariant = item.product.slug.includes('::');
      return {
        slug: item.product.slug,
        quantity: item.quantity,
        variantPriceJMD: isVariant ? item.product.price : undefined,
        variantName: isVariant ? item.product.name : undefined,
      };
    }),
  });

  const createStripeSession = async (): Promise<string> => {
    const res = await fetch('/api/checkout/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildCheckoutPayload()),
    });
    const data = await res.json();
    if (!res.ok || !data.url) throw new Error(data.error ?? 'Could not start checkout');
    return data.url as string;
  };

  const handleCardCheckout = async () => {
    if (items.length === 0) return;
    setCheckingOut(true);
    setCheckoutError(null);
    try {
      const url = await createStripeSession();
      window.location.href = url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Checkout failed');
      setCheckingOut(false);
    }
  };

  const checkoutMessage = items
    .map(
      (item) =>
        `- ${item.product.name} x${item.quantity}${item.product.price ? ` (${formatPrice(item.product.price * item.quantity)})` : ' (Price TBD)'}`
    )
    .join('\n');

  /**
   * WhatsApp checkout: create a Stripe payment link first, then open WhatsApp
   * with the link baked into the message. Customer can pay by tapping the link
   * inside chat — no need to leave WhatsApp to an unfamiliar checkout site.
   * Falls back to a regular WhatsApp message if the Stripe link can't be made.
   */
  const handleWhatsAppCheckout = async () => {
    if (items.length === 0) return;
    setCheckingOut(true);
    setCheckoutError(null);
    let payLink: string | null = null;
    try {
      payLink = await createStripeSession();
    } catch {
      // Stripe failed — still let them message us with the order details
      payLink = null;
    }

    const totalLine = totalPrice > 0 ? formatPrice(totalPrice) : 'Please confirm pricing';
    const lines = [
      `Hi Crown Crumb! I'd like to order:`,
      ``,
      checkoutMessage,
      ``,
      `Total: ${totalLine}`,
    ];
    if (payLink) {
      lines.push('', `Pay with card here:`, payLink);
    }
    lines.push('', `Please confirm availability and delivery.`);
    const body = lines.join('\n');

    if (isMobileBrowser()) {
      window.location.href = whatsappMobileLink(body);
    } else {
      window.open(whatsappLink(body), '_blank', 'noopener,noreferrer');
    }
    setCheckingOut(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-crown-dark-card border-l border-crown-dark-surface shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-crown-dark-surface">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-crown-lime" />
            <h2 className="font-heading text-lg font-bold text-crown-white">
              Your Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-crown-muted hover:text-crown-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={48} className="text-crown-dark-surface mx-auto mb-4" />
              <p className="text-crown-muted text-sm">Your cart is empty</p>
              <p className="text-crown-muted text-xs mt-1">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.slug}
                  className="flex gap-4 p-3 bg-crown-dark-surface rounded-xl"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-crown-white truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-crown-lime mt-0.5">
                      {formatGeoPrice(item.product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                        className="p-1 bg-crown-dark rounded-md text-crown-muted hover:text-crown-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold text-crown-white w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                        className="p-1 bg-crown-dark rounded-md text-crown-muted hover:text-crown-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.slug)}
                        className="ml-auto p-1 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-crown-dark-surface space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-crown-muted">Subtotal</span>
              <span className="font-heading text-lg font-bold text-crown-lime">
                {totalPrice > 0 ? formatGeoPrice(totalPrice) : 'Pricing TBD'}
              </span>
            </div>

            <DeliveryBreakdown items={items} />

            <button
              onClick={handleCardCheckout}
              disabled={checkingOut || totalPrice <= 0}
              className="w-full flex items-center justify-center gap-2 py-3 bg-crown-lime text-crown-dark font-bold rounded-full hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkingOut ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Opening Stripe…
                </>
              ) : (
                <>
                  <CreditCard size={18} />
                  Pay with Card
                </>
              )}
            </button>

            {checkoutError && (
              <p className="text-xs text-red-400 text-center">{checkoutError}</p>
            )}

            <button
              onClick={handleWhatsAppCheckout}
              disabled={checkingOut || totalPrice <= 0}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#22c55e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkingOut ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Preparing payment link…
                </>
              ) : (
                'Checkout via WhatsApp'
              )}
            </button>
            <p className="text-[10px] text-crown-muted text-center -mt-1">
              We&apos;ll open WhatsApp with your order + a secure pay-with-card link
            </p>
            <button
              onClick={clearCart}
              className="block w-full py-2 text-sm text-crown-muted hover:text-red-400 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

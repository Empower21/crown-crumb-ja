'use client';

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { whatsappLink } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice, clearCart } =
    useCart();

  if (!isOpen) return null;

  const checkoutMessage = items
    .map(
      (item) =>
        `- ${item.product.name} x${item.quantity}${item.product.price ? ` (${formatPrice(item.product.price * item.quantity)})` : ' (Price TBD)'}`
    )
    .join('\n');

  const whatsappCheckout = whatsappLink(
    `Hi Crown Crumb! I'd like to order:\n\n${checkoutMessage}\n\nTotal: ${totalPrice > 0 ? formatPrice(totalPrice) : 'Please confirm pricing'}\n\nPlease confirm availability and total with delivery.`
  );

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
                      {formatPrice(item.product.price)}
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
              <span className="text-sm text-crown-muted">Subtotal (JMD)</span>
              <span className="font-heading text-lg font-bold text-crown-lime">
                {totalPrice > 0 ? formatPrice(totalPrice) : 'Pricing TBD'}
              </span>
            </div>
            <p className="text-xs text-crown-muted">
              Delivery calculated at checkout. Bank deposit also accepted.
            </p>
            <a
              href={whatsappCheckout}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-[#25D366] text-white text-center font-bold rounded-full hover:bg-[#22c55e] transition-colors"
            >
              Checkout via WhatsApp
            </a>
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

import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { CheckoutSuccessClient } from './CheckoutSuccessClient';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-crown-dark-card border border-white/5 rounded-2xl p-8 sm:p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-crown-lime/10 mb-6">
          <CheckCircle2 size={36} className="text-crown-lime" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-crown-lavender mb-3">
          Order Confirmed
        </h1>
        <p className="text-crown-muted leading-relaxed mb-2">
          Thank you for supporting Crown Crumb JA. We&apos;ve received your payment and will
          be in touch shortly to confirm delivery details.
        </p>
        <p className="text-sm text-crown-muted mb-8">
          A receipt has been sent to your email. Questions? Reply to the receipt or message
          us on WhatsApp.
        </p>

        {/* Clears the cart once the success page loads */}
        <CheckoutSuccessClient />

        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-crown-lime text-crown-dark font-bold rounded-full hover:brightness-110 transition"
        >
          <ShoppingBag size={16} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

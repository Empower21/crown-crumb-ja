import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Checkout Cancelled',
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-crown-dark-card border border-white/5 rounded-2xl p-8 sm:p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
          <XCircle size={36} className="text-crown-muted" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-crown-lavender mb-3">
          Checkout Cancelled
        </h1>
        <p className="text-crown-muted leading-relaxed mb-8">
          No worries — your cart is still saved and no card was charged. Pick up where you
          left off whenever you&apos;re ready.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-crown-lime text-crown-dark font-bold rounded-full hover:brightness-110 transition"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>
      </div>
    </div>
  );
}

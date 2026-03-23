import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductsContent } from './ProductsContent';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse our full range of pop-up event supplies — packaging, display fixtures, canopy tents, baking kits, and cold chain solutions. Available in Kingston, Jamaica.',
};

export default function ProductsPage() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white mb-3">
            Our Products
          </h1>
          <p className="text-crown-muted max-w-2xl">
            Everything you need to set up, display, package, and transport your pop-up goods.
          </p>
        </div>

        <Suspense fallback={<div className="text-crown-muted">Loading products...</div>}>
          <ProductsContent />
        </Suspense>
      </div>
    </section>
  );
}

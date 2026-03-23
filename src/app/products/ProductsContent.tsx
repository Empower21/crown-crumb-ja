'use client';

import { useSearchParams } from 'next/navigation';
import { CategoryFilter } from '@/components/products/CategoryFilter';
import { ProductCard } from '@/components/products/ProductCard';
import { getProductsByCategory } from '@/data/products';

export function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const filtered = getProductsByCategory(category);

  return (
    <>
      <div className="mb-8">
        <CategoryFilter />
      </div>

      {filtered.length === 0 ? (
        <p className="text-crown-muted text-center py-20">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

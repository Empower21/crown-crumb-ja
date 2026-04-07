'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('category') || 'all';

  const handleFilter = (slug: string) => {
    if (slug === 'all') {
      router.push('/products', { scroll: false });
    } else {
      router.push(`/products?category=${slug}`, { scroll: false });
    }
  };

  const allCategories = [
    { slug: 'all', name: 'All Products' },
    ...categories.filter((c) => c.slug !== 'vendor-kits'),
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {allCategories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleFilter(cat.slug)}
          className={cn(
            'shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all',
            active === cat.slug
              ? 'bg-crown-lime text-crown-dark'
              : 'bg-crown-dark-surface text-crown-muted hover:text-crown-white hover:bg-crown-dark-card border border-crown-dark-surface'
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

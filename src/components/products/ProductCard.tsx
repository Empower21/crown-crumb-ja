'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-crown-dark-card rounded-2xl overflow-hidden border border-crown-dark-surface hover:border-crown-lime/30 transition-all duration-300 h-full">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="p-5">
          <span className="text-xs font-bold text-crown-lime uppercase tracking-wider">
            {product.category.replace(/-/g, ' ')}
          </span>
          <h3 className="font-heading text-lg font-bold text-crown-white mt-1 group-hover:text-crown-lime transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-crown-muted mt-2 line-clamp-2">
            {product.description}
          </p>
          <span className="inline-block mt-4 text-sm font-bold text-crown-lime group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}

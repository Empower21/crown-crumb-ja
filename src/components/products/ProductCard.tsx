'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useGeoPrice } from '@/hooks/useGeoPrice';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { formatGeoPrice } = useGeoPrice();

  return (
    <div className="bg-crown-dark-card rounded-2xl overflow-hidden border border-crown-dark-surface hover:border-crown-lime/30 transition-all duration-300 h-full flex flex-col group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-bold text-crown-lime uppercase tracking-wider">
          {product.category.replace(/-/g, ' ')}
        </span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading text-lg font-bold text-crown-white mt-1 group-hover:text-crown-lime transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-crown-muted mt-2 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-heading text-lg font-bold text-crown-lime">
            {formatGeoPrice(product.price)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-2 px-4 py-2 bg-crown-lime text-crown-dark text-sm font-bold rounded-full hover:bg-crown-lime/90 transition-colors"
          >
            <ShoppingBag size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

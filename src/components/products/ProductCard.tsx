'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useGeoPrice } from '@/hooks/useGeoPrice';
import { getPriceDisplay } from '@/lib/product-pricing';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { formatGeoPrice } = useGeoPrice();
  const display = getPriceDisplay(product);

  return (
    <div className="bg-crown-dark-card rounded-2xl overflow-hidden border border-crown-dark-surface hover:border-crown-lime/30 transition-all duration-300 h-full flex flex-col group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-white via-white to-neutral-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105 [filter:contrast(1.04)_saturate(1.06)]"
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
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="font-heading text-lg font-bold text-crown-lime leading-tight">
            {display.kind === 'buy-or-rent' ? (
              <div className="flex flex-col gap-0.5">
                <span>
                  <span className="text-xs text-crown-muted font-normal uppercase tracking-wider mr-1">
                    Buy
                  </span>
                  {formatGeoPrice(display.buy)}
                </span>
                <span className="text-sm font-semibold">
                  <span className="text-xs text-crown-muted font-normal uppercase tracking-wider mr-1">
                    or Rent
                  </span>
                  {formatGeoPrice(display.rent)}
                  <span className="text-xs text-crown-muted font-normal ml-1">
                    {display.rentPeriod}
                  </span>
                </span>
              </div>
            ) : display.kind === 'tiered' ? (
              <span>
                <span className="text-xs text-crown-muted font-normal uppercase tracking-wider mr-1">
                  From
                </span>
                {formatGeoPrice(display.from)}
              </span>
            ) : (
              <span>{formatGeoPrice(display.price)}</span>
            )}
          </div>
          {product.priceTiers ? (
            <Link
              href={`/products/${product.slug}`}
              className="flex items-center gap-2 px-4 py-2 bg-crown-lime text-crown-dark text-sm font-bold rounded-full hover:bg-crown-lime/90 transition-colors shrink-0"
            >
              <ShoppingBag size={14} />
              Options
            </Link>
          ) : (
            <button
              onClick={() => addItem(product)}
              className="flex items-center gap-2 px-4 py-2 bg-crown-lime text-crown-dark text-sm font-bold rounded-full hover:bg-crown-lime/90 transition-colors shrink-0"
            >
              <ShoppingBag size={14} />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

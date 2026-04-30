'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, ShoppingBag, MessageCircle } from 'lucide-react';
import { whatsappLink, openWhatsApp } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useGeoPrice } from '@/hooks/useGeoPrice';
import { DeliveryEstimator } from '@/components/products/DeliveryEstimator';
import { PriceTierSelector } from '@/components/products/PriceTierSelector';
import type { Product } from '@/types';
import { products } from '@/data/products';

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTierIndex, setActiveTierIndex] = useState(0);
  const { addItem, setIsOpen } = useCart();
  const { formatGeoPrice } = useGeoPrice();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const activeTier = product.priceTiers?.[activeTierIndex];
  const displayPrice = activeTier?.priceJMD ?? product.price;

  const handleAddToCart = () => {
    // When the product has tiers, add a snapshot variant with the chosen tier's
    // price so the cart shows the right total. The slug stays stable so adding
    // the same tier twice just bumps the quantity.
    if (activeTier && !activeTier.quoteOnly && activeTier.priceJMD !== null) {
      // Use a slug-safe version of the tier label so rental + sale tiers
      // with the same quantity (e.g., 10x30 canopy) don't collide.
      const tierKey = activeTier.unitLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const variant: Product = {
        ...product,
        slug: `${product.slug}::${tierKey}`,
        name: `${product.name} — ${activeTier.unitLabel}`,
        price: activeTier.priceJMD,
      };
      addItem(variant);
    } else {
      addItem(product);
    }
    setIsOpen(true);
  };

  return (
    <section className="py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-crown-muted hover:text-crown-lime transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-white via-white to-neutral-50 shadow-lg ring-1 ring-black/5">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-contain p-6 [filter:contrast(1.04)_saturate(1.06)] drop-shadow-md"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                      i === activeImage
                        ? 'border-crown-lime'
                        : 'border-crown-dark-surface hover:border-crown-muted'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-crown-lime uppercase tracking-wider">
                {product.category.replace(/-/g, ' ')}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white mt-2">
                {product.name}
              </h1>
              <div className="mt-3 flex items-baseline gap-3">
                {product.priceTiers ? (
                  <>
                    <span className="text-xs uppercase tracking-wider text-crown-muted">
                      From
                    </span>
                    <span className="font-heading text-2xl font-bold text-crown-lime">
                      {formatGeoPrice(displayPrice)}
                    </span>
                  </>
                ) : (
                  <span className="font-heading text-2xl font-bold text-crown-lime">
                    {formatGeoPrice(product.price)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-crown-muted leading-relaxed">{product.description}</p>

            {/* Tier selector — only when product has tiered pricing */}
            {product.priceTiers && (
              <PriceTierSelector
                product={product}
                activeTierIndex={activeTierIndex}
                onChange={setActiveTierIndex}
              />
            )}

            {/* Features */}
            <div>
              <h3 className="font-heading text-sm font-bold text-crown-white uppercase tracking-wider mb-3">
                Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-crown-muted">
                    <Check size={16} className="text-crown-lime mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            {product.specs && (
              <div>
                <h3 className="font-heading text-sm font-bold text-crown-white uppercase tracking-wider mb-3">
                  Specifications
                </h3>
                <div className="bg-crown-dark-card rounded-xl p-4 space-y-2">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-crown-muted">{key}</span>
                      <span className="text-crown-white font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={activeTier?.quoteOnly}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-crown-lime text-crown-dark font-bold rounded-full hover:bg-crown-lime/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={18} />
                {activeTier?.quoteOnly ? 'Request Quote Instead' : 'Add to Cart'}
              </button>
              {(() => {
                const askMsg = `Hi Crown Crumb! I'm interested in the ${product.name}. Can I get pricing and availability?`;
                return (
                  <a
                    href={whatsappLink(askMsg)}
                    onClick={openWhatsApp(askMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#25D366] text-[#25D366] font-bold rounded-full hover:bg-[#25D366]/10 transition-all"
                  >
                    <MessageCircle size={18} />
                    Ask on WhatsApp
                  </a>
                );
              })()}
            </div>

            {/* Delivery Estimator */}
            <DeliveryEstimator product={product} />

            {/* Payment info */}
            <div className="bg-crown-dark-card rounded-xl p-4 space-y-2 text-xs text-crown-muted">
              <p><span className="text-crown-white font-bold">Payment:</span> Cash on Delivery or Online Payment (card via Stripe).</p>
              <p><span className="text-crown-white font-bold">Currency:</span> Prices shown in your selected currency. Default is Jamaican Dollars (JMD); international visitors see prices in USD/CAD/GBP automatically.</p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-crown-white mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
                  <div className="bg-crown-dark-card rounded-2xl overflow-hidden border border-crown-dark-surface hover:border-crown-lime/30 transition-all">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-bold text-crown-white group-hover:text-crown-lime transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm text-crown-lime mt-1 font-bold">
                        {formatGeoPrice(p.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

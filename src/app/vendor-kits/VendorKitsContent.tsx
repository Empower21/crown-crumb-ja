'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import { vendorKits } from '@/data/vendor-kits';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const tierStyles = {
  beginner: {
    gradient: 'from-emerald-900 to-emerald-700',
    dot: 'bg-emerald-400',
    badge: 'Beginner Package',
  },
  intermediate: {
    gradient: 'from-orange-900 to-orange-600',
    dot: 'bg-orange-400',
    badge: 'Intermediate Package',
  },
  expert: {
    gradient: 'from-amber-900 to-amber-600',
    dot: 'bg-amber-400',
    badge: 'Expert Package',
  },
};

export function VendorKitsContent() {
  const { addItem } = useCart();

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-crown-lime font-heading text-sm font-bold uppercase tracking-widest mb-3">
            Curated Bundles
          </p>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-crown-white mb-4">
            Vendor Kit Collections
          </h1>
          <p className="text-crown-muted max-w-2xl mx-auto">
            Three tiers built for every stage of the vendor journey &mdash; from first market to full
            festival anchor. Each name is rooted in authentic Jamaican culture. All prices in{' '}
            <span className="text-crown-lime font-bold">JMD</span>.
          </p>
        </div>

        <div className="space-y-10">
          {vendorKits.map((kit, i) => {
            const style = tierStyles[kit.tier];
            const kitProducts = kit.includedProductSlugs
              .map((slug) => products.find((p) => p.slug === slug))
              .filter(Boolean);

            return (
              <AnimatedSection key={kit.slug} delay={i * 150}>
                <div
                  id={kit.slug}
                  className="bg-crown-dark-card rounded-3xl overflow-hidden border border-crown-dark-surface scroll-mt-24"
                >
                  {/* Kit Header */}
                  <div className={`relative bg-gradient-to-br ${style.gradient} p-8 sm:p-10`}>
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={kit.image}
                        alt={kit.name}
                        fill
                        className="object-cover opacity-20"
                        sizes="100vw"
                      />
                    </div>
                    <div className="relative z-10">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-white/50 bg-white/10 border border-white/15 px-3 py-1 rounded-full mb-4">
                        {style.badge}
                      </span>
                      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight">
                        {kit.name}
                      </h2>
                      <p className="text-sm text-white/60 mt-1 italic">{kit.jamaicaMeaning}</p>
                      <p className="text-white/70 mt-3 max-w-lg italic">
                        &ldquo;{kit.tagline}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Kit Body */}
                  <div className="p-8 sm:p-10">
                    <p className="text-sm text-crown-muted leading-relaxed mb-6">
                      {kit.description}
                    </p>

                    <h3 className="text-xs font-bold uppercase tracking-widest text-crown-muted mb-4">
                      What&apos;s Included ({kitProducts.length} products)
                    </h3>

                    <div className="space-y-3 mb-8">
                      {kitProducts.map((product) =>
                        product ? (
                          <div
                            key={product.slug}
                            className="flex items-center gap-3 p-3 bg-crown-dark-surface rounded-xl"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link
                                href={`/products/${product.slug}`}
                                className="text-sm font-bold text-crown-white hover:text-crown-lime transition-colors"
                              >
                                {product.name}
                              </Link>
                              <p className="text-xs text-crown-muted truncate">
                                {product.description}
                              </p>
                            </div>
                            <span className={`w-5 h-5 rounded-full ${style.dot} flex items-center justify-center shrink-0`}>
                              <Check size={12} className="text-white" />
                            </span>
                          </div>
                        ) : null
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="text-center sm:text-left">
                        <p className="font-heading text-2xl font-bold text-crown-lime">
                          {formatPrice(kit.price)}
                        </p>
                        <p className="text-xs text-crown-muted">Bundle price &bull; Save vs. individual</p>
                      </div>
                      <button
                        onClick={() => {
                          kitProducts.forEach((product) => {
                            if (product) addItem(product);
                          });
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-crown-lime text-crown-dark font-bold rounded-full hover:bg-crown-lime/90 transition-colors sm:ml-auto"
                      >
                        <ShoppingBag size={18} />
                        Add Entire Kit to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

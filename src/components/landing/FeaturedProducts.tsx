'use client';

import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const featured = products.slice(0, 6);

export function FeaturedProducts() {
  return (
    <section className="py-20 px-4 bg-crown-dark-card">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-crown-lavender font-heading text-sm font-bold uppercase tracking-widest mb-3">
              Top Picks
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white">
              Popular Products
            </h2>
          </div>
        </AnimatedSection>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
          {featured.map((product, i) => (
            <AnimatedSection key={product.slug} delay={i * 100} className="snap-start shrink-0 w-[85vw] sm:w-auto">
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="bg-crown-dark-surface rounded-2xl overflow-hidden border border-crown-dark-surface hover:border-crown-lime/30 transition-all duration-300">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-crown-lime uppercase tracking-wider">
                      {product.category.replace('-', ' ')}
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
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block px-8 py-3 border-2 border-crown-lime text-crown-lime font-bold rounded-full hover:bg-crown-lime hover:text-crown-dark transition-all"
          >
            View All Products
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

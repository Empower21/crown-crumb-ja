'use client';

import { products } from '@/data/products';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ProductCard } from '@/components/products/ProductCard';
import Link from 'next/link';

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
            <p className="text-crown-muted mt-2 text-sm">
              All prices in <span className="text-crown-lime font-bold">JMD (J$)</span>
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <AnimatedSection key={product.slug} delay={i * 100}>
              <ProductCard product={product} />
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

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Snowflake, LayoutGrid, Package, ChefHat, Crown } from 'lucide-react';
import { categories } from '@/data/categories';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { CategorySlug } from '@/types';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Snowflake,
  LayoutGrid,
  Package,
  ChefHat,
  Crown,
};

// Tent icon inline since lucide-react may not have Tent
function TentIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 21h18" />
      <path d="M12 3L2 21h20L12 3z" />
      <path d="M12 3v18" />
    </svg>
  );
}

export function CategoryShowcase() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-crown-lime font-heading text-sm font-bold uppercase tracking-widest mb-3">
              What We Offer
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white">
              Everything for Your Pop-Up
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const IconComponent = cat.icon === 'Tent' ? TentIcon : iconMap[cat.icon] || Package;
            const href = cat.slug === 'originals' ? '/events' : `/products?category=${cat.slug}`;

            return (
              <AnimatedSection key={cat.slug} delay={i * 100}>
                <Link href={href} className="group block">
                  <div className="relative h-64 rounded-2xl overflow-hidden border border-crown-dark-surface hover:border-crown-lime/50 transition-all duration-300 group-hover:glow-lime">
                    <Image
                      src={cat.heroImage}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-crown-dark via-crown-dark/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent size={20} className="text-crown-lime" />
                        <h3 className="font-heading text-lg font-bold text-crown-white group-hover:text-crown-lime transition-colors">
                          {cat.name}
                        </h3>
                      </div>
                      <p className="text-sm text-crown-muted line-clamp-2">{cat.description}</p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

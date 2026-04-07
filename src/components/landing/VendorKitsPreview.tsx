'use client';

import Image from 'next/image';
import Link from 'next/link';
import { vendorKits } from '@/data/vendor-kits';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const tierColors = {
  beginner: 'from-emerald-900 to-emerald-700',
  intermediate: 'from-orange-900 to-orange-600',
  expert: 'from-amber-900 to-amber-600',
};

const tierBadge = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  expert: 'Expert',
};

export function VendorKitsPreview() {
  return (
    <section className="py-20 px-4 bg-crown-dark-card">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-crown-lime font-heading text-sm font-bold uppercase tracking-widest mb-3">
              Curated Bundles
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white">
              Vendor Kit Collections
            </h2>
            <p className="text-crown-muted mt-3 max-w-xl mx-auto">
              Three tiers built for every stage of the vendor journey &mdash; from first market to full festival anchor.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vendorKits.map((kit, i) => (
            <AnimatedSection key={kit.slug} delay={i * 120}>
              <Link href={`/vendor-kits#${kit.slug}`} className="group block h-full">
                <div className="bg-crown-dark rounded-2xl overflow-hidden border border-crown-dark-surface hover:border-crown-lime/30 transition-all duration-300 h-full flex flex-col">
                  <div className={`relative h-48 bg-gradient-to-br ${tierColors[kit.tier]} p-6 flex flex-col justify-end`}>
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={kit.image}
                        alt={kit.name}
                        fill
                        className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="relative z-10">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-white/60 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-3">
                        {tierBadge[kit.tier]} Package
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-white leading-tight">
                        {kit.name}
                      </h3>
                      <p className="text-xs text-white/60 mt-1 italic">{kit.jamaicaMeaning}</p>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs italic text-crown-muted mb-3">&ldquo;{kit.tagline}&rdquo;</p>
                    <p className="text-sm text-crown-muted leading-relaxed flex-1">
                      {kit.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-crown-muted">
                        {kit.includedProductSlugs.length} products included
                      </span>
                      <span className="text-sm font-bold text-crown-lime group-hover:underline">
                        View Kit &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

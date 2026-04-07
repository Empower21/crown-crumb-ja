'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-crown-gold font-heading text-sm font-bold uppercase tracking-widest mb-3">
              Happy Vendors
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white">
              What Our Customers Say
            </h2>
            <p className="text-crown-muted mt-3 max-w-xl mx-auto">
              Real feedback from Jamaican vendors and bakers using Crown Crumb products at markets and events across the island.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 100}>
              <div className="bg-crown-dark-card border border-crown-dark-surface rounded-2xl p-6 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-crown-gold fill-crown-gold" />
                  ))}
                </div>
                <p className="text-sm text-crown-muted leading-relaxed flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-crown-dark-surface flex items-center gap-3">
                  {t.image ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image src={t.image} alt={t.name} fill className="object-cover" sizes="40px" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-crown-lavender/20 flex items-center justify-center text-crown-lavender font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-crown-white">{t.name}</p>
                    <p className="text-xs text-crown-muted">{t.business}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Additional testimonials in a simpler row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.slice(3).map((t, i) => (
            <AnimatedSection key={t.id} delay={300 + i * 100}>
              <div className="bg-crown-dark-surface rounded-xl p-5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-crown-lime/20 flex items-center justify-center text-crown-lime font-bold text-xs shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-crown-muted italic">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-xs text-crown-white font-bold mt-2">{t.name} &bull; {t.business}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

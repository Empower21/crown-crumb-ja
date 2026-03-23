'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function AboutPreview() {
  return (
    <section className="py-20 px-4 bg-crown-dark-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/products/events/popup-display-2.jpg"
                alt="Crown Crumb pop-up event display"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-crown-dark/60 to-transparent lg:hidden" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="space-y-6">
              <p className="text-crown-lavender font-heading text-sm font-bold uppercase tracking-widest">
                The Story
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white">
                Cloud Engineer by Day.
                <br />
                <span className="text-crown-lime">Artisan Baker by Passion.</span>
              </h2>
              <p className="text-crown-muted leading-relaxed">
                Crown Crumb JA was born from Danielle Lawrence&apos;s love for baking and her
                frustration with the lack of quality pop-up supplies in Jamaica. As a cloud
                engineer, she knew how to build systems. As a baker, she knew what vendors
                actually needed. The result? A one-stop shop for every pop-up dreamer in Kingston.
              </p>
              <Link
                href="/about"
                className="inline-block px-8 py-3 border-2 border-crown-lavender text-crown-lavender font-bold rounded-full hover:bg-crown-lavender hover:text-crown-dark transition-all"
              >
                Read Danielle&apos;s Story
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

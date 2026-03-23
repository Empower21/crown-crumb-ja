'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const eventPhotos = [
  { src: '/products/events/popup-display-2.jpg', alt: 'Crown Crumb pop-up display with risers and chalkboards' },
  { src: '/products/events/popup-booth-branded.jpg', alt: 'Crown Crumb branded booth' },
  { src: '/products/events/popup-display-closeup.jpg', alt: 'Crown Crumb products close-up with kraft bags' },
  { src: '/products/events/popup-booth-wide.jpg', alt: 'Crown Crumb booth at outdoor event' },
  { src: '/products/events/packed-orders.jpg', alt: 'Crown Crumb packed orders in insulated bag' },
  { src: '/products/events/popup-display-1.jpg', alt: 'Crown Crumb dome containers on display' },
];

export function EventGallery() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-crown-gold font-heading text-sm font-bold uppercase tracking-widest mb-3">
              In Action
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white">
              Crown Crumb at Pop-Up Events
            </h2>
            <p className="text-crown-muted mt-3 max-w-xl mx-auto">
              See our products in action at real events across Kingston. Every item we sell, we use ourselves.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {eventPhotos.map((photo, i) => (
            <AnimatedSection
              key={photo.src}
              delay={i * 80}
              className={i === 0 ? 'col-span-2 md:col-span-1 md:row-span-2' : ''}
            >
              <div className="relative overflow-hidden rounded-xl group cursor-pointer h-48 sm:h-56 md:h-full min-h-[12rem]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-crown-dark/30 group-hover:bg-crown-dark/10 transition-colors" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link
            href="/events"
            className="inline-block px-8 py-3 border-2 border-crown-gold text-crown-gold font-bold rounded-full hover:bg-crown-gold hover:text-crown-dark transition-all"
          >
            See Upcoming Events
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

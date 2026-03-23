import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { events } from '@/data/events';
import { whatsappLink } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'See Crown Crumb JA at pop-up events across Kingston, Jamaica. Check our upcoming events and past showcases.',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-JM', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function EventsPage() {
  const upcoming = events.filter((e) => e.status === 'upcoming');
  const past = events.filter((e) => e.status === 'past');

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white mb-3">
            Pop-Up Events
          </h1>
          <p className="text-crown-muted max-w-2xl">
            Catch Crown Crumb at events across Kingston. See our products in action, shop
            supplies, and taste Danielle&apos;s artisan baked goods.
          </p>
        </div>

        {/* Upcoming Events */}
        {upcoming.length > 0 && (
          <div className="mb-16">
            <h2 className="font-heading text-xl font-bold text-crown-lime uppercase tracking-wider mb-6">
              Upcoming Events
            </h2>
            <div className="space-y-6">
              {upcoming.map((event) => (
                <div
                  key={event.id}
                  className="bg-crown-dark-card rounded-2xl overflow-hidden border border-crown-dark-surface hover:border-crown-lime/30 transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {event.image && (
                      <div className="relative h-56 md:h-auto">
                        <Image
                          src={event.image}
                          alt={event.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6 md:col-span-2 flex flex-col justify-center space-y-4">
                      <h3 className="font-heading text-2xl font-bold text-crown-white">
                        {event.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-crown-muted">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-crown-lime" />
                          {formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-crown-lime" />
                          {event.location}
                        </span>
                      </div>
                      <p className="text-crown-muted">{event.description}</p>
                      <a
                        href={whatsappLink(`Hi! I'm interested in the ${event.name} event. Can you tell me more?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-crown-lime hover:underline"
                      >
                        Ask About This Event <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event Gallery */}
        <div className="mb-16">
          <h2 className="font-heading text-xl font-bold text-crown-gold uppercase tracking-wider mb-6">
            Event Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              '/products/events/popup-display-2.jpg',
              '/products/events/popup-booth-branded.jpg',
              '/products/events/popup-display-closeup.jpg',
              '/products/events/popup-booth-wide.jpg',
              '/products/events/packed-orders.jpg',
              '/products/events/popup-display-1.jpg',
            ].map((src) => (
              <div key={src} className="relative h-48 sm:h-56 rounded-xl overflow-hidden group">
                <Image
                  src={src}
                  alt="Crown Crumb at a pop-up event"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-crown-dark/20 group-hover:bg-crown-dark/5 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-crown-dark-card rounded-3xl p-10 border border-crown-dark-surface">
          <h2 className="font-heading text-2xl font-bold text-crown-white mb-4">
            Want Crown Crumb at Your Event?
          </h2>
          <p className="text-crown-muted mb-6 max-w-md mx-auto">
            We love partnering with markets, festivals, and community events across Jamaica.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-crown-lime text-crown-dark font-bold rounded-full hover:bg-crown-lime/90 transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

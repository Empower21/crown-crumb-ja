import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { getUpcomingEvents } from '@/data/events';
import { EventCard } from '@/components/events/EventCard';

export function UpcomingEventsPreview() {
  const next = getUpcomingEvents().slice(0, 3);
  if (next.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-crown-dark">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crown-lime/10 border border-crown-lime/30 text-xs font-bold uppercase tracking-widest text-crown-lime mb-3">
              <Calendar size={12} />
              Vendor Calendar
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-crown-lavender mb-2">
              Upcoming Events Across Jamaica
            </h2>
            <p className="text-crown-muted max-w-2xl">
              Craft fairs, food expos, cultural festivals — where Jamaican pop-up vendors
              can register. Hand-curated from JTB, JCDC, parish councils, and community IG.
            </p>
          </div>
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 text-crown-lime font-semibold hover:gap-3 transition-all"
          >
            View all events
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {next.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
}

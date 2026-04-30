'use client';

import { useMemo, useState } from 'react';
import { Calendar, MapPin, Plus, List, LayoutGrid } from 'lucide-react';
import { events, getUpcomingEvents, groupEventsByMonth } from '@/data/events';
import type { EventCategory, Parish, VendorEvent } from '@/types';
import { AddEventForm } from '@/components/events/AddEventForm';
import { EventCard } from '@/components/events/EventCard';
import { EventCalendar } from '@/components/events/EventCalendar';

const PARISH_OPTIONS: (Parish | 'all')[] = [
  'all',
  'Kingston',
  'St. Andrew',
  'St. Catherine',
  'Clarendon',
  'Manchester',
  'St. Elizabeth',
  'St. James',
  'Westmoreland',
  'Hanover',
  'Trelawny',
  'St. Ann',
  'St. Mary',
  'Portland',
  'St. Thomas',
];

const CATEGORY_OPTIONS: (EventCategory | 'all')[] = [
  'all',
  'craft-fair',
  'food-expo',
  'cultural-festival',
  'church-bazaar',
  'school-fair',
  'farmers-market',
  'pop-up-market',
  'holiday-market',
  'music-festival',
  'expo-trade',
];

const categoryLabel = (c: EventCategory | 'all') =>
  c === 'all' ? 'All types' : c.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

export function EventsContent() {
  const [view, setView] = useState<'list' | 'calendar'>('calendar');
  const [parishFilter, setParishFilter] = useState<Parish | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | 'all'>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const upcoming = useMemo(() => getUpcomingEvents(), []);

  const filtered: VendorEvent[] = useMemo(() => {
    return upcoming.filter((e) => {
      if (parishFilter !== 'all' && e.parish !== parishFilter) return false;
      if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
      return true;
    });
  }, [upcoming, parishFilter, categoryFilter]);

  const byMonth = useMemo(() => groupEventsByMonth(filtered), [filtered]);

  return (
    <div className="min-h-screen bg-crown-dark text-crown-white">
      {/* Hero */}
      <section className="border-b border-white/5 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crown-lime/10 border border-crown-lime/30 text-xs font-bold uppercase tracking-widest text-crown-lime mb-4">
                <Calendar size={12} />
                Pop-Up Vendor Calendar
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-crown-lavender mb-4">
                Upcoming Events Across Jamaica
              </h1>
              <p className="text-crown-muted text-lg leading-relaxed">
                Craft fairs, food expos, cultural festivals, and holiday markets where
                Jamaican pop-up vendors can register. Hand-curated from the Jamaica
                Tourism Board, JCDC, parish councils, and community Instagram — because
                the real action isn&apos;t on Eventbrite.
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-5 py-3 bg-crown-lime text-crown-dark font-bold rounded-full hover:brightness-110 transition whitespace-nowrap"
            >
              <Plus size={18} />
              Add an Event
            </button>
          </div>

        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-16 sm:top-20 z-40 bg-crown-dark/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setView('calendar')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition ${
                view === 'calendar'
                  ? 'bg-crown-lime text-crown-dark font-semibold'
                  : 'bg-crown-dark-surface text-crown-white hover:bg-white/5'
              }`}
            >
              <LayoutGrid size={14} />
              Calendar
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition ${
                view === 'list'
                  ? 'bg-crown-lime text-crown-dark font-semibold'
                  : 'bg-crown-dark-surface text-crown-white hover:bg-white/5'
              }`}
            >
              <List size={14} />
              List
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center text-sm">
            <label className="flex items-center gap-2">
              <MapPin size={14} className="text-crown-muted" />
              <select
                value={parishFilter}
                onChange={(e) => setParishFilter(e.target.value as Parish | 'all')}
                className="bg-crown-dark-surface text-crown-white border border-white/10 rounded-md px-2 py-1.5 focus:outline-none focus:border-crown-lime"
              >
                {PARISH_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p === 'all' ? 'All parishes' : p}
                  </option>
                ))}
              </select>
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as EventCategory | 'all')}
              className="bg-crown-dark-surface text-crown-white border border-white/10 rounded-md px-2 py-1.5 focus:outline-none focus:border-crown-lime"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {categoryLabel(c)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-crown-muted">
              No events match those filters yet. Know of one?{' '}
              <button
                onClick={() => setShowAddForm(true)}
                className="text-crown-lime underline hover:no-underline"
              >
                Add it to the calendar
              </button>
              .
            </p>
          </div>
        )}

        {view === 'calendar' && filtered.length > 0 && (
          <EventCalendar events={filtered} />
        )}

        {view === 'list' && filtered.length > 0 && (
          <div className="space-y-10">
            {Array.from(byMonth.entries()).map(([month, list]) => (
              <div key={month}>
                <h2 className="font-heading text-2xl font-bold text-crown-lavender mb-4">
                  {formatMonth(month)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {list.map((e) => (
                    <EventCard key={e.slug} event={e} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/5 text-sm text-crown-muted">
          <p className="mb-2">
            <strong className="text-crown-white">Dates & booth fees change.</strong> Always click
            the source link on an event card to verify the latest info with the host before paying
            registration.
          </p>
          <p>
            Showing {filtered.length} of {events.length} tracked events. New to the calendar? Submit
            one via{' '}
            <button
              onClick={() => setShowAddForm(true)}
              className="text-crown-lime underline hover:no-underline"
            >
              Add an Event
            </button>{' '}
            — Danielle reviews every submission before it goes live.
          </p>
        </div>
      </section>

      {showAddForm && <AddEventForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
}

function formatMonth(yyyymm: string): string {
  const [y, m] = yyyymm.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString('en-JM', {
    month: 'long',
    year: 'numeric',
  });
}

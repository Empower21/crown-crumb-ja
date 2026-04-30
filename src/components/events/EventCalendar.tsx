'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { VendorEvent } from '@/types';
import { EventCard } from './EventCard';

/**
 * Month-grid calendar. Days with events are highlighted; clicking a day
 * reveals the matching event cards below. Navigates month-by-month but
 * clamps to months that actually contain events (no empty-calendar clicks).
 */
export function EventCalendar({ events }: { events: VendorEvent[] }) {
  const monthsWithEvents = useMemo(() => {
    const set = new Set<string>();
    for (const e of events) set.add(e.startDate.slice(0, 7));
    return Array.from(set).sort();
  }, [events]);

  const [activeMonth, setActiveMonth] = useState(monthsWithEvents[0] ?? todayMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthEvents = useMemo(
    () => events.filter((e) => e.startDate.startsWith(activeMonth)),
    [events, activeMonth],
  );

  const eventsByDay = useMemo(() => {
    const map = new Map<string, VendorEvent[]>();
    for (const e of monthEvents) {
      const existing = map.get(e.startDate) ?? [];
      existing.push(e);
      map.set(e.startDate, existing);
    }
    return map;
  }, [monthEvents]);

  const selectedEvents = selectedDate
    ? events.filter((e) => {
        const end = e.endDate ?? e.startDate;
        return selectedDate >= e.startDate && selectedDate <= end;
      })
    : monthEvents;

  const idx = monthsWithEvents.indexOf(activeMonth);
  const canPrev = idx > 0;
  const canNext = idx >= 0 && idx < monthsWithEvents.length - 1;

  const [year, month] = activeMonth.split('-').map(Number);
  const grid = buildMonthGrid(year, month);
  const monthLabel = new Date(year, month - 1, 1).toLocaleDateString('en-JM', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => canPrev && setActiveMonth(monthsWithEvents[idx - 1])}
          disabled={!canPrev}
          className="p-2 rounded-md bg-crown-dark-surface text-crown-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-crown-lavender">
          {monthLabel}
        </h2>
        <button
          onClick={() => canNext && setActiveMonth(monthsWithEvents[idx + 1])}
          disabled={!canNext}
          className="p-2 rounded-md bg-crown-dark-surface text-crown-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-6 bg-crown-dark-card p-3 rounded-xl border border-white/5">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="text-center text-[10px] uppercase tracking-wider text-crown-muted py-2">
            {d}
          </div>
        ))}
        {grid.map((cell, i) => {
          const isoDate = cell ? `${activeMonth}-${String(cell).padStart(2, '0')}` : null;
          const dayEvents = isoDate ? eventsByDay.get(isoDate) ?? [] : [];
          const isSelected = selectedDate === isoDate;
          const isToday = isoDate === todayIso();

          if (!cell) return <div key={i} className="aspect-square" />;

          return (
            <button
              key={i}
              onClick={() => isoDate && setSelectedDate(isSelected ? null : isoDate)}
              disabled={dayEvents.length === 0}
              className={`aspect-square flex flex-col items-center justify-center rounded-md text-sm transition relative ${
                dayEvents.length > 0
                  ? isSelected
                    ? 'bg-crown-lime text-crown-dark font-bold'
                    : 'bg-crown-lime/10 text-crown-lime font-semibold hover:bg-crown-lime/20 cursor-pointer'
                  : 'text-crown-muted cursor-default'
              } ${isToday && !isSelected ? 'ring-1 ring-crown-lavender' : ''}`}
            >
              <span>{cell}</span>
              {dayEvents.length > 0 && (
                <span
                  className={`absolute bottom-1 flex gap-0.5 ${isSelected ? 'opacity-80' : ''}`}
                  aria-label={`${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}`}
                >
                  {dayEvents.slice(0, 3).map((_, j) => (
                    <span
                      key={j}
                      className={`w-1 h-1 rounded-full ${
                        isSelected ? 'bg-crown-dark' : 'bg-crown-lime'
                      }`}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected-day filter header */}
      {selectedDate && (
        <div className="flex items-center justify-between mb-3 px-1">
          <p className="text-sm text-crown-muted">
            Showing events on{' '}
            <span className="text-crown-lime font-semibold">
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-JM', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </span>
          </p>
          <button
            onClick={() => setSelectedDate(null)}
            className="text-xs text-crown-lavender hover:underline"
          >
            Clear — show all in {monthLabel}
          </button>
        </div>
      )}

      {/* Event cards for the active month or selected day */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedEvents.map((e) => (
          <EventCard key={e.slug} event={e} />
        ))}
      </div>
    </div>
  );
}

/** Build a 7-column grid for a month: nulls for padding, numbers for days. */
function buildMonthGrid(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function todayMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

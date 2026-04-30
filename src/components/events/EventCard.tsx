'use client';

import {
  Calendar,
  MapPin,
  ExternalLink,
  Ticket,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import type { VendorEvent } from '@/types';
import { formatJMD } from '@/lib/utils';

const SOURCE_LABELS: Record<VendorEvent['source'], string> = {
  'tourism-board': 'Jamaica Tourism Board',
  jcdc: 'JCDC',
  'parish-council': 'Parish Council',
  instagram: 'Instagram',
  facebook: 'Facebook',
  church: 'Church Bulletin',
  school: 'School Notice',
  community: 'Community Group',
  other: 'Other',
};

const CATEGORY_COLOR: Record<VendorEvent['category'], string> = {
  'craft-fair': 'bg-crown-lavender/20 text-crown-lavender border-crown-lavender/30',
  'food-expo': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'cultural-festival': 'bg-crown-lime/20 text-crown-lime border-crown-lime/30',
  'church-bazaar': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'school-fair': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'farmers-market': 'bg-green-500/20 text-green-300 border-green-500/30',
  'pop-up-market': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'holiday-market': 'bg-red-500/20 text-red-300 border-red-500/30',
  'music-festival': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'expo-trade': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
};

export function EventCard({ event }: { event: VendorEvent }) {
  const start = new Date(event.startDate + 'T00:00:00');
  const end = event.endDate ? new Date(event.endDate + 'T00:00:00') : null;

  const dateLabel = end
    ? `${start.toLocaleDateString('en-JM', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-JM', { day: 'numeric', month: 'short', year: 'numeric' })}`
    : start.toLocaleDateString('en-JM', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  const deadlinePassed = event.registrationDeadline
    ? new Date(event.registrationDeadline) < new Date()
    : false;

  return (
    <article className="group flex flex-col h-full p-5 rounded-xl bg-crown-dark-card border border-white/5 hover:border-crown-lime/40 transition">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-semibold ${CATEGORY_COLOR[event.category]}`}
        >
          {event.category.replace(/-/g, ' ')}
        </span>
        {event.confirmed ? (
          <span
            className="flex items-center gap-1 text-[10px] text-crown-lime"
            title="Dates confirmed with host"
          >
            <CheckCircle2 size={12} />
            Confirmed
          </span>
        ) : (
          <span
            className="flex items-center gap-1 text-[10px] text-yellow-400"
            title="Based on prior-year dates — verify with source before paying fees"
          >
            <AlertCircle size={12} />
            Tentative
          </span>
        )}
      </div>

      <h3 className="font-heading text-lg font-bold text-crown-white mb-2 leading-tight">
        {event.name}
      </h3>

      <div className="space-y-1.5 text-sm text-crown-muted mb-3">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-crown-lime shrink-0" />
          <span>{dateLabel}</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={14} className="text-crown-lime shrink-0 mt-0.5" />
          <span>
            <span className="text-crown-white">{event.venue}</span>
            <span className="text-crown-muted"> • {event.parish}</span>
          </span>
        </div>
      </div>

      <p className="text-sm text-crown-muted leading-relaxed mb-4 flex-grow">
        {event.description}
      </p>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/5 text-xs">
        <div className="flex items-center gap-1 text-crown-muted">
          <Ticket size={12} />
          <span>
            {event.vendorFee === null
              ? 'Fee TBC'
              : event.vendorFee === 0
              ? 'Free'
              : formatJMD(event.vendorFee)}
          </span>
        </div>
        {event.registrationDeadline && (
          <span
            className={`font-semibold ${deadlinePassed ? 'text-red-400' : 'text-yellow-400'}`}
          >
            {deadlinePassed ? 'Deadline passed' : `Deadline ${formatShort(event.registrationDeadline)}`}
          </span>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-white/5 text-xs text-crown-muted">
        <div className="mb-1">
          <span className="text-crown-lavender/70">Source:</span> {SOURCE_LABELS[event.source]} —{' '}
          <span className="italic">{event.sourceLabel}</span>
        </div>
        {event.vendorContact && (
          <div className="mb-2">
            <span className="text-crown-lavender/70">Vendor contact:</span> {event.vendorContact}
          </div>
        )}
        {event.sourceUrl && (
          <a
            href={event.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-crown-lime hover:underline"
          >
            View source <ExternalLink size={10} />
          </a>
        )}
      </div>
    </article>
  );
}

function formatShort(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-JM', {
    day: 'numeric',
    month: 'short',
  });
}

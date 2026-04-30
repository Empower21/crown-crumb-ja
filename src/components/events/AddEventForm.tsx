'use client';

import { useState, type FormEvent } from 'react';
import { X, Send, Info } from 'lucide-react';
import { whatsappLink, whatsappMobileLink, isMobileBrowser, openWhatsApp } from '@/lib/utils';
import type { EventCategory, EventSource, Parish } from '@/types';

const PARISHES: Parish[] = [
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

const CATEGORIES: { value: EventCategory; label: string }[] = [
  { value: 'craft-fair', label: 'Craft Fair' },
  { value: 'food-expo', label: 'Food Expo' },
  { value: 'cultural-festival', label: 'Cultural Festival' },
  { value: 'church-bazaar', label: 'Church Bazaar' },
  { value: 'school-fair', label: 'School Fair' },
  { value: 'farmers-market', label: 'Farmers Market' },
  { value: 'pop-up-market', label: 'Pop-Up Market' },
  { value: 'holiday-market', label: 'Holiday Market' },
  { value: 'music-festival', label: 'Music Festival' },
  { value: 'expo-trade', label: 'Trade Expo' },
];

const SOURCES: { value: EventSource; label: string }[] = [
  { value: 'tourism-board', label: 'Jamaica Tourism Board (visitjamaica.com)' },
  { value: 'jcdc', label: 'JCDC' },
  { value: 'parish-council', label: 'Parish Council / Municipal Corporation' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'church', label: 'Church Bulletin / Notice' },
  { value: 'school', label: 'School Notice' },
  { value: 'community', label: 'Community Group' },
  { value: 'other', label: 'Other' },
];

/**
 * Modal form that collects event details and opens WhatsApp with the
 * details pre-filled as a message to Danielle. She verifies + adds the
 * event to events.ts. This manual curation step is intentional — Jamaican
 * event info is scattered across sources that don't have APIs, so a human
 * fact-check beats any scraper for quality.
 */
export function AddEventForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: '',
    category: '' as EventCategory | '',
    startDate: '',
    endDate: '',
    parish: '' as Parish | '',
    venue: '',
    description: '',
    source: '' as EventSource | '',
    sourceUrl: '',
    vendorContact: '',
    registrationDeadline: '',
    vendorFee: '',
    submitterName: '',
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = buildWhatsAppMessage(form);
    if (isMobileBrowser()) {
      window.location.href = whatsappMobileLink(msg);
    } else {
      window.open(whatsappLink(msg), '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-crown-dark-card border border-white/10 rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-crown-dark-card border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold text-crown-lavender">
              Add an Event to the Calendar
            </h2>
            <p className="text-xs text-crown-muted mt-0.5">
              Danielle reviews every submission before it goes live.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-crown-muted hover:text-crown-white rounded transition"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* Info banner */}
        <div className="mx-6 mt-4 p-3 rounded-lg bg-crown-lime/5 border border-crown-lime/20 text-xs text-crown-muted flex gap-2">
          <Info size={14} className="text-crown-lime shrink-0 mt-0.5" />
          <div>
            Submitting via WhatsApp — fill out the form and it&apos;ll open WhatsApp with your
            event details pre-filled. No signup, no spam. Your phone number stays with you.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <Field label="Event name" required>
            <input
              type="text"
              required
              placeholder="e.g. St. Thomas Heritage Craft Fair"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className={inputStyles}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Category" required>
              <select
                required
                value={form.category}
                onChange={(e) => update('category', e.target.value as EventCategory)}
                className={inputStyles}
              >
                <option value="">Choose…</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Parish" required>
              <select
                required
                value={form.parish}
                onChange={(e) => update('parish', e.target.value as Parish)}
                className={inputStyles}
              >
                <option value="">Choose…</option>
                {PARISHES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Start date" required>
              <input
                type="date"
                required
                value={form.startDate}
                onChange={(e) => update('startDate', e.target.value)}
                className={inputStyles}
              />
            </Field>
            <Field label="End date (if multi-day)">
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => update('endDate', e.target.value)}
                className={inputStyles}
              />
            </Field>
          </div>

          <Field label="Venue" required>
            <input
              type="text"
              required
              placeholder="e.g. Emancipation Park, New Kingston"
              value={form.venue}
              onChange={(e) => update('venue', e.target.value)}
              className={inputStyles}
            />
          </Field>

          <Field label="What it is (1–2 sentences)">
            <textarea
              rows={3}
              placeholder="What should vendors know? Foot traffic, audience, past years, etc."
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              className={inputStyles}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Where did you find it?" required>
              <select
                required
                value={form.source}
                onChange={(e) => update('source', e.target.value as EventSource)}
                className={inputStyles}
              >
                <option value="">Choose…</option>
                {SOURCES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Link to source" hint="IG post, JTB page, parish FB post">
              <input
                type="url"
                placeholder="https://…"
                value={form.sourceUrl}
                onChange={(e) => update('sourceUrl', e.target.value)}
                className={inputStyles}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Vendor contact" hint="Email or phone for registration">
              <input
                type="text"
                placeholder="events@example.com or 876-…"
                value={form.vendorContact}
                onChange={(e) => update('vendorContact', e.target.value)}
                className={inputStyles}
              />
            </Field>
            <Field label="Booth fee (JMD)">
              <input
                type="number"
                min="0"
                step="500"
                placeholder="e.g. 5000"
                value={form.vendorFee}
                onChange={(e) => update('vendorFee', e.target.value)}
                className={inputStyles}
              />
            </Field>
          </div>

          <Field label="Registration deadline">
            <input
              type="date"
              value={form.registrationDeadline}
              onChange={(e) => update('registrationDeadline', e.target.value)}
              className={inputStyles}
            />
          </Field>

          <Field label="Your name (optional)" hint="So Danielle can credit you">
            <input
              type="text"
              placeholder="e.g. Keisha from Spanish Town"
              value={form.submitterName}
              onChange={(e) => update('submitterName', e.target.value)}
              className={inputStyles}
            />
          </Field>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-full bg-crown-dark-surface text-crown-white border border-white/10 hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white font-bold hover:brightness-110 transition"
            >
              <Send size={16} />
              Send via WhatsApp
            </button>
          </div>
          {/* Hidden anchor so the mobile detection path has something to click-target if needed */}
          <a
            href={whatsappLink(buildWhatsAppMessage(form))}
            onClick={openWhatsApp(buildWhatsAppMessage(form))}
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          >
            fallback
          </a>
        </form>
      </div>
    </div>
  );
}

const inputStyles =
  'w-full px-3 py-2.5 bg-crown-dark-surface border border-white/10 rounded-lg text-crown-white placeholder-crown-muted/60 focus:outline-none focus:border-crown-lime transition';

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-crown-white mb-1.5">
        {label}
        {required && <span className="text-crown-lime"> *</span>}
        {hint && <span className="text-crown-muted font-normal"> — {hint}</span>}
      </span>
      {children}
    </label>
  );
}

function buildWhatsAppMessage(form: {
  name: string;
  category: EventCategory | '';
  startDate: string;
  endDate: string;
  parish: Parish | '';
  venue: string;
  description: string;
  source: EventSource | '';
  sourceUrl: string;
  vendorContact: string;
  registrationDeadline: string;
  vendorFee: string;
  submitterName: string;
}): string {
  const lines = [
    `Hi Crown Crumb! I'd like to submit an event for the vendor calendar.`,
    ``,
    `*Event:* ${form.name || '(not provided)'}`,
    `*Type:* ${form.category || '(not provided)'}`,
    `*Dates:* ${form.startDate}${form.endDate ? ` – ${form.endDate}` : ''}`,
    `*Parish / Venue:* ${form.parish}, ${form.venue}`,
  ];
  if (form.description) lines.push(`*About:* ${form.description}`);
  lines.push(`*Source:* ${form.source || '(not provided)'}`);
  if (form.sourceUrl) lines.push(`*Link:* ${form.sourceUrl}`);
  if (form.vendorContact) lines.push(`*Vendor contact:* ${form.vendorContact}`);
  if (form.vendorFee) lines.push(`*Booth fee:* J$${form.vendorFee}`);
  if (form.registrationDeadline) lines.push(`*Deadline:* ${form.registrationDeadline}`);
  if (form.submitterName) lines.push(`*Submitted by:* ${form.submitterName}`);
  return lines.join('\n');
}

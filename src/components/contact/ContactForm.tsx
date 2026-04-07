'use client';

import { useState, FormEvent } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/utils';

const PRODUCT_INTERESTS = [
  'Display & Signage',
  'Packaging Solutions',
  'Baking Supplies',
  'Digital Tools',
  'Vendor Kit — Likkle But Tallawah (Beginner)',
  'Vendor Kit — Run Di Vibes (Intermediate)',
  'Vendor Kit — Big Tings A Gwaan (Expert)',
  'Bulk Order',
  'Other',
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-crown-dark-card rounded-2xl p-10 border border-crown-dark-surface text-center">
        <CheckCircle size={48} className="text-crown-lime mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-bold text-crown-white mb-2">
          Message Sent!
        </h3>
        <p className="text-crown-muted mb-6">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <a
          href={whatsappLink('Hi Crown Crumb! I just submitted a contact form and wanted to follow up.')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#22c35e] transition-colors"
        >
          Follow Up on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-crown-dark-card rounded-2xl p-6 sm:p-8 border border-crown-dark-surface space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-crown-white mb-1.5">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2.5 bg-crown-dark-surface text-crown-white rounded-lg border border-crown-dark-surface focus:border-crown-lime focus:outline-none text-sm placeholder:text-crown-muted"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-crown-white mb-1.5">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2.5 bg-crown-dark-surface text-crown-white rounded-lg border border-crown-dark-surface focus:border-crown-lime focus:outline-none text-sm placeholder:text-crown-muted"
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-crown-white mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-2.5 bg-crown-dark-surface text-crown-white rounded-lg border border-crown-dark-surface focus:border-crown-lime focus:outline-none text-sm placeholder:text-crown-muted"
            placeholder="+1 876 XXX XXXX"
          />
        </div>
        <div>
          <label htmlFor="business" className="block text-sm font-medium text-crown-white mb-1.5">
            Business Name
          </label>
          <input
            type="text"
            id="business"
            name="business"
            className="w-full px-4 py-2.5 bg-crown-dark-surface text-crown-white rounded-lg border border-crown-dark-surface focus:border-crown-lime focus:outline-none text-sm placeholder:text-crown-muted"
            placeholder="Your bakery or business"
          />
        </div>
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-medium text-crown-white mb-1.5">
          Product Interest *
        </label>
        <select
          id="interest"
          name="interest"
          required
          className="w-full px-4 py-2.5 bg-crown-dark-surface text-crown-white rounded-lg border border-crown-dark-surface focus:border-crown-lime focus:outline-none text-sm"
        >
          <option value="">Select a category</option>
          {PRODUCT_INTERESTS.map((pi) => (
            <option key={pi} value={pi}>
              {pi}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-crown-white mb-1.5">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-2.5 bg-crown-dark-surface text-crown-white rounded-lg border border-crown-dark-surface focus:border-crown-lime focus:outline-none text-sm placeholder:text-crown-muted resize-none"
          placeholder="Tell us about your needs — quantities, event details, timeline, etc."
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-crown-lime text-crown-dark font-bold rounded-full hover:bg-crown-lime/90 transition-all disabled:opacity-50"
      >
        <Send size={16} />
        {sending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

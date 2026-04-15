// src/components/layout/CurrencySelector.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useGeoPrice } from '@/hooks/useGeoPrice';

const countries = [
  { code: 'JM', flag: '\ud83c\uddef\ud83c\uddf2', label: 'Jamaica (JMD)' },
  { code: 'US', flag: '\ud83c\uddfa\ud83c\uddf8', label: 'USA (USD)' },
  { code: 'CA', flag: '\ud83c\udde8\ud83c\udde6', label: 'Canada (CAD)' },
  { code: 'GB', flag: '\ud83c\uddec\ud83c\udde7', label: 'UK (GBP)' },
  { code: 'TT', flag: '\ud83c\uddf9\ud83c\uddf9', label: 'Trinidad (TTD)' },
  { code: 'BB', flag: '\ud83c\udde7\ud83c\udde7', label: 'Barbados (BBD)' },
];

export function CurrencySelector() {
  const { country, currency, setCountry } = useGeoPrice();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = countries.find((c) => c.code === country) || countries[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-crown-muted hover:text-crown-lime transition-colors rounded-lg hover:bg-crown-dark-surface"
        aria-label="Change currency"
      >
        <Globe size={14} />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{currency.code}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-crown-dark-card border border-crown-dark-surface rounded-xl shadow-2xl overflow-hidden z-50">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCountry(c.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                c.code === country
                  ? 'bg-crown-lime/10 text-crown-lime'
                  : 'text-crown-muted hover:text-crown-white hover:bg-crown-dark-surface'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

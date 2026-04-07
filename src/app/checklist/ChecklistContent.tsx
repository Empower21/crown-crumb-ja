'use client';

import { useState, useMemo, useCallback } from 'react';
import { ChevronDown, RotateCcw, Gift } from 'lucide-react';
import { checklistCategories } from '@/data/checklist';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function ChecklistContent() {
  const totalItems = useMemo(
    () => checklistCategories.reduce((sum, cat) => sum + cat.items.length, 0),
    []
  );

  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [openCats, setOpenCats] = useState<Set<number>>(new Set([0]));

  const toggleItem = useCallback((key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const toggleCat = useCallback((i: number) => {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => setChecked(new Set()), []);

  const pct = totalItems > 0 ? Math.round((checked.size / totalItems) * 100) : 0;

  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-crown-lime/10 border border-crown-lime/30 rounded-full mb-4">
            <Gift size={14} className="text-crown-lime" />
            <span className="text-xs font-bold text-crown-lime uppercase tracking-widest">
              Free Resource
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white mb-3">
            Master Vendor Checklist
          </h1>
          <p className="text-crown-muted max-w-lg mx-auto text-sm">
            {totalItems} items across {checklistCategories.length} categories. Tap any item to mark it
            packed. Use this before every event to make sure nothing is left behind.
          </p>
        </div>

        {/* Progress panel */}
        <div className="bg-crown-dark-card rounded-2xl p-6 mb-8 border border-crown-dark-surface">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-bold text-crown-muted uppercase tracking-wider mb-1">
                Event Prep Progress
              </p>
              <p className="font-heading text-3xl font-bold text-crown-lime">
                {checked.size}{' '}
                <span className="text-base text-crown-muted font-normal">/ {totalItems} packed</span>
              </p>
            </div>
            <p className="font-heading text-4xl font-bold text-crown-dark-surface">{pct}%</p>
          </div>
          <div className="h-2 bg-crown-dark-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-crown-lime to-crown-gold rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <button
            onClick={resetAll}
            className="mt-3 flex items-center gap-2 text-xs text-crown-muted hover:text-crown-white transition-colors"
          >
            <RotateCcw size={12} />
            Reset All
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {checklistCategories.map((cat, catIdx) => {
            const isOpen = openCats.has(catIdx);
            const catChecked = cat.items.filter((_, j) =>
              checked.has(`${catIdx}-${j}`)
            ).length;

            return (
              <div
                key={catIdx}
                className="bg-crown-dark-card rounded-2xl border border-crown-dark-surface overflow-hidden"
              >
                <button
                  onClick={() => toggleCat(catIdx)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="flex-1 font-heading text-base font-bold text-crown-white">
                    {cat.name}
                  </span>
                  <span className="text-xs font-bold text-crown-muted bg-crown-dark-surface px-2 py-1 rounded-full">
                    {catChecked}/{cat.items.length}
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      'text-crown-muted transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 space-y-1">
                    {cat.items.map((item, itemIdx) => {
                      const key = `${catIdx}-${itemIdx}`;
                      const isDone = checked.has(key);

                      return (
                        <button
                          key={key}
                          onClick={() => toggleItem(key)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-crown-dark-surface transition-colors text-left"
                        >
                          <div
                            className={cn(
                              'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 text-xs transition-all',
                              isDone
                                ? 'bg-crown-lime border-crown-lime text-crown-dark'
                                : 'border-crown-dark-surface'
                            )}
                          >
                            {isDone && '\u2713'}
                          </div>
                          <span
                            className={cn(
                              'text-sm flex-1',
                              isDone ? 'line-through text-crown-muted' : 'text-crown-white'
                            )}
                          >
                            {item.label}
                          </span>
                          {item.essential && (
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-orange-900/40 text-orange-300 px-2 py-0.5 rounded-md shrink-0">
                              Essential
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-crown-muted mb-4">
            Need the supplies on this list? We have them.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-crown-lime text-crown-dark font-bold rounded-full hover:bg-crown-lime/90 transition-colors"
          >
            Shop Products
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '@/data/faq';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 bg-crown-dark-card">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-crown-lavender font-heading text-sm font-bold uppercase tracking-widest mb-3">
              Common Questions
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white">
              Frequently Asked Questions
            </h2>
          </div>
        </AnimatedSection>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <AnimatedSection key={i} delay={i * 50}>
              <div className="bg-crown-dark rounded-xl border border-crown-dark-surface overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-bold text-crown-white pr-4">{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      'text-crown-lime shrink-0 transition-transform duration-200',
                      openIndex === i && 'rotate-180'
                    )}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-crown-muted leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

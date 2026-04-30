'use client';

import { MessageCircle, Check } from 'lucide-react';
import type { Product, PriceTier } from '@/types';
import { useGeoPrice } from '@/hooks/useGeoPrice';
import { whatsappLink, openWhatsApp } from '@/lib/utils';

/**
 * Tier selector for products sold in small and wholesale quantities.
 *
 * Renders a button-group of tiers. Clicking a tier updates the active
 * selection. The "quoteOnly" tier opens WhatsApp with a pre-filled
 * wholesale enquiry instead of adding to cart.
 */
export function PriceTierSelector({
  product,
  activeTierIndex,
  onChange,
}: {
  product: Product;
  activeTierIndex: number;
  onChange: (index: number) => void;
}) {
  const { formatGeoPrice } = useGeoPrice();
  const tiers = product.priceTiers ?? [];
  if (tiers.length === 0) return null;

  const quoteMsg = `Hi Crown Crumb! I'd like a wholesale quote for ${product.name}. Could you send pricing and minimum order details?`;

  return (
    <div>
      <h3 className="font-heading text-sm font-bold text-crown-white uppercase tracking-wider mb-3">
        Choose Quantity
      </h3>
      <div className="space-y-2">
        {tiers.map((tier, i) => {
          const isActive = activeTierIndex === i;
          if (tier.quoteOnly) {
            return (
              <a
                key={i}
                href={whatsappLink(quoteMsg)}
                onClick={openWhatsApp(quoteMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 w-full p-3 rounded-xl border-2 border-dashed border-[#25D366]/40 bg-[#25D366]/5 hover:bg-[#25D366]/10 transition"
              >
                <div className="text-left">
                  <div className="font-semibold text-crown-white text-sm">
                    {tier.thresholdLabel ?? 'Bulk / Wholesale'}
                  </div>
                  <div className="text-xs text-crown-muted">Request custom pricing</div>
                </div>
                <div className="flex items-center gap-2 text-[#25D366] font-bold text-sm shrink-0">
                  <MessageCircle size={14} />
                  Contact for quote
                </div>
              </a>
            );
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(i)}
              className={`flex items-center justify-between gap-3 w-full p-3 rounded-xl border-2 transition ${
                isActive
                  ? 'border-crown-lime bg-crown-lime/10'
                  : 'border-crown-dark-surface bg-crown-dark-card hover:border-crown-muted'
              }`}
            >
              <div className="flex items-center gap-3 text-left">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isActive ? 'border-crown-lime bg-crown-lime' : 'border-crown-muted'
                  }`}
                >
                  {isActive && <Check size={12} className="text-crown-dark" />}
                </div>
                <div>
                  <div className="font-semibold text-crown-white text-sm flex items-center gap-2 flex-wrap">
                    {tier.unitLabel}
                    {tier.rentalPeriod && (
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-crown-lavender/20 text-crown-lavender border border-crown-lavender/30">
                        Rental
                      </span>
                    )}
                  </div>
                  {tier.rentalPeriod ? (
                    <div className="text-xs text-crown-muted">{tier.rentalPeriod}</div>
                  ) : (
                    tier.quantity > 1 &&
                    tier.priceJMD !== null && (
                      <div className="text-xs text-crown-muted">{perUnitLabel(tier)}</div>
                    )
                  )}
                </div>
              </div>
              <div
                className={`font-heading text-lg font-bold shrink-0 ${
                  isActive ? 'text-crown-lime' : 'text-crown-white'
                }`}
              >
                {formatGeoPrice(tier.priceJMD)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function perUnitLabel(tier: PriceTier): string {
  if (tier.priceJMD === null || tier.quantity === 0) return '';
  const perUnit = Math.round(tier.priceJMD / tier.quantity);
  return `J$${perUnit.toLocaleString('en-JM')} per piece`;
}

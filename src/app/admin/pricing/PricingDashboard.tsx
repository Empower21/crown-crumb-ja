'use client';

import { useMemo, useState } from 'react';
import { Download, RotateCcw, TrendingUp, Flame, Sparkles, Zap } from 'lucide-react';
import { products } from '@/data/products';
import { vendorKits } from '@/data/vendor-kits';
import { fallbackRates } from '@/data/currency-config';
import type { DeliveryZoneId } from '@/types';
import {
  calculatePrice,
  calculateKitPrice,
  defaultLevers,
  isPeakSeasonToday,
  type PricingLevers,
} from '@/lib/pricing-engine';

const ZONE_OPTIONS: { id: DeliveryZoneId; label: string }[] = [
  { id: 'kingston-metro', label: 'Kingston Metro' },
  { id: 'rest-of-jamaica', label: 'Rest of Jamaica' },
  { id: 'caribbean', label: 'Caribbean' },
  { id: 'north-america', label: 'North America' },
  { id: 'uk-europe', label: 'UK & Europe' },
];

const fmtJMD = (n: number) => `J$${Math.round(n).toLocaleString('en-JM')}`;
const fmtFX = (jmd: number, rate: number, symbol: string) =>
  `${symbol}${(jmd * rate).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

export default function PricingDashboard() {
  const peakToday = useMemo(() => isPeakSeasonToday(), []);
  const [levers, setLevers] = useState<PricingLevers>({
    ...defaultLevers,
    peakSeasonActive: peakToday.active,
    peakSurchargePct: peakToday.surchargePct ?? defaultLevers.peakSurchargePct,
  });
  const [zoneId, setZoneId] = useState<DeliveryZoneId>('kingston-metro');

  const updateLever = <K extends keyof PricingLevers>(key: K, value: PricingLevers[K]) =>
    setLevers((prev) => ({ ...prev, [key]: value }));

  const reset = () => setLevers(defaultLevers);

  const productRows = useMemo(
    () => products.map((p) => ({ product: p, price: calculatePrice(p, zoneId, levers) })),
    [zoneId, levers],
  );

  const kitRows = useMemo(
    () => vendorKits.map((k) => ({ kit: k, price: calculateKitPrice(k, levers) })),
    [levers],
  );

  const totals = useMemo(() => {
    const floor = products.reduce((s, p) => s + (p.price ?? 0), 0);
    const adjusted = productRows.reduce((s, r) => s + r.price.adjustedBase, 0);
    const landed = productRows.reduce((s, r) => s + r.price.landedTotal, 0);
    return {
      floor,
      adjusted,
      landed,
      uplift: adjusted - floor,
      upliftPct: floor === 0 ? 0 : ((adjusted - floor) / floor) * 100,
    };
  }, [productRows]);

  const downloadCsv = () => {
    const csv = buildCsv({ levers, zoneId, productRows, kitRows });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `crown-crumb-price-list-${date}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-crown-lavender">
            Dynamic Pricing Dashboard
          </h1>
          <p className="text-crown-muted mt-1 text-sm">
            Adjust levers to see landed prices across currencies and zones. Export the current view to CSV.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-crown-dark-surface text-crown-white border border-white/10 hover:border-crown-lavender/50 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={downloadCsv}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-crown-lime text-crown-dark font-semibold hover:brightness-110 transition"
          >
            <Download className="w-4 h-4" />
            Download CSV
          </button>
        </div>
      </header>

      {/* Lever controls */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LeverCard
          icon={<TrendingUp className="w-4 h-4" />}
          label="Margin Multiplier"
          value={`${(levers.marginMultiplier * 100).toFixed(0)}%`}
          hint={levers.marginMultiplier === 1 ? 'At floor price' : `${((levers.marginMultiplier - 1) * 100).toFixed(0)}% above floor`}
        >
          <input
            type="range"
            min={0.8}
            max={1.5}
            step={0.01}
            value={levers.marginMultiplier}
            onChange={(e) => updateLever('marginMultiplier', Number(e.target.value))}
            className="w-full accent-crown-lime"
          />
        </LeverCard>

        <LeverCard
          icon={<Flame className="w-4 h-4" />}
          label="Fuel Surcharge"
          value={`${(levers.fuelSurchargePct * 100).toFixed(0)}%`}
          hint="Applied to delivery + base"
        >
          <input
            type="range"
            min={0}
            max={0.25}
            step={0.01}
            value={levers.fuelSurchargePct}
            onChange={(e) => updateLever('fuelSurchargePct', Number(e.target.value))}
            className="w-full accent-crown-lime"
          />
        </LeverCard>

        <LeverCard
          icon={<Sparkles className="w-4 h-4" />}
          label="Peak Season"
          value={levers.peakSeasonActive ? `+${(levers.peakSurchargePct * 100).toFixed(0)}%` : 'Off'}
          hint={peakToday.active ? `Auto-detected: ${peakToday.name}` : 'No active peak window'}
        >
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={levers.peakSeasonActive}
              onChange={(e) => updateLever('peakSeasonActive', e.target.checked)}
              className="w-4 h-4 accent-crown-lime"
            />
            <span className="text-sm text-crown-muted">
              Apply peak surcharge
            </span>
          </label>
          {levers.peakSeasonActive && (
            <input
              type="range"
              min={0.05}
              max={0.3}
              step={0.01}
              value={levers.peakSurchargePct}
              onChange={(e) => updateLever('peakSurchargePct', Number(e.target.value))}
              className="w-full accent-crown-lime mt-2"
            />
          )}
        </LeverCard>

        <LeverCard
          icon={<Zap className="w-4 h-4" />}
          label="Rush Delivery"
          value={levers.rushDelivery ? '1.5×' : 'Off'}
          hint="Multiplies delivery cost"
        >
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={levers.rushDelivery}
              onChange={(e) => updateLever('rushDelivery', e.target.checked)}
              className="w-4 h-4 accent-crown-lime"
            />
            <span className="text-sm text-crown-muted">
              Enable rush delivery pricing
            </span>
          </label>
        </LeverCard>
      </section>

      {/* Zone selector + summary */}
      <section className="flex flex-col lg:flex-row gap-4 items-stretch">
        <div className="flex-1 p-4 rounded-lg bg-crown-dark-card border border-white/5">
          <label className="text-xs uppercase tracking-wide text-crown-muted">
            Delivery Zone
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {ZONE_OPTIONS.map((z) => (
              <button
                key={z.id}
                onClick={() => setZoneId(z.id)}
                className={`px-3 py-1.5 rounded-md text-sm transition ${
                  zoneId === z.id
                    ? 'bg-crown-lime text-crown-dark font-semibold'
                    : 'bg-crown-dark-surface text-crown-white hover:bg-white/5'
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 lg:w-[44rem]">
          <Stat label="Floor Total" value={fmtJMD(totals.floor)} sub="at base prices" />
          <Stat
            label="Adjusted Total"
            value={fmtJMD(totals.adjusted)}
            sub={`${totals.upliftPct >= 0 ? '+' : ''}${totals.upliftPct.toFixed(1)}% vs floor`}
            highlight
          />
          <Stat
            label="Landed Total"
            value={fmtJMD(totals.landed)}
            sub={`incl. delivery to ${ZONE_OPTIONS.find((z) => z.id === zoneId)?.label}`}
          />
        </div>
      </section>

      {/* Product table */}
      <section className="bg-crown-dark-card border border-white/5 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-heading font-semibold text-crown-lavender">Products</h2>
          <span className="text-xs text-crown-muted">{productRows.length} items</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-crown-dark-surface/50 text-crown-muted">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Product</th>
                <th className="text-right px-3 py-2 font-medium">Base JMD</th>
                <th className="text-right px-3 py-2 font-medium">Adjusted</th>
                <th className="text-right px-3 py-2 font-medium">USD</th>
                <th className="text-right px-3 py-2 font-medium">GBP</th>
                <th className="text-right px-3 py-2 font-medium">Delivery</th>
                <th className="text-right px-3 py-2 font-medium">Landed</th>
              </tr>
            </thead>
            <tbody>
              {productRows.map(({ product, price }) => (
                <tr key={product.slug} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-2">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-crown-muted flex gap-2 mt-0.5">
                      <span>{product.category}</span>
                      {product.bulkyItem && (
                        <span className="text-crown-lime">• bulky</span>
                      )}
                    </div>
                  </td>
                  <td className="text-right px-3 py-2 font-mono text-crown-muted">{fmtJMD(price.base)}</td>
                  <td className="text-right px-3 py-2 font-mono font-semibold text-crown-lime">{fmtJMD(price.adjustedBase)}</td>
                  <td className="text-right px-3 py-2 font-mono text-crown-muted">{fmtFX(price.adjustedBase, fallbackRates.USD, 'US$')}</td>
                  <td className="text-right px-3 py-2 font-mono text-crown-muted">{fmtFX(price.adjustedBase, fallbackRates.GBP, '£')}</td>
                  <td className="text-right px-3 py-2 font-mono text-crown-muted">
                    {price.isFreeShipping ? <span className="text-crown-lime">FREE</span> : fmtJMD(price.deliveryTotal)}
                  </td>
                  <td className="text-right px-3 py-2 font-mono font-semibold">{fmtJMD(price.landedTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Vendor Kits */}
      <section className="bg-crown-dark-card border border-white/5 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-heading font-semibold text-crown-lavender">Vendor Kits</h2>
          <span className="text-xs text-crown-muted">{kitRows.length} bundles</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-crown-dark-surface/50 text-crown-muted">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Kit</th>
                <th className="text-right px-3 py-2 font-medium">Base JMD</th>
                <th className="text-right px-3 py-2 font-medium">Adjusted JMD</th>
                <th className="text-right px-3 py-2 font-medium">USD</th>
                <th className="text-right px-3 py-2 font-medium">GBP</th>
              </tr>
            </thead>
            <tbody>
              {kitRows.map(({ kit, price }) => (
                <tr key={kit.slug} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-2">
                    <div className="font-medium">{kit.name}</div>
                    <div className="text-xs text-crown-muted mt-0.5 italic">{kit.tagline}</div>
                  </td>
                  <td className="text-right px-3 py-2 font-mono text-crown-muted">{fmtJMD(price.base)}</td>
                  <td className="text-right px-3 py-2 font-mono font-semibold text-crown-lime">{fmtJMD(price.adjustedBase)}</td>
                  <td className="text-right px-3 py-2 font-mono text-crown-muted">{fmtFX(price.adjustedBase, fallbackRates.USD, 'US$')}</td>
                  <td className="text-right px-3 py-2 font-mono text-crown-muted">{fmtFX(price.adjustedBase, fallbackRates.GBP, '£')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="text-xs text-crown-muted text-center pt-4">
        Pricing engine v1 • Floor prices in <code className="text-crown-lavender">src/data/products.ts</code> •
        Adjustments here are preview-only; commit changes to code to make them permanent
      </footer>
    </div>
  );
}

// --- subcomponents ---------------------------------------------------------

function LeverCard({
  icon,
  label,
  value,
  hint,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-lg bg-crown-dark-card border border-white/5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-crown-muted">
          {icon}
          {label}
        </div>
        <div className="font-mono text-crown-lime font-semibold">{value}</div>
      </div>
      <div className="text-xs text-crown-muted mb-3">{hint}</div>
      {children}
    </div>
  );
}

function Stat({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${highlight ? 'bg-crown-lime/5 border-crown-lime/30' : 'bg-crown-dark-card border-white/5'}`}>
      <div className="text-xs uppercase tracking-wide text-crown-muted">{label}</div>
      <div className={`font-mono font-bold mt-1 text-lg ${highlight ? 'text-crown-lime' : 'text-crown-white'}`}>{value}</div>
      <div className="text-xs text-crown-muted mt-1">{sub}</div>
    </div>
  );
}

// --- CSV builder -----------------------------------------------------------

function buildCsv({
  levers,
  zoneId,
  productRows,
  kitRows,
}: {
  levers: PricingLevers;
  zoneId: DeliveryZoneId;
  productRows: { product: typeof products[number]; price: ReturnType<typeof calculatePrice> }[];
  kitRows: { kit: typeof vendorKits[number]; price: ReturnType<typeof calculateKitPrice> }[];
}): string {
  const esc = (v: unknown) => {
    const s = v === null || v === undefined ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const r = (cells: unknown[]) => cells.map(esc).join(',');

  const meta = [
    `# Crown Crumb JA — Price List (Dashboard Export)`,
    `# Generated: ${new Date().toISOString()}`,
    `# Zone: ${zoneId}`,
    `# Margin: ${(levers.marginMultiplier * 100).toFixed(0)}%  |  Fuel: ${(levers.fuelSurchargePct * 100).toFixed(0)}%  |  Peak: ${levers.peakSeasonActive ? `+${(levers.peakSurchargePct * 100).toFixed(0)}%` : 'off'}  |  Rush: ${levers.rushDelivery ? '1.5x' : 'off'}`,
    '',
  ].join('\n');

  const headers = [
    'SKU',
    'Name',
    'Type',
    'Category',
    'Bulky',
    'Base JMD',
    'Adjusted JMD',
    'USD',
    'CAD',
    'GBP',
    'TTD',
    'BBD',
    'Product Subtotal JMD',
    'Delivery JMD',
    'Free Ship',
    'Landed JMD',
  ];

  const prodLines = productRows.map(({ product, price }) =>
    r([
      product.slug,
      product.name,
      'Product',
      product.category,
      product.bulkyItem ? 'Yes' : 'No',
      price.base,
      price.adjustedBase,
      (price.adjustedBase * fallbackRates.USD).toFixed(2),
      (price.adjustedBase * fallbackRates.CAD).toFixed(2),
      (price.adjustedBase * fallbackRates.GBP).toFixed(2),
      (price.adjustedBase * fallbackRates.TTD).toFixed(2),
      (price.adjustedBase * fallbackRates.BBD).toFixed(2),
      price.productSubtotal,
      price.deliveryTotal,
      price.isFreeShipping ? 'Yes' : 'No',
      price.landedTotal,
    ]),
  );

  const kitLines = kitRows.map(({ kit, price }) =>
    r([
      kit.slug,
      kit.name,
      `Kit (${kit.tier})`,
      'vendor-kits',
      '',
      price.base,
      price.adjustedBase,
      (price.adjustedBase * fallbackRates.USD).toFixed(2),
      (price.adjustedBase * fallbackRates.CAD).toFixed(2),
      (price.adjustedBase * fallbackRates.GBP).toFixed(2),
      (price.adjustedBase * fallbackRates.TTD).toFixed(2),
      (price.adjustedBase * fallbackRates.BBD).toFixed(2),
      price.productSubtotal,
      '',
      '',
      price.productSubtotal,
    ]),
  );

  return meta + [r(headers), ...prodLines, ...kitLines].join('\n') + '\n';
}

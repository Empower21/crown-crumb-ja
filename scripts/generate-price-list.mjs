#!/usr/bin/env node
// Generate a simple price list CSV from live website data.
// Prices match exactly what's displayed at:
//   https://crown-crumb-ja.vercel.app/products
//   https://crown-crumb-ja.vercel.app/vendor-kits
//
// Usage: node scripts/generate-price-list.mjs
// Output: ../price-list.csv  (Crown Crumb JA root)

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Products (mirrors src/data/products.ts — what the site displays)
const products = [
  { name: 'Mini Chalkboard Stands',                   category: 'Display & Signage',      price: 7500 },
  { name: 'Adjustable Pedestal Sign Stand',           category: 'Display & Signage',      price: 16500 },
  { name: 'Chalk Markers — 12 Colours',               category: 'Display & Signage',      price: 4500 },
  { name: 'Wooden Display Risers',                    category: 'Display & Signage',      price: 14500 },
  { name: 'Dome Display Containers',                  category: 'Packaging',              price: 5800 },
  { name: '"Hand Made" Sealed Bags with Stickers',    category: 'Packaging',              price: 3500 },
  { name: 'Cupcake Baking Cups with Dome Lids — 50pc',category: 'Baking Supplies',        price: 6500 },
  { name: 'Baking Cups Set — 100pc (Gold & Black)',   category: 'Baking Supplies',        price: 8500 },
  { name: 'Digital Signage Table Talker',             category: 'Digital Tools',          price: 125000 },
  { name: 'Pocket Camera Gimbal',                     category: 'Digital Tools',          price: 55000 },
  { name: 'Ice Pack Sheets — 144 Cells',              category: 'Cold Chain & Transport', price: 5500 },
  { name: 'Pop-Up Canopy Tent — 10x10 ft',            category: 'Canopy & Shelter',       price: 48000 },
];

// Vendor kits (mirrors src/data/vendor-kits.ts — what /vendor-kits displays)
const kits = [
  { name: 'Likkle But Tallawah', tier: 'Beginner',     price: 17500 },
  { name: 'Run Di Vibes',        tier: 'Intermediate', price: 48000 },
  { name: 'Big Tings A Gwaan',   tier: 'Expert',       price: 245000 },
];

// FX rates from src/data/currency-config.ts (what international visitors see)
const fx = { USD: 0.00641, CAD: 0.00884, GBP: 0.00512 };

// --- build CSV -------------------------------------------------------------

const esc = (v) => {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const row = (cells) => cells.map(esc).join(',');
const fmt2 = (n) => n.toFixed(2);

const headers = ['Product', 'Type', 'Category / Tier', 'Price (JMD)', 'USD', 'CAD', 'GBP'];

const productLines = products.map((p) =>
  row([p.name, 'Product', p.category, p.price, fmt2(p.price * fx.USD), fmt2(p.price * fx.CAD), fmt2(p.price * fx.GBP)]),
);

const kitLines = kits.map((k) =>
  row([k.name, 'Vendor Kit', k.tier, k.price, fmt2(k.price * fx.USD), fmt2(k.price * fx.CAD), fmt2(k.price * fx.GBP)]),
);

const meta = [
  `# Crown Crumb JA — Price List`,
  `# Generated: ${new Date().toISOString()}`,
  `# Source: https://crown-crumb-ja.vercel.app/products + /vendor-kits`,
  ``,
].join('\n');

const csv = meta + [row(headers), ...productLines, ...kitLines].join('\n') + '\n';

const outPath = resolve(ROOT, '..', 'price-list.csv');
writeFileSync(outPath, csv, 'utf8');

console.log(`[ok] wrote ${products.length} products + ${kits.length} kits -> ${outPath}`);

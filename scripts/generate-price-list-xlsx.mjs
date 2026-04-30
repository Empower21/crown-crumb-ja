#!/usr/bin/env node
// Generate an .xlsx price list with a live Dashboard tab driving dynamic
// pricing formulas on the Prices tab. Edit any cell on the Dashboard and
// every product price recalculates instantly — no scripts, no re-exports.
//
// Usage: node scripts/generate-price-list-xlsx.mjs
// Output: ../price-list.xlsx  (Crown Crumb JA root)

import ExcelJS from 'exceljs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Products (live prices from https://crown-crumb-ja.vercel.app/products)
const products = [
  { name: 'Mini Chalkboard Stands',                    category: 'Display & Signage',      price: 7500 },
  { name: 'Adjustable Pedestal Sign Stand',            category: 'Display & Signage',      price: 16500 },
  { name: 'Chalk Markers — 12 Colours',                category: 'Display & Signage',      price: 4500 },
  { name: 'Wooden Display Risers',                     category: 'Display & Signage',      price: 14500 },
  { name: 'Dome Display Containers',                   category: 'Packaging',              price: 5800 },
  { name: '"Hand Made" Sealed Bags with Stickers',     category: 'Packaging',              price: 3500 },
  { name: 'Cupcake Baking Cups with Dome Lids — 50pc', category: 'Baking Supplies',        price: 6500 },
  { name: 'Baking Cups Set — 100pc (Gold & Black)',    category: 'Baking Supplies',        price: 8500 },
  { name: 'Digital Signage Table Talker',              category: 'Digital Tools',          price: 125000 },
  { name: 'Pocket Camera Gimbal',                      category: 'Digital Tools',          price: 55000 },
  { name: 'Ice Pack Sheets — 144 Cells',               category: 'Cold Chain & Transport', price: 5500 },
  { name: 'Pop-Up Canopy Tent — 10x10 ft',             category: 'Canopy & Shelter',       price: 48000 },
];

// Vendor kits (live prices from /vendor-kits)
const kits = [
  { name: 'Likkle But Tallawah', tier: 'Beginner',     price: 17500 },
  { name: 'Run Di Vibes',        tier: 'Intermediate', price: 48000 },
  { name: 'Big Tings A Gwaan',   tier: 'Expert',       price: 245000 },
];

// Brand tokens
const LIME  = 'FFCCFF00';
const LAVENDER = 'FFB8A9E8';
const DARK  = 'FF0A0A0A';
const CARD  = 'FF1A1A1A';
const WHITE = 'FFFAFAFA';
const MUTED = 'FFA0A0A0';

const wb = new ExcelJS.Workbook();
wb.creator = 'Crown Crumb JA';
wb.created = new Date();

// ==========================================================================
// Sheet 1: Dashboard
// ==========================================================================
const dash = wb.addWorksheet('Dashboard', {
  views: [{ state: 'frozen', ySplit: 1, showGridLines: false }],
  properties: { tabColor: { argb: LIME } },
});

dash.columns = [
  { width: 4 },
  { width: 28 },
  { width: 14 },
  { width: 4 },
  { width: 22 },
  { width: 16 },
  { width: 2 },
];

// --- Title ---
dash.mergeCells('B2:F2');
dash.getCell('B2').value = 'Crown Crumb JA — Pricing Dashboard';
dash.getCell('B2').font = { name: 'Calibri', size: 20, bold: true, color: { argb: LAVENDER } };
dash.getCell('B2').alignment = { vertical: 'middle' };
dash.getRow(2).height = 34;

dash.mergeCells('B3:F3');
dash.getCell('B3').value = 'Edit the cells in green to recalculate the Prices tab instantly.';
dash.getCell('B3').font = { italic: true, color: { argb: MUTED }, size: 11 };

// --- Pricing Levers block ---
dash.getCell('B5').value = 'PRICING LEVERS';
dash.getCell('B5').font = { bold: true, size: 11, color: { argb: LAVENDER } };

const levers = [
  { row: 6,  label: 'Margin Multiplier',     value: 1.00, format: '0%',      hint: '1.00 = floor price, 1.15 = +15%' },
  { row: 7,  label: 'Fuel Surcharge %',       value: 0.08, format: '0.0%',    hint: 'Applied to product + delivery' },
  { row: 8,  label: 'Peak Season Active',     value: 'No', format: '@',       hint: 'Yes / No' },
  { row: 9,  label: 'Peak Surcharge %',       value: 0.15, format: '0.0%',    hint: 'Christmas default = 15%' },
  { row: 10, label: 'Rush Delivery Active',   value: 'No', format: '@',       hint: 'Yes / No (affects landed only)' },
];
for (const l of levers) {
  dash.getCell(`B${l.row}`).value = l.label;
  dash.getCell(`B${l.row}`).font = { color: { argb: WHITE } };
  const valCell = dash.getCell(`C${l.row}`);
  valCell.value = l.value;
  valCell.numFmt = l.format;
  valCell.font = { bold: true, color: { argb: DARK } };
  valCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIME } };
  valCell.alignment = { horizontal: 'center' };
  valCell.border = { top: { style: 'thin', color: { argb: MUTED } }, bottom: { style: 'thin', color: { argb: MUTED } }, left: { style: 'thin', color: { argb: MUTED } }, right: { style: 'thin', color: { argb: MUTED } } };
  dash.getCell(`E${l.row}`).value = l.hint;
  dash.getCell(`E${l.row}`).font = { italic: true, color: { argb: MUTED }, size: 10 };
}
// Yes/No dropdowns for toggle cells
['C8', 'C10'].forEach((addr) => {
  dash.getCell(addr).dataValidation = {
    type: 'list',
    allowBlank: false,
    formulae: ['"Yes,No"'],
    showErrorMessage: true,
    errorTitle: 'Yes or No only',
    error: 'Please pick Yes or No.',
  };
});

// --- FX Rates block ---
dash.getCell('B12').value = 'FX RATES (1 JMD = …)';
dash.getCell('B12').font = { bold: true, size: 11, color: { argb: LAVENDER } };

const fx = [
  { row: 13, label: 'USD', value: 0.00641 },
  { row: 14, label: 'CAD', value: 0.00884 },
  { row: 15, label: 'GBP', value: 0.00512 },
  { row: 16, label: 'TTD', value: 0.0435 },
  { row: 17, label: 'BBD', value: 0.01282 },
];
for (const r of fx) {
  dash.getCell(`B${r.row}`).value = r.label;
  dash.getCell(`B${r.row}`).font = { color: { argb: WHITE } };
  const valCell = dash.getCell(`C${r.row}`);
  valCell.value = r.value;
  valCell.numFmt = '0.00000';
  valCell.font = { bold: true, color: { argb: DARK } };
  valCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIME } };
  valCell.alignment = { horizontal: 'center' };
}
dash.getCell('E13').value = '1 USD ≈';
dash.getCell('F13').value = { formula: '1/C13', result: 156 };
dash.getCell('F13').numFmt = '"J$"#,##0';
dash.getCell('F13').font = { italic: true, color: { argb: MUTED } };
dash.getCell('E14').value = '1 CAD ≈';
dash.getCell('F14').value = { formula: '1/C14', result: 113 };
dash.getCell('F14').numFmt = '"J$"#,##0';
dash.getCell('F14').font = { italic: true, color: { argb: MUTED } };
dash.getCell('E15').value = '1 GBP ≈';
dash.getCell('F15').value = { formula: '1/C15', result: 195 };
dash.getCell('F15').numFmt = '"J$"#,##0';
dash.getCell('F15').font = { italic: true, color: { argb: MUTED } };

// --- Named ranges: Margin, Fuel, PeakActive, PeakPct, Rush, fx_USD, etc. ---
wb.definedNames.add('Dashboard!$C$6',  'Margin');
wb.definedNames.add('Dashboard!$C$7',  'FuelPct');
wb.definedNames.add('Dashboard!$C$8',  'PeakActive');
wb.definedNames.add('Dashboard!$C$9',  'PeakPct');
wb.definedNames.add('Dashboard!$C$10', 'RushActive');
wb.definedNames.add('Dashboard!$C$13', 'fx_USD');
wb.definedNames.add('Dashboard!$C$14', 'fx_CAD');
wb.definedNames.add('Dashboard!$C$15', 'fx_GBP');
wb.definedNames.add('Dashboard!$C$16', 'fx_TTD');
wb.definedNames.add('Dashboard!$C$17', 'fx_BBD');

// --- KPI summary block ---
dash.getCell('B19').value = 'PORTFOLIO TOTALS';
dash.getCell('B19').font = { bold: true, size: 11, color: { argb: LAVENDER } };

dash.getCell('B20').value = 'Floor total (all products + kits, JMD)';
dash.getCell('B20').font = { color: { argb: WHITE } };
dash.getCell('C20').value = { formula: 'SUM(Prices!D:D)+SUM(Prices!D:D)*0', result: 0 };
// Simpler: reference a fixed range via named block — use dynamic sum below
dash.getCell('C20').value = { formula: `SUM(Prices!D5:D${4 + products.length + kits.length})`, result: 0 };
dash.getCell('C20').numFmt = '"J$"#,##0';
dash.getCell('C20').font = { color: { argb: WHITE } };

dash.getCell('B21').value = 'Adjusted total (after levers, JMD)';
dash.getCell('B21').font = { color: { argb: WHITE } };
dash.getCell('C21').value = { formula: `SUM(Prices!E5:E${4 + products.length + kits.length})`, result: 0 };
dash.getCell('C21').numFmt = '"J$"#,##0';
dash.getCell('C21').font = { bold: true, color: { argb: LIME } };

dash.getCell('B22').value = 'Uplift vs floor';
dash.getCell('B22').font = { color: { argb: WHITE } };
dash.getCell('C22').value = { formula: 'IFERROR(C21/C20-1,0)', result: 0 };
dash.getCell('C22').numFmt = '+0.0%;-0.0%;0.0%';
dash.getCell('C22').font = { bold: true, color: { argb: LIME } };

dash.getCell('B23').value = 'Count — products';
dash.getCell('B23').font = { color: { argb: MUTED } };
dash.getCell('C23').value = products.length;
dash.getCell('C23').font = { color: { argb: MUTED } };

dash.getCell('B24').value = 'Count — vendor kits';
dash.getCell('B24').font = { color: { argb: MUTED } };
dash.getCell('C24').value = kits.length;
dash.getCell('C24').font = { color: { argb: MUTED } };

// --- Background fill for header rows ---
for (let r = 1; r <= 26; r++) {
  for (let c = 1; c <= 7; c++) {
    const cell = dash.getCell(r, c);
    if (!cell.fill || cell.fill.type !== 'pattern') {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK } };
    }
  }
}
// Keep lever/fx value cells lime (re-apply since loop overwrote)
[6, 7, 8, 9, 10, 13, 14, 15, 16, 17].forEach((r) => {
  dash.getCell(`C${r}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIME } };
});

dash.getCell('B26').value = 'Prices on the Prices tab update automatically as you edit cells above.';
dash.getCell('B26').font = { italic: true, color: { argb: MUTED }, size: 10 };

// ==========================================================================
// Sheet 2: Prices — formulas reference the Dashboard's named ranges
// ==========================================================================
const sheet = wb.addWorksheet('Prices', {
  views: [{ state: 'frozen', ySplit: 4, showGridLines: false }],
  properties: { tabColor: { argb: LAVENDER } },
});

sheet.columns = [
  { width: 36 },  // A Product
  { width: 14 },  // B Type
  { width: 22 },  // C Category/Tier
  { width: 14 },  // D Price (JMD) - floor
  { width: 14 },  // E Adjusted (JMD)
  { width: 12 },  // F USD
  { width: 12 },  // G CAD
  { width: 12 },  // H GBP
  { width: 12 },  // I TTD
  { width: 12 },  // J BBD
  { width: 14 },  // K With Peak
  { width: 14 },  // L With Rush
];

sheet.mergeCells('A1:L1');
sheet.getCell('A1').value = 'Crown Crumb JA — Product Prices (dynamically priced)';
sheet.getCell('A1').font = { size: 16, bold: true, color: { argb: LAVENDER } };
sheet.getRow(1).height = 28;

sheet.getCell('A2').value = `Source: https://crown-crumb-ja.vercel.app`;
sheet.getCell('A2').font = { italic: true, size: 10, color: { argb: MUTED } };

// Header row (row 4)
const headers = ['Product', 'Type', 'Category / Tier', 'Floor JMD', 'Adjusted JMD', 'USD', 'CAD', 'GBP', 'TTD', 'BBD', '+ Peak', '+ Rush 1.5×'];
headers.forEach((h, i) => {
  const cell = sheet.getCell(4, i + 1);
  cell.value = h;
  cell.font = { bold: true, color: { argb: DARK } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIME } };
  cell.alignment = { horizontal: i < 3 ? 'left' : 'right', vertical: 'middle' };
  cell.border = { bottom: { style: 'medium', color: { argb: DARK } } };
});
sheet.getRow(4).height = 22;

// Data rows — start at row 5
const allItems = [
  ...products.map((p) => ({ name: p.name, type: 'Product', meta: p.category, price: p.price })),
  ...kits.map((k)     => ({ name: k.name, type: 'Vendor Kit', meta: k.tier,    price: k.price })),
];

allItems.forEach((item, i) => {
  const row = i + 5;
  sheet.getCell(`A${row}`).value = item.name;
  sheet.getCell(`B${row}`).value = item.type;
  sheet.getCell(`C${row}`).value = item.meta;
  sheet.getCell(`D${row}`).value = item.price;

  // Adjusted = floor × margin × (1 + fuel + peak_if_active)
  sheet.getCell(`E${row}`).value = {
    formula: `D${row}*Margin*(1+FuelPct+IF(PeakActive="Yes",PeakPct,0))`,
    result: item.price,
  };

  // FX columns reference the Adjusted price
  sheet.getCell(`F${row}`).value = { formula: `E${row}*fx_USD`, result: item.price * 0.00641 };
  sheet.getCell(`G${row}`).value = { formula: `E${row}*fx_CAD`, result: item.price * 0.00884 };
  sheet.getCell(`H${row}`).value = { formula: `E${row}*fx_GBP`, result: item.price * 0.00512 };
  sheet.getCell(`I${row}`).value = { formula: `E${row}*fx_TTD`, result: item.price * 0.0435 };
  sheet.getCell(`J${row}`).value = { formula: `E${row}*fx_BBD`, result: item.price * 0.01282 };

  // Peak column — forces peak on regardless of toggle (preview)
  sheet.getCell(`K${row}`).value = { formula: `D${row}*Margin*(1+FuelPct+PeakPct)`, result: item.price * 1.23 };
  // Rush column — forces rush on (1.5× adjusted)
  sheet.getCell(`L${row}`).value = { formula: `E${row}*1.5`, result: item.price * 1.5 };

  // Formatting per cell
  sheet.getCell(`D${row}`).numFmt = '"J$"#,##0';
  sheet.getCell(`E${row}`).numFmt = '"J$"#,##0';
  sheet.getCell(`E${row}`).font = { bold: true, color: { argb: LIME } };
  sheet.getCell(`F${row}`).numFmt = '"US$"#,##0.00';
  sheet.getCell(`G${row}`).numFmt = '"CA$"#,##0.00';
  sheet.getCell(`H${row}`).numFmt = '"£"#,##0.00';
  sheet.getCell(`I${row}`).numFmt = '"TT$"#,##0.00';
  sheet.getCell(`J${row}`).numFmt = '"BDS$"#,##0.00';
  sheet.getCell(`K${row}`).numFmt = '"J$"#,##0';
  sheet.getCell(`L${row}`).numFmt = '"J$"#,##0';

  // Row stripe + dark theme
  const bg = i % 2 === 0 ? CARD : DARK;
  for (let c = 1; c <= 12; c++) {
    const cell = sheet.getCell(row, c);
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
    if (!cell.font) cell.font = {};
    if (!cell.font.color) cell.font = { ...cell.font, color: { argb: WHITE } };
    cell.alignment = { horizontal: c < 4 ? 'left' : 'right', vertical: 'middle' };
  }
  // Bold green for the adjusted column
  sheet.getCell(`E${row}`).font = { bold: true, color: { argb: LIME } };
  // Separator row between products and kits
  if (item.type === 'Vendor Kit' && i > 0 && allItems[i - 1].type === 'Product') {
    sheet.getRow(row).border = { top: { style: 'medium', color: { argb: LAVENDER } } };
  }
});

// Totals row
const totalsRow = 5 + allItems.length + 1;
sheet.getCell(`A${totalsRow}`).value = 'TOTALS';
sheet.getCell(`A${totalsRow}`).font = { bold: true, color: { argb: DARK } };
sheet.getCell(`A${totalsRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIME } };
for (const col of ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']) {
  const cell = sheet.getCell(`${col}${totalsRow}`);
  cell.value = { formula: `SUM(${col}5:${col}${4 + allItems.length})`, result: 0 };
  cell.font = { bold: true, color: { argb: DARK } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIME } };
  cell.alignment = { horizontal: 'right' };
}
sheet.getCell(`D${totalsRow}`).numFmt = '"J$"#,##0';
sheet.getCell(`E${totalsRow}`).numFmt = '"J$"#,##0';
sheet.getCell(`F${totalsRow}`).numFmt = '"US$"#,##0';
sheet.getCell(`G${totalsRow}`).numFmt = '"CA$"#,##0';
sheet.getCell(`H${totalsRow}`).numFmt = '"£"#,##0';
sheet.getCell(`I${totalsRow}`).numFmt = '"TT$"#,##0';
sheet.getCell(`J${totalsRow}`).numFmt = '"BDS$"#,##0';
sheet.getCell(`K${totalsRow}`).numFmt = '"J$"#,##0';
sheet.getCell(`L${totalsRow}`).numFmt = '"J$"#,##0';

// Conditional formatting: highlight when Adjusted > Floor (green) or < Floor (red)
sheet.addConditionalFormatting({
  ref: `E5:E${4 + allItems.length}`,
  rules: [
    { type: 'cellIs', operator: 'greaterThan', formulae: [`D5`], style: { font: { color: { argb: 'FF00B050' }, bold: true } }, priority: 1 },
    { type: 'cellIs', operator: 'lessThan',    formulae: [`D5`], style: { font: { color: { argb: 'FFE53935' }, bold: true } }, priority: 2 },
  ],
});

// --- write file -----------------------------------------------------------
const outPath = resolve(ROOT, '..', 'price-list.xlsx');
await wb.xlsx.writeFile(outPath);
console.log(`[ok] wrote dashboard + ${products.length} products + ${kits.length} kits`);
console.log(`     -> ${outPath}`);

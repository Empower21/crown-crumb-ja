import { VendorKit } from '@/types';

// Vendor kit pricing model:
//   comparePrice = sum of included products at their entry-tier prices
//   price        = comparePrice × 0.9 rounded to the nearest 100
//
// The ~10% bundle discount is shown on the catalogue card and the vendor-kits
// page. Re-derive both numbers whenever the kit contents change.

export const vendorKits: VendorKit[] = [
  {
    slug: 'likkle-but-tallawah',
    name: 'Likkle But Tallawah',
    tagline: 'First time at the market? Step out with confidence.',
    jamaicaMeaning: 'Small but powerful — Jamaican proverb',
    tier: 'beginner',
    description:
      'Perfect for the vendor testing the waters — first craft fair, school gate sale, or community market. The essentials to label, display, and package your goods from day one.',
    includedProductSlugs: [
      'mini-chalkboard-stands',
      'chalk-markers',
      'handmade-sealed-bags',
      'dome-containers',
      'bakery-bags-with-window',
      'table-cloth',
    ],
    // 1,020 + 4,500 + 300 + 1,160 + 650 + 2,800 = 10,430
    comparePrice: 10430,
    price: 9400,
    image: '/products/chalkboard-stands/event-use.jpg',
  },
  {
    slug: 'run-di-vibes',
    name: 'Run Di Vibes',
    tagline: 'You know the scene. Now it is time to own it.',
    jamaicaMeaning: 'Set the atmosphere — Caribbean slang',
    tier: 'intermediate',
    description:
      'For the vendor who has done a few events and is ready to build a real presence. Adds tiered displays, professional signage, premium baking supplies, cold chain, and a delivery-ready insulated bag to your setup.',
    includedProductSlugs: [
      'mini-chalkboard-stands',
      'chalk-markers',
      'handmade-sealed-bags',
      'dome-containers',
      'wooden-display-risers',
      'adjustable-pedestal-stand',
      'cupcake-baking-cups',
      'ice-pack-sheets',
      'bakery-bags-with-window',
      'mini-loaf-tins-with-lids',
      'insulated-food-delivery-bag',
      'table-cloth',
    ],
    // 1,020 + 4,500 + 300 + 1,160 + 5,500 + 16,500 + 1,160 + 920
    //   + 650 + 1,500 + 5,500 + 2,800 = 41,510
    comparePrice: 41510,
    price: 37400,
    image: '/products/display-risers/cupcake-display.png',
  },
  {
    slug: 'big-tings-a-gwaan',
    name: 'Big Tings A Gwaan',
    tagline: 'Full setup. Zero compromise. Every event, every time.',
    jamaicaMeaning: 'Major things are happening — top Jamaican expression',
    tier: 'expert',
    description:
      'The complete professional vendor ecosystem. Digital signage, content-creation camera, smart-bulb security, both 10x10 and 10x30 canopy shelters, cold chain, insulated delivery, and every product we offer — for the vendor anchoring a market or running a catering booth at a festival.',
    includedProductSlugs: [
      'mini-chalkboard-stands',
      'chalk-markers',
      'handmade-sealed-bags',
      'dome-containers',
      'wooden-display-risers',
      'adjustable-pedestal-stand',
      'cupcake-baking-cups',
      'ice-pack-sheets',
      'bakery-bags-with-window',
      'mini-loaf-tins-with-lids',
      'insulated-food-delivery-bag',
      'table-cloth',
      'popup-canopy-tent',
      'popup-canopy-tent-10x30',
      'digital-signage-display',
      'pocket-camera',
      'lightbulb-camera',
    ],
    // intermediate sum 41,510
    //   + 48,000 (10x10) + 70,000 (10x30) + 125,000 (signage)
    //   + 55,000 (camera) + 18,500 (bulb-cam) = 358,010
    comparePrice: 358010,
    price: 322200,
    image: '/products/digital-signage/cafe-use.jpg',
  },
];

export function getVendorKitBySlug(slug: string): VendorKit | undefined {
  return vendorKits.find((k) => k.slug === slug);
}

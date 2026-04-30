import { VendorKit } from '@/types';

export const vendorKits: VendorKit[] = [
  {
    slug: 'likkle-but-tallawah',
    name: 'Likkle But Tallawah',
    tagline: 'First time at the market? Step out with confidence.',
    jamaicaMeaning: 'Small but powerful \u2014 Jamaican proverb',
    tier: 'beginner',
    description:
      'Perfect for the vendor testing the waters \u2014 first craft fair, school gate sale, or community market. The essentials to label, display, and package your goods from day one.',
    includedProductSlugs: [
      'mini-chalkboard-stands',
      'chalk-markers',
      'handmade-sealed-bags',
      'dome-containers',
    ],
    price: 17500,
    image: '/products/chalkboard-stands/event-use.jpg',
  },
  {
    slug: 'run-di-vibes',
    name: 'Run Di Vibes',
    tagline: 'You know the scene. Now it is time to own it.',
    jamaicaMeaning: 'Set the atmosphere \u2014 Caribbean slang',
    tier: 'intermediate',
    description:
      'For the vendor who has done a few events and is ready to build a real presence. Adds tiered displays, professional signage, premium baking supplies, and cold chain to your setup.',
    includedProductSlugs: [
      'mini-chalkboard-stands',
      'chalk-markers',
      'handmade-sealed-bags',
      'dome-containers',
      'wooden-display-risers',
      'adjustable-pedestal-stand',
      'cupcake-baking-cups',
      'ice-pack-sheets',
    ],
    price: 48000,
    image: '/products/display-risers/cupcake-display.png',
  },
  {
    slug: 'big-tings-a-gwaan',
    name: 'Big Tings A Gwaan',
    tagline: 'Full setup. Zero compromise. Every event, every time.',
    jamaicaMeaning: 'Major things are happening \u2014 top Jamaican expression',
    tier: 'expert',
    description:
      'The complete professional vendor ecosystem. Digital signage, content creation camera, canopy shelter, cold chain, and every product we offer \u2014 for the vendor anchoring a market or running a catering booth at a festival.',
    includedProductSlugs: [
      'mini-chalkboard-stands',
      'chalk-markers',
      'handmade-sealed-bags',
      'dome-containers',
      'wooden-display-risers',
      'adjustable-pedestal-stand',
      'cupcake-baking-cups',
      'ice-pack-sheets',
      'popup-canopy-tent',
      'digital-signage-display',
      'pocket-camera',
    ],
    price: 245000,
    image: '/products/digital-signage/cafe-use.jpg',
  },
];

export function getVendorKitBySlug(slug: string): VendorKit | undefined {
  return vendorKits.find((k) => k.slug === slug);
}

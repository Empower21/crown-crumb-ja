import { Product } from '@/types';

export const products: Product[] = [
  // Cold Chain & Transport
  {
    slug: 'insulated-delivery-bags',
    name: 'Insulated Delivery Bags',
    category: 'cold-chain',
    description: 'Professional-grade insulated delivery bags with triple-layer thermal protection. Keep baked goods warm or cold during transport — perfect for pop-up vendors and delivery services. 79L capacity, holds up to 110 lbs.',
    features: [
      'Triple-layer insulation (outer, foam, foil liner)',
      '79L capacity — fits full-size sheet trays',
      'Holds up to 110 lbs',
      'Available in 5 colours',
      'Reinforced handles and heavy-duty zipper',
      'Easy to clean interior lining',
    ],
    images: [
      '/products/cold-chain/delivery-bag-colors.jpg',
      '/products/cold-chain/delivery-bag-design.jpg',
      '/products/cold-chain/delivery-bag-temp.jpg',
      '/products/cold-chain/delivery-bag-dimensions.jpg',
    ],
    specs: {
      'Capacity': '79 Litres',
      'Max Weight': '110 lbs',
      'Colours': 'Red/Black, Red, Black, Grey, Green',
      'Material': 'Oxford fabric with foil liner',
    },
    tags: ['transport', 'delivery', 'insulated', 'hot', 'cold'],
  },
  {
    slug: 'dry-ice-packs',
    name: 'Bio Dry Ice Packs',
    category: 'cold-chain',
    description: 'Reusable dry ice pack sheets — 6 sheets with 144 individual cells. Cut to size for any container. Keeps pastries, cakes, and perishables cold for hours during transport and display.',
    features: [
      '6 sheets, 144 cells total',
      'Cut-to-size for any container',
      'Reusable — just refreeze',
      'Food-safe, non-toxic',
      'Lightweight and flexible',
    ],
    images: [
      '/products/cold-chain/ice-packs-sheets.jpg',
      '/products/cold-chain/ice-packs-comparison.jpg',
      '/products/cold-chain/ice-packs-instructions.jpg',
    ],
    specs: {
      'Quantity': '6 sheets (144 cells)',
      'Type': 'Reusable gel packs',
      'Usage': 'Freeze, cut, place in container',
    },
    tags: ['ice', 'cold', 'transport', 'reusable'],
  },

  // Display & Signage
  {
    slug: 'wooden-display-risers',
    name: 'Wooden Display Risers',
    category: 'display-signage',
    description: 'Nested set of 4 solid wood display risers with a beautiful burnt wood finish. Create tiered displays for cupcakes, pastries, and baked goods at your pop-up. No assembly required.',
    features: [
      '4-piece nested set',
      'Burnt wood finish — rustic charm',
      'Solid wood construction',
      'No installation required',
      'Eco-friendly and reusable',
      'Perfect for tiered product displays',
    ],
    images: [
      '/products/display-signage/wood-risers.jpg',
      '/products/display-signage/wood-risers-dimensions.jpg',
      '/products/display-signage/wood-risers-specs.jpg',
    ],
    specs: {
      'Set Size': '4 pieces (nested)',
      'Largest': '12" x 2.95" x 5.5"',
      'Smallest': '9.6" x 2.95" x 1.9"',
      'Material': 'Solid burnt wood',
    },
    tags: ['display', 'wood', 'risers', 'tiered'],
  },
  {
    slug: 'mini-chalkboard-stands',
    name: 'Mini Chalkboard Stands',
    category: 'display-signage',
    description: 'Set of 20 mini chalkboard signs on sticks with chalk markers included. Perfect for labelling baked goods, prices, and flavours at your pop-up table.',
    features: [
      '20 pieces per set',
      'Chalk markers included',
      'Reusable — just wipe clean',
      'Sturdy base stands',
      'Perfect for food labels and pricing',
    ],
    images: [
      '/products/display-signage/chalkboard-stands-set.jpg',
      '/products/display-signage/chalkboard-stand-dimensions.jpg',
      '/products/display-signage/mini-chalkboard-easels.jpg',
    ],
    specs: {
      'Quantity': '20 pieces + markers',
      'Board Size': '3.3" x 2.3"',
      'Total Height': '7.5"',
    },
    tags: ['chalkboard', 'signs', 'labels', 'pricing'],
  },
  {
    slug: 'adjustable-pedestal-stand',
    name: 'Adjustable Pedestal Display Stand',
    category: 'display-signage',
    description: 'Height-adjustable pedestal stand with rotatable display board. Perfect for signage, menus, flash sale announcements, and promotions at your pop-up booth.',
    features: [
      'Adjustable height: 35.98" to 48.26"',
      'Rotatable display angle',
      'Sturdy weighted base',
      'Sleek matte black finish',
      'Easy assembly',
    ],
    images: [
      '/products/display-signage/pedestal-stand-dimensions.jpg',
      '/products/display-signage/pedestal-stand-features.jpg',
      '/products/display-signage/pedestal-stand-use.jpg',
    ],
    specs: {
      'Height Range': '35.98" — 48.26"',
      'Display Size': '9.76" x 12.12"',
      'Colour': 'Matte Black',
    },
    tags: ['stand', 'signage', 'menu', 'adjustable'],
  },

  // Canopy Tents
  {
    slug: 'pop-up-canopy-tent',
    name: '10x10 Pop-Up Canopy Tent',
    category: 'canopy-tents',
    description: 'Professional 10x10 pop-up canopy tent with water-resistant, UV-protected silver-coated fabric. Sturdy reinforced steel frame with weighted sandbags included. Built for Jamaica\'s sun and rain.',
    features: [
      '10\' x 10\' coverage area',
      'Water-resistant canopy fabric',
      'UV protection (UVA/UVB blocking)',
      'Silver-coated for sun reflection',
      'Reinforced steel corners',
      'Weight bags included for stability',
      'Easy pop-up assembly — no tools needed',
    ],
    images: [
      '/products/canopy-tents/canopy-tent.jpg',
      '/products/canopy-tents/canopy-dimensions.jpg',
      '/products/canopy-tents/canopy-features.jpg',
      '/products/canopy-tents/canopy-outdoor.jpg',
    ],
    specs: {
      'Size': '10\' x 10\' (114.1" x 119.2")',
      'Weight': '38.58 lbs',
      'Frame': 'Reinforced steel',
      'Fabric': 'Silver-coated, water/UV resistant',
    },
    tags: ['tent', 'canopy', 'outdoor', 'shade', 'rain'],
  },

  // Packaging
  {
    slug: 'kraft-paper-bags',
    name: 'Kraft Paper Bags with Window',
    category: 'packaging',
    description: 'Premium kraft paper bags with clear windows — perfect for bread, pastries, cookies, and baked goods. Available in 3 sizes. Tin-tie closure, waterproof and oil-proof lined.',
    features: [
      '3 sizes available (S, M, L)',
      'Clear window to showcase contents',
      'Tin-tie closure for freshness',
      'Waterproof and oil-proof lining',
      'Food-safe materials',
      'Natural kraft look — artisan appeal',
    ],
    images: [
      '/products/packaging/kraft-bags-window.jpg',
      '/products/packaging/kraft-bags-dimensions.jpg',
      '/products/packaging/kraft-bags-quantities.jpg',
      '/products/packaging/kraft-bags-quality.jpg',
    ],
    specs: {
      'Small': '30 per pack',
      'Medium': '10 per pack',
      'Large': '10 per pack',
      'Features': 'Tin-tie, waterproof, oil-proof',
    },
    tags: ['bags', 'kraft', 'bread', 'pastry', 'packaging'],
  },
  {
    slug: 'dome-containers',
    name: 'Dome Display Containers',
    category: 'packaging',
    description: 'Elegant clear dome containers with pink bases — perfect for individual macarons, truffles, petit fours, and single-serve pastries. Stack beautifully for display.',
    features: [
      'Clear dome top for visibility',
      'Elegant pink base',
      'Perfect for individual pastries',
      'Stackable for display',
      'Food-safe plastic',
    ],
    images: [
      '/products/packaging/dome-containers.jpg',
      '/products/packaging/dome-dimensions.jpg',
      '/products/packaging/dome-demo.jpg',
    ],
    specs: {
      'Type': 'Individual dome container',
      'Base Colour': 'Pink',
      'Dome': 'Clear',
      'Best For': 'Macarons, truffles, petit fours',
    },
    tags: ['dome', 'container', 'macaron', 'display', 'pink'],
  },
  {
    slug: 'handmade-sealed-bags',
    name: '"Hand Made" Sealed Bags with Stickers',
    category: 'packaging',
    description: 'Translucent sealed bags with polka dot pattern and matching "Hand Made" stickers. Perfect for cupcakes, cookies, and individual pastries. Bulk pack of 200 bags + 200 stickers.',
    features: [
      '200 bags + 200 stickers',
      'Translucent polka dot design',
      '"Hand Made" branded stickers',
      'Self-sealing closure',
      'Fits standard cupcakes and cookies',
    ],
    images: [
      '/products/packaging/sealed-bags-handmade.jpg',
      '/products/packaging/sealed-bags-dimensions.jpg',
      '/products/packaging/sealed-bags-bulk.jpg',
    ],
    specs: {
      'Quantity': '200 bags + 200 stickers',
      'Pattern': 'Polka dot translucent',
      'Closure': 'Self-sealing',
    },
    tags: ['bags', 'stickers', 'handmade', 'cupcake', 'cookie'],
  },

  // Baking Kits
  {
    slug: 'all-in-one-baking-set',
    name: 'All-in-One Baking Set',
    category: 'baking-kits',
    description: 'Complete baking kit with 60 gold-interior aluminum loaf pans, 60 clear lids, 60 decorative belly bands, and 60 sporks. Everything you need for loaf cakes, banana bread, and gifting.',
    features: [
      '60 aluminum loaf pans (gold interior)',
      '60 clear snap-on lids',
      '60 decorative belly bands',
      '60 black sporks',
      'Oven-safe pans',
      'Premium presentation — perfect for gifts',
    ],
    images: [
      '/products/baking-kits/baking-set-details.jpg',
      '/products/baking-kits/all-in-one-set.jpg',
    ],
    specs: {
      'Pan Size': '6.5" x 2.76" x 1.2"',
      'Belly Band': '8.27" length',
      'Spork Size': '4.33" x 1.18"',
      'Total Pieces': '240 (60 each)',
    },
    tags: ['baking', 'loaf', 'pan', 'kit', 'gift'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
}

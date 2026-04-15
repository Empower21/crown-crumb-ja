import { Product } from '@/types';

export const products: Product[] = [
  // Display & Signage
  {
    slug: 'mini-chalkboard-stands',
    name: 'Mini Chalkboard Stands',
    category: 'display-signage',
    description:
      'Set of 20 mini chalkboard signs on wooden sticks with removable bases. Perfect for labelling baked goods, prices, and flavours at your pop-up table. Chalk markers included.',
    features: [
      '20 pieces per set',
      'Removable base — use as table sign or plant/food marker',
      'Reusable — just wipe clean',
      'Sturdy wooden base stands',
      'Perfect for bakery displays, charcuterie boards, and events',
    ],
    images: [
      '/products/chalkboard-stands/dimensions.jpg',
      '/products/chalkboard-stands/bakery-use.jpg',
      '/products/chalkboard-stands/event-use.jpg',
      '/products/chalkboard-stands/charcuterie-use.jpg',
      '/products/chalkboard-stands/removable.jpg',
      '/products/chalkboard-stands/boxed-set.jpg',
    ],
    specs: {
      Quantity: '20 pieces',
      'Board Size': '3.3" x 2.3"',
      'Total Height': '7.5"',
      'Base Width': '1.4"',
    },
    tags: ['chalkboard', 'signs', 'labels', 'pricing', 'display'],
    price: 7500,
    inStock: true,
  },
  {
    slug: 'adjustable-pedestal-stand',
    name: 'Adjustable Pedestal Sign Stand',
    category: 'display-signage',
    description:
      'Height-adjustable pedestal stand with rotatable display board and weighted base. Perfect for menus, flash sale announcements, and promotions at your pop-up booth.',
    features: [
      'Adjustable height: 35.98" to 48.26"',
      'Rotatable display angle',
      'Heavy weighted base (fill with sand or water)',
      'Sleek matte black finish',
      'Easy assembly — no tools needed',
      'Perfect for restaurants, exhibitions, and outdoor events',
    ],
    images: [
      '/products/pedestal-stands/three-stands.jpg',
      '/products/pedestal-stands/features.jpg',
      '/products/pedestal-stands/use-cases.jpg',
      '/products/pedestal-stands/weighted-base.jpg',
    ],
    specs: {
      'Height Range': '35.98" — 48.26"',
      'Display Size': '9.76" x 12.12"',
      Colour: 'Matte Black',
      'Base Type': 'Weighted (sand/water fill)',
    },
    tags: ['stand', 'signage', 'menu', 'adjustable', 'pedestal'],
    price: 16500,
    inStock: true,
    bulkyItem: true,
  },
  {
    slug: 'chalk-markers',
    name: 'Chalk Markers — 12 Colours',
    category: 'display-signage',
    description:
      'Vibrant liquid chalk markers in 12 colours. Write on chalkboard signs, glass, mirrors, and more. Easy to wipe clean. Perfect companion for our chalkboard stands.',
    features: [
      '12 vibrant colours included',
      'Works on chalkboard, glass, mirrors, and non-porous surfaces',
      'Easy to wipe clean with damp cloth',
      'Fine tip for detailed writing',
      'Non-toxic and odourless',
    ],
    images: ['/products/chalk-markers/markers-12-colors.jpg'],
    specs: {
      Quantity: '12 markers',
      Colours: 'Assorted (see image)',
      'Tip Type': 'Fine tip',
      Surface: 'Chalkboard, glass, mirrors',
    },
    tags: ['chalk', 'markers', 'colours', 'writing', 'signs'],
    price: 4500,
    inStock: true,
  },
  {
    slug: 'wooden-display-risers',
    name: 'Wooden Display Risers',
    category: 'display-signage',
    description:
      '3-tier solid wood display risers with a beautiful burnt wood finish. Create stunning tiered displays for cupcakes, pastries, perfumes, and products at your pop-up.',
    features: [
      '3-tier nested set',
      'Burnt wood finish — rustic charm',
      'Solid wood construction',
      'No installation required',
      'Eco-friendly and reusable',
      'Perfect for tiered product displays',
    ],
    images: ['/products/display-risers/wood-risers.jpg'],
    specs: {
      'Set Size': '3 tiers (nested)',
      Material: 'Solid burnt wood',
      Style: 'Rustic / artisan',
    },
    tags: ['display', 'wood', 'risers', 'tiered', 'rustic'],
    price: 14500,
    inStock: true,
  },

  // Packaging
  {
    slug: 'dome-containers',
    name: 'Dome Display Containers',
    category: 'packaging',
    description:
      'Elegant clear dome containers with gold bases — perfect for individual cupcakes, macarons, truffles, and single-serve pastries. PET material, stackable for display.',
    features: [
      'Clear dome top for full visibility',
      'Gold base for elegant presentation',
      'PET material — transparent and bright',
      'Easy to use and stackable',
      'Multiple uses: desserts, cakes, bread, cookies',
      'Food-safe materials',
    ],
    images: [
      '/products/dome-containers/dimensions.jpg',
      '/products/dome-containers/with-desserts.jpg',
    ],
    specs: {
      'Base Diameter': '6.8cm / 2.68"',
      'Dome Height': '4.5cm / 1.77"',
      Material: 'PET (food-safe)',
      'Base Colour': 'Gold',
    },
    tags: ['dome', 'container', 'macaron', 'display', 'gold', 'cupcake'],
    price: 5800,
    inStock: true,
  },
  {
    slug: 'handmade-sealed-bags',
    name: '"Hand Made" Sealed Bags with Stickers',
    category: 'packaging',
    description:
      'Translucent sealed bags with polka dot pattern and matching "Hand Made" stickers. Perfect for cupcakes, cookies, and individual pastries. Professional artisan look.',
    features: [
      'Translucent polka dot design',
      '"Hand Made" branded stickers included',
      'Self-sealing closure',
      'Fits standard cupcakes and cookies',
      'Professional artisan presentation',
    ],
    images: ['/products/sealed-bags/handmade-bags.jpg'],
    specs: {
      Pattern: 'Polka dot translucent',
      Closure: 'Self-sealing',
      Stickers: 'Included',
    },
    tags: ['bags', 'stickers', 'handmade', 'cupcake', 'cookie', 'packaging'],
    price: 3500,
    inStock: true,
  },

  // Baking Supplies
  {
    slug: 'cupcake-baking-cups',
    name: 'Cupcake Baking Cups with Dome Lids — 50pc',
    category: 'baking-supplies',
    description:
      'Premium aluminium baking cups with clear dome lids and sporks. Gold interior, oven-safe up to 482\u00b0F. Perfect for cupcakes, cr\u00e8me br\u00fbl\u00e9e, and individual desserts. 50-piece set.',
    features: [
      '50 aluminium cups with dome lids',
      'Black sporks included',
      'Gold interior for premium look',
      'Oven, BBQ, air fryer, and refrigerator safe',
      'Baking temperature up to 482\u00b0F',
      'Perfect for gifting and pop-up sales',
    ],
    images: [
      '/products/baking-cups/set-50pc.jpg',
      '/products/baking-cups/in-use.jpg',
    ],
    specs: {
      Quantity: '50 cups + lids + sporks',
      Material: 'Aluminium (gold interior)',
      'Max Temp': '482\u00b0F / 250\u00b0C',
      'Safe For': 'Oven, BBQ, Air Fryer, Refrigerator',
    },
    tags: ['baking', 'cupcake', 'cups', 'dome', 'lids', 'aluminium'],
    price: 6500,
    inStock: true,
  },
  {
    slug: 'baking-cups-100pc',
    name: 'Baking Cups Set — 100pc (Gold & Black)',
    category: 'baking-supplies',
    description:
      'Large 100-piece set of aluminium baking cups with clear dome lids and sporks. Gold and black colourway for a premium look. Bulk pack for serious bakers and event vendors.',
    features: [
      '100 aluminium cups with dome lids',
      'Sporks included',
      'Gold and black colourway',
      'Oven, BBQ, air fryer, and refrigerator safe',
      'Bulk pack — ideal for events and catering',
      'Stackable for easy storage',
    ],
    images: ['/products/baking-kits/all-in-one-set.jpg'],
    specs: {
      Quantity: '100 cups + lids + sporks',
      Material: 'Aluminium (gold & black)',
      'Max Temp': '482\u00b0F / 250\u00b0C',
      'Safe For': 'Oven, BBQ, Air Fryer, Refrigerator',
    },
    tags: ['baking', 'cupcake', 'cups', 'bulk', '100pc', 'gold', 'black'],
    price: 8500,
    inStock: true,
  },

  // Digital Tools
  {
    slug: 'digital-signage-display',
    name: 'Digital Signage Table Talker',
    category: 'digital-tools',
    description:
      'Dual 8-inch touchscreen HD digital signage display. Replace paper menus and signs with dynamic content. Built-in CMS, phone charging capability, and fire-resistant ABS construction.',
    features: [
      'Dual 8-inch touchscreen HD displays',
      'Free CMS for images, videos, and text',
      'Smart split-screen mode (1, 2, or 3 screens)',
      'Built-in phone charging cable',
      '23200mAh battery — lasts all day',
      'Fire-resistant ABS construction',
      'Drive up to 50% sales growth',
    ],
    images: [
      '/products/digital-signage/cafe-use.jpg',
      '/products/digital-signage/features.jpg',
      '/products/digital-signage/display-modes.jpg',
      '/products/digital-signage/split-screen.jpg',
    ],
    specs: {
      'Screen Size': 'Dual 8-inch HD touchscreen',
      Battery: '23200mAh',
      Material: 'Fire-resistant ABS',
      Charging: 'Built-in cable for customer phones',
      CMS: 'Free — images, videos, text',
    },
    tags: ['digital', 'signage', 'menu', 'display', 'touchscreen', 'table'],
    price: 125000,
    inStock: true,
    bulkyItem: true,
  },
  {
    slug: 'pocket-camera',
    name: 'Pocket Camera Gimbal',
    category: 'digital-tools',
    description:
      'Handheld pocket camera with built-in gimbal for smooth video. 2+8GB memory, USB-C transfer, fill light for night mode. Perfect for capturing content at your pop-up events.',
    features: [
      '2+8GB memory, supports up to 128GB',
      'USB-C transfer and memory card reader',
      'Built-in fill light for night shots',
      'Compact pocket size',
      'Smooth gimbal stabilisation',
      'Perfect for social media content creation',
    ],
    images: [
      '/products/pocket-camera/specs.jpg',
      '/products/pocket-camera/night-mode.jpg',
    ],
    specs: {
      Memory: '2+8GB (expandable to 128GB)',
      Transfer: 'USB-C',
      'Fill Light': 'Built-in',
      'Best For': 'Pop-up content, social media',
    },
    tags: ['camera', 'gimbal', 'video', 'content', 'social media'],
    price: 55000,
    inStock: true,
  },

  // Cold Chain & Transport
  {
    slug: 'ice-pack-sheets',
    name: 'Ice Pack Sheets — 144 Cells',
    category: 'cold-chain',
    description:
      'Reusable dry ice pack sheets with 144 cells across 6 sheets. Soak in water, freeze, and cut to size. Keeps baked goods, drinks, and perishables cold during transport and at your pop-up. No mess, no melting water.',
    features: [
      '6 sheets with 144 cells total',
      'Reusable — just re-soak and refreeze',
      'Cut to any size needed',
      'No mess — no melting water like regular ice',
      'Lightweight and easy to store',
      'Perfect for food transport and pop-up cold displays',
    ],
    images: [
      '/products/cold-chain/ice-packs-sheets.jpg',
      '/products/cold-chain/ice-packs-comparison.jpg',
      '/products/cold-chain/ice-packs-instructions.jpg',
    ],
    specs: {
      Quantity: '6 sheets (144 cells)',
      Type: 'Dry ice pack (reusable)',
      Activation: 'Soak 5 min, freeze 6+ hours',
      'Best For': 'Food transport, cold displays',
    },
    tags: ['ice', 'cold', 'transport', 'delivery', 'reusable', 'sheets'],
    price: 5500,
    inStock: true,
  },

  // Canopy & Shelter
  {
    slug: 'popup-canopy-tent',
    name: 'Pop-Up Canopy Tent — 10x10 ft',
    category: 'canopy-tents',
    description:
      'Portable 10x10 ft pop-up canopy tent with carry bag and weighted sandbags. Durable steel frame, UV-resistant top, and reinforced corners. Sets up in minutes — essential shelter for outdoor markets and events.',
    features: [
      '10x10 ft coverage area',
      'Durable steel frame with reinforced corners',
      'UV-resistant canopy top',
      'Weighted sandbags included for stability',
      'Carry bag for easy transport',
      'Sets up in under 5 minutes',
    ],
    images: [
      '/products/canopy-tents/canopy-tent.jpg',
      '/products/canopy-tents/canopy-outdoor.jpg',
    ],
    specs: {
      Size: '10 x 10 ft',
      Frame: 'Steel (powder-coated)',
      Canopy: 'UV-resistant polyester',
      Includes: 'Carry bag + 4 weighted sandbags',
    },
    tags: ['canopy', 'tent', 'shelter', 'outdoor', 'popup', 'market'],
    price: 48000,
    inStock: true,
    bulkyItem: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
}

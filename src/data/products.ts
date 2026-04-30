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
    price: 1020,
    priceTiers: [
      { quantity: 5,  unitLabel: '5 pieces',  priceJMD: 1020 },
      { quantity: 20, unitLabel: '20 pieces', priceJMD: 4020 },
      { quantity: 0,  unitLabel: 'Wholesale', priceJMD: null, thresholdLabel: 'Over 100 units', quoteOnly: true },
    ],
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
    name: 'Display Risers',
    category: 'display-signage',
    description:
      '3-tier nested display risers in two finishes — choose burnt wood for rustic warmth or clear translucent acrylic for a modern, minimal look. Both are designed for tiered displays of cupcakes, pastries, and bakery goods at your pop-up.',
    features: [
      '3-tier nested set — assembles in seconds',
      'Two material options: burnt wood or clear acrylic',
      'Wood: rustic, eco-friendly, food-safe finish',
      'Acrylic: see-through display, modern aesthetic',
      'No installation required',
      'Perfect for cupcakes, pastries, and tiered bakery displays',
    ],
    images: [
      '/products/display-risers/cupcake-display.png',
      '/products/display-risers/wood-risers-stack.png',
      '/products/display-risers/translucent-risers.jpg',
      '/products/display-risers/wood-risers-dimensions.png',
      '/products/display-risers/dessert-table-event.png',
    ],
    specs: {
      'Set Size': '3 tiers (nested)',
      Materials: 'Burnt wood OR clear acrylic',
      Style: 'Rustic / Modern',
    },
    tags: ['display', 'wood', 'acrylic', 'translucent', 'risers', 'tiered'],
    price: 5500,
    priceTiers: [
      { quantity: 1, unitLabel: 'Clear acrylic — 3-tier set', priceJMD: 5500 },
      { quantity: 1, unitLabel: 'Burnt wood — 3-tier set', priceJMD: 14500 },
      { quantity: 0, unitLabel: 'Wholesale / mixed cases', priceJMD: null, thresholdLabel: 'Over 20 sets', quoteOnly: true },
    ],
    inStock: true,
  },
  {
    slug: 'table-cloth',
    name: 'Table Cloth — 6 ft Vendor Cover',
    category: 'display-signage',
    description:
      'Polyester table cover sized for the standard 6 ft vendor table. Wrinkle-resistant, machine-washable, and a clean canvas to layer your displays, risers, and chalkboards on top of. Set up looks instantly professional.',
    features: [
      'Fits standard 6 ft vendor tables',
      'Wrinkle-resistant polyester',
      'Machine-washable — easy turnaround between events',
      'Clean canvas for displays + signage',
      'Available in classic neutrals',
    ],
    images: [
      '/products/table-cloth/table-cloth-1.jpg',
      '/products/table-cloth/table-cloth-2.png',
      '/products/table-cloth/table-cloth-3.png',
      '/products/table-cloth/table-cloth-4.png',
    ],
    specs: {
      Size: 'Fits 6 ft tables',
      Material: 'Polyester',
      Care: 'Machine-washable',
    },
    tags: ['table', 'cloth', 'cover', 'display', 'vendor', '6ft'],
    price: 2800,
    priceTiers: [
      { quantity: 1, unitLabel: 'Single unit', priceJMD: 2800 },
      { quantity: 5, unitLabel: '5-pack',     priceJMD: 12500 },
      { quantity: 0, unitLabel: 'Wholesale',  priceJMD: null, thresholdLabel: 'Over 20 units', quoteOnly: true },
    ],
    inStock: true,
  },

  // Packaging
  {
    slug: 'dome-containers',
    name: 'Dome Display Containers',
    category: 'packaging',
    description:
      'Elegant clear dome containers with coloured bases — choose between gold, pink, or clear bases to match your brand. Perfect for individual cupcakes, macarons, truffles, and single-serve pastries. PET material, stackable for display.',
    features: [
      'Clear dome top for full visibility',
      'Multiple base colour options (gold, pink, clear)',
      'PET material — transparent and bright',
      'Easy to use and stackable',
      'Multiple uses: desserts, cakes, bread, cookies',
      'Food-safe materials',
    ],
    images: [
      '/products/dome-containers/IMG_0660.jpg',
      '/products/dome-containers/with-desserts.jpg',
      '/products/dome-containers/IMG_0662.jpg',
      '/products/dome-containers/61k1TUudOXL._AC_SX679_.jpg',
      '/products/dome-containers/IMG_0661.jpg',
      '/products/dome-containers/dimensions.jpg',
    ],
    specs: {
      'Base Diameter': '6.8cm / 2.68"',
      'Dome Height': '4.5cm / 1.77"',
      Material: 'PET (food-safe)',
      'Base Colour': 'Gold',
    },
    tags: ['dome', 'container', 'macaron', 'display', 'gold', 'cupcake'],
    price: 1160,
    priceTiers: [
      { quantity: 10, unitLabel: '10 pieces', priceJMD: 1160 },
      { quantity: 50, unitLabel: '50 pieces', priceJMD: 5500 },
      { quantity: 0,  unitLabel: 'Wholesale', priceJMD: null, thresholdLabel: 'Over 300 units', quoteOnly: true },
    ],
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
    price: 300,
    priceTiers: [
      { quantity: 10,  unitLabel: '10 pieces',  priceJMD: 300 },
      { quantity: 200, unitLabel: '200 pieces', priceJMD: 5000 },
      { quantity: 0,   unitLabel: 'Wholesale',  priceJMD: null, thresholdLabel: 'Over 1,000 units', quoteOnly: true },
    ],
    inStock: true,
  },
  {
    slug: 'bakery-bags-with-window',
    name: 'Bakery Bags with Window',
    category: 'packaging',
    description:
      'Kraft-style bakery bags with a clear window so customers can see the goods inside. Great for cookies, pastries, single-serve cakes, and grab-and-go gift packs at pop-ups.',
    features: [
      'Clear window — show off your baked goods',
      'Kraft-paper construction — sturdy and food-safe',
      'Sized for cookies, pastries, single-serve cakes',
      'Self-standing — easy to pack at the booth',
      'Bulk packs for high-volume vendors',
    ],
    images: [
      '/products/bakery-bags/bakery-bag-1.jpg',
      '/products/bakery-bags/bakery-bag-2.jpg',
      '/products/bakery-bags/bakery-bag-3.jpg',
      '/products/bakery-bags/bakery-bag-4.jpg',
    ],
    specs: {
      Material: 'Kraft paper with clear window',
      Closure: 'Fold-top / tape-seal',
      'Best For': 'Cookies, pastries, single-serve cakes',
    },
    tags: ['bags', 'window', 'kraft', 'bakery', 'packaging'],
    price: 650,
    priceTiers: [
      { quantity: 10,  unitLabel: '10 pieces',  priceJMD: 650 },
      { quantity: 200, unitLabel: '200 pieces', priceJMD: 8000 },
      { quantity: 0,   unitLabel: 'Wholesale',  priceJMD: null, thresholdLabel: 'Over 1,000 units', quoteOnly: true },
    ],
    inStock: true,
  },

  // Baking Supplies
  {
    slug: 'cupcake-baking-cups',
    name: 'Cupcake Baking Cups with Dome Lids',
    category: 'baking-supplies',
    description:
      'Premium aluminium baking cups with clear dome lids and sporks. Available in multiple colour-ways \u2014 gold-interior, gold-and-black, festive red, and patterned styles. Oven-safe up to 482\u00b0F. Perfect for cupcakes, cr\u00e8me br\u00fbl\u00e9e, and individual desserts.',
    features: [
      'Aluminium cups with clear dome lids',
      'Multiple colours and styles \u2014 gold, black, red, patterned',
      'Sporks included',
      'Oven, BBQ, air fryer, and refrigerator safe',
      'Baking temperature up to 482\u00b0F',
      'Perfect for gifting, holiday packs, and pop-up sales',
    ],
    images: [
      '/products/baking-cups/cups-styles.jpg',
      '/products/baking-cups/cups-red-christmas.jpg',
      '/products/baking-cups/set-50pc.jpg',
      '/products/baking-cups/in-use.jpg',
      '/products/baking-cups/cups-gold-cherries.jpg',
      '/products/baking-cups/cups-features.png',
    ],
    specs: {
      Material: 'Aluminium with clear dome lids',
      Colours: 'Gold, gold-and-black, festive red, patterned',
      'Max Temp': '482\u00b0F / 250\u00b0C',
      'Safe For': 'Oven, BBQ, Air Fryer, Refrigerator',
      Includes: 'Cups + dome lids + sporks',
    },
    tags: ['baking', 'cupcake', 'cups', 'dome', 'lids', 'aluminium', 'colours'],
    price: 1160,
    priceTiers: [
      { quantity: 10, unitLabel: '10 pieces', priceJMD: 1160 },
      { quantity: 50, unitLabel: '50 pieces', priceJMD: 5500 },
      { quantity: 0,  unitLabel: 'Wholesale', priceJMD: null, thresholdLabel: 'Over 300 units', quoteOnly: true },
    ],
    inStock: true,
  },
  {
    slug: 'mini-loaf-tins-with-lids',
    name: 'Mini Loaf Baking Tins with Lids',
    category: 'baking-supplies',
    description:
      'Aluminium mini loaf baking tins with matching lids — bake, gift, and ship in the same vessel. Ideal for banana bread, pound cake, fruit cake, and seasonal mini loaves.',
    features: [
      'Aluminium tins with secure lids',
      'Bake → cool → gift in one vessel',
      'Mini-loaf size — single-serve to share',
      'Oven-safe, freezer-safe',
      'Stackable — saves storage at the booth',
    ],
    images: [
      '/products/mini-loaf-tins/mini-loaf-1.jpg',
      '/products/mini-loaf-tins/mini-loaf-2.jpg',
      '/products/mini-loaf-tins/mini-loaf-3.png',
      '/products/mini-loaf-tins/mini-loaf-4.png',
    ],
    specs: {
      Material: 'Aluminium with fitted lid',
      Format: 'Mini loaf',
      'Safe For': 'Oven, freezer, gifting',
    },
    tags: ['baking', 'loaf', 'tin', 'lids', 'mini', 'gifting'],
    price: 1500,
    priceTiers: [
      { quantity: 10, unitLabel: '10 pieces', priceJMD: 1500 },
      { quantity: 50, unitLabel: '50 pieces', priceJMD: 6500 },
      { quantity: 0,  unitLabel: 'Wholesale', priceJMD: null, thresholdLabel: 'Over 300 units', quoteOnly: true },
    ],
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
  {
    slug: 'lightbulb-camera',
    name: 'Smart Lightbulb Security Camera',
    category: 'digital-tools',
    description:
      'A lightbulb that doubles as an HD security camera. Screws into any standard fitting, gives you motion detection, two-way audio, and a phone-app live feed — perfect for keeping an eye on a home-bakery storefront, kitchen, or curb-side pickup zone after hours.',
    features: [
      'Looks like a regular lightbulb — discreet by design',
      'HD camera with motion detection',
      'Two-way audio — talk back through the bulb',
      'Phone-app live feed (iOS + Android)',
      'Standard E26/E27 fitting — no rewiring',
      'Dimmable warm-white light',
    ],
    images: [
      '/products/lightbulb-camera/bulb-cam-1.jpg',
      '/products/lightbulb-camera/bulb-cam-2.jpg',
      '/products/lightbulb-camera/bulb-cam-3.jpg',
      '/products/lightbulb-camera/bulb-cam-4.jpg',
      '/products/lightbulb-camera/bulb-cam-5.jpg',
    ],
    specs: {
      Fitting: 'Standard E26 / E27 screw',
      Camera: 'HD with motion detection',
      Audio: 'Two-way',
      App: 'iOS + Android live feed',
      Lighting: 'Dimmable warm-white',
    },
    tags: ['camera', 'security', 'lightbulb', 'smart', 'home', 'storefront'],
    price: 18500,
    priceTiers: [
      { quantity: 1, unitLabel: 'Single unit', priceJMD: 18500 },
      { quantity: 2, unitLabel: '2-pack', priceJMD: 36200 },
      { quantity: 0, unitLabel: 'Wholesale', priceJMD: null, thresholdLabel: 'Over 10 units', quoteOnly: true },
    ],
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
    price: 920,
    priceTiers: [
      { quantity: 24,  unitLabel: 'Sheet of 24 pieces', priceJMD: 920 },
      { quantity: 144, unitLabel: '144 pieces (6 sheets)', priceJMD: 5500 },
      { quantity: 0,   unitLabel: 'Wholesale', priceJMD: null, thresholdLabel: 'Over 1,440 units', quoteOnly: true },
    ],
    inStock: true,
  },
  {
    slug: 'insulated-food-delivery-bag',
    name: 'Insulated Reusable Food Delivery Bag — Hot or Cold',
    category: 'cold-chain',
    description:
      'Heavy-duty insulated tote that holds heat for hot deliveries and chill for cold ones. Reinforced base, top zip closure, and reusable construction make this the workhorse bag for vendors running deliveries across Kingston and parish runs.',
    features: [
      'Insulated for hot OR cold transport',
      'Reinforced base — holds shape under heavy loads',
      'Top zip closure keeps temperature in',
      'Reusable & easy to wipe clean',
      'Sized to carry boxed orders, trays, or bottles',
      'Ideal for delivery drivers and courier partners',
    ],
    images: [
      '/products/insulated-bags/insulated-bag-1.png',
      '/products/insulated-bags/insulated-bag-2.png',
      '/products/insulated-bags/insulated-bag-3.png',
      '/products/insulated-bags/insulated-bag-4.png',
      '/products/insulated-bags/insulated-bag-5.png',
      '/products/insulated-bags/insulated-bag-6.png',
      '/products/insulated-bags/insulated-bag-7.png',
    ],
    specs: {
      Insulation: 'Hot AND cold transport',
      Closure: 'Top zip',
      Reusable: 'Yes — wipe clean',
      'Best For': 'Catering deliveries, parish runs, courier partners',
    },
    tags: ['insulated', 'delivery', 'bag', 'hot', 'cold', 'reusable', 'courier'],
    price: 5500,
    priceTiers: [
      { quantity: 1, unitLabel: 'Single unit', priceJMD: 5500 },
      { quantity: 5, unitLabel: '5-pack',     priceJMD: 25000 },
      { quantity: 0, unitLabel: 'Wholesale',  priceJMD: null, thresholdLabel: 'Over 20 units', quoteOnly: true },
    ],
    inStock: true,
    bulkyItem: true,
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
      '/products/canopy-tents/canopy-10x10-dimensions.png',
      '/products/canopy-tents/canopy-10x10-features.png',
      '/products/canopy-tents/canopy-10x10-weatherproof.png',
      '/products/canopy-tents/canopy-10x10-use-cases.png',
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
  {
    slug: 'popup-canopy-tent-10x30',
    name: 'Pop-Up Canopy Tent — 10x30 ft (Sale or Rent)',
    category: 'canopy-tents',
    description:
      'Large 10x30 ft event-grade canopy tent — eight sides with windowed walls, waterproof, designed for full vendor villages, weddings, parties, and large pop-up activations. Available for outright purchase OR short-term rental for one-off events. Setup, takedown, and delivery in Kingston Metro included on rentals.',
    features: [
      '10 x 30 ft coverage — fits 8–12 vendor booths or 60+ guests',
      'Waterproof and UV-resistant canopy',
      '8 windowed sides for weather protection + airflow',
      'Heavy-duty steel frame, reinforced corners',
      'Sale: keep it forever, use across every season',
      'Rental: J$5,000 / 4 hours — perfect for one-off events',
      'Setup and takedown included on local rentals',
    ],
    images: [
      '/products/canopy-tents/canopy-10x30-front.jpg',
      '/products/canopy-tents/canopy-10x30-side.jpg',
      '/products/canopy-tents/canopy-10x30-corner.jpg',
      '/products/canopy-tents/canopy-10x30-folded.jpg',
    ],
    specs: {
      Size: '10 x 30 ft',
      Frame: 'Heavy-duty steel (powder-coated)',
      Canopy: 'Waterproof, UV-resistant polyester',
      Sides: '8 closed sides',
      Includes: 'Frame, canopy, sides, carry bags',
    },
    tags: ['canopy', 'tent', '10x30', 'event', 'rental', 'wedding', 'large'],
    price: 70000,
    priceTiers: [
      { quantity: 1, unitLabel: 'Purchase outright', priceJMD: 70000 },
      { quantity: 1, unitLabel: 'Rent for 4 hours', priceJMD: 5000, rentalPeriod: 'per 4 hours' },
      { quantity: 0, unitLabel: 'Long-term / multi-day rental', priceJMD: null, thresholdLabel: 'Multi-day or recurring booking', quoteOnly: true },
    ],
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

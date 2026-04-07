import { Category } from '@/types';

export const categories: Category[] = [
  {
    slug: 'display-signage',
    name: 'Display & Signage',
    description:
      'Chalkboard stands, pedestal displays, wooden risers, and chalk markers to showcase your products beautifully.',
    icon: 'LayoutGrid',
    heroImage: '/products/chalkboard-stands/bakery-use.jpg',
    productCount: 4,
  },
  {
    slug: 'packaging',
    name: 'Packaging Solutions',
    description:
      'Dome containers, sealed bags, and presentation packaging to make your baked goods irresistible.',
    icon: 'Package',
    heroImage: '/products/dome-containers/with-desserts.jpg',
    productCount: 2,
  },
  {
    slug: 'baking-supplies',
    name: 'Baking Supplies',
    description:
      'Premium aluminium baking cups, dome lids, and everything you need for professional-grade baking.',
    icon: 'ChefHat',
    heroImage: '/products/baking-cups/in-use.jpg',
    productCount: 1,
  },
  {
    slug: 'digital-tools',
    name: 'Digital Tools',
    description:
      'Digital signage displays and pocket cameras to elevate your vendor presence and content game.',
    icon: 'Monitor',
    heroImage: '/products/digital-signage/cafe-use.jpg',
    productCount: 2,
  },
  {
    slug: 'vendor-kits',
    name: 'Vendor Kits',
    description:
      'Curated bundles for every stage of your vendor journey \u2014 from first market to full festival anchor.',
    icon: 'Gift',
    heroImage: '/products/customers/popup-booth.jpg',
    productCount: 3,
  },
];

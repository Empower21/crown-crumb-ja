export type CategorySlug =
  | 'display-signage'
  | 'packaging'
  | 'baking-supplies'
  | 'digital-tools'
  | 'vendor-kits'
  | 'cold-chain'
  | 'canopy-tents';

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  features: string[];
  images: string[];
  specs?: Record<string, string>;
  tags: string[];
  price: number | null;
  comparePrice?: number | null;
  inStock: boolean;
  bulkyItem?: boolean;
}

export interface VendorKit {
  slug: string;
  name: string;
  tagline: string;
  jamaicaMeaning: string;
  tier: 'beginner' | 'intermediate' | 'expert';
  description: string;
  includedProductSlugs: string[];
  price: number | null;
  image: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  heroImage: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  quote: string;
  image?: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ChecklistCategory {
  name: string;
  icon: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  label: string;
  essential: boolean;
}

export type DeliveryZoneId =
  | 'kingston-metro'
  | 'rest-of-jamaica'
  | 'caribbean'
  | 'north-america'
  | 'uk-europe';

export interface DeliveryZone {
  id: DeliveryZoneId;
  name: string;
  baseRate: number;
  perAdditionalItem: number;
  freeShippingThreshold: number | null;
  estimatedDays: string;
}

export interface DeliveryResult {
  zone: DeliveryZone;
  baseRate: number;
  fuelSurcharge: number;
  peakSurcharge: number;
  bulkyItemSurcharge: number;
  rushSurcharge: number;
  total: number;
  isFreeShipping: boolean;
}

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

export interface ExchangeRates {
  [currencyCode: string]: number;
}

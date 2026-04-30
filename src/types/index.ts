export type CategorySlug =
  | 'display-signage'
  | 'packaging'
  | 'baking-supplies'
  | 'digital-tools'
  | 'vendor-kits'
  | 'cold-chain'
  | 'canopy-tents';

export interface PriceTier {
  /** Number of pieces in this tier. 0 for "contact for quote" tier. */
  quantity: number;
  /** Human label shown in the UI, e.g. "5 pieces", "sheet of 24 pieces". */
  unitLabel: string;
  /** Price in JMD. null when quoteOnly = true. */
  priceJMD: number | null;
  /** Quantity threshold that triggers the quote tier, e.g. "over 100 units". */
  thresholdLabel?: string;
  /** When true, the tier shows "Contact for quote" and opens WhatsApp instead of adding to cart. */
  quoteOnly?: boolean;
  /**
   * Optional rental period for rentable items (e.g. "per 4 hours", "per day").
   * When present, the UI labels the tier as a rental. The cart treats rentals
   * like a standard line item; Danielle coordinates timing post-payment.
   */
  rentalPeriod?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  features: string[];
  images: string[];
  specs?: Record<string, string>;
  tags: string[];
  /**
   * Entry-tier price in JMD (or null if tier-only). For tiered products this
   * mirrors priceTiers[0].priceJMD so the cart totals and single-price
   * displays keep working with no branching logic.
   */
  price: number | null;
  comparePrice?: number | null;
  /**
   * Optional tier list for products sold in small-and-wholesale quantities.
   * When present, UI shows a tier selector; when absent, product is single-price.
   */
  priceTiers?: PriceTier[];
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

export type EventSource =
  | 'tourism-board'
  | 'jcdc'
  | 'parish-council'
  | 'instagram'
  | 'facebook'
  | 'church'
  | 'school'
  | 'community'
  | 'other';

export type EventCategory =
  | 'craft-fair'
  | 'food-expo'
  | 'cultural-festival'
  | 'church-bazaar'
  | 'school-fair'
  | 'farmers-market'
  | 'pop-up-market'
  | 'holiday-market'
  | 'music-festival'
  | 'expo-trade';

export type Parish =
  | 'Kingston'
  | 'St. Andrew'
  | 'St. Catherine'
  | 'St. Thomas'
  | 'Portland'
  | 'St. Mary'
  | 'St. Ann'
  | 'Trelawny'
  | 'St. James'
  | 'Hanover'
  | 'Westmoreland'
  | 'St. Elizabeth'
  | 'Manchester'
  | 'Clarendon';

export interface VendorEvent {
  slug: string;
  name: string;
  category: EventCategory;
  /** ISO date (YYYY-MM-DD) — start of the event */
  startDate: string;
  /** ISO date — optional, for multi-day events */
  endDate?: string;
  parish: Parish;
  venue: string;
  description: string;
  /** Where this event was listed (JTB, IG, parish council, etc.) */
  source: EventSource;
  /** Human label for the source, e.g. "@kingstoncreativeja on Instagram" */
  sourceLabel: string;
  /** Link to the source listing — IG post, JTB page, parish Facebook post */
  sourceUrl?: string;
  /** Vendor registration — who to contact, how */
  vendorContact?: string;
  /** Registration deadline, if any */
  registrationDeadline?: string;
  /** Booth fee in JMD (null = unknown, 0 = free) */
  vendorFee: number | null;
  /** Whether the event is confirmed (vs. tentative based on prior-year dates) */
  confirmed: boolean;
  tags: string[];
}

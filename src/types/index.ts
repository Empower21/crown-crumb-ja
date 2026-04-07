export type CategorySlug =
  | 'display-signage'
  | 'packaging'
  | 'baking-supplies'
  | 'digital-tools'
  | 'vendor-kits';

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  features: string[];
  images: string[];
  specs?: Record<string, string>;
  tags: string[];
  price: number | null; // JMD price, null = TBD
  comparePrice?: number | null; // original price for sale display
  inStock: boolean;
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

export type CategorySlug =
  | 'cold-chain'
  | 'display-signage'
  | 'canopy-tents'
  | 'packaging'
  | 'baking-kits'
  | 'originals';

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  features: string[];
  images: string[];
  specs?: Record<string, string>;
  tags: string[];
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  heroImage: string;
  productCount: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PopUpEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  status: 'upcoming' | 'past';
}

import { FAQItem } from '@/types';

export const faqItems: FAQItem[] = [
  {
    question: 'What currency are your prices in?',
    answer:
      'All prices on Crown Crumb JA are listed in Jamaican Dollars (JMD). If you are ordering from outside Jamaica, please contact us on WhatsApp for a USD conversion.',
    category: 'pricing',
  },
  {
    question: 'Do you deliver islandwide?',
    answer:
      'Yes! We offer islandwide delivery across Jamaica. Delivery costs are calculated based on your location. Please note that delivery may be restricted to areas accessible via Google Maps \u2014 if your address does not appear on Google Maps, we may not be able to deliver directly.',
    category: 'delivery',
  },
  {
    question: 'How is delivery cost calculated?',
    answer:
      'Delivery cost depends on your parish and distance from our Kingston base. You will see the calculated delivery fee at checkout. For bulk orders or rural areas, contact us on WhatsApp for a custom quote.',
    category: 'delivery',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept cash on delivery and online payment (debit / credit card) at checkout. For local orders, you can pay cash when your order arrives; for online payment, we use Stripe to process cards securely.',
    category: 'payment',
  },
  {
    question: 'Is there a minimum order quantity?',
    answer:
      'No minimum order for individual products! However, our Vendor Kit bundles are sold as complete sets. For bulk orders of 10+ of any item, contact us on WhatsApp for special pricing.',
    category: 'ordering',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Kingston orders are typically delivered within 1\u20132 business days. Islandwide delivery takes 3\u20135 business days depending on location. We will send you a WhatsApp update when your order ships.',
    category: 'delivery',
  },
  {
    question: 'Can I pick up my order instead of delivery?',
    answer:
      'Yes! We offer free pickup from our Kingston location. Select "Pickup" at checkout and we will send you the address and available pickup times via WhatsApp.',
    category: 'delivery',
  },
  {
    question: 'What are the Vendor Kit bundles?',
    answer:
      'Our Vendor Kits are curated bundles designed for every stage of the vendor journey. Likkle But Tallawah (beginner), Run Di Vibes (intermediate), and Big Tings A Gwaan (expert). Each bundle saves you money compared to buying items individually.',
    category: 'products',
  },
  {
    question: 'Do you offer refunds or exchanges?',
    answer:
      'We accept returns on unused, unopened items within 7 days of delivery. Damaged items will be replaced free of charge \u2014 just send us a photo on WhatsApp within 48 hours of receiving your order.',
    category: 'ordering',
  },
  {
    question: 'Can I get a custom quote for my business?',
    answer:
      'Absolutely! For custom bulk orders, special packaging, or business accounts, reach out via WhatsApp or our contact form. Danielle personally handles all custom requests.',
    category: 'ordering',
  },
];

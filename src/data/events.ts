import type { VendorEvent } from '@/types';

// Upcoming pop-up vendor opportunities across Jamaica.
//
// Curated by Danielle from the places Jamaican events actually live:
// Jamaica Tourism Board, JCDC, parish council Facebook pages, Instagram
// community accounts, church bulletins. Structured event platforms
// (Eventbrite, Meetup) miss most cultural programming on the island —
// this list is hand-maintained from those primary sources.
//
// When adding new events, include a `sourceUrl` so vendors can verify
// dates + booth availability directly with the host before registering.

export const events: VendorEvent[] = [
  {
    slug: 'kingston-creative-art-walk-may-2026',
    name: 'Kingston Creative Art Walk',
    category: 'craft-fair',
    startDate: '2026-05-03',
    parish: 'Kingston',
    venue: 'Water Lane, Downtown Kingston',
    description:
      'Monthly art walk turning downtown Kingston into an open-air gallery. Pop-up vendors line the lanes — baked goods, crafts, art, and jewellery. High foot traffic, tourist & local mix.',
    source: 'instagram',
    sourceLabel: '@kingstoncreativeja',
    sourceUrl: 'https://www.instagram.com/kingstoncreativeja/',
    vendorContact: 'DM @kingstoncreativeja or email hello@kingstoncreative.org',
    registrationDeadline: '2026-04-25',
    vendorFee: 3500,
    confirmed: true,
    tags: ['downtown', 'monthly', 'tourist-heavy', 'first-sunday'],
  },
  {
    slug: 'devon-house-i-scream-fest-may-2026',
    name: 'Devon House I-Scream Vendor Village',
    category: 'food-expo',
    startDate: '2026-05-10',
    parish: 'St. Andrew',
    venue: 'Devon House, Hope Road',
    description:
      'Mother\'s Day vendor village at Devon House. Ice cream pairs well with baked goods — cupcakes, cookies, and petit fours move fast. Booth spaces limited.',
    source: 'tourism-board',
    sourceLabel: 'Jamaica Tourism Board events calendar',
    sourceUrl: 'https://www.visitjamaica.com/events/',
    vendorContact: 'events@devonhousejamaica.com | 876-929-6602',
    registrationDeadline: '2026-04-30',
    vendorFee: 8500,
    confirmed: true,
    tags: ['mothers-day', 'family', 'tourist-heavy', 'premium-spot'],
  },
  {
    slug: 'spanish-town-heritage-market-may-2026',
    name: 'Spanish Town Heritage Market',
    category: 'cultural-festival',
    startDate: '2026-05-17',
    parish: 'St. Catherine',
    venue: 'Emancipation Square, Spanish Town',
    description:
      'Heritage-themed market celebrating Spanish Town\'s colonial history. Vendors encouraged to showcase Jamaican heritage foods and crafts. Strong parish council support.',
    source: 'parish-council',
    sourceLabel: 'St. Catherine Municipal Corporation',
    sourceUrl: 'https://www.facebook.com/StCathMuniCorp',
    vendorContact: 'Call 876-984-2200 ext. 2245 — ask for Culture Officer',
    registrationDeadline: '2026-05-05',
    vendorFee: 2500,
    confirmed: true,
    tags: ['heritage', 'free-admission', 'family-friendly'],
  },
  {
    slug: 'mobay-summer-fest-june-2026',
    name: 'Montego Bay Summer Food Festival',
    category: 'food-expo',
    startDate: '2026-06-06',
    endDate: '2026-06-07',
    parish: 'St. James',
    venue: 'Aqueduct, Rose Hall',
    description:
      'Two-day food festival drawing cruise passengers and locals. Vendor applications through JTB Western office. Strongest audience for premium-priced pastries and plated desserts.',
    source: 'tourism-board',
    sourceLabel: 'JTB Montego Bay Office',
    sourceUrl: 'https://www.visitjamaica.com/events/',
    vendorContact: 'jtbwest@visitjamaica.com | 876-952-4425',
    registrationDeadline: '2026-05-15',
    vendorFee: 15000,
    confirmed: true,
    tags: ['tourist-heavy', 'cruise', 'two-day', 'premium'],
  },
  {
    slug: 'portland-jerk-festival-july-2026',
    name: 'Portland Jerk Festival — Vendor Village',
    category: 'cultural-festival',
    startDate: '2026-07-05',
    parish: 'Portland',
    venue: 'Folly Ruins, Port Antonio',
    description:
      'Annual jerk festival — the sweet side of the food vendor row (drinks, cakes, ice cream) does huge numbers. Apply through JCDC Portland or directly with the festival committee.',
    source: 'jcdc',
    sourceLabel: 'Jamaica Cultural Development Commission — Portland',
    sourceUrl: 'https://www.jcdc.gov.jm',
    vendorContact: 'jcdc.portland@jcdc.gov.jm | 876-993-2298',
    registrationDeadline: '2026-06-01',
    vendorFee: 12000,
    confirmed: true,
    tags: ['cultural', 'tourist-heavy', 'music', 'annual'],
  },
  {
    slug: 'emancipation-heritage-expo-july-2026',
    name: 'Emancipation Heritage Expo',
    category: 'cultural-festival',
    startDate: '2026-07-31',
    endDate: '2026-08-01',
    parish: 'Kingston',
    venue: 'Emancipation Park, New Kingston',
    description:
      'Emancipation Day weekend — heritage crafts, foods, and vendor booths. Government-sponsored, strong media coverage. Vendor fee is subsidised.',
    source: 'jcdc',
    sourceLabel: 'Jamaica Cultural Development Commission',
    sourceUrl: 'https://www.jcdc.gov.jm',
    vendorContact: 'info@jcdc.gov.jm | 876-926-5726',
    registrationDeadline: '2026-07-10',
    vendorFee: 5000,
    confirmed: true,
    tags: ['heritage', 'holiday', 'subsidised', 'government-hosted'],
  },
  {
    slug: 'independence-village-august-2026',
    name: 'Independence Village — Vendor Marketplace',
    category: 'cultural-festival',
    startDate: '2026-08-06',
    parish: 'Kingston',
    venue: 'Ranny Williams Entertainment Centre',
    description:
      'Independence Day flagship event. Huge foot traffic, mix of patriotic buyers and out-of-town visitors. Apply early — booth spaces are competitive and go first-come.',
    source: 'jcdc',
    sourceLabel: 'JCDC Independence Secretariat',
    sourceUrl: 'https://www.jcdc.gov.jm',
    vendorContact: 'independence@jcdc.gov.jm',
    registrationDeadline: '2026-07-01',
    vendorFee: 7500,
    confirmed: true,
    tags: ['independence', 'flagship', 'highly-competitive', 'heritage'],
  },
  {
    slug: 'mandeville-farmers-august-2026',
    name: 'Mandeville Farmers Market (Monthly)',
    category: 'farmers-market',
    startDate: '2026-08-15',
    parish: 'Manchester',
    venue: 'Mandeville Hotel grounds',
    description:
      'Mid-month farmers market with a growing baked goods corner. Loyal local audience, lower vendor fees than coastal events. Good testing ground for new recipes.',
    source: 'community',
    sourceLabel: 'Mandeville Farmers Market Facebook group',
    sourceUrl: 'https://www.facebook.com/groups/mandevillefarmers',
    vendorContact: 'DM admin on FB group',
    vendorFee: 1500,
    confirmed: false,
    tags: ['monthly', 'farmers', 'central-jamaica', 'low-fee'],
  },
  {
    slug: 'negril-beach-fest-september-2026',
    name: 'Negril Beach Vendor Village',
    category: 'pop-up-market',
    startDate: '2026-09-12',
    parish: 'Westmoreland',
    venue: 'Seven Mile Beach boardwalk',
    description:
      'End-of-summer beach vendor village. Tourist-heavy — pair small-batch items with grab-and-go packaging. Canopy tents required (no shade provided).',
    source: 'tourism-board',
    sourceLabel: 'JTB Western + Negril Chamber of Commerce',
    sourceUrl: 'https://www.negrilchamber.com',
    vendorContact: 'events@negrilchamber.com | 876-957-4067',
    registrationDeadline: '2026-08-20',
    vendorFee: 10000,
    confirmed: false,
    tags: ['beach', 'tourist', 'canopy-required', 'western'],
  },
  {
    slug: 'harmony-hall-craft-october-2026',
    name: 'Harmony Hall Annual Craft Fair',
    category: 'craft-fair',
    startDate: '2026-10-18',
    parish: 'St. Mary',
    venue: 'Harmony Hall, Tower Isle',
    description:
      'Premium craft fair with curated vendor list — high spend, boutique audience. Baked goods positioned as artisan gifting. Application requires samples.',
    source: 'instagram',
    sourceLabel: '@harmonyhalljamaica',
    sourceUrl: 'https://www.instagram.com/harmonyhalljamaica/',
    vendorContact: 'harmonyhalljamaica@gmail.com',
    registrationDeadline: '2026-09-15',
    vendorFee: 9500,
    confirmed: false,
    tags: ['premium', 'boutique', 'sample-required', 'gifting'],
  },
  {
    slug: 'christmas-in-may-pen-november-2026',
    name: 'Christmas in May Pen — Vendor Fair',
    category: 'holiday-market',
    startDate: '2026-11-28',
    parish: 'Clarendon',
    venue: 'May Pen Civic Centre',
    description:
      'Kick-off for Clarendon\'s Christmas shopping season. Strong repeat-customer base. Register through the parish council — first-come allocation.',
    source: 'parish-council',
    sourceLabel: 'Clarendon Municipal Corporation',
    sourceUrl: 'https://www.facebook.com/ClarendonMC',
    vendorContact: 'Call 876-986-2243 — Culture & Events desk',
    registrationDeadline: '2026-11-10',
    vendorFee: 3000,
    confirmed: false,
    tags: ['christmas', 'local', 'repeat-customers'],
  },
  {
    slug: 'devon-house-christmas-december-2026',
    name: 'Devon House Christmas Village',
    category: 'holiday-market',
    startDate: '2026-12-12',
    endDate: '2026-12-14',
    parish: 'St. Andrew',
    venue: 'Devon House, Hope Road',
    description:
      'Three-day Christmas vendor village at Devon House — THE Kingston December event for gifting-priced baked goods. Highest booth fee on the calendar, highest sell-through too.',
    source: 'tourism-board',
    sourceLabel: 'Devon House + JTB',
    sourceUrl: 'https://www.visitjamaica.com/events/',
    vendorContact: 'events@devonhousejamaica.com | 876-929-6602',
    registrationDeadline: '2026-11-01',
    vendorFee: 25000,
    confirmed: true,
    tags: ['christmas', 'flagship', 'three-day', 'premium', 'tourist-heavy'],
  },
  {
    slug: 'grand-market-kingston-december-2026',
    name: 'Grand Market Kingston (Christmas Eve)',
    category: 'holiday-market',
    startDate: '2026-12-24',
    parish: 'Kingston',
    venue: 'Half Way Tree + Cross Roads + Downtown',
    description:
      'The traditional Jamaican Christmas Eve market — all-night trading. Street vending permits via KSAMC. High volume, low unit price — bulk packaging matters.',
    source: 'parish-council',
    sourceLabel: 'Kingston & St. Andrew Municipal Corporation',
    sourceUrl: 'https://www.ksamc.gov.jm',
    vendorContact: 'permits@ksamc.gov.jm | 876-922-0022',
    registrationDeadline: '2026-12-05',
    vendorFee: 2000,
    confirmed: true,
    tags: ['christmas-eve', 'all-night', 'traditional', 'permit-required'],
  },
];

// --- helpers --------------------------------------------------------------

export function getUpcomingEvents(fromDate = new Date()): VendorEvent[] {
  const today = fromDate.toISOString().slice(0, 10);
  return events
    .filter((e) => (e.endDate ?? e.startDate) >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function getEventBySlug(slug: string): VendorEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function groupEventsByMonth(list: VendorEvent[]): Map<string, VendorEvent[]> {
  const groups = new Map<string, VendorEvent[]>();
  for (const event of list) {
    const monthKey = event.startDate.slice(0, 7); // YYYY-MM
    const existing = groups.get(monthKey) ?? [];
    existing.push(event);
    groups.set(monthKey, existing);
  }
  return groups;
}

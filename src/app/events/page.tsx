import type { Metadata } from 'next';
import { EventsContent } from './EventsContent';

export const metadata: Metadata = {
  title: 'Upcoming Events for Pop-Up Vendors in Jamaica',
  description:
    'Curated calendar of craft fairs, food expos, cultural festivals, and holiday markets across Jamaica where pop-up vendors can register. Sourced from JTB, JCDC, parish councils, and community Instagram.',
  openGraph: {
    title: 'Upcoming Events for Pop-Up Vendors in Jamaica',
    description:
      'Curated from JTB, JCDC, parish councils, and IG — the places Jamaica events actually live.',
    type: 'website',
  },
};

export default function EventsPage() {
  return <EventsContent />;
}

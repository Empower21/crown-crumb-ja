import type { Metadata } from 'next';
import { VendorKitsContent } from './VendorKitsContent';

export const metadata: Metadata = {
  title: 'Vendor Kit Collections',
  description:
    'Curated vendor kit bundles for every stage of your pop-up journey. Beginner, Intermediate, and Expert packages with Jamaican-rooted names. All prices in JMD.',
};

export default function VendorKitsPage() {
  return <VendorKitsContent />;
}

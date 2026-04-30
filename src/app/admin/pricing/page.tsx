import type { Metadata } from 'next';
import PricingDashboard from './PricingDashboard';

export const metadata: Metadata = {
  title: 'Dynamic Pricing Dashboard',
  description: 'Adjust pricing levers and export the Crown Crumb JA price list.',
  robots: { index: false, follow: false },
};

export default function PricingAdminPage() {
  return (
    <div className="min-h-screen bg-crown-dark text-crown-white py-8 px-4 sm:px-6 lg:px-8">
      <PricingDashboard />
    </div>
  );
}

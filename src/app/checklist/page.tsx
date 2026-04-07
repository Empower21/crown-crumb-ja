import type { Metadata } from 'next';
import { ChecklistContent } from './ChecklistContent';

export const metadata: Metadata = {
  title: 'Free Master Vendor Checklist',
  description:
    'The ultimate 80+ item checklist for Jamaican pop-up vendors. Track every item you need before every event. Free from Crown Crumb JA.',
};

export default function ChecklistPage() {
  return <ChecklistContent />;
}

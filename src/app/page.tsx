import { HeroSection } from '@/components/landing/HeroSection';
import { CategoryShowcase } from '@/components/landing/CategoryShowcase';
import { FeaturedProducts } from '@/components/landing/FeaturedProducts';
import { VendorKitsPreview } from '@/components/landing/VendorKitsPreview';
import { UpcomingEventsPreview } from '@/components/landing/UpcomingEventsPreview';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { AboutPreview } from '@/components/landing/AboutPreview';
import { FAQSection } from '@/components/landing/FAQSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <VendorKitsPreview />
      <UpcomingEventsPreview />
      <TestimonialsSection />
      <AboutPreview />
      <FAQSection />
    </>
  );
}

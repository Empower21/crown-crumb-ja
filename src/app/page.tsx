import { HeroSection } from '@/components/landing/HeroSection';
import { CategoryShowcase } from '@/components/landing/CategoryShowcase';
import { FeaturedProducts } from '@/components/landing/FeaturedProducts';
import { EventGallery } from '@/components/landing/EventGallery';
import { AboutPreview } from '@/components/landing/AboutPreview';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <EventGallery />
      <AboutPreview />
    </>
  );
}

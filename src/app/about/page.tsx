import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Cloud, CakeSlice, Package, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Danielle Lawrence — Cloud Engineer by profession, artisan baker by passion, and the founder of Crown Crumb JA in Kingston, Jamaica.',
};

export default function AboutPage() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <p className="text-crown-lime font-heading text-sm font-bold uppercase tracking-widest">
              Our Story
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-crown-white leading-tight">
              Where Cloud Engineering
              <br />
              Meets <span className="text-crown-lavender">Artisan Baking</span>
            </h1>
            <p className="text-crown-muted leading-relaxed text-lg">
              Crown Crumb JA was born from a simple truth: Jamaica&apos;s bakers and pop-up
              vendors deserve better supplies. Better packaging. Better displays. Better
              everything.
            </p>
          </div>
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden">
            <Image
              src="/products/events/popup-display-2.jpg"
              alt="Crown Crumb pop-up event display"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-crown-dark/40 to-transparent" />
          </div>
        </div>

        {/* Danielle's Story */}
        <div className="bg-crown-dark-card rounded-3xl p-8 sm:p-12 mb-16 border border-crown-dark-surface">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-crown-white mb-6">
            Meet Danielle Lawrence
          </h2>
          <div className="space-y-4 text-crown-muted leading-relaxed">
            <p>
              By day, Danielle is a <span className="text-crown-lime font-semibold">Cloud Engineer</span> —
              building and scaling systems in the tech world. By passion, she&apos;s an
              <span className="text-crown-lavender font-semibold"> artisan baker</span> who
              knows the joy (and the hustle) of setting up at a pop-up market with nothing but
              a table, some treats, and a dream.
            </p>
            <p>
              After years of struggling to find quality packaging, reliable display fixtures,
              and weather-proof tents in Jamaica, Danielle decided to solve the problem herself.
              She combined her tech mindset with her baking experience and launched Crown Crumb JA
              — a one-stop distribution company for everything a pop-up vendor needs.
            </p>
            <p>
              From insulated delivery bags that keep your patties hot, to kraft paper bags with
              windows that make your banana bread look irresistible — Crown Crumb curates and
              distributes the exact supplies that Jamaican bakers and vendors actually use.
            </p>
            <p>
              <span className="text-crown-white font-semibold">
                &quot;I built Crown Crumb because I was the customer who couldn&apos;t find what I needed.
                If you&apos;re a baker or a pop-up dreamer in Jamaica, I&apos;ve got you.&quot;
              </span>
              <br />
              <span className="text-crown-lavender">— Danielle Lawrence, Founder</span>
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-crown-white text-center mb-10">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Cloud,
                title: 'Tech-Forward',
                desc: 'We bring a cloud engineer\'s precision to supply distribution.',
                color: 'text-crown-lime',
              },
              {
                icon: CakeSlice,
                title: 'Baker-Tested',
                desc: 'Every product we sell, we\'ve used at our own pop-up events.',
                color: 'text-crown-lavender',
              },
              {
                icon: Package,
                title: 'Quality First',
                desc: 'We curate only supplies that meet our professional standards.',
                color: 'text-crown-pink',
              },
              {
                icon: Heart,
                title: 'Community',
                desc: 'Supporting Jamaica\'s bakers, vendors, and small business dreamers.',
                color: 'text-crown-gold',
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="bg-crown-dark-surface rounded-2xl p-6 border border-crown-dark-surface hover:border-crown-lime/20 transition-colors text-center"
              >
                <Icon size={32} className={`${color} mx-auto mb-4`} />
                <h3 className="font-heading font-bold text-crown-white mb-2">{title}</h3>
                <p className="text-sm text-crown-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-crown-dark-card to-crown-dark-surface rounded-3xl p-10 border border-crown-dark-surface">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-crown-white mb-4">
            Ready to Level Up Your Pop-Up?
          </h2>
          <p className="text-crown-muted mb-8 max-w-lg mx-auto">
            Browse our products or reach out — we&apos;re always happy to help you find exactly
            what you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-3 bg-crown-lime text-crown-dark font-bold rounded-full hover:bg-crown-lime/90 transition-all"
            >
              Shop Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-crown-lavender text-crown-lavender font-bold rounded-full hover:bg-crown-lavender/10 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

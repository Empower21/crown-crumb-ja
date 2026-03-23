import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-crown-dark-card border-t border-crown-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Crown Crumb JA" width={40} height={40} className="rounded-lg" />
              <span className="font-heading text-lg font-bold text-crown-lime">Crown Crumb JA</span>
            </div>
            <p className="text-sm text-crown-muted leading-relaxed">
              Equipping Jamaica&apos;s bakers and pop-up dreamers with premium supplies, packaging, and display solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-bold text-crown-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/products', label: 'Products' },
                { href: '/events', label: 'Pop-Up Events' },
                { href: '/about', label: 'Our Story' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-crown-muted hover:text-crown-lime transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading text-sm font-bold text-crown-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2">
              {[
                { href: '/products?category=packaging', label: 'Packaging' },
                { href: '/products?category=display-signage', label: 'Display & Signage' },
                { href: '/products?category=canopy-tents', label: 'Canopy Tents' },
                { href: '/products?category=baking-kits', label: 'Baking Kits' },
                { href: '/products?category=cold-chain', label: 'Cold Chain' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-crown-muted hover:text-crown-lime transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-bold text-crown-white uppercase tracking-wider mb-4">Connect</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-crown-muted">
                <MapPin size={16} className="text-crown-lime shrink-0" />
                Kingston, Jamaica
              </li>
              <li>
                <a href="mailto:hello@crowncrumbja.com" className="flex items-center gap-2 text-sm text-crown-muted hover:text-crown-lime transition-colors">
                  <Mail size={16} className="text-crown-lime shrink-0" />
                  hello@crowncrumbja.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com/crowncrumbja" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-crown-muted hover:text-crown-lime transition-colors">
                  <Instagram size={16} className="text-crown-lime shrink-0" />
                  @crowncrumbja
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-crown-dark-surface flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-crown-muted">
            &copy; {new Date().getFullYear()} Crown Crumb JA. All rights reserved.
          </p>
          <p className="text-xs text-crown-muted">
            Founded by <span className="text-crown-lavender">Danielle Lawrence</span> in Kingston, Jamaica
          </p>
        </div>
      </div>
    </footer>
  );
}

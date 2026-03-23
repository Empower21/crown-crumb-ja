'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-crown-dark/90 backdrop-blur-md border-b border-crown-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Crown Crumb JA"
              width={48}
              height={48}
              className="rounded-lg"
              priority
            />
            <span className="font-heading text-lg sm:text-xl font-bold text-crown-lime hidden sm:block">
              Crown Crumb JA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-crown-muted hover:text-crown-lime transition-colors rounded-lg hover:bg-crown-dark-surface"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 px-5 py-2 bg-crown-lime text-crown-dark text-sm font-bold rounded-full hover:bg-crown-lime/90 transition-colors"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-crown-white hover:text-crown-lime transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-crown-dark-card border-t border-crown-dark-surface animate-fade-in-up">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base text-crown-white hover:text-crown-lime hover:bg-crown-dark-surface rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 px-4 py-3 bg-crown-lime text-crown-dark font-bold text-center rounded-full"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

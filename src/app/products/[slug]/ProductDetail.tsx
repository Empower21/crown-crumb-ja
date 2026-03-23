'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/utils';
import type { Product } from '@/types';
import { products } from '@/data/products';

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <section className="py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-crown-muted hover:text-crown-lime transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-crown-dark-card">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                      i === activeImage
                        ? 'border-crown-lime'
                        : 'border-crown-dark-surface hover:border-crown-muted'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-crown-lime uppercase tracking-wider">
                {product.category.replace(/-/g, ' ')}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white mt-2">
                {product.name}
              </h1>
            </div>

            <p className="text-crown-muted leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="font-heading text-sm font-bold text-crown-white uppercase tracking-wider mb-3">
                Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-crown-muted">
                    <Check size={16} className="text-crown-lime mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            {product.specs && (
              <div>
                <h3 className="font-heading text-sm font-bold text-crown-white uppercase tracking-wider mb-3">
                  Specifications
                </h3>
                <div className="bg-crown-dark-card rounded-xl p-4 space-y-2">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-crown-muted">{key}</span>
                      <span className="text-crown-white font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href={whatsappLink(
                  `Hi Crown Crumb! I'm interested in the ${product.name}. Can I get pricing and availability?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-crown-lime text-crown-dark font-bold rounded-full hover:bg-crown-lime/90 transition-all"
              >
                <MessageCircle size={18} />
                Inquire on WhatsApp
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center px-6 py-3 border-2 border-crown-lavender text-crown-lavender font-bold rounded-full hover:bg-crown-lavender/10 transition-all"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-crown-white mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
                  <div className="bg-crown-dark-card rounded-2xl overflow-hidden border border-crown-dark-surface hover:border-crown-lime/30 transition-all">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-bold text-crown-white group-hover:text-crown-lime transition-colors">
                        {p.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

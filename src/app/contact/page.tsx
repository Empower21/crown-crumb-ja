import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { MapPin, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Crown Crumb JA for bulk orders, event partnerships, and product inquiries. Based in Kingston, Jamaica.',
};

export default function ContactPage() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-crown-white mb-3">
            Get in Touch
          </h1>
          <p className="text-crown-muted max-w-2xl">
            Whether you need bulk pricing, want to partner for an event, or just have a question
            — we&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info cards */}
          <div className="space-y-6 lg:order-2">
            <div className="bg-crown-dark-card rounded-2xl p-6 border border-crown-dark-surface">
              <MapPin size={24} className="text-crown-lime mb-3" />
              <h3 className="font-heading font-bold text-crown-white mb-1">Location</h3>
              <p className="text-sm text-crown-muted">Kingston, Jamaica</p>
            </div>
            <div className="bg-crown-dark-card rounded-2xl p-6 border border-crown-dark-surface">
              <Mail size={24} className="text-crown-lime mb-3" />
              <h3 className="font-heading font-bold text-crown-white mb-1">Email</h3>
              <a href="mailto:hello@crowncrumbja.com" className="text-sm text-crown-muted hover:text-crown-lime transition-colors">
                hello@crowncrumbja.com
              </a>
            </div>
            <div className="bg-crown-dark-card rounded-2xl p-6 border border-crown-dark-surface">
              <Clock size={24} className="text-crown-lime mb-3" />
              <h3 className="font-heading font-bold text-crown-white mb-1">Response Time</h3>
              <p className="text-sm text-crown-muted">Usually within 24 hours. WhatsApp is fastest!</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 lg:order-1">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

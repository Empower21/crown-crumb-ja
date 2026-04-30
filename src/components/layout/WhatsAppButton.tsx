'use client';

import { MessageCircle } from 'lucide-react';
import { whatsappLink, openWhatsApp } from '@/lib/utils';

const MESSAGE = "Hi Crown Crumb! I'm interested in your products.";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(MESSAGE)}
      onClick={openWhatsApp(MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} className="text-white" fill="white" />
    </a>
  );
}

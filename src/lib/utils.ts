import type { MouseEvent } from 'react';

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const WHATSAPP_NUMBER = '19547936357';

/**
 * Default WhatsApp link (used for SSR and desktop). Uses `wa.me` because
 * `web.whatsapp.com/send` dead-ends at the QR login page for users not
 * already logged into WhatsApp Web — which is most desktop visitors.
 *
 * `wa.me` redirects authenticated users straight to chat (no number ever
 * shown to them) and offers "Open app / Continue to WhatsApp Web" for
 * unauthenticated users. The number appears briefly on whatsapp.com's
 * own page — never on Crown Crumb's site — which is an acceptable
 * trade-off for actually being reachable.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Mobile deep-link. Opens the native WhatsApp app directly, bypassing
 * the browser entirely. Only call from the browser (uses navigator).
 */
export function whatsappMobileLink(message: string): string {
  return `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

/** True if the current browser is running on a mobile device. */
export function isMobileBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Click handler that opens WhatsApp the right way per platform,
 * never showing the phone number on any intermediary page.
 *
 *   <a href={whatsappLink(msg)} onClick={openWhatsApp(msg)}>
 */
export function openWhatsApp(message: string) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    if (isMobileBrowser()) {
      e.preventDefault();
      window.location.href = whatsappMobileLink(message);
    }
    // Desktop: let the default href (web.whatsapp.com/send) handle it
  };
}

export function formatJMD(amount: number): string {
  return `J$${amount.toLocaleString('en-JM')}`;
}

export function formatPrice(price: number | null): string {
  if (price === null) return 'Price TBD';
  return formatJMD(price);
}

export function convertJmdTo(
  jmdAmount: number,
  rate: number,
  symbol: string
): string {
  const converted = Math.round(jmdAmount * rate);
  return `~${symbol}${converted.toLocaleString()}`;
}

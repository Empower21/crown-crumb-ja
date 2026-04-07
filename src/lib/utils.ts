export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const WHATSAPP_NUMBER = '18763388183';

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatJMD(amount: number): string {
  return `J$${amount.toLocaleString('en-JM')}`;
}

export function formatPrice(price: number | null): string {
  if (price === null) return 'Price TBD';
  return formatJMD(price);
}

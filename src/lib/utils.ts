export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function whatsappLink(message: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

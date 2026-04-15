import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { DeeDeeWidget } from '@/components/chat/DeeDeeWidget';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/cart/CartDrawer';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default:
      'Crown Crumb JA \u2014 Pop-Up Vendor Supplies & Baking Packaging | Kingston, Jamaica',
    template: '%s | Crown Crumb JA',
  },
  description:
    "Equipping Jamaica's bakers and pop-up dreamers. Premium packaging, display fixtures, digital tools, and curated vendor kits. Islandwide delivery. All prices in JMD.",
  keywords: [
    'pop-up supplies Jamaica',
    'baking packaging Kingston',
    'vendor kits Jamaica',
    'bakery supplies Jamaica',
    'food packaging Jamaica',
    'display stands Kingston',
    'Crown Crumb',
    'chalkboard stands Jamaica',
    'dome containers Jamaica',
    'digital signage vendor',
  ],
  authors: [{ name: 'Danielle Lawrence' }],
  creator: 'Crown Crumb JA',
  metadataBase: new URL('https://crown-crumb-ja.vercel.app'),
  openGraph: {
    title: 'Crown Crumb JA \u2014 Pop-Up Vendor Supplies & Baking Packaging',
    description:
      "Equipping Jamaica's bakers and pop-up dreamers with premium packaging, display fixtures, and curated vendor kits. Islandwide delivery.",
    url: '/',
    siteName: 'Crown Crumb JA',
    locale: 'en_JM',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 500,
        height: 500,
        alt: 'Crown Crumb JA Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crown Crumb JA',
    description:
      'Pop-up vendor supplies and baking packaging in Kingston, Jamaica. All prices in JMD.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const jsonLdString = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Crown Crumb JA',
  description:
    'Pop-up vendor supplies, baking packaging solutions, and display fixtures in Kingston, Jamaica.',
  url: 'https://crown-crumb-ja.vercel.app',
  logo: 'https://crown-crumb-ja.vercel.app/logo.png',
  email: 'crowncrumb@outlook.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kingston',
    addressCountry: 'JM',
  },
  founder: {
    '@type': 'Person',
    name: 'Danielle Lawrence',
    jobTitle: 'Founder & Creative Director',
  },
  areaServed: 'Jamaica',
  priceCurrency: 'JMD',
  priceRange: '$$',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {jsonLdString}
        </Script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2551705530484163"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-crown-dark text-crown-white">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <DeeDeeWidget />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

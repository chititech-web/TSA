import type { Metadata } from 'next';
import { Outfit, Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google';
import { ServiceWorkerCleanup } from '@/components/effects/ServiceWorkerCleanup';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TS Aromatics | A Legacy of Purity',
  description:
    'Premium essential oils and botanical ingredients for manufacturers, wellness founders, and formulators.',
  other: {
    'theme-color': '#0a0806',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${outfit.variable} ${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <ServiceWorkerCleanup />
        {children}
      </body>
    </html>
  );
}

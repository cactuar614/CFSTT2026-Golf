import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { MobileUserBar } from '@/components/UserBadge';
import Providers from '@/components/Providers';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { Analytics } from '@vercel/analytics/react';

const displayFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0e3b21' },
    { media: '(prefers-color-scheme: dark)', color: '#140e0b' },
  ],
};

export const metadata: Metadata = {
  title: 'The Kentucky Bourbon Scramble 2026',
  description:
    'The Kentucky Bourbon Scramble — Louisville Fri–Sun: itinerary, lodging, three rounds, scoring — July 31–August 2, 2026',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Bourbon Scramble',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} min-h-screen font-sans`}>
        <Providers>
          <div className="md:pt-14">
            <main className="max-w-4xl mx-auto px-4 py-4 pt-[max(1rem,env(safe-area-inset-top,0px))] md:pt-4">
              <MobileUserBar />
              {children}
            </main>
          </div>
          <Navbar />
        </Providers>
        <ServiceWorkerRegister />
        <Analytics />
      </body>
    </html>
  );
}

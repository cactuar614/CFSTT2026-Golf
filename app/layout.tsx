import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1a5632' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
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
      <body className="min-h-screen">
        <Providers>
          <div className="md:pt-14">
            <main className="max-w-4xl mx-auto px-4 py-4 pt-[max(1rem,env(safe-area-inset-top,0px))] md:pt-4">
              {children}
            </main>
          </div>
          <Navbar />
        </Providers>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

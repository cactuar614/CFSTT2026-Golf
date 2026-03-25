import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/lib/ThemeContext';
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
  title: 'Lexington & Louisville Golf 2026',
  description:
    'Golf trip: Lexington Thu 7/30, Louisville Fri–Sun — itinerary, lodging, four rounds, scoring — July 30–August 2, 2026',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Louisville Golf',
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
        <ThemeProvider>
          <div className="md:pt-14">
            <main className="max-w-4xl mx-auto px-4 py-4 pt-[max(1rem,env(safe-area-inset-top,0px))] md:pt-4">
              {children}
            </main>
          </div>
          <Navbar />
        </ThemeProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/lib/ThemeContext';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1a5632' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

export const metadata: Metadata = {
  title: 'CFSTT 2026 Golf Trip',
  description: 'Logistics & scoring for the CFSTT 2026 golf trip',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CFSTT Golf',
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
            <main className="max-w-4xl mx-auto px-4 py-4">{children}</main>
          </div>
          <Navbar />
        </ThemeProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

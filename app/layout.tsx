import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'CFSTT 2026 Golf Trip',
  description: 'Logistics & scoring for the CFSTT 2026 golf trip',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="md:pt-14">
          <main className="max-w-4xl mx-auto px-4 py-4">{children}</main>
        </div>
        <Navbar />
      </body>
    </html>
  );
}

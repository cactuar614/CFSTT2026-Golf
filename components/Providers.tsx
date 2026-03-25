'use client';

import { ThemeProvider } from '@/lib/ThemeContext';
import { AdminProvider } from '@/lib/AdminContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AdminProvider>{children}</AdminProvider>
    </ThemeProvider>
  );
}

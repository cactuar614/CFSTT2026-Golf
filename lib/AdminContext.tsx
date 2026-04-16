'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  adminAccessConfigured,
  clearAdminSession,
  getExpectedAdminCode,
  readAdminSession,
  writeAdminSession,
} from './adminSession';

type AdminContextValue = {
  isAdmin: boolean;
  accessConfigured: boolean;
  login: (code: string) => boolean;
  logout: () => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsAdmin(readAdminSession());
    setMounted(true);
  }, []);

  const login = useCallback((code: string) => {
    const expected = getExpectedAdminCode();
    const submitted = code.trim();
    if (!adminAccessConfigured() || !submitted || submitted !== expected) return false;
    writeAdminSession();
    setIsAdmin(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    clearAdminSession();
    setIsAdmin(false);
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({
      isAdmin: mounted && isAdmin,
      accessConfigured: adminAccessConfigured(),
      login,
      logout,
    }),
    [mounted, isAdmin, login, logout]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return ctx;
}

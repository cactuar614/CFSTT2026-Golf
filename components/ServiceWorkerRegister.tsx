'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/CFSTT2026-Golf/sw.js').catch(() => {});
    }
  }, []);

  return null;
}

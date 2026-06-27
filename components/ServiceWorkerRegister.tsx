'use client';

import { useEffect } from 'react';

/**
 * Registers the PWA service worker (public/sw.js) in production only.
 * Silent on failure — offline support is progressive enhancement.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* offline support is optional — ignore registration errors */
    });
  }, []);

  return null;
}

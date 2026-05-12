'use client';

import { useEffect } from 'react';

export function ServiceWorkerCleanup() {
  useEffect(() => {
    navigator.serviceWorker?.getRegistrations().then((r) => r.forEach((e) => e.unregister()));
  }, []);
  return null;
}

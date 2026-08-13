'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const trackEvent = (eventName: string, properties: any = {}) => {
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventName, properties }),
  }).catch(() => {});
};

export const AnalyticsTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    
    if (pathname.startsWith('/services/')) {
      trackEvent('product_view', { path: pathname });
    } else {
      trackEvent('page_view', { path: pathname });
    }
  }, [pathname]);

  return null;
};

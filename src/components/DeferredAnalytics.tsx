import { Analytics } from '@vercel/analytics/react';
import { useEffect, useState } from 'react';

const DeferredAnalytics = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(() => setEnabled(true), { timeout: 3000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(() => setEnabled(true), 1500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return enabled ? <Analytics /> : null;
};

export default DeferredAnalytics;

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on mount and route change
    window.scrollTo(0, 0);

    // Also scroll to top after a short delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  // Also ensure scroll position is reset on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Disable scroll restoration
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      // Force scroll to top
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  return null;
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CRITICAL_ROUTES, SERVICE_ROUTES } from '@/lib/prefetch';

export default function PrefetchManager() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch critical routes immediately
    const prefetchCriticalRoutes = () => {
      CRITICAL_ROUTES.forEach(route => {
        router.prefetch(route);
      });
    };

    // Prefetch service routes after a delay
    const prefetchServiceRoutes = () => {
      SERVICE_ROUTES.forEach(route => {
        router.prefetch(route);
      });
    };

    // Setup intersection observer for links in viewport
    const setupIntersectionPrefetch = () => {
      if (!('IntersectionObserver' in window)) {
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('/')) {
              router.prefetch(href);
              observer.unobserve(link);
            }
          }
        });
      }, {
        rootMargin: '50px'
      });

      // Observe all internal links
      const observeLinks = () => {
        document.querySelectorAll('a[href^="/"]').forEach((link) => {
          observer.observe(link);
        });
      };

      // Initial observation
      observeLinks();

      // Re-observe when new content is added
      const mutationObserver = new MutationObserver(() => {
        observeLinks();
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });

      return () => {
        observer.disconnect();
        mutationObserver.disconnect();
      };
    };

    // Execute prefetching strategies
    prefetchCriticalRoutes();
    
    // Delay service routes prefetching to avoid blocking
    setTimeout(prefetchServiceRoutes, 1000);
    
    // Setup intersection observer
    const cleanup = setupIntersectionPrefetch();

    return cleanup;
  }, [router]);

  return null;
}
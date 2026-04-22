/**
 * Prefetch utility for optimizing navigation performance
 */

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Hook to prefetch routes on component mount
export function usePrefetchRoutes(routes: string[]) {
  const router = useRouter();

  useEffect(() => {
    // Prefetch routes after a short delay to avoid blocking initial render
    const timeoutId = setTimeout(() => {
      routes.forEach(route => {
        router.prefetch(route);
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [router, routes]);
}

// Function to prefetch routes on hover
export function prefetchOnHover(href: string) {
  return {
    onMouseEnter: () => {
      if (typeof window !== 'undefined') {
        // Use Next.js router to prefetch
        import('next/router').then(({ default: router }) => {
          router.prefetch(href);
        });
      }
    }
  };
}

// Common routes that should be prefetched
export const CRITICAL_ROUTES = [
  '/',
  '/ve-chung-toi',
  '/dich-vu',
  '/du-an',
  '/blog',
  '/lien-he'
];

// Service routes for prefetching
export const SERVICE_ROUTES = [
  '/dich-vu/thiet-ke-website',
  '/dich-vu/nhan-dien-thuong-hieu',
  '/dich-vu/quan-tri-noi-dung',
  '/dich-vu/landing-page',
  '/dich-vu/seo-tong-the',
  '/dich-vu/phong-marketing-thue-ngoai'
];

// Intersection Observer based prefetching for links in viewport
export function setupIntersectionPrefetch() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const link = entry.target as HTMLAnchorElement;
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('/')) {
          // Prefetch the route
          import('next/router').then(({ default: router }) => {
            router.prefetch(href);
          });
          
          // Stop observing this link
          observer.unobserve(link);
        }
      }
    });
  }, {
    rootMargin: '50px'
  });

  // Observe all internal links
  document.querySelectorAll('a[href^="/"]').forEach((link) => {
    observer.observe(link);
  });

  return observer;
}
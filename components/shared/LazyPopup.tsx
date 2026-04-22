'use client';

import { lazy, Suspense } from 'react';

// Define the props interface
interface PopupProps {
  title: string;
  content: string;
  ctaText: string;
  ctaLink: string;
  delay?: number;
  cookieName: string;
  cookieDays?: number;
}

// Lazy load the Popup component
const Popup = lazy(() => import('./Popup'));

// Loading fallback (invisible since popup appears conditionally)
const PopupSkeleton = () => null;

// Wrapper component with lazy loading
export default function LazyPopup(props: PopupProps) {
  return (
    <Suspense fallback={<PopupSkeleton />}>
      <Popup {...props} />
    </Suspense>
  );
}
'use client';

import { lazy, Suspense } from 'react';
import type { ModalProps } from './Modal';

// Lazy load the Modal component
const Modal = lazy(() => import('./Modal'));

// Loading fallback component
const ModalSkeleton = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black bg-opacity-50" />
    <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

// Wrapper component with lazy loading
export default function LazyModal(props: ModalProps) {
  return (
    <Suspense fallback={<ModalSkeleton />}>
      <Modal {...props} />
    </Suspense>
  );
}
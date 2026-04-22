'use client';

import { lazy, Suspense, ReactNode } from 'react';

// Lazy load Framer Motion components
const LazyFramerMotion = lazy(() => 
  import('framer-motion').then(module => ({
    default: {
      motion: module.motion,
      AnimatePresence: module.AnimatePresence,
      LazyMotion: module.LazyMotion,
      domAnimation: module.domAnimation,
      domMax: module.domMax
    }
  }))
);

interface LazyMotionWrapperProps {
  children: ReactNode;
  features?: any;
  strict?: boolean;
}

// Fallback component without animations
const StaticFallback = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

// Wrapper component for lazy-loaded Framer Motion
export default function LazyMotionWrapper({ 
  children, 
  features,
  strict = false 
}: LazyMotionWrapperProps) {
  return (
    <Suspense fallback={<StaticFallback>{children}</StaticFallback>}>
      <LazyFramerMotion>
        {({ LazyMotion, domAnimation }) => (
          <LazyMotion features={features || domAnimation} strict={strict}>
            {children}
          </LazyMotion>
        )}
      </LazyFramerMotion>
    </Suspense>
  );
}

// Export lazy-loaded motion components
export const LazyMotionDiv = lazy(() => 
  import('framer-motion').then(module => ({
    default: module.motion.div
  }))
);

export const LazyMotionSection = lazy(() => 
  import('framer-motion').then(module => ({
    default: module.motion.section
  }))
);

export const LazyAnimatePresence = lazy(() => 
  import('framer-motion').then(module => ({
    default: module.AnimatePresence
  }))
);
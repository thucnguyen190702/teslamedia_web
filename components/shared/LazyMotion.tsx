/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { lazy, Suspense, ReactNode } from 'react';

interface LazyMotionWrapperProps {
  children: ReactNode;
  features?: any;
  strict?: boolean;
}

// Fallback component without animations
const StaticFallback = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

// Lazy load the actual Framer Motion wrapper
const LazyFramerMotion = lazy(async () => {
  const { LazyMotion, domAnimation } = await import('framer-motion');
  
  const Component = ({ children, features, strict = false }: LazyMotionWrapperProps) => (
    <LazyMotion features={features || domAnimation} strict={strict}>
      {children}
    </LazyMotion>
  );
  
  return { default: Component };
});

// Wrapper component for lazy-loaded Framer Motion
export default function LazyMotionWrapper({ 
  children, 
  features,
  strict = false 
}: LazyMotionWrapperProps) {
  return (
    <Suspense fallback={<StaticFallback>{children}</StaticFallback>}>
      <LazyFramerMotion features={features} strict={strict}>
        {children}
      </LazyFramerMotion>
    </Suspense>
  );
}

// Export lazy-loaded motion components
export const LazyMotionDiv = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.div as any };
});

export const LazyMotionSection = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.section as any };
});

export const LazyAnimatePresence = lazy(async () => {
  const { AnimatePresence } = await import('framer-motion');
  return { default: AnimatePresence as any };
});
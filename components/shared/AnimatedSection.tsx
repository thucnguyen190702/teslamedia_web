'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  whileInView?: any;
  transition?: any;
  viewport?: any;
}

export default function AnimatedSection({
  children,
  className = '',
  initial = { opacity: 0, y: 20 },
  animate,
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.4, ease: "easeOut" },
  viewport = { once: true, margin: "0px 0px -100px 0px" }
}: AnimatedSectionProps) {
  if (animate) {
    return (
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}

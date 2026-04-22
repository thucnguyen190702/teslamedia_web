'use client';

import { motion } from 'framer-motion';
import SearchBar from '@/components/shared/SearchBar';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  showSearch?: boolean;
}

export default function HeroSection({
  title,
  description,
  ctaText,
  ctaLink,
  backgroundImage,
  showSearch = true
}: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(24, 119, 242, 0.7), rgba(24, 119, 242, 0.5)), url(${backgroundImage})`
          }}
        />
        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/20 to-primary-900/40" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 text-center text-white"
      >
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed text-gray-100 max-w-3xl mx-auto"
          >
            {description}
          </motion.p>

          {/* Search Bar */}
          {showSearch && (
            <motion.div
              variants={itemVariants}
              className="mb-8 max-w-2xl mx-auto"
            >
              <SearchBar placeholder="Tìm kiếm dịch vụ, dự án, bài viết..." />
            </motion.div>
          )}

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href={ctaLink}
              className="bg-white text-primary-600 hover:bg-gray-100 hover:text-primary-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg inline-flex items-center justify-center"
            >
              {ctaText}
            </Link>
            
            <Link
              href="/lien-he"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-lg inline-flex items-center justify-center"
            >
              Liên hệ tư vấn
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-white/80"
          >
            <span className="text-sm mb-2">Cuộn xuống</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div> */}
      </motion.div>

      {/* Floating elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/20 rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-3/4 right-1/4 w-6 h-6 bg-white/10 rounded-full"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            rotate: [0, 90, 180]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 right-1/3 w-3 h-3 bg-white/15 rounded-full"
        />
      </div>
    </section>
  );
}
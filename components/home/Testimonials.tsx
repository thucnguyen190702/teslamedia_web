'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '@/lib/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  description?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function Testimonials({
  testimonials,
  title = "Khách hàng nói gì về chúng tôi",
  description = "Những phản hồi chân thực từ khách hàng đã tin tưởng và sử dụng dịch vụ của Tesla Media.",
  autoPlay = true,
  autoPlayInterval = 5000
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, testimonials.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut"
      }
    }
  };

  const slideVariants = {
    enter: {
      x: 100,
      opacity: 0
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      x: -100,
      opacity: 0
    }
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            >
              {title}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          </div>

          {/* Testimonials Carousel */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main Testimonial */}
            <div className="relative h-96 lg:h-80 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 400, damping: 35 },
                    opacity: { duration: 0.15 }
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-3xl mx-auto text-center">
                    {/* Quote Icon */}
                    <div className="text-primary-200 mb-6">
                      <svg
                        className="w-12 h-12 mx-auto"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <blockquote className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed italic">
                      "{testimonials[currentIndex].content}"
                    </blockquote>

                    {/* Rating */}
                    <div className="flex justify-center mb-6">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonials[currentIndex].position}
                        </div>
                        <div className="text-sm font-medium text-primary-600">
                          {testimonials[currentIndex].company}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-600 hover:text-primary-600 z-10"
              aria-label="Previous testimonial"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-600 hover:text-primary-600 z-10"
              aria-label="Next testimonial"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Additional Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
                <div className="text-gray-600">Khách hàng hài lòng</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">4.9/5</div>
                <div className="text-gray-600">Đánh giá trung bình</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
                <div className="text-gray-600">Tỷ lệ quay lại</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
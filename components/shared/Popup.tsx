'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface PopupProps {
  title: string;
  content: string;
  ctaText: string;
  ctaLink: string;
  delay?: number;
  cookieName: string;
  cookieDays?: number;
}

export default function Popup({
  title,
  content,
  ctaText,
  ctaLink,
  delay = 5000,
  cookieName,
  cookieDays = 7
}: PopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Check if popup was already shown
    const hasShown = localStorage.getItem(cookieName);
    if (hasShown) {
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let scrollTriggered = false;

    // Handle scroll trigger (50% of page)
    const handleScroll = () => {
      if (scrollTriggered) return;
      
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= 50) {
        scrollTriggered = true;
        setHasScrolled(true);
        setIsVisible(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Set up time-based trigger
    timeoutId = setTimeout(() => {
      if (!scrollTriggered) {
        setIsVisible(true);
      }
    }, delay);

    // Set up scroll-based trigger
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay, cookieName]);

  const handleClose = () => {
    setIsVisible(false);
    
    // Set cookie to prevent showing again
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + cookieDays);
    localStorage.setItem(cookieName, expiryDate.toISOString());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleCtaClick = () => {
    handleClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                aria-label="Đóng popup"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              
              <h3 className="text-xl font-bold text-white pr-8">
                {title}
              </h3>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="flex items-start space-x-4 mb-6">
                {/* Facebook Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">
                    {content}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-6">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Tăng độ tin cậy và uy tín</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Tăng tương tác và reach tự nhiên</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Bảo vệ khỏi các tài khoản giả mạo</span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={ctaLink}
                  onClick={handleCtaClick}
                  className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-primary-700 transition-colors"
                >
                  {ctaText}
                </Link>
                
                <button
                  onClick={handleClose}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Để sau
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 text-center mt-4">
                * Popup này sẽ không hiển thị lại trong 7 ngày
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
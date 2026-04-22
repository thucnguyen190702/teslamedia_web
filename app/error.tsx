'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error('Application Error:', error);
    
    // In a production environment, you might want to send this to an error reporting service
    // Example: Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      // logErrorToService(error);
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Error Illustration */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl mb-4"
            >
              ⚠️
            </motion.div>
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Đã xảy ra lỗi
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Rất tiếc, đã có lỗi xảy ra khi tải trang này. Chúng tôi đã ghi nhận sự cố 
              và sẽ khắc phục sớm nhất có thể.
            </p>
            
            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left bg-gray-100 rounded-lg p-4 mb-6">
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  Chi tiết lỗi (Development Mode)
                </summary>
                <pre className="text-sm text-red-600 overflow-auto">
                  {error.message}
                  {error.stack && (
                    <>
                      {'\n\nStack trace:\n'}
                      {error.stack}
                    </>
                  )}
                </pre>
              </details>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Thử lại
              </button>
              
              <Link
                href="/"
                className="bg-transparent border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Về trang chủ
              </Link>
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Cần hỗ trợ?
            </h2>
            <p className="text-gray-600 mb-4">
              Nếu lỗi vẫn tiếp tục xảy ra, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lien-he"
                className="text-primary-600 font-medium hover:text-primary-700 transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Liên hệ hỗ trợ
              </Link>
              
              <a
                href="tel:1900-1234"
                className="text-primary-600 font-medium hover:text-primary-700 transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Gọi hotline
              </a>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-sm text-gray-500"
          >
            <p>
              Mã lỗi: {error.digest || 'UNKNOWN'}
            </p>
            <p>
              Thời gian: {new Date().toLocaleString('vi-VN')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
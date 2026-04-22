'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    
    // Validate search query
    if (!trimmedQuery) {
      alert('Vui lòng nhập từ khóa tìm kiếm');
      return;
    }
    
    if (trimmedQuery.length < 2) {
      alert('Từ khóa tìm kiếm phải có ít nhất 2 ký tự');
      return;
    }
    
    if (trimmedQuery.length > 100) {
      alert('Từ khóa tìm kiếm không được vượt quá 100 ký tự');
      return;
    }
    
    // Sanitize and redirect
    const sanitizedQuery = trimmedQuery.replace(/[<>]/g, '');
    window.location.href = `/tim-kiem?q=${encodeURIComponent(sanitizedQuery)}`;
  };

  const popularPages = [
    { title: 'Trang chủ', href: '/', description: 'Khám phá dịch vụ Digital Marketing của Tesla Media' },
    { title: 'Dịch vụ', href: '/dich-vu', description: 'Xem tất cả dịch vụ chúng tôi cung cấp' },
    { title: 'Dự án', href: '/du-an', description: 'Portfolio các dự án đã thực hiện' },
    { title: 'Blog', href: '/blog', description: 'Bài viết về Digital Marketing' },
    { title: 'Liên hệ', href: '/lien-he', description: 'Liên hệ để được tư vấn miễn phí' },
    { title: 'Tuyển dụng', href: '/tuyen-dung', description: 'Cơ hội nghề nghiệp tại Tesla Media' }
  ];

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Illustration */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-8xl md:text-9xl font-bold text-primary-200 mb-4"
            >
              404
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-6xl mb-4"
            >
              🔍
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
              Oops! Không tìm thấy trang
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Trang bạn đang tìm kiếm có thể đã được di chuyển, xóa hoặc URL không chính xác. 
              Đừng lo lắng, chúng tôi sẽ giúp bạn tìm thấy những gì bạn cần!
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm nội dung..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  maxLength={100}
                  minLength={2}
                  className="w-full px-6 py-4 pl-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm"
                />
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Về trang chủ
              </Link>
              <button
                onClick={() => window.history.back()}
                className="bg-transparent border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Quay lại
              </button>
            </div>
          </motion.div>

          {/* Popular Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Trang phổ biến
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularPages.map((page, index) => (
                <motion.div
                  key={page.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  <Link
                    href={page.href}
                    className="block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-left"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{page.title}</h3>
                    <p className="text-sm text-gray-600">{page.description}</p>
                    <div className="mt-3 text-primary-600 text-sm font-medium">
                      Xem thêm →
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Cần hỗ trợ thêm?
            </h3>
            <p className="text-gray-600 mb-4">
              Nếu bạn vẫn không tìm thấy những gì mình cần, hãy liên hệ với chúng tôi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lien-he"
                className="text-primary-600 font-medium hover:text-primary-700 transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Liên hệ với chúng tôi
              </Link>
              <Link
                href="/ho-tro-khach-hang"
                className="text-primary-600 font-medium hover:text-primary-700 transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Xem câu hỏi thường gặp
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
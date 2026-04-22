'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Accordion from '@/components/ui/Accordion';
import { StructuredData, generateFAQStructuredData } from '@/components/shared/SEO';
import { faqs } from '@/data/faq';
import { companyInfo } from '@/data/company-info';

const breadcrumbItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Hỗ trợ khách hàng', href: '/ho-tro-khach-hang' }
];

const faqStructuredData = generateFAQStructuredData(
  faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }))
);

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Get unique categories
  const categories = ['Tất cả', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <StructuredData data={faqStructuredData} />
      
      <Breadcrumbs items={breadcrumbItems} />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                Hỗ trợ khách hàng
              </h1>
              <p className="text-xl text-primary-700 leading-relaxed mb-8">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn. Tìm câu trả lời nhanh chóng 
                hoặc liên hệ trực tiếp với đội ngũ chuyên gia của Tesla Media.
              </p>
              
              {/* Search Box */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm câu hỏi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Các kênh hỗ trợ
              </h2>
              <p className="text-lg text-gray-600">
                Chọn cách thức liên hệ phù hợp với bạn
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  title: 'Hotline',
                  description: 'Gọi trực tiếp để được hỗ trợ ngay lập tức',
                  contact: companyInfo.hotline,
                  action: `tel:${companyInfo.hotline}`,
                  color: 'bg-green-100 text-green-600'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Email',
                  description: 'Gửi email chi tiết về vấn đề của bạn',
                  contact: companyInfo.email,
                  action: `mailto:${companyInfo.email}`,
                  color: 'bg-blue-100 text-blue-600'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.732 8.1l3.13 3.259L19.752 8.1l-6.559 6.863z"/>
                    </svg>
                  ),
                  title: 'Messenger',
                  description: 'Chat trực tiếp qua Facebook Messenger',
                  contact: 'Tesla Media',
                  action: companyInfo.socialMedia.messenger,
                  color: 'bg-blue-100 text-blue-600'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.224-.487-.32-.686-.32-.198 0-.517.096-.686.32L12 13.44 7.804 8.16c-.169-.224-.487-.32-.686-.32-.198 0-.517.096-.686.32-.338.448-.338 1.152 0 1.6L10.4 14.4c.338.448.862.448 1.2 0l3.968-4.64c.338-.448.338-1.152 0-1.6z"/>
                    </svg>
                  ),
                  title: 'Zalo',
                  description: 'Liên hệ qua Zalo để được hỗ trợ nhanh',
                  contact: 'Tesla Media',
                  action: companyInfo.socialMedia.zalo,
                  color: 'bg-blue-100 text-blue-600'
                }
              ].map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-center"
                >
                  <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <p className="text-sm font-medium text-gray-800 mb-4">{option.contact}</p>
                  <a
                    href={option.action}
                    target={option.action.startsWith('http') ? '_blank' : undefined}
                    rel={option.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
                  >
                    Liên hệ ngay
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Câu hỏi thường gặp
              </h2>
              <p className="text-lg text-gray-600">
                Tìm câu trả lời nhanh chóng cho các thắc mắc phổ biến
              </p>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ Results */}
            <div className="max-w-4xl mx-auto">
              {filteredFAQs.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Accordion
                    items={filteredFAQs.map(faq => ({
                      id: faq.id,
                      question: faq.question,
                      answer: faq.answer
                    }))}
                    allowMultiple={true}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Không tìm thấy câu hỏi phù hợp
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thử tìm kiếm với từ khóa khác hoặc liên hệ trực tiếp với chúng tôi
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Tất cả');
                    }}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Xem tất cả câu hỏi
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Vẫn cần hỗ trợ thêm?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Đội ngũ chuyên gia của Tesla Media luôn sẵn sàng hỗ trợ bạn. 
                Đừng ngần ngại liên hệ với chúng tôi!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${companyInfo.hotline}`}
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Gọi {companyInfo.hotline}
                </a>
                <a
                  href="/lien-he"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Gửi tin nhắn
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
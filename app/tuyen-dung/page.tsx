import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { StructuredData, generateMetadata } from '@/components/shared/SEO';
import { jobs } from '@/data/jobs';
import { formatDate } from '@/lib/utils';
import AnimatedSection from '@/components/shared/AnimatedSection';

export const metadata: Metadata = generateMetadata({
  title: 'Tuyển dụng - Tesla Media',
  description: 'Cơ hội nghề nghiệp tại Tesla Media - Công ty Digital Marketing hàng đầu Việt Nam. Tham gia đội ngũ chuyên gia và phát triển sự nghiệp của bạn.',
  keywords: 'tuyển dụng tesla media, việc làm digital marketing, career tesla media, cơ hội nghề nghiệp',
  canonicalUrl: 'https://teslamedia.vn/tuyen-dung',
  ogImage: '/images/careers-og.jpg',
  ogType: 'website'
});

const breadcrumbItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Tuyển dụng', href: '/tuyen-dung' }
];

const careersStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Tuyển dụng - Tesla Media',
  description: 'Cơ hội nghề nghiệp tại Tesla Media',
  url: 'https://teslamedia.vn/tuyen-dung'
};

const getJobTypeLabel = (type: string) => {
  switch (type) {
    case 'full-time':
      return 'Toàn thời gian';
    case 'part-time':
      return 'Bán thời gian';
    case 'contract':
      return 'Hợp đồng';
    default:
      return type;
  }
};

const getJobTypeColor = (type: string) => {
  switch (type) {
    case 'full-time':
      return 'bg-green-100 text-green-800';
    case 'part-time':
      return 'bg-blue-100 text-blue-800';
    case 'contract':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function CareersPage() {
  // Generate JobPosting structured data for all jobs
  const jobPostingsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: jobs.map((job, index) => ({
      '@type': 'JobPosting',
      position: index + 1,
      title: job.title,
      description: job.description.replace(/<[^>]*>/g, ''), // Remove HTML tags
      hiringOrganization: {
        '@type': 'Organization',
        name: 'Tesla Media',
        sameAs: 'https://teslamedia.vn',
        logo: 'https://teslamedia.vn/images/logo.png'
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: job.location,
          addressCountry: 'VN'
        }
      },
      employmentType: job.type.toUpperCase().replace('-', '_'),
      datePosted: '2024-01-01', // You might want to add this to job data
      validThrough: job.deadline,
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'VND',
        value: {
          '@type': 'QuantitativeValue',
          minValue: 15000000,
          maxValue: 50000000,
          unitText: 'MONTH'
        }
      },
      workHours: job.type === 'full-time' ? '40 hours per week' : '20 hours per week',
      benefits: job.benefits?.join(', ') || 'Competitive salary, health insurance, professional development',
      qualifications: job.requirements?.join(', ') || 'Bachelor degree, relevant experience'
    }))
  };

  return (
    <>
      <StructuredData data={careersStructuredData} />
      <StructuredData data={jobPostingsStructuredData} />
      
      <Breadcrumbs items={breadcrumbItems} />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
          <div className="container mx-auto px-4">
            <AnimatedSection
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                Cơ hội nghề nghiệp
              </h1>
              <p className="text-xl text-primary-700 leading-relaxed mb-8">
                Tham gia đội ngũ Tesla Media - nơi tài năng được phát huy và sự nghiệp 
                được phát triển trong môi trường năng động, sáng tạo.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white px-4 py-2 rounded-full text-primary-700 font-medium">
                  🚀 Môi trường năng động
                </div>
                <div className="bg-white px-4 py-2 rounded-full text-primary-700 font-medium">
                  💰 Lương thưởng hấp dẫn
                </div>
                <div className="bg-white px-4 py-2 rounded-full text-primary-700 font-medium">
                  📈 Cơ hội thăng tiến
                </div>
                <div className="bg-white px-4 py-2 rounded-full text-primary-700 font-medium">
                  🎯 Dự án thú vị
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <AnimatedSection
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tại sao chọn Tesla Media?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Chúng tôi không chỉ tìm kiếm nhân viên, mà tìm kiếm những đồng đội 
                để cùng xây dựng tương lai Digital Marketing Việt Nam
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🌟',
                  title: 'Dự án đa dạng',
                  description: 'Làm việc với các thương hiệu lớn trong nhiều ngành nghề khác nhau'
                },
                {
                  icon: '🎓',
                  title: 'Đào tạo chuyên sâu',
                  description: 'Được đào tạo bài bản và cập nhật kiến thức mới nhất'
                },
                {
                  icon: '💼',
                  title: 'Thăng tiến rõ ràng',
                  description: 'Lộ trình phát triển sự nghiệp minh bạch và công bằng'
                },
                {
                  icon: '🏆',
                  title: 'Thưởng hiệu quả',
                  description: 'Chế độ thưởng hấp dẫn dựa trên kết quả công việc'
                },
                {
                  icon: '🤝',
                  title: 'Văn hóa tích cực',
                  description: 'Môi trường làm việc thân thiện, hỗ trợ lẫn nhau'
                },
                {
                  icon: '⚖️',
                  title: 'Work-life balance',
                  description: 'Cân bằng giữa công việc và cuộc sống cá nhân'
                }
              ].map((benefit, index) => (
                <AnimatedSection
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <AnimatedSection
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Vị trí đang tuyển dụng
              </h2>
              <p className="text-lg text-gray-600">
                Tìm vị trí phù hợp với bạn và bắt đầu hành trình phát triển sự nghiệp
              </p>
            </AnimatedSection>

            <div className="grid gap-6">
              {jobs.map((job, index) => (
                <AnimatedSection
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          <Link 
                            href={`/tuyen-dung/${job.slug}`}
                            className="hover:text-primary-600 transition-colors"
                          >
                            {job.title}
                          </Link>
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
                          {getJobTypeLabel(job.type)}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
                          </svg>
                          {job.department}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 2m8-2l2 2m-2-2v10a2 2 0 01-2 2H10a2 2 0 01-2-2V9" />
                          </svg>
                          Hạn nộp: {formatDate(job.deadline)}
                        </div>
                      </div>
                      
                      <div 
                        className="text-gray-700 line-clamp-2"
                        dangerouslySetInnerHTML={{ 
                          __html: job.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...' 
                        }}
                      />
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex-shrink-0">
                      <Link
                        href={`/tuyen-dung/${job.slug}`}
                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Xem chi tiết
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {jobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Hiện tại chưa có vị trí tuyển dụng
                </h3>
                <p className="text-gray-600 mb-6">
                  Chúng tôi sẽ cập nhật các vị trí mới sớm nhất. Hãy theo dõi thường xuyên!
                </p>
                <a
                  href="mailto:hr@teslamedia.vn"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Gửi CV ứng tuyển
                </a>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600">
          <div className="container mx-auto px-4 text-center">
            <AnimatedSection
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Không tìm thấy vị trí phù hợp?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Hãy gửi CV của bạn cho chúng tôi. Tesla Media luôn chào đón những tài năng 
                và sẽ liên hệ khi có cơ hội phù hợp.
              </p>
              <a
                href="mailto:hr@teslamedia.vn?subject=Ứng tuyển vị trí tại Tesla Media"
                className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Gửi CV ngay
              </a>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </>
  );
}
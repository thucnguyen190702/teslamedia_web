import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { ContactFormWrapper } from '@/components/shared';
import { StructuredData, generateMetadata } from '@/components/shared/SEO';
import { companyInfo } from '@/data/company-info';

export const metadata: Metadata = generateMetadata({
  title: 'Liên hệ - Tesla Media',
  description: 'Liên hệ với Tesla Media để được tư vấn miễn phí về các dịch vụ Digital Marketing. Hotline: ' + companyInfo.hotline + ', Email: ' + companyInfo.email,
  keywords: 'liên hệ tesla media, tư vấn digital marketing, hotline tesla media, địa chỉ tesla media',
  canonicalUrl: 'https://teslamedia.vn/lien-he',
  ogImage: '/images/contact-og.jpg',
  ogType: 'website'
});

const breadcrumbItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Liên hệ', href: '/lien-he' }
];

const contactStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  mainEntity: {
    '@type': 'Organization',
    name: companyInfo.name,
    telephone: companyInfo.hotline,
    email: companyInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.address,
      addressLocality: 'Quận 1',
      addressRegion: 'TP. Hồ Chí Minh',
      addressCountry: 'VN'
    }
  }
};

export default function ContactPage() {
  return (
    <>
      <StructuredData data={contactStructuredData} />
      
      <Breadcrumbs items={breadcrumbItems} />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                Liên hệ với chúng tôi
              </h1>
              <p className="text-xl text-primary-700 leading-relaxed">
                Sẵn sàng đồng hành cùng bạn trong hành trình phát triển doanh nghiệp. 
                Hãy để lại thông tin để được tư vấn miễn phí!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Gửi thông tin liên hệ
                  </h2>
                  <ContactFormWrapper />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Company Info */}
                <div className="bg-gray-50 rounded-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Thông tin liên hệ
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 text-primary-600 mt-1">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Địa chỉ</h4>
                        <p className="text-gray-600">{companyInfo.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 text-primary-600 mt-1">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Hotline</h4>
                        <p className="text-gray-600">
                          <a href={`tel:${companyInfo.hotline}`} className="hover:text-primary-600 transition-colors">
                            {companyInfo.hotline}
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 text-primary-600 mt-1">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">
                          <a href={`mailto:${companyInfo.email}`} className="hover:text-primary-600 transition-colors">
                            {companyInfo.email}
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 text-primary-600 mt-1">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Giờ làm việc</h4>
                        <p className="text-gray-600">
                          Cả tuần
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-primary-50 rounded-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Kết nối với chúng tôi
                  </h3>
                  
                  <div className="flex space-x-4">
                    <a
                      href={companyInfo.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                      aria-label="Facebook Tesla Media"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>

                    <a
                      href={companyInfo.socialMedia.zalo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                      aria-label="Zalo Tesla Media"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.224-.487-.32-.686-.32-.198 0-.517.096-.686.32L12 13.44 7.804 8.16c-.169-.224-.487-.32-.686-.32-.198 0-.517.096-.686.32-.338.448-.338 1.152 0 1.6L10.4 14.4c.338.448.862.448 1.2 0l3.968-4.64c.338-.448.338-1.152 0-1.6z"/>
                      </svg>
                    </a>

                    <a
                      href={companyInfo.socialMedia.messenger}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                      aria-label="Messenger Tesla Media"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.732 8.1l3.13 3.259L19.752 8.1l-6.559 6.863z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google Maps */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Vị trí văn phòng
              </h2>
              <p className="text-lg text-gray-600">
                Hãy ghé thăm văn phòng của chúng tôi để được tư vấn trực tiếp
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                src={companyInfo.mapEmbedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ văn phòng Tesla Media"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Sẵn sàng bắt đầu dự án của bạn?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Đừng chần chừ! Liên hệ ngay với Tesla Media để được tư vấn miễn phí 
              và nhận báo giá tốt nhất cho dự án của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${companyInfo.hotline}`}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Gọi ngay {companyInfo.hotline}
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Gửi email
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
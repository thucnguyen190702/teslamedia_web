import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { StructuredData, generateMetadata } from '@/components/shared/SEO';
import { companyInfo } from '@/data/company-info';
import AnimatedSection from '@/components/shared/AnimatedSection';

export const metadata: Metadata = generateMetadata({
  title: 'Về chúng tôi - Tesla Media',
  description: 'Tìm hiểu về Tesla Media - công ty chuyên về Digital Marketing hàng đầu Việt Nam. Lịch sử hình thành, tầm nhìn, sứ mệnh và đội ngũ chuyên gia.',
  keywords: 'về tesla media, công ty digital marketing, lịch sử tesla media, tầm nhìn sứ mệnh, đội ngũ chuyên gia',
  canonicalUrl: 'https://teslamedia.vn/ve-chung-toi',
  ogImage: '/images/about-og.jpg',
  ogType: 'website'
});

const breadcrumbItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Về chúng tôi', href: '/ve-chung-toi' }
];

const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: companyInfo.name,
  description: 'Công ty chuyên về Digital Marketing hàng đầu Việt Nam với hơn 4 năm kinh nghiệm',
  url: 'https://teslamedia.vn',
  logo: 'https://teslamedia.vn/images/logo.png',
  image: 'https://teslamedia.vn/images/about-og.jpg',
  telephone: companyInfo.hotline,
  email: companyInfo.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: companyInfo.address,
    addressLocality: 'Quận 1',
    addressRegion: 'TP. Hồ Chí Minh',
    addressCountry: 'VN'
  },
  sameAs: [
    companyInfo.socialMedia.facebook,
    companyInfo.socialMedia.zalo
  ],
  foundingDate: '2020',
  numberOfEmployees: '50-100',
  areaServed: 'Vietnam'
};

export default function AboutPage() {
  return (
    <>
      <StructuredData data={organizationStructuredData} />
      
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
                Về Tesla Media
              </h1>
              <p className="text-xl text-primary-700 leading-relaxed">
                Chúng tôi là đối tác tin cậy giúp doanh nghiệp Việt Nam phát triển mạnh mẽ 
                trong thời đại số với các giải pháp Digital Marketing toàn diện và hiệu quả.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Company History */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Lịch sử hình thành
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Tesla Media được thành lập vào năm 2020 với khát vọng trở thành công ty 
                    Digital Marketing hàng đầu Việt Nam. Bắt đầu từ một team nhỏ 5 người, 
                    chúng tôi đã không ngừng phát triển và mở rộng quy mô.
                  </p>
                  <p>
                    Trải qua hơn 4 năm hoạt động, Tesla Media đã thực hiện thành công hơn 
                    1000+ dự án cho các doanh nghiệp từ startup đến tập đoàn lớn, giúp họ 
                    tăng trưởng doanh thu và xây dựng thương hiệu mạnh mẽ trên môi trường số.
                  </p>
                  <p>
                    Với đội ngũ hơn 50 chuyên gia giàu kinh nghiệm, chúng tôi tự hào là 
                    đối tác đáng tin cậy của nhiều thương hiệu nổi tiếng như Vinamilk, 
                    FPT, Viettel, và hàng trăm doanh nghiệp khác.
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="/images/about/history.jpg"
                  alt="Lịch sử hình thành Tesla Media"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
                <div className="absolute inset-0 bg-primary-600 bg-opacity-10 rounded-lg"></div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
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
                Tầm nhìn & Sứ mệnh
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Chúng tôi hướng tới tương lai với tầm nhìn rõ ràng và sứ mệnh cao cả
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedSection
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 shadow-lg"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm nhìn</h3>
                <p className="text-gray-700 leading-relaxed">
                  Trở thành công ty Digital Marketing hàng đầu Đông Nam Á, tiên phong 
                  trong việc ứng dụng công nghệ và sáng tạo để mang lại giá trị bền vững 
                  cho khách hàng và cộng đồng.
                </p>
              </AnimatedSection>

              <AnimatedSection
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 shadow-lg"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh</h3>
                <p className="text-gray-700 leading-relaxed">
                  Đồng hành cùng doanh nghiệp Việt Nam trong hành trình chuyển đổi số, 
                  cung cấp các giải pháp Digital Marketing hiệu quả, giúp họ tăng trưởng 
                  bền vững và chinh phục thị trường toàn cầu.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Core Values */}
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
                Giá trị cốt lõi
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Những giá trị định hướng mọi hoạt động của Tesla Media
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Chất lượng',
                  description: 'Cam kết mang đến sản phẩm và dịch vụ chất lượng cao nhất'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'Sáng tạo',
                  description: 'Không ngừng đổi mới và sáng tạo trong mọi giải pháp'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: 'Đồng hành',
                  description: 'Luôn đặt lợi ích khách hàng lên hàng đầu'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  title: 'Minh bạch',
                  description: 'Làm việc công khai, minh bạch và có trách nhiệm'
                }
              ].map((value, index) => (
                <AnimatedSection
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Team & Culture */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="/images/about/history.jpg"
                  alt="Đội ngũ và văn hóa Tesla Media"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
                <div className="absolute inset-0 bg-primary-600 bg-opacity-10 rounded-lg"></div>
              </AnimatedSection>

              <AnimatedSection
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Đội ngũ & Văn hóa
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Tesla Media tự hào sở hữu đội ngũ hơn 50 chuyên gia giàu kinh nghiệm 
                    trong các lĩnh vực: Strategy, Creative, Technology, Data Analytics, 
                    và Customer Success.
                  </p>
                  <p>
                    Chúng tôi xây dựng văn hóa doanh nghiệp năng động, sáng tạo và đề cao 
                    tinh thần học hỏi. Mỗi thành viên đều được khuyến khích phát huy tối đa 
                    năng lực và đóng góp ý tưởng cho sự phát triển chung.
                  </p>
                  <p>
                    Với môi trường làm việc hiện đại, chế độ đãi ngộ hấp dẫn và cơ hội 
                    thăng tiến rõ ràng, Tesla Media luôn thu hút những tài năng hàng đầu 
                    trong ngành Digital Marketing.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                    <div className="text-gray-600">Chuyên gia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">4+</div>
                    <div className="text-gray-600">Năm kinh nghiệm</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
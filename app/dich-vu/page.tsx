import { Metadata } from 'next';
import { services } from '@/data/services';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ServiceCard from '@/components/shared/ServiceCard';

export const metadata: Metadata = {
  title: 'Dịch vụ Digital Marketing chuyên nghiệp | Tesla Media',
  description: 'Khám phá 6 dịch vụ Digital Marketing chính: Thiết kế website, SEO, nhận diện thương hiệu, landing page, quản trị nội dung, marketing thuê ngoài.',
  keywords: 'dịch vụ digital marketing, thiết kế website, seo, nhận diện thương hiệu, landing page, quản trị nội dung, marketing thuê ngoài',
  openGraph: {
    title: 'Dịch vụ Digital Marketing chuyên nghiệp | Tesla Media',
    description: 'Khám phá 6 dịch vụ Digital Marketing chính: Thiết kế website, SEO, nhận diện thương hiệu, landing page chuyên nghiệp.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://teslamedia.vn/dich-vu',
  },
};

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Dịch vụ', href: '/dich-vu' },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Dịch vụ Digital Marketing chuyên nghiệp
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Tesla Media cung cấp giải pháp Digital Marketing toàn diện, 
                giúp doanh nghiệp tăng trưởng bền vững trong thời đại số
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Sẵn sàng bắt đầu dự án của bạn?
              </h2>
              <p className="text-primary-100 text-lg mb-8">
                Liên hệ với chúng tôi để nhận tư vấn miễn phí và báo giá chi tiết
              </p>
              <a
                href="/lien-he"
                className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Liên hệ ngay
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
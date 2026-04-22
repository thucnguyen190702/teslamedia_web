import { Metadata } from 'next';
import {
  HeroSection,
  AboutSection,
  ServicesGrid,
  StatsSection,
  LogoSlider,
  ProjectGallery,
  Testimonials,
  BlogSection
} from '@/components/home';
import { StructuredData, organizationStructuredData, websiteStructuredData } from '@/components/shared/SEO';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog-posts';
import { testimonials } from '@/data/testimonials';

export const metadata: Metadata = {
  title: 'Tesla Media - Digital Marketing Agency | Dịch vụ Marketing chuyên nghiệp',
  description: 'Tesla Media - Công ty Digital Marketing hàng đầu Việt Nam. Thiết kế website, SEO, nhận diện thương hiệu, landing page, quản trị nội dung chuyên nghiệp.',
  keywords: 'digital marketing, thiết kế website, SEO, landing page, nhận diện thương hiệu, quản trị nội dung, marketing thuê ngoài, tesla media',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://teslamedia.vn',
    siteName: 'Tesla Media',
    title: 'Tesla Media - Digital Marketing Agency',
    description: 'Công ty Digital Marketing hàng đầu Việt Nam. Thiết kế website, SEO, nhận diện thương hiệu, landing page chuyên nghiệp.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tesla Media - Digital Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tesla Media - Digital Marketing Agency',
    description: 'Công ty Digital Marketing hàng đầu Việt Nam',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://teslamedia.vn',
  },
};

export default function Home() {
  // Enhanced structured data for homepage
  const enhancedOrganizationData = {
    ...organizationStructuredData,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dịch vụ Digital Marketing',
      itemListElement: services.map((service, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.shortDescription,
          provider: {
            '@type': 'Organization',
            name: 'Tesla Media'
          }
        }
      }))
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const enhancedWebsiteData = {
    ...websiteStructuredData,
    mainEntity: {
      '@type': 'Organization',
      name: 'Tesla Media',
      description: 'Công ty Digital Marketing hàng đầu Việt Nam'
    }
  };

  return (
    <>
      {/* Enhanced Structured Data for SEO */}
      <StructuredData data={enhancedOrganizationData} />
      <StructuredData data={enhancedWebsiteData} />

      <main className="min-h-screen bg-white">
        {/* Hero Section - Full viewport height with search */}
        <HeroSection
          title="Giải pháp Digital Marketing toàn diện"
          description="Tesla Media - Đối tác tin cậy giúp doanh nghiệp tăng trưởng bền vững trong thời đại số với các dịch vụ marketing chuyên nghiệp và hiệu quả."
          ctaText="Khám phá dịch vụ"
          ctaLink="/dich-vu"
          backgroundImage="/images/hero-bg.jpg"
          showSearch={true}
        />

        {/* About Section - Company introduction with video */}
        <AboutSection
          title="Về Tesla Media"
          content="<p>Tesla Media là công ty chuyên về Digital Marketing hàng đầu tại Việt Nam với hơn 5 năm kinh nghiệm trong lĩnh vực marketing số. Chúng tôi tự hào là đối tác tin cậy của hơn 500 doanh nghiệp từ startup đến tập đoàn lớn.</p><p>Với đội ngũ chuyên gia giàu kinh nghiệm và công nghệ tiên tiến, chúng tôi cam kết mang đến những giải pháp marketing hiệu quả, giúp khách hàng đạt được mục tiêu kinh doanh và tăng trưởng bền vững.</p><p>Sứ mệnh của chúng tôi là đồng hành cùng doanh nghiệp Việt Nam chinh phục thị trường số, tạo ra những câu chuyện thành công đáng nhớ trong hành trình chuyển đổi số.</p>"
          videoUrl="https://www.youtube.com/embed/m5bcujiFO50?si=JAz9z9-SgR-hIrly&autoplay=1&rel=0"
          videoThumbnail="/images/about/thumnailVideo.png"
          stats={{
            experience: "5+",
            projects: "1000+",
            clients: "500+"
          }}
        />

        {/* Services Grid - 6 main services */}
        <ServicesGrid
          services={services}
          title="Dịch vụ của chúng tôi"
          description="Tesla Media cung cấp giải pháp Digital Marketing toàn diện, giúp doanh nghiệp tăng trưởng bền vững trong thời đại số."
        />

        {/* Stats Section - Animated counters */}
        <StatsSection
          title="Thành tích của chúng tôi"
          description="Những con số ấn tượng khẳng định uy tín và chất lượng dịch vụ của Tesla Media trong suốt hành trình phát triển."
        />

        {/* Logo Slider - Partners and clients */}
        <LogoSlider
          title="Đối tác & Khách hàng tin tưởng"
        />

        {/* Project Gallery - Featured projects with filter */}
        {/* <ProjectGallery
          projects={projects}
          title="Dự án tiêu biểu"
          description="Khám phá những dự án đã được Tesla Media triển khai thành công cho các khách hàng trong nhiều lĩnh vực khác nhau."
          showFilter={true}
          limit={9}
        /> */}

        {/* Testimonials - Customer reviews carousel */}
        <Testimonials
          testimonials={testimonials}
          title="Khách hàng nói gì về chúng tôi"
          description="Những phản hồi chân thực từ khách hàng đã tin tưởng và sử dụng dịch vụ của Tesla Media."
          autoPlay={true}
          autoPlayInterval={5000}
        />

        {/* Blog Section - Latest blog posts */}
        <BlogSection
          posts={blogPosts}
          title="Blog & Tin tức"
          description="Cập nhật những kiến thức mới nhất về Digital Marketing, xu hướng công nghệ và câu chuyện thành công từ Tesla Media."
          limit={6}
        />
      </main>
    </>
  );
}

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog-posts';
import { Service } from '@/lib/types';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ProjectCard from '@/components/shared/ProjectCard';
import BlogCard from '@/components/shared/BlogCard';
import ContactForm from '@/components/shared/ContactForm';
import OptimizedImage from '@/components/shared/OptimizedImage';
import InternalLinks from '@/components/shared/InternalLinks';
import { findRelevantLinks, serviceLinks } from '@/lib/internal-links';
import {
  FaCheck,
  FaCheckCircle,
  FaFacebookMessenger,
  FaHeart,
  FaUserPlus,
  FaDollarSign,
  FaGraduationCap,
  FaHandshake,
  FaLaptopCode,
  FaBoxes,
  FaKey,
} from 'react-icons/fa';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

// Icon mapping for services
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaCheckCircle,
  FaFacebookMessenger,
  FaHeart,
  FaUserPlus,
  FaDollarSign,
  FaGraduationCap,
  FaHandshake,
  FaLaptopCode,
  FaBoxes,
  FaKey,
};

// Generate static params for all service pages
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for each service page
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: 'Dịch vụ không tồn tại | Tesla Media',
      description: 'Dịch vụ bạn tìm kiếm không tồn tại.',
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.ogImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.ogImage],
    },
  };
}

function getServiceIcon(iconName: string) {
  return iconMap[iconName] || iconMap['FaCheckCircle'];
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  // Get related projects
  const relatedProjects = projects.filter((project) =>
    service.relatedProjects.includes(project.id)
  );

  // Get related blog posts
  const relatedBlogPosts = service.relatedPosts 
    ? blogPosts.filter((post) => service.relatedPosts?.includes(post.id))
    : [];

  // Get related internal links
  const serviceContent = `${service.title} ${service.shortDescription} ${service.fullDescription}`;
  const relatedLinks = findRelevantLinks(serviceContent, `/dich-vu/${service.slug}`, 4)
    .filter(link => !link.url.includes(service.slug)); // Exclude current service

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Dịch vụ', href: '/dich-vu' },
    { label: service.title, href: `/dich-vu/${service.slug}` },
  ];

  const IconComponent = getServiceIcon(service.icon);

  // Generate Service schema structured data
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'Tesla Media',
      url: 'https://teslamedia.vn',
    },
    serviceType: service.title,
    areaServed: 'Vietnam',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.benefits.map((benefit, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: benefit,
        },
      })),
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Service Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
                {IconComponent && <IconComponent className="text-primary-500 text-4xl" />}
              </div>

              {/* Service Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {service.title}
              </h1>

              {/* Service Short Description */}
              <p className="text-xl text-gray-600 leading-relaxed">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Service Description */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: service.fullDescription }}
              />
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Quy trình thực hiện
                </h2>
                <p className="text-gray-600 text-lg">
                  Chúng tôi thực hiện dự án theo quy trình chuyên nghiệp, đảm bảo chất lượng và tiến độ
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.process.map((step, index) => (
                  <div key={step.step} className="relative">
                    {/* Step Number */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                      {index < service.process.length - 1 && (
                        <div className="hidden lg:block flex-1 h-0.5 bg-gray-200 ml-4"></div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Lợi ích khi sử dụng dịch vụ
                </h2>
                <p className="text-gray-600 text-lg">
                  Những giá trị mà bạn sẽ nhận được khi hợp tác với Tesla Media
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheck className="w-3 h-3 text-green-600" />
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Dự án liên quan
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Một số dự án tiêu biểu mà chúng tôi đã thực hiện cho dịch vụ này
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Blog Posts */}
        {relatedBlogPosts.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Bài viết liên quan
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Tìm hiểu thêm về {service.title} qua các bài viết chuyên sâu
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedBlogPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Đăng ký tư vấn miễn phí
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Để lại thông tin để nhận tư vấn chi tiết về dịch vụ <strong>{service.title}</strong>
                  </p>
                </div>

                <ContactForm servicePreselect={service.slug} />
              </div>
            </div>
          </div>
        </section>

        {/* Related Services & Internal Links */}
        {relatedLinks.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <InternalLinks 
                  links={relatedLinks}
                  title="Dịch vụ liên quan"
                  variant="card"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
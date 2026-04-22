import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ProjectCard from '@/components/shared/ProjectCard';
import { BreadcrumbItem } from '@/lib/types';
import {
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

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Dự án không tìm thấy | Tesla Media',
      description: 'Dự án bạn đang tìm kiếm không tồn tại.',
    };
  }

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      images: [project.thumbnail],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.metaTitle,
      description: project.metaDescription,
      images: [project.thumbnail],
    },
  };
}

const categoryLabels: Record<string, string> = {
  website: 'Website',
  branding: 'Nhận diện thương hiệu',
  'landing-page': 'Landing page',
  'digital-product': 'Sản phẩm số',
  'content-creator': 'Content creator',
  other: 'Khác'
};

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  // Find related service
  const relatedService = services?.find((service) => 
    service.relatedProjects?.includes(project.id)
  );

  // Get icon component for related service
  const ServiceIconComponent = relatedService 
    ? iconMap[relatedService.icon] || iconMap['FaCheckCircle']
    : null;

  // Get related projects (same category, excluding current project)
  const relatedProjects = projects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Dự án', href: '/du-an' },
    { label: project.title, href: `/du-an/${project.slug}` }
  ];

  // Format completion date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {categoryLabels[project.category]}
                </span>
              </div>

              {/* Project Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {project.title}
              </h1>

              {/* Project Meta */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 3h10M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4M9 3v2m6-2v2" />
                  </svg>
                  <span><strong>Khách hàng:</strong> {project.client}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 13a2 2 0 002 2h6a2 2 0 002-2L16 7" />
                  </svg>
                  <span><strong>Hoàn thành:</strong> {formatDate(project.completedDate)}</span>
                </div>
              </div>

              {/* Project Description */}
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        {/* Project Images Gallery */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Hình ảnh dự án
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.images.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={image}
                      alt={`${project.title} - Hình ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Technologies Used */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Công nghệ sử dụng
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Info */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Thông tin dự án
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-600">Khách hàng:</span>
                      <span className="text-gray-900">{project.client}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-600">Danh mục:</span>
                      <span className="text-gray-900">{categoryLabels[project.category]}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-600">Ngày hoàn thành:</span>
                      <span className="text-gray-900">{formatDate(project.completedDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Service */}
        {relatedService && (
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Dịch vụ liên quan
                </h3>
                <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      {ServiceIconComponent && (
                        <ServiceIconComponent className="text-primary-500 text-3xl" />
                      )}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {relatedService.title}
                  </h4>
                  <p className="text-gray-600 mb-6">
                    {relatedService.shortDescription}
                  </p>
                  <Link
                    href={`/dich-vu/${relatedService.slug}`}
                    className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    Tìm hiểu thêm
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Dự án cùng danh mục
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedProjects.map((relatedProject) => (
                    <ProjectCard key={relatedProject.id} project={relatedProject} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link
                    href="/du-an"
                    className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    Xem tất cả dự án
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { StructuredData, generateJobPostingStructuredData, generateMetadata as generateSEOMetadata } from '@/components/shared/SEO';
import { jobs } from '@/data/jobs';
import { formatDate } from '@/lib/utils';

interface JobDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const job = jobs.find((j) => j.slug === params.slug);
  
  if (!job) {
    return {
      title: 'Không tìm thấy vị trí tuyển dụng',
    };
  }

  return generateSEOMetadata({
    title: job.metaTitle,
    description: job.metaDescription,
    keywords: `${job.title}, tuyển dụng ${job.department}, việc làm ${job.location}`,
    canonicalUrl: `https://teslamedia.vn/tuyen-dung/${job.slug}`,
    ogImage: '/images/job-og.jpg',
    ogType: 'article'
  });
}

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

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = jobs.find((j) => j.slug === params.slug);

  if (!job) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tuyển dụng', href: '/tuyen-dung' },
    { label: job.title, href: `/tuyen-dung/${job.slug}` }
  ];

  // Extract salary range from benefits if available
  const salaryBenefit = job.benefits.find(benefit => 
    benefit.toLowerCase().includes('lương') && benefit.includes('triệu')
  );
  
  let baseSalary;
  if (salaryBenefit) {
    const salaryMatch = salaryBenefit.match(/(\d+)-(\d+)\s*triệu/);
    if (salaryMatch) {
      baseSalary = {
        currency: 'VND',
        value: {
          minValue: parseInt(salaryMatch[1]) * 1000000,
          maxValue: parseInt(salaryMatch[2]) * 1000000
        }
      };
    }
  }

  const jobPostingStructuredData = generateJobPostingStructuredData({
    title: job.title,
    description: job.description.replace(/<[^>]*>/g, ''),
    location: job.location,
    employmentType: job.type.toUpperCase().replace('-', '_'),
    datePosted: '2024-01-01', // You might want to add this to your job data
    validThrough: job.deadline,
    baseSalary
  });

  return (
    <>
      <StructuredData data={jobPostingStructuredData} />
      
      <Breadcrumbs items={breadcrumbItems} />
      
      <main className="min-h-screen bg-white">
        {/* Job Header */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(job.type)}`}>
                  {getJobTypeLabel(job.type)}
                </span>
                <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                  {job.department}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-primary-700 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 2m8-2l2 2m-2-2v10a2 2 0 01-2 2H10a2 2 0 01-2-2V9" />
                  </svg>
                  Hạn nộp: {formatDate(job.deadline)}
                </div>
              </div>
              
              <a
                href={`mailto:${job.applyEmail}?subject=Ứng tuyển vị trí ${job.title}&body=Kính gửi Tesla Media,%0D%0A%0D%0ATôi quan tâm đến vị trí ${job.title} và muốn ứng tuyển.%0D%0A%0D%0AXin cảm ơn!`}
                className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Ứng tuyển ngay
              </a>
            </motion.div>
          </div>
        </section>

        {/* Job Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  {/* Job Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Mô tả công việc
                    </h2>
                    <div 
                      className="prose prose-lg max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Yêu cầu ứng viên
                    </h2>
                    <ul className="space-y-3">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Quyền lợi
                    </h2>
                    <ul className="space-y-3">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {/* Apply Card */}
                  <div className="bg-primary-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Ứng tuyển ngay
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Gửi CV và thư xin việc của bạn qua email để ứng tuyển vị trí này.
                    </p>
                    <a
                      href={`mailto:${job.applyEmail}?subject=Ứng tuyển vị trí ${job.title}&body=Kính gửi Tesla Media,%0D%0A%0D%0ATôi quan tâm đến vị trí ${job.title} và muốn ứng tuyển.%0D%0A%0D%0AXin cảm ơn!`}
                      className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center block"
                    >
                      Gửi CV qua Email
                    </a>
                  </div>

                  {/* Job Info */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Thông tin công việc
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Phòng ban</div>
                        <div className="font-medium text-gray-900">{job.department}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Địa điểm</div>
                        <div className="font-medium text-gray-900">{job.location}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Loại hình</div>
                        <div className="font-medium text-gray-900">{getJobTypeLabel(job.type)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Hạn nộp hồ sơ</div>
                        <div className="font-medium text-gray-900">{formatDate(job.deadline)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Share */}
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Chia sẻ công việc
                    </h3>
                    <div className="flex space-x-3">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://teslamedia.vn/tuyen-dung/${job.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        aria-label="Chia sẻ lên Facebook"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://teslamedia.vn/tuyen-dung/${job.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                        aria-label="Chia sẻ lên LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Jobs */}
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
                Vị trí khác
              </h2>
              <p className="text-lg text-gray-600">
                Khám phá thêm các cơ hội nghề nghiệp tại Tesla Media
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {jobs
                .filter(otherJob => otherJob.id !== job.id)
                .slice(0, 4)
                .map((otherJob, index) => (
                  <motion.div
                    key={otherJob.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(otherJob.type)}`}>
                        {getJobTypeLabel(otherJob.type)}
                      </span>
                      <span className="text-sm text-gray-500">{otherJob.department}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      <Link 
                        href={`/tuyen-dung/${otherJob.slug}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {otherJob.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {otherJob.location} • Hạn nộp: {formatDate(otherJob.deadline)}
                    </p>
                    
                    <Link
                      href={`/tuyen-dung/${otherJob.slug}`}
                      className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
                    >
                      Xem chi tiết →
                    </Link>
                  </motion.div>
                ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/tuyen-dung"
                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                Xem tất cả vị trí tuyển dụng
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
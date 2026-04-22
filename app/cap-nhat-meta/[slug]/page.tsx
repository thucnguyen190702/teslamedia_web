import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import metaUpdates from '@/data/meta-updates';
import ImageWithFallback from '@/components/shared/ImageWithFallback';
import { FaCalendar, FaClock, FaArrowLeft, FaFacebook } from 'react-icons/fa';

interface MetaUpdatePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return metaUpdates.map((update) => ({
    slug: update.slug,
  }));
}

export async function generateMetadata({ params }: MetaUpdatePageProps): Promise<Metadata> {
  const update = metaUpdates.find((u) => u.slug === params.slug);

  if (!update) {
    return {
      title: 'Không tìm thấy bài viết',
    };
  }

  return {
    title: update.metaTitle || update.title,
    description: update.metaDescription || update.excerpt,
    keywords: update.tags.join(', '),
    openGraph: {
      title: update.metaTitle || update.title,
      description: update.metaDescription || update.excerpt,
      type: 'article',
      publishedTime: update.publishedDate,
      authors: [update.author.name],
      images: [
        {
          url: update.ogImage || update.thumbnail,
          alt: update.title,
        },
      ],
    },
  };
}

export default function MetaUpdateDetailPage({ params }: MetaUpdatePageProps) {
  const update = metaUpdates.find((u) => u.slug === params.slug);

  if (!update) {
    notFound();
  }

  const formattedDate = new Date(update.publishedDate).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <main className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-primary-500">
                Trang chủ
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/cap-nhat-meta" className="text-gray-600 hover:text-primary-500">
                Cập nhật Meta
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">{update.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link
                href="/cap-nhat-meta"
                className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-600 mb-6 transition-colors duration-200"
              >
                <FaArrowLeft />
                <span>Quay lại danh sách</span>
              </Link>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {update.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                  >
                    {category === 'Cập nhật Meta' && <FaFacebook className="w-3 h-3" />}
                    <span>{category}</span>
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {update.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
                <div className="flex items-center space-x-2">
                  <ImageWithFallback
                    src={update.author.avatar}
                    alt={update.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{update.author.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="w-4 h-4" />
                  <span>{update.readingTime} phút đọc</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="mb-8 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={update.thumbnail}
                  alt={update.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Excerpt */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {update.excerpt}
                </p>
              </div>

              {/* Content */}
              <div
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: update.content }}
              />

              {/* Tags */}
              <div className="border-t border-gray-200 pt-8 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {update.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-12">
                <div className="flex items-start space-x-4">
                  <ImageWithFallback
                    src={update.author.avatar}
                    alt={update.author.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {update.author.name}
                    </h3>
                    <p className="text-gray-600">{update.author.bio}</p>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              {update.relatedPosts && update.relatedPosts.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Bài Viết Liên Quan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {update.relatedPosts.map((relatedSlug) => {
                      const relatedPost = metaUpdates.find((p) => p.slug === relatedSlug);
                      if (!relatedPost) return null;
                      
                      return (
                        <Link
                          key={relatedPost.slug}
                          href={`/cap-nhat-meta/${relatedPost.slug}`}
                          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                        >
                          <ImageWithFallback
                            src={relatedPost.thumbnail}
                            alt={relatedPost.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {relatedPost.excerpt}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Cần Hỗ Trợ Về Facebook Marketing?
                </h3>
                <p className="text-lg mb-6 text-blue-50">
                  Liên hệ với Tesla Media để được tư vấn và hỗ trợ tối ưu chiến dịch quảng cáo của bạn.
                </p>
                <Link
                  href="/lien-he"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                >
                  Liên Hệ Ngay
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

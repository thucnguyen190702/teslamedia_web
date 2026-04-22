import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import BlogCard from '@/components/shared/BlogCard';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import OptimizedImage from '@/components/shared/OptimizedImage';
import InternalLinks from '@/components/shared/InternalLinks';
import { generateMetadata as generateSEOMetadata, StructuredData, generateArticleStructuredData, generateBreadcrumbStructuredData } from '@/components/shared/SEO';
import { BreadcrumbItem } from '@/lib/types';
import { findRelevantLinks } from '@/lib/internal-links';
import { FaFacebook, FaTwitter, FaLinkedin, FaClock, FaCalendar, FaShare } from 'react-icons/fa';

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Bài viết không tồn tại | Tesla Media',
      description: 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
    };
  }

  return generateSEOMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags.join(', '),
    canonicalUrl: `https://teslamedia.vn/blog/${post.slug}`,
    ogImage: post.ogImage,
    ogType: 'article'
  });
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const relatedPosts = blogPosts
    .filter((p) => 
      p.id !== post.id && 
      (p.categories.some(cat => post.categories.includes(cat)) ||
       p.tags.some(tag => post.tags.includes(tag)))
    )
    .slice(0, 3);

  // Get relevant internal links based on post content
  const postContent = `${post.title} ${post.excerpt} ${post.content}`;
  const relevantLinks = findRelevantLinks(postContent, `/blog/${post.slug}`, 4);

  // Generate table of contents from content - COMMENTED OUT
  /*
  const generateTableOfContents = (content: string) => {
    const headingRegex = /<h([2-6])[^>]*>(.*?)<\/h[2-6]>/gi;
    const headings: { level: number; text: string; id: string }[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]*>/g, ''); // Remove HTML tags
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      headings.push({ level, text, id });
    }

    return headings;
  };

  const tableOfContents = generateTableOfContents(post.content);
  const showTableOfContents = tableOfContents.length > 3;
  */

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Social share URLs
  const shareUrl = `https://teslamedia.vn/blog/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);

  const socialShareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  };

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title, href: `/blog/${post.slug}` }
  ];

  // Structured data
  const articleStructuredData = generateArticleStructuredData({
    title: post.title,
    description: post.excerpt,
    author: post.author.name,
    publishedDate: post.publishedDate,
    updatedDate: post.updatedDate,
    image: `https://teslamedia.vn${post.ogImage}`,
    url: shareUrl
  });

  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Trang chủ', url: 'https://teslamedia.vn/' },
    { name: 'Blog', url: 'https://teslamedia.vn/blog' },
    { name: post.title, url: shareUrl }
  ]);

  return (
    <>
      <StructuredData data={articleStructuredData} />
      <StructuredData data={breadcrumbStructuredData} />
      
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="min-h-screen bg-gray-50 pt-4">
        <article className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-8">
              {/* Categories */}
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/blog?category=${encodeURIComponent(category)}`}
                      className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 mb-6">
                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <OptimizedImage
                      src={post.author.avatar}
                      alt={`${post.author.name} - Tác giả bài viết`}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{post.author.name}</p>
                    <p className="text-sm text-gray-500">{post.author.bio}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center space-x-2">
                  <FaCalendar className="w-4 h-4" />
                  <time dateTime={post.publishedDate}>
                    {formatDate(post.publishedDate)}
                  </time>
                </div>

                {/* Reading Time */}
                <div className="flex items-center space-x-2">
                  <FaClock className="w-4 h-4" />
                  <span>{post.readingTime} phút đọc</span>
                </div>
              </div>

              {/* Featured Image */}
              {post.thumbnail && (
                <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8 bg-gray-200">
                  <OptimizedImage
                    src={post.thumbnail}
                    alt={`Hình ảnh minh họa cho bài viết: ${post.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 896px"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Removed grid layout for table of contents */}
            {/* <div className={`grid grid-cols-1 ${showTableOfContents ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-8`}> */}
              {/* Main Content */}
              {/* <div className={`${showTableOfContents ? 'lg:col-span-8' : 'lg:col-span-12'}`}> */}
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                  {/* Article Content */}
                  <div 
                    className="prose prose-lg max-w-none 
                      prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
                      prose-h2:text-2xl prose-h3:text-xl 
                      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                      prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-ul:my-4 prose-ul:text-gray-700 prose-ul:list-disc prose-ul:pl-6
                      prose-ol:my-4 prose-ol:text-gray-700 prose-ol:list-decimal prose-ol:pl-6
                      prose-li:text-gray-700 prose-li:mb-2
                      prose-img:rounded-lg prose-img:shadow-md"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <Link
                            key={index}
                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Share */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaShare className="w-5 h-5 mr-2" />
                      Chia sẻ bài viết
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={socialShareUrls.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaFacebook className="w-4 h-4" />
                        <span>Facebook</span>
                      </a>
                      <a
                        href={socialShareUrls.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-sky-500 transition-colors"
                      >
                        <FaTwitter className="w-4 h-4" />
                        <span>Twitter</span>
                      </a>
                      <a
                        href={socialShareUrls.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        <FaLinkedin className="w-4 h-4" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Contents Sidebar - COMMENTED OUT */}
              {/* {showTableOfContents && (
                <aside className="lg:col-span-4 order-first lg:order-last">
                  <div className="lg:sticky lg:top-24 mb-8 lg:mb-0">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                        📋 Mục lục
                      </h3>
                      <nav className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                        {tableOfContents.map((heading, index) => (
                          <a
                            key={index}
                            href={`#${heading.id}`}
                            className={`block text-sm py-2 px-2 rounded hover:bg-primary-50 hover:text-primary-600 transition-colors leading-snug ${
                              heading.level === 2
                                ? 'font-semibold text-gray-900'
                                : heading.level === 3
                                ? 'ml-4 text-gray-700'
                                : 'ml-8 text-gray-600'
                            }`}
                          >
                            {heading.text}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </aside>
              )} */}
            {/* </div> */}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Bài viết liên quan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </section>
            )}

            {/* Internal Links */}
            {relevantLinks.length > 0 && (
              <section className="mt-12">
                <InternalLinks 
                  links={relevantLinks}
                  title="Dịch vụ liên quan"
                  variant="card"
                />
              </section>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
import { Metadata } from 'next';
import { blogPosts } from '@/data/blog-posts';
import BlogCard from '@/components/shared/BlogCard';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { generateMetadata as generateSEOMetadata, StructuredData, generateBreadcrumbStructuredData } from '@/components/shared/SEO';
import { BreadcrumbItem } from '@/lib/types';

// Generate metadata for SEO
export const metadata: Metadata = generateSEOMetadata({
  title: 'Blog Digital Marketing - Kiến thức SEO & Website',
  description: 'Blog chuyên sâu về Digital Marketing, SEO, thiết kế website và xu hướng marketing online mới nhất từ chuyên gia Tesla Media.',
  keywords: 'blog digital marketing, kiến thức seo, thiết kế website, content marketing, social media marketing',
  canonicalUrl: 'https://teslamedia.vn/blog',
  ogType: 'website'
});

// Pagination configuration
const POSTS_PER_PAGE = 9;

interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
    tag?: string;
  };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = parseInt(searchParams.page || '1');
  const selectedCategory = searchParams.category;
  const selectedTag = searchParams.tag;

  // Filter posts by category and tag
  let filteredPosts = [...blogPosts];
  
  if (selectedCategory) {
    filteredPosts = filteredPosts.filter(post => 
      post.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
    );
  }
  
  if (selectedTag) {
    filteredPosts = filteredPosts.filter(post => 
      post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
    );
  }

  // Sort posts by published date (newest first)
  filteredPosts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  // Pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Get unique categories and tags for sidebar
  const allCategories = Array.from(new Set(blogPosts.flatMap(post => post.categories)));
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));
  
  // Get popular posts (by reading time - shorter posts are more popular)
  const popularPosts = [...blogPosts]
    .sort((a, b) => a.readingTime - b.readingTime)
    .slice(0, 5);

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Blog', href: '/blog' }
  ];

  // Structured data for breadcrumbs
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Trang chủ', url: 'https://teslamedia.vn/' },
    { name: 'Blog', url: 'https://teslamedia.vn/blog' }
  ]);

  return (
    <>
      <StructuredData data={breadcrumbStructuredData} />
      
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog Digital Marketing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá kiến thức chuyên sâu về Digital Marketing, SEO, thiết kế website 
              và các xu hướng marketing online mới nhất
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filter Info */}
              {(selectedCategory || selectedTag) && (
                <div className="mb-6 p-4 bg-primary-50 rounded-lg">
                  <p className="text-primary-700">
                    {selectedCategory && `Danh mục: ${selectedCategory}`}
                    {selectedCategory && selectedTag && ' | '}
                    {selectedTag && `Tag: ${selectedTag}`}
                    <span className="ml-2 text-gray-600">
                      ({totalPosts} bài viết)
                    </span>
                  </p>
                </div>
              )}

              {/* Blog Posts Grid */}
              {currentPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {currentPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2">
                      {/* Previous Button */}
                      {currentPage > 1 && (
                        <a
                          href={`/blog?page=${currentPage - 1}${selectedCategory ? `&category=${selectedCategory}` : ''}${selectedTag ? `&tag=${selectedTag}` : ''}`}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Trước
                        </a>
                      )}

                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <a
                          key={page}
                          href={`/blog?page=${page}${selectedCategory ? `&category=${selectedCategory}` : ''}${selectedTag ? `&tag=${selectedTag}` : ''}`}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            page === currentPage
                              ? 'bg-primary-500 text-white'
                              : 'bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </a>
                      ))}

                      {/* Next Button */}
                      {currentPage < totalPages && (
                        <a
                          href={`/blog?page=${currentPage + 1}${selectedCategory ? `&category=${selectedCategory}` : ''}${selectedTag ? `&tag=${selectedTag}` : ''}`}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Tiếp
                        </a>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    Không tìm thấy bài viết nào phù hợp với bộ lọc của bạn.
                  </p>
                  <a
                    href="/blog"
                    className="inline-block mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Xem tất cả bài viết
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Categories */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Danh mục
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="/blog"
                      className={`block px-3 py-2 rounded-lg transition-colors ${
                        !selectedCategory
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Tất cả
                    </a>
                    {allCategories.map((category) => (
                      <a
                        key={category}
                        href={`/blog?category=${encodeURIComponent(category)}`}
                        className={`block px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <a
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTag === tag
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        #{tag}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Popular Posts */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Bài viết phổ biến
                  </h3>
                  <div className="space-y-4">
                    {popularPosts.map((post) => (
                      <a
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="block group"
                      >
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {new Date(post.publishedDate).toLocaleDateString('vi-VN')}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
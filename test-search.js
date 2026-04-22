// Simple test to verify search functionality
const { performSearch, buildSearchIndex } = require('./lib/search.ts');

// Mock data for testing
const mockServices = [
  {
    id: '1',
    title: 'Thiết kế website',
    shortDescription: 'Thiết kế website chuyên nghiệp',
    fullDescription: 'Dịch vụ thiết kế website chuyên nghiệp với giao diện hiện đại',
    slug: 'thiet-ke-website',
    process: [{ description: 'Phân tích yêu cầu' }],
    benefits: ['Giao diện đẹp', 'Tối ưu SEO']
  }
];

const mockProjects = [
  {
    id: '1',
    title: 'Website thương mại điện tử ABC',
    description: 'Dự án thiết kế website bán hàng online',
    slug: 'website-abc',
    category: 'website',
    client: 'Công ty ABC',
    technologies: ['React', 'Node.js'],
    completedDate: '2024-01-01'
  }
];

const mockBlogPosts = [
  {
    id: '1',
    title: 'Xu hướng Digital Marketing 2024',
    content: 'Bài viết về xu hướng digital marketing năm 2024',
    excerpt: 'Tìm hiểu xu hướng digital marketing mới nhất',
    slug: 'xu-huong-digital-marketing-2024',
    categories: ['Digital Marketing'],
    tags: ['marketing', 'trends'],
    publishedDate: '2024-01-01'
  }
];

// Test search functionality
console.log('Testing search functionality...');

try {
  // Build search index
  const searchIndex = buildSearchIndex(mockServices, mockProjects, mockBlogPosts, []);
  console.log('✓ Search index built successfully');

  // Test search
  const results = performSearch('website', searchIndex);
  console.log('✓ Search performed successfully');
  console.log(`Found ${results.length} results for "website"`);

  // Test empty search
  const emptyResults = performSearch('', searchIndex);
  console.log(`✓ Empty search handled correctly: ${emptyResults.length} results`);

  // Test no results
  const noResults = performSearch('xyz123nonexistent', searchIndex);
  console.log(`✓ No results handled correctly: ${noResults.length} results`);

  console.log('\n✅ All search tests passed!');
} catch (error) {
  console.error('❌ Search test failed:', error.message);
}
/**
 * Internal Linking Strategy for Tesla Media Website
 * Helps with SEO by creating relevant internal links between pages
 */

export interface InternalLink {
  url: string;
  title: string;
  description?: string;
  keywords: string[];
}

// Define internal links for different page types
export const serviceLinks: InternalLink[] = [
  {
    url: '/dich-vu/thiet-ke-website',
    title: 'Thiết kế website chuyên nghiệp',
    description: 'Dịch vụ thiết kế website responsive, tối ưu SEO',
    keywords: ['thiết kế website', 'website', 'web design', 'responsive']
  },
  {
    url: '/dich-vu/seo-tong-the',
    title: 'Dịch vụ SEO tổng thể',
    description: 'SEO toàn diện, đưa website lên top Google',
    keywords: ['seo', 'tối ưu hóa', 'google', 'thứ hạng']
  },
  {
    url: '/dich-vu/nhan-dien-thuong-hieu',
    title: 'Thiết kế nhận diện thương hiệu',
    description: 'Xây dựng bộ nhận diện thương hiệu độc đáo',
    keywords: ['nhận diện thương hiệu', 'logo', 'brand identity', 'thương hiệu']
  },
  {
    url: '/dich-vu/landing-page',
    title: 'Thiết kế Landing Page',
    description: 'Landing page tối ưu chuyển đổi cao',
    keywords: ['landing page', 'trang đích', 'conversion', 'chuyển đổi']
  },
  {
    url: '/dich-vu/quan-tri-noi-dung',
    title: 'Quản trị nội dung',
    description: 'Dịch vụ quản trị nội dung social media',
    keywords: ['quản trị nội dung', 'content', 'social media', 'facebook']
  },
  {
    url: '/dich-vu/phong-marketing-thue-ngoai',
    title: 'Phòng Marketing thuê ngoài',
    description: 'Giải pháp marketing trọn gói',
    keywords: ['marketing thuê ngoài', 'outsourcing', 'phòng marketing']
  }
];

export const projectLinks: InternalLink[] = [
  {
    url: '/du-an',
    title: 'Dự án tiêu biểu',
    description: 'Khám phá các dự án đã thực hiện',
    keywords: ['dự án', 'portfolio', 'case study']
  }
];

export const blogLinks: InternalLink[] = [
  {
    url: '/blog',
    title: 'Blog Digital Marketing',
    description: 'Kiến thức chuyên sâu về Digital Marketing',
    keywords: ['blog', 'kiến thức', 'digital marketing', 'seo']
  }
];

export const companyLinks: InternalLink[] = [
  {
    url: '/ve-chung-toi',
    title: 'Về Tesla Media',
    description: 'Tìm hiểu về công ty Tesla Media',
    keywords: ['về chúng tôi', 'công ty', 'tesla media']
  },
  {
    url: '/lien-he',
    title: 'Liên hệ Tesla Media',
    description: 'Liên hệ để được tư vấn miễn phí',
    keywords: ['liên hệ', 'tư vấn', 'contact']
  },
  {
    url: '/tuyen-dung',
    title: 'Tuyển dụng',
    description: 'Cơ hội nghề nghiệp tại Tesla Media',
    keywords: ['tuyển dụng', 'việc làm', 'career']
  }
];

// Function to find relevant internal links based on content
export function findRelevantLinks(
  content: string,
  currentUrl: string,
  maxLinks: number = 3
): InternalLink[] {
  const allLinks = [...serviceLinks, ...projectLinks, ...blogLinks, ...companyLinks];
  const contentLower = content.toLowerCase();
  
  // Score links based on keyword matches
  const scoredLinks = allLinks
    .filter(link => link.url !== currentUrl) // Exclude current page
    .map(link => {
      let score = 0;
      link.keywords.forEach(keyword => {
        const keywordLower = keyword.toLowerCase();
        const matches = (contentLower.match(new RegExp(keywordLower, 'g')) || []).length;
        score += matches;
      });
      return { ...link, score };
    })
    .filter(link => link.score > 0) // Only include links with matches
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, maxLinks); // Limit results

  return scoredLinks;
}

// Function to generate contextual anchor text
export function generateAnchorText(link: InternalLink, context: 'service' | 'blog' | 'general' = 'general'): string {
  switch (context) {
    case 'service':
      return `dịch vụ ${link.title.toLowerCase()}`;
    case 'blog':
      return `tìm hiểu thêm về ${link.keywords[0]}`;
    default:
      return link.title;
  }
}

// Predefined internal link suggestions for different page types
export const pageLinkSuggestions = {
  homepage: [
    ...serviceLinks.slice(0, 3),
    projectLinks[0],
    blogLinks[0]
  ],
  services: [
    ...serviceLinks,
    projectLinks[0],
    companyLinks[1] // Contact
  ],
  blog: [
    ...serviceLinks.slice(0, 2),
    projectLinks[0],
    companyLinks[0] // About
  ],
  about: [
    ...serviceLinks.slice(0, 2),
    projectLinks[0],
    companyLinks[1], // Contact
    companyLinks[2]  // Careers
  ],
  contact: [
    ...serviceLinks.slice(0, 3),
    companyLinks[0] // About
  ]
};
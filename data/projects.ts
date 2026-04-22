import { Project } from '@/lib/types';

/**
 * Hardcoded Projects Data
 * Tesla Media Clone Website
 * 
 * Sample projects across all 6 categories
 */

export const projects: Project[] = [
  // Website Category
  {
    id: 'vinamilk-website',
    slug: 'vinamilk-website',
    title: 'Website Vinamilk - Nền tảng thương mại điện tử',
    category: 'website',
    thumbnail: '/images/projects/vinamilk-thumb.jpg',
    images: [
      '/images/projects/vinamilk-1.jpg',
      '/images/projects/vinamilk-2.jpg',
      '/images/projects/vinamilk-3.jpg'
    ],
    client: 'Vinamilk',
    description: 'Thiết kế và phát triển website thương mại điện tử cho Vinamilk với hệ thống quản lý sản phẩm phức tạp, tích hợp thanh toán online và hệ thống CRM. Website được tối ưu SEO và đạt chuẩn Core Web Vitals với tốc độ tải trang dưới 2 giây.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    completedDate: '2024-03-15',
    metaTitle: 'Dự án Website Vinamilk | Tesla Media',
    metaDescription: 'Website thương mại điện tử Vinamilk - Nền tảng bán hàng online hiện đại, tối ưu SEO và trải nghiệm người dùng.'
  },
  {
    id: 'fpt-shop',
    slug: 'fpt-shop',
    title: 'FPT Shop - Website bán lẻ điện tử',
    category: 'website',
    thumbnail: '/images/projects/fpt-shop-thumb.jpg',
    images: [
      '/images/projects/fpt-shop-1.jpg',
      '/images/projects/fpt-shop-2.jpg'
    ],
    client: 'FPT Retail',
    description: 'Nâng cấp toàn diện website FPT Shop với focus vào performance và conversion rate. Tích hợp hệ thống so sánh sản phẩm, đánh giá khách hàng và chatbot AI hỗ trợ tư vấn 24/7.',
    technologies: ['React', 'Redux', 'Material-UI', 'Express.js', 'MongoDB'],
    completedDate: '2024-02-20',
    metaTitle: 'Dự án FPT Shop Website | Tesla Media',
    metaDescription: 'Website bán lẻ điện tử FPT Shop - Nền tảng mua sắm online với trải nghiệm tuyệt vời và tốc độ nhanh.'
  },
  {
    id: 'viettel-store',
    slug: 'viettel-store',
    title: 'Viettel Store - Portal dịch vụ viễn thông',
    category: 'website',
    thumbnail: '/images/projects/viettel-store-thumb.jpg',
    images: [
      '/images/projects/viettel-store-1.jpg',
      '/images/projects/viettel-store-2.jpg',
      '/images/projects/viettel-store-3.jpg'
    ],
    client: 'Viettel Telecom',
    description: 'Xây dựng portal dịch vụ viễn thông tích hợp đăng ký gói cước, thanh toán hóa đơn, tra cứu thông tin và chăm sóc khách hàng. Hệ thống xử lý hàng triệu giao dịch mỗi tháng.',
    technologies: ['Vue.js', 'Nuxt.js', 'Vuetify', 'Laravel', 'MySQL'],
    completedDate: '2024-01-10',
    metaTitle: 'Dự án Viettel Store Portal | Tesla Media',
    metaDescription: 'Portal dịch vụ viễn thông Viettel Store - Giải pháp quản lý và thanh toán dịch vụ trực tuyến.'
  },

  // Branding Category
  {
    id: 'highlands-coffee-rebrand',
    slug: 'highlands-coffee-rebrand',
    title: 'Highlands Coffee - Tái định vị thương hiệu',
    category: 'branding',
    thumbnail: '/images/projects/highlands-rebrand-thumb.jpg',
    images: [
      '/images/projects/highlands-rebrand-1.jpg',
      '/images/projects/highlands-rebrand-2.jpg',
      '/images/projects/highlands-rebrand-3.jpg',
      '/images/projects/highlands-rebrand-4.jpg'
    ],
    client: 'Highlands Coffee',
    description: 'Dự án tái định vị thương hiệu Highlands Coffee với bộ nhận diện mới hiện đại, trẻ trung hơn nhưng vẫn giữ được giá trị truyền thống. Bao gồm thiết kế logo mới, bảng màu, typography và ứng dụng trên toàn bộ hệ thống cửa hàng.',
    technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Brand Strategy'],
    completedDate: '2023-12-05',
    metaTitle: 'Dự án Rebrand Highlands Coffee | Tesla Media',
    metaDescription: 'Tái định vị thương hiệu Highlands Coffee - Bộ nhận diện hiện đại, trẻ trung và ấn tượng.'
  },
  {
    id: 'vingroup-identity',
    slug: 'vingroup-identity',
    title: 'Vingroup - Hệ thống nhận diện tập đoàn',
    category: 'branding',
    thumbnail: '/images/projects/vingroup-identity-thumb.jpg',
    images: [
      '/images/projects/vingroup-identity-1.jpg',
      '/images/projects/vingroup-identity-2.jpg'
    ],
    client: 'Vingroup',
    description: 'Xây dựng hệ thống nhận diện thương hiệu thống nhất cho toàn tập đoàn Vingroup và các công ty con. Brand Guideline chi tiết 200+ trang với hướng dẫn sử dụng cho mọi trường hợp.',
    technologies: ['Adobe Creative Suite', 'Brand Architecture', 'Design System'],
    completedDate: '2023-11-20',
    metaTitle: 'Dự án Brand Identity Vingroup | Tesla Media',
    metaDescription: 'Hệ thống nhận diện thương hiệu Vingroup - Brand Guideline toàn diện cho tập đoàn.'
  },
  {
    id: 'momo-brand',
    slug: 'momo-brand',
    title: 'MoMo - Bộ nhận diện ví điện tử',
    category: 'branding',
    thumbnail: '/images/projects/momo-brand-thumb.jpg',
    images: [
      '/images/projects/momo-brand-1.jpg',
      '/images/projects/momo-brand-2.jpg',
      '/images/projects/momo-brand-3.jpg'
    ],
    client: 'MoMo',
    description: 'Thiết kế bộ nhận diện thương hiệu cho ứng dụng ví điện tử MoMo với focus vào sự thân thiện, tin cậy và hiện đại. Bao gồm logo, mascot, icon set và motion graphics.',
    technologies: ['Illustrator', 'After Effects', 'Figma', 'Brand Design'],
    completedDate: '2023-10-15',
    metaTitle: 'Dự án MoMo Brand Identity | Tesla Media',
    metaDescription: 'Bộ nhận diện thương hiệu MoMo - Thiết kế thân thiện, hiện đại cho ví điện tử hàng đầu.'
  },

  // Landing Page Category
  {
    id: 'shopee-campaign',
    slug: 'shopee-campaign',
    title: 'Shopee 9.9 - Landing page siêu sale',
    category: 'landing-page',
    thumbnail: '/images/projects/shopee-99-thumb.jpg',
    images: [
      '/images/projects/shopee-99-1.jpg',
      '/images/projects/shopee-99-2.jpg'
    ],
    client: 'Shopee Vietnam',
    description: 'Landing page cho chiến dịch Shopee 9.9 Super Shopping Day với thiết kế bắt mắt, animation ấn tượng và tối ưu conversion rate. Đạt 2.5 triệu lượt truy cập trong 3 ngày với tỷ lệ chuyển đổi 8.5%.',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Google Analytics'],
    completedDate: '2024-09-01',
    metaTitle: 'Landing Page Shopee 9.9 Campaign | Tesla Media',
    metaDescription: 'Landing page chiến dịch Shopee 9.9 - Thiết kế ấn tượng, tối ưu chuyển đổi cao.'
  },
  {
    id: 'lazada-sale',
    slug: 'lazada-sale',
    title: 'Lazada - Landing page Black Friday',
    category: 'landing-page',
    thumbnail: '/images/projects/lazada-bf-thumb.jpg',
    images: [
      '/images/projects/lazada-bf-1.jpg',
      '/images/projects/lazada-bf-2.jpg',
      '/images/projects/lazada-bf-3.jpg'
    ],
    client: 'Lazada Vietnam',
    description: 'Landing page Black Friday với countdown timer, flash sale section và gamification elements. Tích hợp Facebook Pixel và Google Ads tracking để tối ưu chiến dịch marketing.',
    technologies: ['React', 'GSAP', 'Styled Components', 'Firebase'],
    completedDate: '2023-11-15',
    metaTitle: 'Landing Page Lazada Black Friday | Tesla Media',
    metaDescription: 'Landing page Black Friday Lazada - Thiết kế hấp dẫn với gamification và tối ưu ads.'
  },
  {
    id: 'tiki-landing',
    slug: 'tiki-landing',
    title: 'Tiki - Landing page ra mắt sản phẩm',
    category: 'landing-page',
    thumbnail: '/images/projects/tiki-launch-thumb.jpg',
    images: [
      '/images/projects/tiki-launch-1.jpg',
      '/images/projects/tiki-launch-2.jpg'
    ],
    client: 'Tiki Corporation',
    description: 'Landing page ra mắt dòng sản phẩm mới với video hero section, product showcase và pre-order form. Đạt 50,000 đơn đặt trước trong tuần đầu tiên.',
    technologies: ['Vue.js', 'Nuxt.js', 'SCSS', 'Netlify'],
    completedDate: '2024-04-10',
    metaTitle: 'Landing Page Tiki Product Launch | Tesla Media',
    metaDescription: 'Landing page ra mắt sản phẩm Tiki - Thu hút 50K đơn đặt trước trong tuần đầu.'
  },

  // Digital Product Category
  {
    id: 'banking-app',
    slug: 'banking-app',
    title: 'VPBank - Mobile Banking App',
    category: 'digital-product',
    thumbnail: '/images/projects/vpbank-app-thumb.jpg',
    images: [
      '/images/projects/vpbank-app-1.jpg',
      '/images/projects/vpbank-app-2.jpg',
      '/images/projects/vpbank-app-3.jpg'
    ],
    client: 'VPBank',
    description: 'Thiết kế UX/UI cho ứng dụng mobile banking với focus vào bảo mật và trải nghiệm người dùng. Tích hợp sinh trắc học, chuyển tiền nhanh và quản lý tài chính thông minh.',
    technologies: ['React Native', 'Redux', 'Firebase', 'Biometric Auth'],
    completedDate: '2024-02-28',
    metaTitle: 'VPBank Mobile Banking App | Tesla Media',
    metaDescription: 'Ứng dụng mobile banking VPBank - UX/UI hiện đại, bảo mật cao và tiện lợi.'
  },
  {
    id: 'food-delivery-app',
    slug: 'food-delivery-app',
    title: 'GrabFood - App đặt đồ ăn',
    category: 'digital-product',
    thumbnail: '/images/projects/grabfood-app-thumb.jpg',
    images: [
      '/images/projects/grabfood-app-1.jpg',
      '/images/projects/grabfood-app-2.jpg'
    ],
    client: 'Grab Vietnam',
    description: 'Redesign ứng dụng GrabFood với cải thiện user flow, tăng tốc độ đặt hàng và personalization. Tỷ lệ hoàn thành đơn hàng tăng 25% sau khi ra mắt phiên bản mới.',
    technologies: ['Flutter', 'Dart', 'Google Maps API', 'Push Notifications'],
    completedDate: '2023-12-20',
    metaTitle: 'GrabFood App Redesign | Tesla Media',
    metaDescription: 'Redesign ứng dụng GrabFood - Cải thiện UX, tăng 25% tỷ lệ hoàn thành đơn hàng.'
  },

  // Content Creator Category
  {
    id: 'cocacola-fanpage',
    slug: 'cocacola-fanpage',
    title: 'Coca-Cola - Quản trị Fanpage',
    category: 'content-creator',
    thumbnail: '/images/projects/cocacola-fanpage-thumb.jpg',
    images: [
      '/images/projects/cocacola-fanpage-1.jpg',
      '/images/projects/cocacola-fanpage-2.jpg',
      '/images/projects/cocacola-fanpage-3.jpg'
    ],
    client: 'Coca-Cola Vietnam',
    description: 'Quản trị nội dung fanpage Coca-Cola Vietnam với 5 triệu followers. Sản xuất content đa dạng từ video viral, infographic đến campaign tương tác. Engagement rate trung bình 12%.',
    technologies: ['Content Strategy', 'Adobe Premiere', 'Photoshop', 'Social Media Management'],
    completedDate: '2024-03-30',
    metaTitle: 'Coca-Cola Fanpage Management | Tesla Media',
    metaDescription: 'Quản trị fanpage Coca-Cola - 5M followers, engagement rate 12%, content viral.'
  },
  {
    id: 'samsung-content',
    slug: 'samsung-content',
    title: 'Samsung - Content Marketing',
    category: 'content-creator',
    thumbnail: '/images/projects/samsung-content-thumb.jpg',
    images: [
      '/images/projects/samsung-content-1.jpg',
      '/images/projects/samsung-content-2.jpg'
    ],
    client: 'Samsung Vietnam',
    description: 'Chiến dịch content marketing cho dòng sản phẩm Galaxy S24 với video review, unboxing và user-generated content. Đạt 10 triệu views trên TikTok và YouTube.',
    technologies: ['Video Production', 'TikTok Marketing', 'Influencer Collaboration'],
    completedDate: '2024-01-25',
    metaTitle: 'Samsung Content Marketing Campaign | Tesla Media',
    metaDescription: 'Chiến dịch content Samsung Galaxy S24 - 10M views trên TikTok và YouTube.'
  },
  {
    id: 'grab-social',
    slug: 'grab-social',
    title: 'Grab - Social Media Strategy',
    category: 'content-creator',
    thumbnail: '/images/projects/grab-social-thumb.jpg',
    images: [
      '/images/projects/grab-social-1.jpg',
      '/images/projects/grab-social-2.jpg',
      '/images/projects/grab-social-3.jpg'
    ],
    client: 'Grab Vietnam',
    description: 'Xây dựng chiến lược social media đa nền tảng cho Grab với content calendar 3 tháng, campaign viral và community management. Tăng 40% followers trong 6 tháng.',
    technologies: ['Social Media Strategy', 'Content Calendar', 'Community Management'],
    completedDate: '2023-11-30',
    metaTitle: 'Grab Social Media Strategy | Tesla Media',
    metaDescription: 'Chiến lược social media Grab - Tăng 40% followers, engagement cao, viral campaigns.'
  },

  // Other Category
  {
    id: 'startup-marketing',
    slug: 'startup-marketing',
    title: 'Startup X - Phòng Marketing thuê ngoài',
    category: 'other',
    thumbnail: '/images/projects/startup-marketing-thumb.jpg',
    images: [
      '/images/projects/startup-marketing-1.jpg',
      '/images/projects/startup-marketing-2.jpg'
    ],
    client: 'Startup X',
    description: 'Cung cấp dịch vụ phòng marketing trọn gói cho startup công nghệ từ giai đoạn seed. Bao gồm brand identity, website, content marketing và performance ads. Giúp startup tăng trưởng từ 0 đến 100K users trong 12 tháng.',
    technologies: ['Full Marketing Stack', 'Growth Hacking', 'Performance Marketing'],
    completedDate: '2024-04-15',
    metaTitle: 'Startup Marketing Outsourcing | Tesla Media',
    metaDescription: 'Phòng marketing thuê ngoài cho startup - Tăng trưởng từ 0 đến 100K users trong 12 tháng.'
  },
  {
    id: 'ecommerce-seo',
    slug: 'ecommerce-seo',
    title: 'E-commerce Store - SEO tổng thể',
    category: 'other',
    thumbnail: '/images/projects/ecommerce-seo-thumb.jpg',
    images: [
      '/images/projects/ecommerce-seo-1.jpg',
      '/images/projects/ecommerce-seo-2.jpg',
      '/images/projects/ecommerce-seo-3.jpg'
    ],
    client: 'Fashion E-commerce',
    description: 'Dự án SEO tổng thể cho website thương mại điện tử thời trang. Tăng organic traffic từ 5K lên 150K/tháng trong 8 tháng. 200+ từ khóa lên top 3 Google.',
    technologies: ['SEO Strategy', 'Technical SEO', 'Content SEO', 'Link Building'],
    completedDate: '2024-03-01',
    metaTitle: 'E-commerce SEO Project | Tesla Media',
    metaDescription: 'Dự án SEO thương mại điện tử - Tăng traffic từ 5K lên 150K/tháng, 200+ từ khóa top 3.'
  },
  {
    id: 'corporate-seo',
    slug: 'corporate-seo',
    title: 'Corporate Website - SEO B2B',
    category: 'other',
    thumbnail: '/images/projects/corporate-seo-thumb.jpg',
    images: [
      '/images/projects/corporate-seo-1.jpg',
      '/images/projects/corporate-seo-2.jpg'
    ],
    client: 'Tech Corporation',
    description: 'Chiến dịch SEO B2B cho website doanh nghiệp công nghệ. Focus vào long-tail keywords và content marketing. Tăng 300% qualified leads từ organic search.',
    technologies: ['B2B SEO', 'Content Marketing', 'Technical Optimization'],
    completedDate: '2023-12-10',
    metaTitle: 'Corporate B2B SEO Project | Tesla Media',
    metaDescription: 'SEO B2B cho doanh nghiệp công nghệ - Tăng 300% qualified leads từ organic search.'
  }
];


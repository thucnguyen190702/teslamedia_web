# Trang Cập Nhật Meta

## Cấu trúc trang

### Trang chính
- `/cap-nhat-meta` - Danh sách tất cả bài viết cập nhật Meta

### Các trang con (detail pages)

Tất cả các trang con được tạo tự động từ data trong `data/meta-updates.ts` thông qua dynamic routing `[slug]`.

#### Danh sách các bài viết:

1. **Cập Nhật Meta Q1 2024**
   - URL: `/cap-nhat-meta/cap-nhat-meta-q1-2024-thay-doi-chinh-sach-quang-cao`
   - Nội dung: Thay đổi chính sách quảng cáo, thuật toán và tính năng mới

2. **Meta AI Creative Tools 2024**
   - URL: `/cap-nhat-meta/meta-ai-creative-tools-2024-cong-cu-tao-quang-cao`
   - Nội dung: Công cụ AI tạo quảng cáo tự động

3. **Facebook Advantage+ 2024**
   - URL: `/cap-nhat-meta/facebook-advantage-plus-2024-tu-dong-hoa-quang-cao`
   - Nội dung: Tự động hóa quảng cáo với AI

4. **Instagram Reels Algorithm 2024**
   - URL: `/cap-nhat-meta/instagram-reels-algorithm-2024-cach-tang-reach`
   - Nội dung: Thuật toán Instagram Reels và cách tăng reach

## Cách thêm bài viết mới

1. Mở file `data/meta-updates.ts`
2. Thêm object mới vào array `metaUpdates` với cấu trúc:
   ```typescript
   {
     id: 'unique-id',
     slug: 'url-slug',
     title: 'Tiêu đề bài viết',
     excerpt: 'Mô tả ngắn',
     content: `HTML content`,
     thumbnail: '/images/blog/thumbnail.jpg',
     author: authors.adminMeta,
     publishedDate: '2024-MM-DD',
     categories: ['Cập nhật Meta'],
     tags: ['tag1', 'tag2'],
     readingTime: 10,
     relatedPosts: [],
     metaTitle: 'SEO Title',
     metaDescription: 'SEO Description',
     ogImage: '/images/blog/og-image.jpg'
   }
   ```
3. Trang chi tiết sẽ được tạo tự động tại `/cap-nhat-meta/[slug]`
4. Cập nhật sitemap tại `public/sitemap.xml` nếu cần

## Tính năng

- ✅ Dynamic routing với Next.js App Router
- ✅ Static generation cho SEO tốt
- ✅ Metadata động cho mỗi bài viết
- ✅ Breadcrumb navigation
- ✅ Author bio
- ✅ Tags và categories
- ✅ Related posts (có thể mở rộng)
- ✅ CTA section
- ✅ Responsive design
- ✅ Accessibility compliant

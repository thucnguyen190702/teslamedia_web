# Danh Sách Các Trang Cập Nhật Meta

## Trang Chính
- **URL**: `/cap-nhat-meta`
- **File**: `app/cap-nhat-meta/page.tsx`
- **Mô tả**: Trang danh sách hiển thị tất cả bài viết cập nhật Meta

---

## Các Trang Con (Detail Pages)

### 1. Cập Nhật Meta Q1 2024
- **URL**: `/cap-nhat-meta/cap-nhat-meta-q1-2024-thay-doi-chinh-sach-quang-cao`
- **Tiêu đề**: Cập Nhật Meta Q1 2024: Thay Đổi Chính Sách Quảng Cáo & Tính Năng Mới
- **Ngày đăng**: 01/04/2024
- **Thời gian đọc**: 10 phút
- **Nội dung**: 
  - Thay đổi chính sách quảng cáo
  - Cập nhật thuật toán News Feed và Ads
  - Tính năng mới: Meta Verified, AI Creative Tools
  - Cập nhật về Instagram
  - Thay đổi về báo cáo & analytics
- **Bài viết liên quan**:
  - Meta AI Creative Tools 2024
  - Facebook Advantage+ 2024

---

### 2. Meta AI Creative Tools 2024
- **URL**: `/cap-nhat-meta/meta-ai-creative-tools-2024-cong-cu-tao-quang-cao`
- **Tiêu đề**: Meta AI Creative Tools 2024: Công Cụ AI Tạo Quảng Cáo Tự Động
- **Ngày đăng**: 25/03/2024
- **Thời gian đọc**: 12 phút
- **Nội dung**:
  - AI Background Generator
  - AI Text Variations
  - AI Image Enhancement
  - AI Video Editing
  - Advantage+ Creative
  - AI-Powered Product Recommendations
  - Hướng dẫn sử dụng và best practices
- **Bài viết liên quan**:
  - Cập Nhật Meta Q1 2024
  - Facebook Advantage+ 2024

---

### 3. Facebook Advantage+ 2024
- **URL**: `/cap-nhat-meta/facebook-advantage-plus-2024-tu-dong-hoa-quang-cao`
- **Tiêu đề**: Facebook Advantage+ 2024: Tự Động Hóa Quảng Cáo Với AI
- **Ngày đăng**: 15/03/2024
- **Thời gian đọc**: 10 phút
- **Nội dung**:
  - Giới thiệu Advantage+ Campaigns
  - Advantage+ Shopping Campaigns
  - Advantage+ App Campaigns
  - Lợi ích: tiết kiệm thời gian, giảm chi phí, tăng performance
  - Cách thiết lập campaign
  - Best practices
  - So sánh với Manual Campaigns
- **Bài viết liên quan**:
  - Cập Nhật Meta Q1 2024
  - Meta AI Creative Tools 2024

---

### 4. Instagram Reels Algorithm 2024
- **URL**: `/cap-nhat-meta/instagram-reels-algorithm-2024-cach-tang-reach`
- **Tiêu đề**: Instagram Reels Algorithm 2024: Cách Tăng Reach Và Viral
- **Ngày đăng**: 10/03/2024
- **Thời gian đọc**: 11 phút
- **Nội dung**:
  - Thuật toán Instagram Reels 2024
  - Các yếu tố thuật toán ưu tiên
  - Chiến lược tăng reach
  - Loại nội dung viral
  - Thời điểm đăng tối ưu
  - Tránh các sai lầm
  - Công cụ hỗ trợ
  - Case study thành công
- **Bài viết liên quan**:
  - Cập Nhật Meta Q1 2024
  - Meta AI Creative Tools 2024

---

## Cấu Trúc Kỹ Thuật

### Dynamic Routing
- Sử dụng Next.js App Router với dynamic segment `[slug]`
- File: `app/cap-nhat-meta/[slug]/page.tsx`
- Static generation với `generateStaticParams()`

### Data Source
- File: `data/meta-updates.ts`
- Export: `metaUpdates` array
- Type: `BlogPost[]` từ `@/lib/types`

### SEO
- Dynamic metadata với `generateMetadata()`
- Open Graph tags
- Structured data (có thể thêm)
- Sitemap entries trong `public/sitemap.xml`

### Features
- ✅ Breadcrumb navigation
- ✅ Author bio
- ✅ Tags display
- ✅ Reading time
- ✅ Related posts section
- ✅ CTA section
- ✅ Responsive design
- ✅ Image fallback handling
- ✅ Back to list button

---

## Cách Test

### Test Local
```bash
npm run dev
```

Truy cập:
- http://localhost:3000/cap-nhat-meta
- http://localhost:3000/cap-nhat-meta/cap-nhat-meta-q1-2024-thay-doi-chinh-sach-quang-cao
- http://localhost:3000/cap-nhat-meta/meta-ai-creative-tools-2024-cong-cu-tao-quang-cao
- http://localhost:3000/cap-nhat-meta/facebook-advantage-plus-2024-tu-dong-hoa-quang-cao
- http://localhost:3000/cap-nhat-meta/instagram-reels-algorithm-2024-cach-tang-reach

### Test Build
```bash
npm run build
npm run start
```

### Test 404
Truy cập URL không tồn tại:
- http://localhost:3000/cap-nhat-meta/bai-viet-khong-ton-tai

Sẽ hiển thị trang 404 (Next.js `notFound()`)

---

## Maintenance

### Thêm Bài Viết Mới
1. Mở `data/meta-updates.ts`
2. Thêm object mới vào array `metaUpdates`
3. Cập nhật `public/sitemap.xml`
4. Rebuild site

### Cập Nhật Bài Viết
1. Tìm bài viết trong `data/meta-updates.ts` theo `id` hoặc `slug`
2. Chỉnh sửa nội dung
3. Rebuild site

### Xóa Bài Viết
1. Xóa object khỏi array trong `data/meta-updates.ts`
2. Xóa entry khỏi `public/sitemap.xml`
3. Rebuild site

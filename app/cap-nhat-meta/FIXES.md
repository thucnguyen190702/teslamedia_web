# Các Sửa Lỗi Cho Trang Cập Nhật Meta

## Ngày: 2024-04-21

### Vấn Đề 1: Link Bài Viết Mở Sai
**Mô tả**: Khi click vào các bài viết cập nhật Meta, link đang mở `/blog/[slug]` thay vì `/cap-nhat-meta/[slug]`

**Nguyên nhân**: Component `BlogCard` hardcode basePath là `/blog`

**Giải pháp**:
- Thêm prop `basePath` vào `BlogCard` component
- Mặc định `basePath = '/blog'` để không ảnh hưởng các trang khác
- Truyền `basePath="/cap-nhat-meta"` khi sử dụng trong trang cập nhật Meta

**Files đã sửa**:
1. `components/shared/BlogCard.tsx`
   - Thêm prop `basePath?: string` vào interface
   - Thay đổi từ `href={`/blog/${post.slug}`}` thành `href={`${basePath}/${post.slug}`}`
   - Set default value: `basePath = '/blog'`

2. `app/cap-nhat-meta/page.tsx`
   - Thêm prop `basePath="/cap-nhat-meta"` khi render BlogCard
   - Code: `<BlogCard key={update.id} post={update} basePath="/cap-nhat-meta" />`

**Kết quả**: 
- ✅ Link bài viết Meta giờ mở đúng `/cap-nhat-meta/[slug]`
- ✅ Các trang blog khác không bị ảnh hưởng (vẫn dùng `/blog/[slug]`)

---

### Vấn Đề 2: Giao Diện Bị Che Khuất Bởi Header
**Mô tả**: Nội dung trang bị đẩy lên cao và bị che khuất bởi fixed header

**Nguyên nhân**: 
- Header có `position: fixed` với `top-0`
- Các trang không có padding-top để tránh bị che

**Giải pháp**:
- Thêm `pt-16 lg:pt-20` vào main element
- `pt-16` = 64px cho mobile (header height 64px)
- `lg:pt-20` = 80px cho desktop (header height 80px)

**Files đã sửa**:
1. `app/cap-nhat-meta/page.tsx`
   - Thay đổi: `<main className="min-h-screen bg-gray-50">`
   - Thành: `<main className="min-h-screen bg-gray-50 pt-16 lg:pt-20">`

2. `app/cap-nhat-meta/[slug]/page.tsx`
   - Thay đổi: `<main className="min-h-screen bg-gray-50">`
   - Thành: `<main className="min-h-screen bg-gray-50 pt-16 lg:pt-20">`

**Kết quả**:
- ✅ Nội dung không bị che bởi header
- ✅ Hero section hiển thị đầy đủ
- ✅ Breadcrumb không bị che
- ✅ Responsive trên cả mobile và desktop

---

## Testing

### Test Link
1. Truy cập: http://localhost:3000/cap-nhat-meta
2. Click vào bất kỳ bài viết nào
3. Kiểm tra URL: Phải là `/cap-nhat-meta/[slug]` chứ không phải `/blog/[slug]`

### Test Padding
1. Truy cập: http://localhost:3000/cap-nhat-meta
2. Kiểm tra hero section có bị che bởi header không
3. Scroll xuống và kiểm tra các section khác
4. Test trên mobile (responsive)

### Test Trang Chi Tiết
1. Truy cập: http://localhost:3000/cap-nhat-meta/cap-nhat-meta-q1-2024-thay-doi-chinh-sach-quang-cao
2. Kiểm tra breadcrumb có bị che không
3. Kiểm tra nội dung hiển thị đầy đủ
4. Test related posts links

---

## Backward Compatibility

### Các trang không bị ảnh hưởng:
- ✅ `/blog` - Vẫn dùng basePath mặc định `/blog`
- ✅ `/blog/[slug]` - Related posts vẫn link đúng
- ✅ `/dich-vu/[slug]` - Related blog posts vẫn link đúng
- ✅ Home page - BlogSection vẫn hoạt động bình thường

### Lý do:
- `basePath` có default value là `/blog`
- Chỉ trang cập nhật Meta truyền `basePath="/cap-nhat-meta"`
- Các trang khác không truyền prop này nên dùng default

---

## Notes

### Về Padding-Top
- Trang home không cần padding-top vì HeroSection có `min-h-screen`
- Các trang có Breadcrumbs không cần padding-top vì Breadcrumbs đã tạo khoảng cách
- Chỉ các trang không có Breadcrumbs và bắt đầu bằng hero section cần padding-top

### Về BlogCard Component
- Component giờ linh hoạt hơn, có thể dùng cho nhiều loại content
- Có thể mở rộng cho các section khác trong tương lai (ví dụ: case studies, tutorials)
- Maintain backward compatibility hoàn toàn

---

## Checklist

- [x] Sửa link bài viết
- [x] Thêm padding-top cho trang chính
- [x] Thêm padding-top cho trang chi tiết
- [x] Test trên desktop
- [x] Test trên mobile
- [x] Kiểm tra backward compatibility
- [x] Kiểm tra TypeScript errors
- [x] Update documentation

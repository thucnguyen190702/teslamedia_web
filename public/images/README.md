# Hướng dẫn sử dụng thư mục Images

## Cấu trúc thư mục

```
public/images/
├── hero/              # Ảnh banner, hero section
├── services/          # Ảnh dịch vụ
├── projects/          # Ảnh dự án
├── blog/              # Ảnh blog posts
├── team/              # Ảnh đội ngũ
├── partners/          # Logo đối tác
├── testimonials/      # Ảnh khách hàng
├── about/             # Ảnh về công ty
└── icons/             # Icon, logo
```

## Quy tắc đặt tên file

### 1. Sử dụng chữ thường và dấu gạch ngang
- ✅ `hero-banner-home.jpg`
- ❌ `HeroBannerHome.jpg`

### 2. Tên file mô tả rõ ràng
- ✅ `service-website-design.jpg`
- ❌ `img1.jpg`

### 3. Thêm kích thước nếu có nhiều version
- `logo-small.png` (dưới 100px)
- `logo-medium.png` (100-500px)
- `logo-large.png` (trên 500px)

### 4. Thêm @2x cho Retina display
- `icon-facebook.png`
- `icon-facebook@2x.png`

## Định dạng file khuyến nghị

### Ảnh thông thường
- **JPG/JPEG**: Ảnh có nhiều màu sắc (photos, banners)
- **PNG**: Ảnh cần nền trong suốt (logos, icons)
- **WebP**: Định dạng hiện đại, dung lượng nhỏ (khuyến nghị)

### Icon & Logo
- **SVG**: Vector, scale tốt (khuyến nghị cho icon)
- **PNG**: Raster với nền trong suốt

## Tối ưu hóa ảnh

### Kích thước khuyến nghị
- **Hero/Banner**: 1920x1080px (Full HD)
- **Thumbnail Blog**: 800x600px
- **Logo**: 200x200px
- **Icon**: 64x64px hoặc 128x128px
- **Project Images**: 1200x800px

### Dung lượng
- Hero/Banner: < 500KB
- Thumbnail: < 200KB
- Logo/Icon: < 50KB

### Tools tối ưu
- [TinyPNG](https://tinypng.com/) - Nén PNG/JPG
- [Squoosh](https://squoosh.app/) - Nén và convert
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Tối ưu SVG

## Cách sử dụng trong code

### Next.js Image Component (Khuyến nghị)
```tsx
import Image from 'next/image';

<Image
  src="/images/hero/banner-home.jpg"
  alt="Tesla Media Banner"
  width={1920}
  height={1080}
  priority
/>
```

### HTML img tag
```html
<img 
  src="/images/services/website-design.jpg" 
  alt="Thiết kế website"
  loading="lazy"
/>
```

### CSS Background
```css
.hero {
  background-image: url('/images/hero/banner-home.jpg');
}
```

## Checklist trước khi upload

- [ ] Tên file rõ ràng, dễ hiểu
- [ ] Đã tối ưu dung lượng
- [ ] Kích thước phù hợp
- [ ] Có alt text mô tả
- [ ] Đúng thư mục
- [ ] Định dạng phù hợp (JPG/PNG/WebP/SVG)

## Ví dụ cụ thể

### Hero Section
```
/hero/
  ├── banner-home.jpg
  ├── banner-about.jpg
  ├── banner-services.jpg
  └── banner-contact.jpg
```

### Services
```
/services/
  ├── website-design.jpg
  ├── branding.jpg
  ├── seo.jpg
  ├── landing-page.jpg
  └── content-management.jpg
```

### Blog
```
/blog/
  ├── 2024-01-digital-marketing-trends.jpg
  ├── 2024-02-seo-tips.jpg
  └── 2024-03-social-media-strategy.jpg
```

### Partners/Logos
```
/partners/
  ├── vinamilk-logo.png
  ├── fpt-logo.png
  ├── viettel-logo.png
  └── samsung-logo.png
```

## Lưu ý bảo mật

- ❌ Không upload ảnh có thông tin nhạy cảm
- ❌ Không upload ảnh có bản quyền chưa được phép
- ✅ Sử dụng ảnh free hoặc đã mua bản quyền
- ✅ Credit nguồn ảnh nếu cần thiết

## Resources ảnh miễn phí

- [Unsplash](https://unsplash.com/)
- [Pexels](https://www.pexels.com/)
- [Pixabay](https://pixabay.com/)
- [Freepik](https://www.freepik.com/)

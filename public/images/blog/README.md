# Blog Images

## Required Images for Meta Updates

### Main Thumbnails
- `meta-update-q1-2024.jpg` - Cập nhật Meta Q1 2024
- `meta-ai-tools-2024.jpg` - Meta AI Creative Tools
- `advantage-plus-2024.jpg` - Facebook Advantage+
- `instagram-reels-2024.jpg` - Instagram Reels Algorithm

### OG Images (for social sharing)
- `meta-update-q1-2024-og.jpg`
- `meta-ai-tools-2024-og.jpg`
- `advantage-plus-2024-og.jpg`
- `instagram-reels-2024-og.jpg`

## Image Specifications

### Thumbnails
- Size: 1200x630px (16:9 ratio)
- Format: JPG or WebP
- Quality: 80-90%
- Max file size: 200KB

### OG Images
- Size: 1200x630px (Facebook/Twitter standard)
- Format: JPG
- Quality: 85%
- Max file size: 300KB

## Fallback Behavior

If images are not found, the system will automatically use:
- `/images/icons/Logo-tesla.png` as fallback

This is handled by the `ImageWithFallback` component.

## Adding New Images

1. Create/download the image
2. Optimize it (use tools like TinyPNG, Squoosh)
3. Save to this directory with the correct filename
4. Update the data file if needed (`data/meta-updates.ts`)

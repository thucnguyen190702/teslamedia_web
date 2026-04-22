# Author Images

## Required Images

### Meta Updates Author
- `tesla-team.jpg` - Tesla Media Team avatar

### Blog Authors
- `nguyen-van-a.jpg`
- `tran-thi-b.jpg`
- `le-van-c.jpg`

## Image Specifications

- Size: 200x200px (square)
- Format: JPG or WebP
- Quality: 85%
- Max file size: 50KB

## Fallback Behavior

If author images are not found, the system will automatically:
1. Try to load from the specified path
2. Fall back to `/images/icons/Logo-tesla.png`
3. Or show initials in a colored circle (in BlogCard component)

This is handled by the `ImageWithFallback` component.

## Adding New Author Images

1. Create/download a square profile photo
2. Crop to 200x200px
3. Optimize the image
4. Save to this directory
5. Update the author data in `data/blog-posts.ts` or `data/meta-updates.ts`

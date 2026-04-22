# Error Fixes - Console Log Issues

## Date: 2024-04-21

### Error: Event handlers cannot be passed to Client Component props

**Error Message**:
```
Event handlers cannot be passed to Client Component props.
  <img src=... alt=... className=... onError={function onError}>
                                             ^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
```

**Root Cause**:
- File `app/cap-nhat-meta/[slug]/page.tsx` is a Server Component (default in Next.js 13+ App Router)
- Server Components cannot have event handlers like `onError`, `onClick`, etc.
- The page was using `<img>` tags with `onError` handlers for fallback images

**Solution**:
Created a new Client Component `ImageWithFallback` to handle image loading with fallback.

### Files Created

#### 1. `components/shared/ImageWithFallback.tsx`
```typescript
'use client';

import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc = '/images/icons/Logo-tesla.png'
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
```

**Key Features**:
- ✅ Client Component (can use event handlers)
- ✅ State management for image source
- ✅ Automatic fallback on error
- ✅ Customizable fallback image
- ✅ Reusable across the app

### Files Modified

#### 1. `app/cap-nhat-meta/[slug]/page.tsx`

**Changes**:
- Added import: `import ImageWithFallback from '@/components/shared/ImageWithFallback';`
- Replaced all `<img>` tags with `<ImageWithFallback>` component
- Removed all `onError` handlers

**Locations Changed**:
1. Author avatar in meta info section
2. Featured image
3. Author bio avatar
4. Related posts thumbnails

**Before**:
```tsx
<img
  src={update.author.avatar}
  alt={update.author.name}
  className="w-10 h-10 rounded-full object-cover"
  onError={(e) => {
    e.currentTarget.src = '/images/icons/Logo-tesla.png';
  }}
/>
```

**After**:
```tsx
<ImageWithFallback
  src={update.author.avatar}
  alt={update.author.name}
  className="w-10 h-10 rounded-full object-cover"
/>
```

#### 2. `components/shared/index.ts`

**Changes**:
- Added export: `export { default as ImageWithFallback } from './ImageWithFallback';`

### Additional Files Created

#### Documentation
1. `public/images/blog/README.md` - Guide for blog images
2. `public/images/authors/README.md` - Guide for author images
3. `.gitkeep` files to preserve directory structure

### Testing

#### Test Cases
1. ✅ Page loads without console errors
2. ✅ Images load correctly when files exist
3. ✅ Fallback works when images don't exist
4. ✅ No hydration errors
5. ✅ Server-side rendering works
6. ✅ Client-side navigation works

#### How to Test
```bash
# 1. Start dev server
npm run dev

# 2. Visit pages
http://localhost:3000/cap-nhat-meta
http://localhost:3000/cap-nhat-meta/cap-nhat-meta-q1-2024-thay-doi-chinh-sach-quang-cao

# 3. Check browser console
# Should see no React errors
# May see 404 for images (expected if images don't exist)

# 4. Build for production
npm run build

# Should complete without errors
```

### Benefits

1. **Clean Separation of Concerns**
   - Server Components for data fetching and SEO
   - Client Components for interactivity

2. **Reusability**
   - `ImageWithFallback` can be used anywhere in the app
   - Consistent fallback behavior

3. **Performance**
   - Server Components are lighter (no JS sent to client)
   - Only interactive parts are Client Components

4. **Maintainability**
   - Single source of truth for image fallback logic
   - Easy to update fallback behavior

### Future Improvements

1. **Add Loading State**
   ```tsx
   const [isLoading, setIsLoading] = useState(true);
   // Show skeleton while loading
   ```

2. **Add Retry Logic**
   ```tsx
   const [retryCount, setRetryCount] = useState(0);
   // Retry loading image before fallback
   ```

3. **Use Next.js Image Component**
   ```tsx
   import Image from 'next/image';
   // Better optimization and lazy loading
   ```

4. **Add Error Tracking**
   ```tsx
   onError={() => {
     console.error(`Failed to load image: ${src}`);
     // Send to error tracking service
   }}
   ```

### Notes

- This pattern follows Next.js 13+ best practices
- Server Components by default, Client Components when needed
- Maintains SEO benefits while adding interactivity
- No impact on existing pages or components

### Related Issues

- ✅ Fixed: Event handler in Server Component
- ✅ Fixed: Image fallback not working
- ✅ Improved: Component reusability
- ✅ Improved: Code organization

---

## Summary

The error was caused by using event handlers (`onError`) in a Server Component. The solution was to create a dedicated Client Component (`ImageWithFallback`) to handle image loading with fallback behavior. This maintains the benefits of Server Components while adding the necessary interactivity for image error handling.

All console errors related to this issue have been resolved. ✅

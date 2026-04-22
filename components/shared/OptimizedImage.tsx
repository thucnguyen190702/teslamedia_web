'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate descriptive filename if not already descriptive
  const getDescriptiveFilename = (src: string): string => {
    const filename = src.split('/').pop()?.split('.')[0] || '';
    // If filename is not descriptive (like 'img1', 'photo', etc.), it should be renamed
    const nonDescriptivePatterns = /^(img|image|photo|pic|picture)\d*$/i;
    if (nonDescriptivePatterns.test(filename)) {
      console.warn(`Non-descriptive filename detected: ${filename}. Consider renaming to be more descriptive for SEO.`);
    }
    return filename;
  };

  // Validate alt text
  const validateAltText = (alt: string): void => {
    if (!alt || alt.trim().length === 0) {
      console.error('Alt text is required for accessibility and SEO');
    }
    if (alt.length > 125) {
      console.warn('Alt text is quite long. Consider keeping it under 125 characters for better accessibility.');
    }
    // Check for redundant phrases
    const redundantPhrases = ['image of', 'picture of', 'photo of', 'graphic of'];
    const hasRedundantPhrase = redundantPhrases.some(phrase => 
      alt.toLowerCase().includes(phrase)
    );
    if (hasRedundantPhrase) {
      console.warn('Alt text contains redundant phrases. Screen readers already announce it as an image.');
    }
  };

  // Validate on mount
  if (process.env.NODE_ENV === 'development') {
    validateAltText(alt);
    getDescriptiveFilename(src);
  }

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Fallback image for errors
  if (hasError) {
    return (
      <div className={`bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center ${className}`}>
        <div className="text-center text-blue-400 p-4">
          <svg className="w-10 h-10 mx-auto mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    quality,
    onLoad: handleLoad,
    onError: handleError,
    className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    placeholder,
    ...(blurDataURL && { blurDataURL }),
    ...(sizes && { sizes }),
    ...(priority && { priority: true })
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width}
      height={height}
    />
  );
}

// Utility function to generate blur data URL for placeholder
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) return '';
  
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create a simple gradient blur placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}

// Common image sizes for responsive images
export const imageSizes = {
  thumbnail: '(max-width: 768px) 150px, 200px',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  hero: '100vw',
  content: '(max-width: 768px) 100vw, 800px'
};
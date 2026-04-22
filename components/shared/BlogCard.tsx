'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
  basePath?: string; // Add basePath prop to make it flexible
}

function ThumbnailFallback({ title }: { title: string }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <span className="text-white text-sm font-medium text-center line-clamp-3 leading-snug">
        {title}
      </span>
    </div>
  );
}

function AvatarFallback({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(-2)
    .join('')
    .toUpperCase();
  return (
    <div className="w-full h-full bg-blue-600 flex items-center justify-center">
      <span className="text-white text-xs font-bold">{initials}</span>
    </div>
  );
}

export default function BlogCard({ post, variant = 'default', basePath = '/blog' }: BlogCardProps) {
  const [thumbError, setThumbError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isFeatured = variant === 'featured';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group h-full"
    >
      <Link href={`${basePath}/${post.slug}`} className="block h-full">
        <article className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col ${
          isFeatured ? 'md:flex-row' : ''
        }`}>
          {/* Thumbnail */}
          <div className={`relative overflow-hidden flex-shrink-0 ${
            isFeatured ? 'md:w-1/2 aspect-[16/10] md:aspect-auto' : 'aspect-[16/10]'
          }`}>
            {thumbError ? (
              <ThumbnailFallback title={post.title} />
            ) : (
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                onError={() => setThumbError(true)}
              />
            )}
          </div>

          {/* Content */}
          <div className={`p-6 flex flex-col flex-1 ${isFeatured ? 'md:w-1/2' : ''}`}>
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 2).map((category, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className={`font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 ${
              isFeatured ? 'text-xl md:text-2xl' : 'text-lg'
            }`}>
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className={`text-gray-600 mb-4 flex-1 leading-relaxed ${
              isFeatured ? 'line-clamp-4' : 'line-clamp-3'
            }`}>
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
              <div className="flex items-center space-x-3">
                {/* Author Avatar */}
                <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                  {avatarError ? (
                    <AvatarFallback name={post.author.name} />
                  ) : (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                      sizes="28px"
                      onError={() => setAvatarError(true)}
                    />
                  )}
                </div>
                <span className="font-medium truncate max-w-[80px]">{post.author.name}</span>

                {/* Date */}
                <time dateTime={post.publishedDate} className="hidden sm:block">
                  {formatDate(post.publishedDate)}
                </time>
              </div>

              {/* Reading Time */}
              <div className="flex items-center space-x-1 flex-shrink-0">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{post.readingTime} phút</span>
              </div>
            </div>

            {/* Tags (only for featured variant) */}
            {isFeatured && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                {post.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="text-gray-400 text-xs hover:text-blue-600 transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

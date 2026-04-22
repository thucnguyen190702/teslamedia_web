'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BlogCard from '@/components/shared/BlogCard';
import { BlogPost } from '@/lib/types';

interface BlogSectionProps {
  posts: BlogPost[];
  title?: string;
  description?: string;
  limit?: number;
}

export default function BlogSection({
  posts,
  title = "Blog & Tin tức",
  description = "Cập nhật những kiến thức mới nhất về Digital Marketing, xu hướng công nghệ và câu chuyện thành công từ Tesla Media.",
  limit = 6
}: BlogSectionProps) {
  const sortedPosts = posts
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut"
      }
    }
  };

  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: "easeOut"
      }
    }
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <div className="text-center mb-16">
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            >
              {title}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          </div>

          {sortedPosts.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mb-16"
            >
              <BlogCard post={sortedPosts[0]} variant="featured" />
            </motion.div>
          )}

          {sortedPosts.length > 1 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {sortedPosts.slice(1).map((post) => (
                <motion.div
                  key={post.id}
                  variants={gridItemVariants}
                  className="h-full"
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

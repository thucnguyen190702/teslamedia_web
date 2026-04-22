'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import LazyModal from '@/components/ui/LazyModal';
import LazyVideoPlayer from '@/components/home/LazyVideoPlayer';
import Link from 'next/link';

interface AboutSectionProps {
  title: string;
  content: string;
  videoUrl: string;
  videoThumbnail: string;
  stats?: {
    experience: string;
    projects: string;
    clients: string;
  };
}

export default function AboutSection({
  title,
  content,
  videoUrl,
  videoThumbnail,
  stats
}: AboutSectionProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08
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

  const handleVideoPlay = () => {
    setIsVideoModalOpen(true);
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Content */}
          <div className="lg:pr-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {title}
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="prose prose-lg text-gray-600 mb-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Stats */}
            {stats && (
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 mb-8"
              >
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-2">
                    {stats.experience}
                  </div>
                  <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-2">
                    {stats.projects}
                  </div>
                  <div className="text-sm text-gray-600">Dự án hoàn thành</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-2">
                    {stats.clients}
                  </div>
                  <div className="text-sm text-gray-600">Khách hàng tin tưởng</div>
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <Link
                href="/ve-chung-toi"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center justify-center transition-colors duration-200"
              >
                Tìm hiểu thêm về chúng tôi
              </Link>
            </motion.div>
          </div>

          {/* Video */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              {/* Video Thumbnail */}
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${videoThumbnail})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300" />

              {/* Play Button */}
              <button
                onClick={handleVideoPlay}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Phát video"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-opacity-100 transition-all duration-300"
                >
                  <svg
                    className="w-8 h-8 text-primary-600 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </button>

              {/* Video Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black bg-opacity-50 rounded-lg p-4 text-white">
                  <h4 className="font-semibold mb-1">
                    Tesla Media - Hỗ trợ doanh nghiệp mùa Chạy Quảng Cáo ra lợi nhuận
                  </h4>
                  <p className="text-sm text-gray-200">
                    Xem cách chúng tôi đồng hành cùng khách hàng vượt qua khó khăn
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-100 rounded-full opacity-50 -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-50 rounded-full opacity-30 -z-10" />
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <LazyModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Tesla Media - Video giới thiệu"
        size="xl"
      >
        <LazyVideoPlayer
          videoUrl={videoUrl}
          title="Tesla Media Video"
        />
      </LazyModal>
    </section>
  );
}
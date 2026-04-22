'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterTabs from '@/components/shared/FilterTabs';
import ProjectCard from '@/components/shared/ProjectCard';
import { Project, FilterTab } from '@/lib/types';

interface ProjectGalleryProps {
  projects: Project[];
  title?: string;
  description?: string;
  showFilter?: boolean;
  limit?: number;
}

const filterTabs: FilterTab[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'website', label: 'Website' },
  { id: 'branding', label: 'Nhận diện' },
  { id: 'landing-page', label: 'Landing page' },
  { id: 'digital-product', label: 'Sản phẩm số' },
  { id: 'content-creator', label: 'Content creator' },
  { id: 'other', label: 'Khác' }
];

export default function ProjectGallery({
  projects,
  title = "Dự án tiêu biểu",
  description = "Khám phá những dự án đã được Tesla Media triển khai thành công cho các khách hàng trong nhiều lĩnh vực khác nhau.",
  showFilter = true,
  limit
}: ProjectGalleryProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Apply limit if specified
  const displayProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
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

          {/* Filter Tabs */}
          {showFilter && (
            <motion.div
              variants={itemVariants}
              className="mb-12"
            >
              <FilterTabs
                tabs={filterTabs}
                activeTab={activeFilter}
                onChange={handleFilterChange}
              />
            </motion.div>
          )}

          {/* Projects Grid */}
          <motion.div
            variants={gridVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {displayProjects.map((project) => (
                <motion.div
                  key={`${activeFilter}-${project.id}`}
                  variants={projectVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {displayProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Không tìm thấy dự án nào
              </h3>
              <p className="text-gray-600">
                Thử chọn danh mục khác hoặc xem tất cả dự án
              </p>
            </motion.div>
          )}

          {/* View All Button */}
          {limit && filteredProjects.length > limit && (
            <motion.div
              variants={itemVariants}
              className="text-center mt-12"
            >
              <motion.a
                href="/du-an"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Xem tất cả dự án
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          )}

          {/* Project Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-gray-50 rounded-2xl p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-2">
                  {projects.length}
                </div>
                <div className="text-sm text-gray-600">Tổng dự án</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-2">
                  {projects.filter(p => p.category === 'website').length}
                </div>
                <div className="text-sm text-gray-600">Website</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-2">
                  {projects.filter(p => p.category === 'branding').length}
                </div>
                <div className="text-sm text-gray-600">Nhận diện</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-2">
                  {projects.filter(p => p.category === 'landing-page').length}
                </div>
                <div className="text-sm text-gray-600">Landing page</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
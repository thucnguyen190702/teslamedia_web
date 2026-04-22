'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/shared/ProjectCard';
import FilterTabs from '@/components/shared/FilterTabs';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { FilterTab, BreadcrumbItem } from '@/lib/types';

// Filter tabs for project categories
const filterTabs: FilterTab[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'website', label: 'Website' },
  { id: 'branding', label: 'Nhận diện' },
  { id: 'landing-page', label: 'Landing page' },
  { id: 'digital-product', label: 'Sản phẩm số' },
  { id: 'content-creator', label: 'Content creator' },
  { id: 'other', label: 'Khác' }
];

// Breadcrumb items
const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Dự án', href: '/du-an' }
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Handle filter change
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Dự án tiêu biểu
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá những dự án đã được Tesla Media thực hiện thành công cho các khách hàng. 
              Từ thiết kế website, nhận diện thương hiệu đến các chiến dịch marketing sáng tạo.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mb-8">
            <FilterTabs
              tabs={filterTabs}
              activeTab={activeFilter}
              onChange={handleFilterChange}
            />
          </div>

          {/* Projects Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Hiển thị {currentProjects.length} trong tổng số {filteredProjects.length} dự án
              {activeFilter !== 'all' && (
                <span className="ml-2 text-primary-600 font-medium">
                  ({filterTabs.find(tab => tab.id === activeFilter)?.label})
                </span>
              )}
            </p>
          </div>

          {/* Projects Grid */}
          {currentProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Không tìm thấy dự án nào
              </h3>
              <p className="text-gray-600">
                Hiện tại chưa có dự án nào trong danh mục này.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  currentPage === 1
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Trước
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  currentPage === totalPages
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Tiếp
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
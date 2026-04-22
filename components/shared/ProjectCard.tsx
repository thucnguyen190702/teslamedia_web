'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

const categoryLabels: Record<string, string> = {
  website: 'Website',
  branding: 'Nhận diện',
  'landing-page': 'Landing page',
  'digital-product': 'Sản phẩm số',
  'content-creator': 'Content creator',
  other: 'Khác'
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/du-an/${project.slug}`} className="block">
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          {/* Project Thumbnail with Overlay */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white rounded-full p-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {categoryLabels[project.category] || project.category}
              </span>
            </div>
          </div>

          {/* Project Info */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
              {project.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3">
              Khách hàng: <span className="font-medium">{project.client}</span>
            </p>

            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            {project.technologies.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
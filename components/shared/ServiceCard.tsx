'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Service } from '@/lib/types';
import {
  FaCheckCircle,
  FaFacebookMessenger,
  FaHeart,
  FaUserPlus,
  FaDollarSign,
  FaGraduationCap,
  FaHandshake,
  FaLaptopCode,
  FaBoxes,
  FaKey,
} from 'react-icons/fa';

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaCheckCircle,
  FaFacebookMessenger,
  FaHeart,
  FaUserPlus,
  FaDollarSign,
  FaGraduationCap,
  FaHandshake,
  FaLaptopCode,
  FaBoxes,
  FaKey,
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon || 'FaCheckCircle'];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-full border border-gray-100">
        {/* Service Icon */}
        <div className="flex items-center justify-center w-16 h-16 bg-primary-50 rounded-lg mb-4 group-hover:bg-primary-100 transition-colors duration-300">
          {IconComponent && (
            <IconComponent className="text-primary-500 text-3xl" />
          )}
        </div>

        {/* Service Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Service Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Learn More Link */}
        <Link
          href={`/dich-vu/${service.slug}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
        >
          Tìm hiểu thêm
          <svg
            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
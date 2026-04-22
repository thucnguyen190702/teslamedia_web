'use client';

import { motion } from 'framer-motion';
import ServiceCard from '@/components/shared/ServiceCard';
import { Service } from '@/lib/types';

interface ServicesGridProps {
  services: Service[];
  title?: string;
  description?: string;
}

export default function ServicesGrid({
  services,
  title = "Dịch vụ của chúng tôi",
  description = "Tesla Media cung cấp giải pháp Digital Marketing toàn diện, giúp doanh nghiệp tăng trưởng bền vững trong thời đại số."
}: ServicesGridProps) {
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

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {/* Section Header */}
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

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.id}
                variants={gridItemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>

          {/* View All Services Button */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <motion.a
              href="/dich-vu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Xem tất cả dịch vụ
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
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary-50 rounded-full opacity-30 -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-25 rounded-full opacity-20 translate-x-1/2" />
      </div>
    </section>
  );
}
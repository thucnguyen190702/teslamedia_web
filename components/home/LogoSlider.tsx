'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTshirt, 
  FaSpa, 
  FaSprayCan, 
  FaLeaf, 
  FaUtensils, 
  FaBuilding, 
  FaGraduationCap, 
  FaLaptopCode, 
  FaBaby, 
  FaMapMarkerAlt, 
  FaStar, 
  FaVideo 
} from 'react-icons/fa';
import { IconType } from 'react-icons';

interface Logo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  icon: IconType;
}

interface LogoSliderProps {
  title?: string;
  logos?: Logo[];
  speed?: number;
}

const defaultLogos: Logo[] = [
  { src: '/images/logos/shop-thoi-trang.png', alt: 'Shop Thời Trang', width: 120, height: 60, icon: FaTshirt },
  { src: '/images/logos/spa-lam-dep.png', alt: 'Spa & Làm Đẹp', width: 120, height: 60, icon: FaSpa },
  { src: '/images/logos/my-pham.png', alt: 'Mỹ Phẩm', width: 120, height: 60, icon: FaSprayCan },
  { src: '/images/logos/thuc-pham-sach.png', alt: 'Thực Phẩm Sạch', width: 120, height: 60, icon: FaLeaf },
  { src: '/images/logos/nha-hang.png', alt: 'Nhà Hàng & F&B', width: 120, height: 60, icon: FaUtensils },
  { src: '/images/logos/bat-dong-san.png', alt: 'Bất Động Sản', width: 120, height: 60, icon: FaBuilding },
  { src: '/images/logos/khoa-hoc-online.png', alt: 'Khóa Học Online', width: 120, height: 60, icon: FaGraduationCap },
  { src: '/images/logos/digital-agency.png', alt: 'Digital Agency', width: 120, height: 60, icon: FaLaptopCode },
  { src: '/images/logos/shop-me-be.png', alt: 'Shop Mẹ & Bé', width: 120, height: 60, icon: FaBaby },
  { src: '/images/logos/dich-vu-dia-phuong.png', alt: 'Dịch Vụ Địa Phương', width: 120, height: 60, icon: FaMapMarkerAlt },
  { src: '/images/logos/kol-influencer.png', alt: 'KOL & Influencer', width: 120, height: 60, icon: FaStar },
  { src: '/images/logos/livestream-seller.png', alt: 'Livestream Seller', width: 120, height: 60, icon: FaVideo },
];

export default function LogoSlider({
  title = "Đối tác & Khách hàng tin tưởng",
  logos = defaultLogos,
  speed = 30
}: LogoSliderProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

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

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hàng trăm shop online, doanh nghiệp và cá nhân kinh doanh đã tin tưởng Tesla Media để phát triển trên Facebook
            </p>
          </motion.div>

          {/* Logo Slider */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex space-x-12 lg:space-x-16"
              animate={{
                x: isPaused ? undefined : [`0%`, `-${100 / 2}%`]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: speed,
                  ease: "linear"
                }
              }}
            >
              {duplicatedLogos.map((logo, index) => {
                const IconComponent = logo.icon;
                return (
                  <div
                    key={`${logo.alt}-${index}`}
                    className="flex-shrink-0 flex flex-col items-center justify-center h-24 lg:h-28 group min-w-[140px]"
                  >
                    <div className="relative transition-all duration-300 opacity-70 hover:opacity-100">
                      {/* Icon */}
                      <div className="flex items-center justify-center mb-2">
                        <IconComponent 
                          className="w-10 h-10 lg:w-12 lg:h-12 text-primary-600 group-hover:text-primary-700 transition-all duration-300 group-hover:scale-110" 
                        />
                      </div>
                      {/* Text Label */}
                      <div className="text-center">
                        <p className="text-sm lg:text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                          {logo.alt}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Gradient overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
          </motion.div>

          {/* Stats or additional info */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">1.000+</div>
                <div className="text-sm text-gray-600">Khách hàng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Agency đối tác</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">10+</div>
                <div className="text-sm text-gray-600">Ngành hàng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">98%</div>
                <div className="text-sm text-gray-600">Hài lòng</div>
              </div>
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6">
              Bạn muốn trở thành đối tác tiếp theo của chúng tôi?
            </p>
            <motion.a
              href="/lien-he"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Liên hệ hợp tác
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
    </section>
  );
}
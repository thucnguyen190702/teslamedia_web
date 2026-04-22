'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  value: number;
  label: string;
  icon: string;
  suffix?: string;
}

interface StatsSectionProps {
  title?: string;
  description?: string;
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  {
    value: 1000,
    label: 'Dự án hoàn thành',
    icon: '📁',
    suffix: '+'
  },
  {
    value: 100,
    label: 'Chiến dịch thành công',
    icon: '🚀',
    suffix: '+'
  },
  {
    value: 500,
    label: 'Khách hàng tin tưởng',
    icon: '👥',
    suffix: '+'
  },
  {
    value: 200,
    label: 'Đối tác chiến lược',
    icon: '🤝',
    suffix: '+'
  }
];

// Counter component for animated numbers
function AnimatedCounter({ 
  value, 
  suffix = '', 
  duration = 2000 
}: { 
  value: number; 
  suffix?: string; 
  duration?: number; 
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number;
      const startValue = 0;
      const endValue = value;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
        
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsSection({
  title = "Thành tích của chúng tôi",
  description = "Những con số ấn tượng khẳng định uy tín và chất lượng dịch vụ của Tesla Media trong suốt hành trình phát triển.",
  stats = defaultStats
}: StatsSectionProps) {
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

  const statVariants = {
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
    <section className="py-16 lg:py-24 bg-primary-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
            >
              {title}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-primary-100 max-w-3xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          </div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={statVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20">
                  {/* Icon */}
                  <div className="text-4xl lg:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>

                  {/* Number */}
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    duration={1500 + index * 100} 
                  />

                  {/* Label */}
                  <div className="text-white font-semibold mt-3 text-sm lg:text-base">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-2 text-primary-100">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-sm font-medium">
                Cập nhật đến tháng {new Date().toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/2 translate-y-1/2" />
    </section>
  );
}
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPhone, 
  FaDownload, 
  FaComments,
  FaFacebookMessenger
} from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import { companyInfo } from '@/data/company-info';

interface StickyContactBarProps {
  position?: 'left' | 'right';
}

const StickyContactBar: React.FC<StickyContactBarProps> = ({ position = 'right' }) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const contactButtons = [
    {
      id: 'phone',
      label: 'Gọi điện',
      icon: FaPhone,
      href: `tel:${companyInfo.hotline}`,
      bgColor: 'bg-green-500 hover:bg-green-600',
      tooltip: `Gọi ngay ${companyInfo.hotline}`
    },
    {
      id: 'zalo',
      label: 'Zalo',
      icon: FaComment,
      href: companyInfo.socialMedia.zalo,
      bgColor: 'bg-blue-500 hover:bg-blue-600',
      tooltip: 'Chat qua Zalo',
      external: true
    },
    {
      id: 'messenger',
      label: 'Messenger',
      icon: FaFacebookMessenger,
      href: companyInfo.socialMedia.messenger,
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      tooltip: 'Chat qua Messenger',
      external: true
    },
    {
      id: 'live-chat',
      label: 'Live Chat',
      icon: FaComments,
      href: '#',
      bgColor: 'bg-purple-500 hover:bg-purple-600',
      tooltip: 'Chat trực tuyến',
      onClick: () => {
        // Placeholder for live chat integration
        console.log('Open live chat widget');
        alert('Tính năng chat trực tuyến sẽ được tích hợp sớm!');
      }
    },
    {
      id: 'profile-download',
      label: 'Profile',
      icon: FaDownload,
      href: '/profile.pdf',
      bgColor: 'bg-orange-500 hover:bg-orange-600',
      tooltip: 'Tải profile công ty',
      download: true
    }
  ];

  const handleButtonClick = (button: typeof contactButtons[0], e: React.MouseEvent) => {
    if (button.onClick) {
      e.preventDefault();
      button.onClick();
    }
  };

  return (
    <div
      className={`fixed top-1/2 transform -translate-y-1/2 z-40 ${
        position === 'left' ? 'left-4' : 'right-4'
      }`}
    >
      <div className="flex flex-col space-y-3">
        {contactButtons.map((button, index) => {
          const IconComponent = button.icon;
          
          return (
            <div key={button.id} className="relative group">
              <motion.a
                href={button.href}
                target={button.external ? '_blank' : undefined}
                rel={button.external ? 'noopener noreferrer' : undefined}
                download={button.download}
                onClick={(e) => handleButtonClick(button, e)}
                aria-label={button.tooltip}
                className={`
                  flex items-center justify-center w-12 h-12 md:w-14 md:h-14 
                  rounded-full text-white shadow-lg cursor-pointer
                  transition-all duration-300 transform hover:scale-110
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                  min-h-touch min-w-touch
                  ${button.bgColor}
                `}
                initial={{ 
                  x: position === 'left' ? -100 : 100, 
                  opacity: 0 
                }}
                animate={{ 
                  x: 0, 
                  opacity: 1 
                }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: 'easeOut'
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoveredButton(button.id)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredButton === button.id && (
                  <motion.div
                    initial={{ 
                      opacity: 0, 
                      x: position === 'left' ? 10 : -10,
                      scale: 0.8
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      scale: 1
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: position === 'left' ? 10 : -10,
                      scale: 0.8
                    }}
                    transition={{ duration: 0.2 }}
                    className={`
                      absolute top-1/2 transform -translate-y-1/2 z-50
                      ${position === 'left' ? 'left-full ml-3' : 'right-full mr-3'}
                      bg-gray-900 text-white text-sm px-3 py-2 rounded-lg
                      whitespace-nowrap shadow-lg
                      before:absolute before:top-1/2 before:transform before:-translate-y-1/2
                      ${position === 'left' 
                        ? 'before:left-0 before:-ml-1 before:border-r-4 before:border-r-gray-900 before:border-y-4 before:border-y-transparent' 
                        : 'before:right-0 before:-mr-1 before:border-l-4 before:border-l-gray-900 before:border-y-4 before:border-y-transparent'
                      }
                    `}
                  >
                    {button.tooltip}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Mobile-only: Compact version indicator */}
      <div className="md:hidden mt-4">
        <div className="text-xs text-gray-500 text-center">
          Liên hệ
        </div>
      </div>
    </div>
  );
};

export default StickyContactBar;
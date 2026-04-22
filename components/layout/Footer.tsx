'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import { FaFacebookMessenger } from 'react-icons/fa6';
import { companyInfo } from '@/data/company-info';
import { services } from '@/data/services';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    {
      title: 'Dịch vụ',
      links: services.map(service => ({
        label: service.title,
        href: `/dich-vu/${service.slug}`
      }))
    },
    {
      title: 'Công ty',
      links: [
        { label: 'Về chúng tôi', href: '/ve-chung-toi' },
        { label: 'Dự án tiêu biểu', href: '/du-an' },
        { label: 'Blog & Tin tức', href: '/blog' },
        { label: 'Tuyển dụng', href: '/tuyen-dung' }
      ]
    },
    {
      title: 'Hỗ trợ',
      links: [
        { label: 'Liên hệ', href: '/lien-he' },
        { label: 'Hỗ trợ khách hàng', href: '/ho-tro-khach-hang' },
        { label: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat' },
        { label: 'Điều khoản sử dụng', href: '/dieu-khoan-su-dung' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white" id="footer">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/icons/Logo-tesla.png" 
                  alt="Tesla Media Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold">Tesla Media</span>
            </div>
            
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-4 h-4 mt-1 text-primary-400 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{companyInfo.address}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaPhone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a 
                  href={`tel:${companyInfo.hotline}`}
                  className="text-sm hover:text-primary-400 transition-colors duration-200"
                >
                  {companyInfo.hotline}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="text-sm hover:text-primary-400 transition-colors duration-200"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs text-gray-400 mb-2">Mã số thuế: {companyInfo.taxId}</p>
            </div>
          </div>

          {/* Navigation Links */}
          {navigationLinks.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-200 block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Kết nối với chúng tôi:</span>
              <div className="flex space-x-3">
                <a
                  href={companyInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a
                  href={companyInfo.socialMedia.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-200"
                  aria-label="Zalo"
                >
                  <FaComment className="w-4 h-4" />
                </a>
                <a
                  href={companyInfo.socialMedia.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                  aria-label="Messenger"
                >
                  <FaFacebookMessenger className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © {currentYear} {companyInfo.name}. Tất cả quyền được bảo lưu.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Thiết kế và phát triển bởi Tesla Media
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
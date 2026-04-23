'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaSearch, FaHome, FaServicestack, FaNewspaper, FaBell, FaEnvelope } from 'react-icons/fa';
import { services } from '@/data/services';
import SearchBar from '@/components/shared/SearchBar';

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Close search and dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isSearchOpen && !target.closest('.search-container')) {
        setIsSearchOpen(false);
      }
      if (isServicesDropdownOpen && !target.closest('.services-dropdown-container')) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, isServicesDropdownOpen]);

  const navigationItems = [
    { label: 'Trang chủ', href: '/', icon: FaHome },
    // { label: 'Về chúng tôi', href: '/ve-chung-toi', icon: FaInfoCircle },
    {
      label: 'Dịch vụ',
      href: '/dich-vu',
      icon: FaServicestack,
      hasDropdown: true,
      dropdownItems: services.map(service => ({
        label: service.title,
        href: `/dich-vu/${service.slug}`
      }))
    },
    // { label: 'Dự án', href: '/du-an' },
    { label: 'Cập nhật Meta', href: '/cap-nhat-meta', icon: FaBell },
    { label: 'Blog', href: '/blog', icon: FaNewspaper },
    // { label: 'Tuyển dụng', href: '/tuyen-dung' },
    { label: 'Liên hệ', href: '/lien-he', icon: FaEnvelope }
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent && !isScrolled
            ? 'bg-transparent'
            : 'bg-white shadow-md backdrop-blur-sm'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        id="main-navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/images/icons/Logo-tesla.png"
                  alt="Tesla Media Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">Tesla Media</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative search-container">
                {isSearchOpen ? (
                  <div className="w-80">
                    <SearchBar placeholder="Tìm kiếm..." />
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-50 transition-colors duration-200 min-h-touch min-w-touch focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label="Mở tìm kiếm"
                  >
                    <FaSearch className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Navigation Menu */}
              <nav className="flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <div key={item.href} className="relative group">
                    {item.hasDropdown ? (
                      <div
                        className="relative services-dropdown-container"
                        onMouseEnter={() => setIsServicesDropdownOpen(true)}
                        onMouseLeave={() => setIsServicesDropdownOpen(false)}
                      >
                        <button
                          onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                          className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 min-h-touch focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${isActiveLink(item.href)
                              ? 'text-primary-500 bg-primary-50'
                              : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                            }`}
                          aria-expanded={isServicesDropdownOpen}
                          aria-haspopup="true"
                        >
                          <span>{item.label}</span>
                          <FaChevronDown className="w-3 h-3" />
                        </button>

                        {/* Services Dropdown */}
                        <AnimatePresence>
                          {isServicesDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                              role="menu"
                              aria-label="Dịch vụ"
                            >
                              {item.dropdownItems?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  prefetch={true}
                                  role="menuitem"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-colors duration-200 min-h-touch focus:outline-none focus:bg-primary-50 focus:text-primary-500"
                                >
                                  {dropdownItem.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        prefetch={true}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 min-h-touch focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${isActiveLink(item.href)
                            ? 'text-primary-500 bg-primary-50'
                            : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                          }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-50 transition-colors duration-200 min-h-touch min-w-touch focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="absolute top-0 right-0 w-80 max-w-full h-full bg-white shadow-xl" id="mobile-menu">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src="/images/icons/Logo-tesla.png"
                        alt="Tesla Media Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-lg font-bold text-gray-900">Tesla Media</span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-50 min-h-touch min-w-touch focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label="Đóng menu"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                {/* Search Bar Section */}
                <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                  <SearchBar placeholder="Tìm kiếm..." />
                </div>

                {/* Navigation */}
                <nav className="overflow-y-auto flex-1 flex flex-col bg-gray-50" role="navigation" aria-label="Menu chính">
                  {navigationItems.map((item) => (
                    <React.Fragment key={item.href}>
                      {item.hasDropdown ? (
                        <div className="services-dropdown-container w-full">
                          <button
                            onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                            className={`w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium transition-colors duration-200 border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 ${isActiveLink(item.href)
                                ? 'text-primary-500 bg-primary-50'
                                : 'text-gray-700 bg-gray-50 hover:bg-white hover:text-primary-500'
                              }`}
                            aria-expanded={isServicesDropdownOpen}
                            aria-controls="mobile-services-menu"
                          >
                            <div className="flex items-center space-x-3">
                              {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                              <span>{item.label}</span>
                            </div>
                            <svg 
                              className="w-5 h-5 text-gray-400" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>

                          <AnimatePresence>
                            {isServicesDropdownOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden bg-white flex flex-col"
                                id="mobile-services-menu"
                                role="menu"
                                aria-label="Dịch vụ"
                              >
                                <div className="max-h-[35vh] overflow-y-auto">
                                  {item.dropdownItems?.map((dropdownItem, index) => (
                                    <Link
                                      key={dropdownItem.href}
                                      href={dropdownItem.href}
                                      prefetch={true}
                                      role="menuitem"
                                      className={`block w-full px-5 pl-12 py-3 text-left text-sm text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-colors duration-200 focus:outline-none focus:bg-primary-50 focus:text-primary-500 ${index < item.dropdownItems!.length - 1 ? 'border-b border-gray-200' : 'border-b border-gray-200'}`}
                                    >
                                      {dropdownItem.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          prefetch={true}
                          className={`w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium transition-colors duration-200 border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 ${isActiveLink(item.href)
                              ? 'text-primary-500 bg-primary-50'
                              : 'text-gray-700 bg-gray-50 hover:bg-white hover:text-primary-500'
                            }`}
                        >
                          <div className="flex items-center space-x-3">
                            {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                            <span>{item.label}</span>
                          </div>
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                  
                  {/* Spacer to push social icons to bottom */}
                  <div className="flex-1 min-h-[20px] bg-gray-50"></div>
                  
                  {/* Social Icons */}
                  <div className="flex items-center space-x-4 px-5 py-6 bg-gray-50 border-t border-gray-200 mt-auto">
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary-500 transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary-500 transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a 
                      href="mailto:contact@teslamedia.vn" 
                      className="text-gray-500 hover:text-primary-500 transition-colors"
                      aria-label="Email"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
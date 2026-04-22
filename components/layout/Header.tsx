'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaSearch, FaHome, FaInfoCircle, FaServicestack, FaNewspaper, FaBell, FaEnvelope } from 'react-icons/fa';
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
    { label: 'Về chúng tôi', href: '/ve-chung-toi', icon: FaInfoCircle },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent && !isScrolled
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
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 min-h-touch focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                          isActiveLink(item.href)
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
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 min-h-touch focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                        isActiveLink(item.href)
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
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
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

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4" role="navigation" aria-label="Menu chính">
                  {/* Search Link for Mobile */}
                  <Link
                    href="/tim-kiem"
                    prefetch={true}
                    className={`flex items-center space-x-3 px-4 py-3 text-base font-medium transition-colors duration-200 min-h-touch focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      pathname === '/tim-kiem'
                        ? 'text-primary-500 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                    }`}
                  >
                    <FaSearch className="w-5 h-5" />
                    <span>Tìm kiếm</span>
                  </Link>

                  {navigationItems.map((item) => (
                    <div key={item.href}>
                      {item.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-left text-base font-medium transition-colors duration-200 min-h-touch focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                              isActiveLink(item.href)
                                ? 'text-primary-500 bg-primary-50'
                                : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                            }`}
                            aria-expanded={isServicesDropdownOpen}
                            aria-controls="mobile-services-menu"
                          >
                            <span>{item.label}</span>
                            <FaChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isServicesDropdownOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isServicesDropdownOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden bg-gray-50"
                                id="mobile-services-menu"
                                role="menu"
                                aria-label="Dịch vụ"
                              >
                                {item.dropdownItems?.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.href}
                                    href={dropdownItem.href}
                                    prefetch={true}
                                    role="menuitem"
                                    className="block px-8 py-2 text-sm text-gray-600 hover:text-primary-500 hover:bg-primary-50 transition-colors duration-200 min-h-touch focus:outline-none focus:bg-primary-50 focus:text-primary-500"
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
                          className={`block px-4 py-3 text-base font-medium transition-colors duration-200 min-h-touch focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                            isActiveLink(item.href)
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
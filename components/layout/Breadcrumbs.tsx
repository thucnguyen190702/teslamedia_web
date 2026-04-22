'use client';

import React from 'react';
import Link from 'next/link';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import { BreadcrumbItem } from '@/lib/types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  // Don't render breadcrumbs if there are no items or only home
  if (!items || items.length <= 1) {
    return null;
  }

  // Generate structured data for schema.org BreadcrumbList
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://teslamedia.vn'}${item.href}`
    }))
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb Navigation */}
      <nav 
        className="bg-gray-50 border-b border-gray-200"
        aria-label="Breadcrumb"
      >
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              const isHome = item.href === '/';

              return (
                <li key={item.href} className="flex items-center">
                  {index > 0 && (
                    <FaChevronRight className="w-3 h-3 text-gray-400 mx-2 flex-shrink-0" />
                  )}
                  
                  {isLast ? (
                    // Last item - not clickable
                    <span 
                      className="text-gray-600 font-medium flex items-center"
                      aria-current="page"
                    >
                      {isHome && <FaHome className="w-4 h-4 mr-1" />}
                      {item.label}
                    </span>
                  ) : (
                    // Clickable items
                    <Link
                      href={item.href}
                      className="text-gray-500 hover:text-primary-500 transition-colors duration-200 flex items-center"
                    >
                      {isHome && <FaHome className="w-4 h-4 mr-1" />}
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
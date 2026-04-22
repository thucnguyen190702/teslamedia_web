'use client';

import React from 'react';
import { Header, Footer, StickyContactBar, Breadcrumbs } from './index';
import { BreadcrumbItem } from '@/lib/types';

// Test component to verify all layout components work
const TestLayout: React.FC = () => {
  const testBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Dịch vụ', href: '/dich-vu' },
    { label: 'Thiết kế website', href: '/dich-vu/thiet-ke-website' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs items={testBreadcrumbs} />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Layout Components Test
          </h1>
          <p className="text-gray-600 mb-8">
            This page tests all layout components: Header, Footer, StickyContactBar, and Breadcrumbs.
          </p>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Header Component</h2>
              <p>✅ Sticky navigation with logo and menu</p>
              <p>✅ Services dropdown with 6 service links</p>
              <p>✅ Mobile hamburger menu with slide-in animation</p>
              <p>✅ Active page highlighting</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Footer Component</h2>
              <p>✅ Company information display</p>
              <p>✅ Navigation links organized by category</p>
              <p>✅ Social media links (Facebook, Zalo, Messenger)</p>
              <p>✅ Responsive grid layout</p>
              <p>✅ Copyright and legal information</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">StickyContactBar Component</h2>
              <p>✅ 5 action buttons: Call, Zalo, Messenger, Live Chat, Profile Download</p>
              <p>✅ Fixed positioning with proper z-index</p>
              <p>✅ Smooth hover animations</p>
              <p>✅ Responsive for mobile (smaller size)</p>
              <p>✅ Tooltips on hover</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Breadcrumbs Component</h2>
              <p>✅ Schema.org BreadcrumbList markup</p>
              <p>✅ Generated breadcrumbs from current route</p>
              <p>✅ Separator icons</p>
              <p>✅ Last item non-clickable</p>
            </div>
          </div>
          
          {/* Add some content to test scrolling */}
          <div className="mt-16 space-y-8">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="bg-gray-100 p-8 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Test Content Block {i + 1}</h3>
                <p className="text-gray-600">
                  This is test content to demonstrate scrolling behavior and sticky elements.
                  The header should become sticky when scrolling, and the contact bar should
                  remain fixed on the right side of the screen.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
      <StickyContactBar />
    </div>
  );
};

export default TestLayout;
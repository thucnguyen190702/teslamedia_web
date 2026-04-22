'use client';

import { motion } from 'framer-motion';
import { FilterTab } from '@/lib/types';

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export default function FilterTabs({ tabs, activeTab, onChange }: FilterTabsProps) {
  return (
    <div className="w-full">
      {/* Desktop Tabs */}
      <div className="hidden md:flex bg-gray-50 rounded-lg p-1 space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-6 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === tab.id
                ? 'text-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-md shadow-sm"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile Tabs - Scrollable */}
      <div className="md:hidden">
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Indicator for Mobile */}
      <div className="md:hidden mt-4">
        <motion.div
          className="h-0.5 bg-primary-600 rounded-full"
          initial={false}
          animate={{
            width: `${100 / tabs.length}%`,
            x: `${tabs.findIndex(tab => tab.id === activeTab) * 100}%`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      </div>
    </div>
  );
}
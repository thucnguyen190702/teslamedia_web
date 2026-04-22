'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { performSearch, buildSearchIndex, type SearchResult } from '@/lib/search';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog-posts';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ 
  placeholder = "Tìm kiếm dịch vụ, dự án, bài viết...",
  onSearch 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Build search index once and memoize it
  const searchIndexRef = useRef(buildSearchIndex(services, projects, blogPosts, []));

  // Handle search with debouncing
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    
    debounceRef.current = setTimeout(() => {
      const searchResults = performSearch(query, searchIndexRef.current, {
        limit: 8,
        threshold: 0.1,
      });
      
      setResults(searchResults);
      setIsOpen(true);
      setIsLoading(false);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Basic input sanitization - remove potentially dangerous characters
    const sanitizedValue = value.replace(/[<>]/g, '');
    
    // Limit length to prevent abuse
    if (sanitizedValue.length <= 100) {
      setQuery(sanitizedValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    
    // Validate query
    if (!trimmedQuery) return;
    if (trimmedQuery.length < 2) return;
    if (trimmedQuery.length > 100) return;
    
    // Additional sanitization before submission
    const sanitizedQuery = trimmedQuery.replace(/[<>]/g, '');
    
    if (sanitizedQuery) {
      if (onSearch) {
        onSearch(sanitizedQuery);
      } else {
        router.push(`/tim-kiem?q=${encodeURIComponent(sanitizedQuery)}`);
      }
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setIsOpen(false);
    setQuery('');
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'service':
        return '🔧';
      case 'project':
        return '📁';
      case 'blog':
        return '📝';
      case 'page':
        return '📄';
      default:
        return '🔍';
    }
  };

  const getResultTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'service':
        return 'Dịch vụ';
      case 'project':
        return 'Dự án';
      case 'blog':
        return 'Blog';
      case 'page':
        return 'Trang';
      default:
        return 'Khác';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        {/* Search Input */}
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            maxLength={100}
            aria-label="Tìm kiếm nội dung"
            aria-describedby="search-help"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            role="combobox"
            className="w-full pl-12 pr-12 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors min-h-touch"
          />
          
          {/* Hidden help text for screen readers */}
          <div id="search-help" className="sr-only">
            Nhập ít nhất 2 ký tự để tìm kiếm. Sử dụng phím mũi tên để điều hướng kết quả.
          </div>
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2" aria-hidden="true">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Xóa nội dung tìm kiếm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors min-h-touch min-w-touch p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
            role="listbox"
            aria-label="Kết quả tìm kiếm"
          >
            {isLoading ? (
              <div className="p-4 text-center">
                <div className="inline-flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600">Đang tìm kiếm...</span>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    role="option"
                    aria-selected="false"
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0 min-h-touch"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-lg mt-0.5">{getResultIcon(result.type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {result.title}
                          </h4>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {getResultTypeLabel(result.type)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {result.excerpt}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
                
                {/* View All Results */}
                <div className="border-t border-gray-100 p-2">
                  <button
                    onClick={handleSubmit}
                    className="w-full px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded transition-colors"
                  >
                    Xem tất cả kết quả cho "{query}"
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                <svg
                  className="w-8 h-8 mx-auto mb-2 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <p className="text-sm">Không tìm thấy kết quả nào</p>
                <p className="text-xs mt-1">Thử tìm kiếm với từ khóa khác</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
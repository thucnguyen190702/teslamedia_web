'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { performSearch, buildSearchIndex, generateHighlights, generateSearchSuggestions, type SearchResult } from '@/lib/search';
import { sanitizeSearchHighlight, createSafeHTML } from '@/lib/sanitize';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog-posts';
import SearchBar from '@/components/shared/SearchBar';

const RESULTS_PER_PAGE = 10;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [currentPage, setCurrentPage] = useState(1);

  // Build search index
  const searchIndex = useMemo(() => {
    return buildSearchIndex(services, projects, blogPosts, []);
  }, []);

  // Perform search
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    return performSearch(query, searchIndex, {
      limit: 100, // Get all results for pagination
      threshold: 0.1,
    });
  }, [query, searchIndex]);

  // Pagination
  const totalPages = Math.ceil(searchResults.length / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const currentResults = searchResults.slice(startIndex, endIndex);

  // Generate suggestions for no results
  const suggestions = useMemo(() => {
    if (searchResults.length > 0 || !query.trim()) return [];
    
    return generateSearchSuggestions(query, searchIndex, 5);
  }, [query, searchResults.length, searchIndex]);

  // Reset page when query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

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

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const highlights = generateHighlights(query, text, 200);
    if (highlights.length === 0) return text;
    
    // Use the first highlight and sanitize it
    const highlightedText = highlights[0];
    
    // Split by query terms and wrap matches
    const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    let result = highlightedText;
    
    queryTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      result = result.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
    });
    
    // Sanitize the result to prevent XSS
    return sanitizeSearchHighlight(result);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Tìm kiếm
            </h1>
            <div className="w-full">
              <SearchBar 
                placeholder="Tìm kiếm dịch vụ, dự án, bài viết..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {query && (
            <div id="search-results">
              {/* Results Summary */}
              <div className="mb-6">
                <p className="text-gray-600">
                  {searchResults.length > 0 ? (
                    <>
                      Tìm thấy <span className="font-semibold">{searchResults.length}</span> kết quả cho{' '}
                      <span className="font-semibold">"{query}"</span>
                      {totalPages > 1 && (
                        <span className="ml-2 text-sm">
                          (Trang {currentPage} / {totalPages})
                        </span>
                      )}
                    </>
                  ) : (
                    <>Không tìm thấy kết quả nào cho <span className="font-semibold">"{query}"</span></>
                  )}
                </p>
              </div>

              {/* Search Results */}
              {currentResults.length > 0 ? (
                <div className="space-y-6">
                  {currentResults.map((result, index) => (
                    <motion.div
                      key={`${result.type}-${result.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <span className="text-2xl">{getResultIcon(result.type)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <a
                              href={result.url}
                              className="text-xl font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                            >
                              <span dangerouslySetInnerHTML={createSafeHTML(highlightText(result.title, query), sanitizeSearchHighlight)} />
                            </a>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {getResultTypeLabel(result.type)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2 leading-relaxed">
                            <span dangerouslySetInnerHTML={createSafeHTML(highlightText(result.excerpt, query), sanitizeSearchHighlight)} />
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="text-primary-600">{result.url}</span>
                            <span>•</span>
                            <span>Điểm liên quan: {Math.round(result.score * 100)}%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* No Results */
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Không tìm thấy kết quả
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Chúng tôi không thể tìm thấy nội dung nào phù hợp với từ khóa "{query}".
                    </p>

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900 mb-3">Gợi ý tìm kiếm:</h4>
                        <ul className="space-y-2">
                          {suggestions.map((suggestion, index) => (
                            <li key={index}>
                              <a
                                href={`/tim-kiem?q=${encodeURIComponent(suggestion)}`}
                                className="text-primary-600 hover:text-primary-700 transition-colors"
                              >
                                {suggestion}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* General suggestions */}
                    <div className="mt-6 text-left">
                      <h4 className="font-medium text-gray-900 mb-3">Thử tìm kiếm:</h4>
                      <div className="flex flex-wrap gap-2">
                        {['thiết kế website', 'branding', 'SEO', 'digital marketing', 'landing page'].map((term) => (
                          <a
                            key={term}
                            href={`/tim-kiem?q=${encodeURIComponent(term)}`}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                          >
                            {term}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    {/* Previous */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Trước
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage = 
                        page === 1 || 
                        page === totalPages || 
                        Math.abs(page - currentPage) <= 2;

                      if (!showPage) {
                        // Show ellipsis
                        if (page === 2 && currentPage > 4) {
                          return (
                            <span key={page} className="px-3 py-2 text-sm text-gray-500">
                              ...
                            </span>
                          );
                        }
                        if (page === totalPages - 1 && currentPage < totalPages - 3) {
                          return (
                            <span key={page} className="px-3 py-2 text-sm text-gray-500">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            page === currentPage
                              ? 'bg-primary-600 text-white'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    {/* Next */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sau
                    </button>
                  </nav>
                </div>
              )}
            </div>
          )}

          {/* Empty State - No Query */}
          {!query && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nhập từ khóa để tìm kiếm
              </h3>
              <p className="text-gray-600 mb-6">
                Tìm kiếm dịch vụ, dự án, bài viết và nhiều nội dung khác tại Tesla Media.
              </p>
              
              {/* Popular searches */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Tìm kiếm phổ biến:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {['thiết kế website', 'branding', 'SEO', 'digital marketing', 'landing page', 'content marketing'].map((term) => (
                    <a
                      key={term}
                      href={`/tim-kiem?q=${encodeURIComponent(term)}`}
                      className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm hover:bg-primary-100 transition-colors"
                    >
                      {term}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
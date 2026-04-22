/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Search Logic
 * Tesla Media Clone Website
 * 
 * Client-side search functionality with fuzzy matching,
 * debouncing, result highlighting, and ranking
 */

import { BlogPost, Project, Service, Job } from './types';

// ============================================================================
// Search Types and Interfaces
// ============================================================================

export interface SearchResult {
  id: string;
  type: 'page' | 'service' | 'project' | 'blog' | 'job';
  title: string;
  excerpt: string;
  url: string;
  score: number;
  highlights: string[];
  category?: string;
  date?: string;
}

export interface SearchOptions {
  limit?: number;
  threshold?: number; // Minimum score threshold (0-1)
  includeTypes?: SearchResult['type'][];
  sortBy?: 'relevance' | 'date' | 'title';
  highlightLength?: number;
}

export interface SearchIndex {
  pages: SearchableItem[];
  services: SearchableItem[];
  projects: SearchableItem[];
  blog: SearchableItem[];
  jobs: SearchableItem[];
}

interface SearchableItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  url: string;
  category?: string;
  date?: string;
  keywords: string[];
  weight: number; // Importance weight for ranking
}

// ============================================================================
// Fuzzy Matching Algorithm
// ============================================================================

/**
 * Calculate Levenshtein distance between two strings
 * @param str1 - First string
 * @param str2 - Second string
 * @returns Distance score
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Calculate fuzzy match score between query and text
 * @param query - Search query
 * @param text - Text to match against
 * @returns Score between 0 and 1 (1 = perfect match)
 */
function fuzzyMatchScore(query: string, text: string): number {
  const queryLower = query.toLowerCase().trim();
  const textLower = text.toLowerCase().trim();

  // Exact match gets highest score
  if (textLower.includes(queryLower)) {
    const position = textLower.indexOf(queryLower);
    const lengthRatio = queryLower.length / textLower.length;
    const positionScore = 1 - (position / textLower.length);
    return Math.min(1, 0.8 + lengthRatio * 0.2 + positionScore * 0.1);
  }

  // Word boundary matches
  const queryWords = queryLower.split(/\s+/);
  const textWords = textLower.split(/\s+/);
  
  let wordMatches = 0;
  let totalWordScore = 0;

  for (const queryWord of queryWords) {
    let bestWordScore = 0;
    
    for (const textWord of textWords) {
      if (textWord.includes(queryWord)) {
        bestWordScore = Math.max(bestWordScore, 0.8);
      } else {
        // Use Levenshtein distance for fuzzy matching
        const distance = levenshteinDistance(queryWord, textWord);
        const maxLength = Math.max(queryWord.length, textWord.length);
        const similarity = 1 - (distance / maxLength);
        
        if (similarity > 0.6) {
          bestWordScore = Math.max(bestWordScore, similarity * 0.6);
        }
      }
    }
    
    if (bestWordScore > 0) {
      wordMatches++;
      totalWordScore += bestWordScore;
    }
  }

  if (wordMatches === 0) return 0;
  
  const wordMatchRatio = wordMatches / queryWords.length;
  const avgWordScore = totalWordScore / wordMatches;
  
  return wordMatchRatio * avgWordScore;
}

/**
 * Calculate relevance score for a searchable item
 * @param query - Search query
 * @param item - Searchable item
 * @returns Relevance score
 */
function calculateRelevanceScore(query: string, item: SearchableItem): number {
  const titleScore = fuzzyMatchScore(query, item.title) * 3; // Title matches are more important
  const contentScore = fuzzyMatchScore(query, item.content) * 1;
  const excerptScore = fuzzyMatchScore(query, item.excerpt) * 2;
  
  // Keyword matches get bonus points
  let keywordScore = 0;
  const queryLower = query.toLowerCase();
  for (const keyword of item.keywords) {
    if (keyword.toLowerCase().includes(queryLower)) {
      keywordScore += 0.5;
    }
  }

  const baseScore = (titleScore + contentScore + excerptScore + keywordScore) / 6;
  return Math.min(1, baseScore * item.weight);
}

// ============================================================================
// Search Index Building
// ============================================================================

/**
 * Build search index from data
 * @param services - Services data
 * @param projects - Projects data
 * @param blogPosts - Blog posts data
 * @param jobs - Jobs data
 * @returns Search index
 */
export function buildSearchIndex(
  services: Service[] = [],
  projects: Project[] = [],
  blogPosts: BlogPost[] = [],
  jobs: Job[] = []
): SearchIndex {
  const index: SearchIndex = {
    pages: [],
    services: [],
    projects: [],
    blog: [],
    jobs: []
  };

  // Add static pages
  index.pages = [
    {
      id: 'home',
      title: 'Trang chủ - Tesla Media',
      content: 'Tesla Media - Công ty Digital Marketing hàng đầu Việt Nam. Chuyên thiết kế website, SEO, quản trị nội dung, landing page, nhận diện thương hiệu.',
      excerpt: 'Tesla Media - Công ty Digital Marketing hàng đầu Việt Nam',
      url: '/',
      keywords: ['tesla media', 'digital marketing', 'marketing', 'trang chủ'],
      weight: 1.5
    },
    {
      id: 'about',
      title: 'Về chúng tôi - Tesla Media',
      content: 'Tìm hiểu về Tesla Media - lịch sử hình thành, tầm nhìn, sứ mệnh, giá trị cốt lõi và đội ngũ chuyên gia Digital Marketing.',
      excerpt: 'Tìm hiểu về Tesla Media - lịch sử, tầm nhìn, sứ mệnh',
      url: '/ve-chung-toi',
      keywords: ['về chúng tôi', 'giới thiệu', 'tesla media', 'công ty'],
      weight: 1.2
    },
    {
      id: 'contact',
      title: 'Liên hệ - Tesla Media',
      content: 'Liên hệ với Tesla Media để được tư vấn miễn phí về các dịch vụ Digital Marketing. Hotline, email, địa chỉ văn phòng.',
      excerpt: 'Liên hệ Tesla Media để được tư vấn miễn phí',
      url: '/lien-he',
      keywords: ['liên hệ', 'tư vấn', 'hotline', 'địa chỉ'],
      weight: 1.3
    },
    {
      id: 'support',
      title: 'Hỗ trợ khách hàng - Tesla Media',
      content: 'Câu hỏi thường gặp và hỗ trợ khách hàng Tesla Media. Tìm câu trả lời nhanh chóng cho các thắc mắc về dịch vụ.',
      excerpt: 'FAQ và hỗ trợ khách hàng Tesla Media',
      url: '/ho-tro-khach-hang',
      keywords: ['hỗ trợ', 'faq', 'câu hỏi', 'khách hàng'],
      weight: 1.1
    }
  ];

  // Add services to index
  index.services = services.map(service => ({
    id: service.id,
    title: service.title,
    content: `${service.fullDescription} ${service.process.map(p => p.description).join(' ')} ${service.benefits.join(' ')}`,
    excerpt: service.shortDescription,
    url: `/dich-vu/${service.slug}`,
    keywords: [service.title.toLowerCase(), ...service.title.toLowerCase().split(' ')],
    weight: 1.4
  }));

  // Add projects to index
  index.projects = projects.map(project => ({
    id: project.id,
    title: project.title,
    content: `${project.description} ${project.technologies.join(' ')} ${project.client}`,
    excerpt: project.description.substring(0, 160),
    url: `/du-an/${project.slug}`,
    category: project.category,
    date: project.completedDate,
    keywords: [
      project.title.toLowerCase(),
      project.category,
      project.client.toLowerCase(),
      ...project.technologies.map(t => t.toLowerCase())
    ],
    weight: 1.2
  }));

  // Add blog posts to index
  index.blog = blogPosts.map(post => ({
    id: post.id,
    title: post.title,
    content: post.content.replace(/<[^>]*>/g, ''), // Remove HTML tags
    excerpt: post.excerpt,
    url: `/blog/${post.slug}`,
    category: post.categories[0],
    date: post.publishedDate,
    keywords: [
      post.title.toLowerCase(),
      ...post.categories.map(c => c.toLowerCase()),
      ...post.tags.map(t => t.toLowerCase())
    ],
    weight: 1.3
  }));

  // Add jobs to index
  index.jobs = jobs.map(job => ({
    id: job.id,
    title: job.title,
    content: `${job.description} ${job.requirements.join(' ')} ${job.benefits.join(' ')}`,
    excerpt: job.description.substring(0, 160),
    url: `/tuyen-dung/${job.slug}`,
    category: job.department,
    date: job.deadline,
    keywords: [
      job.title.toLowerCase(),
      job.department.toLowerCase(),
      job.location.toLowerCase(),
      job.type
    ],
    weight: 1.1
  }));

  return index;
}

// ============================================================================
// Search Functions
// ============================================================================

/**
 * Perform search across all content types
 * @param query - Search query
 * @param searchIndex - Pre-built search index
 * @param options - Search options
 * @returns Array of search results
 */
export function performSearch(
  query: string,
  searchIndex: SearchIndex,
  options: SearchOptions = {}
): SearchResult[] {
  const {
    limit = 10,
    threshold = 0.1,
    includeTypes = ['page', 'service', 'project', 'blog', 'job'],
    sortBy = 'relevance',
    highlightLength = 150
  } = options;

  if (!query.trim()) return [];

  const results: SearchResult[] = [];

  // Search in each content type
  const searchInType = (items: SearchableItem[], type: SearchResult['type']) => {
    if (!includeTypes.includes(type)) return;

    for (const item of items) {
      const score = calculateRelevanceScore(query, item);
      
      if (score >= threshold) {
        const highlights = generateHighlights(query, item.content, highlightLength);
        
        results.push({
          id: item.id,
          type,
          title: item.title,
          excerpt: item.excerpt,
          url: item.url,
          score,
          highlights,
          category: item.category,
          date: item.date
        });
      }
    }
  };

  searchInType(searchIndex.pages, 'page');
  searchInType(searchIndex.services, 'service');
  searchInType(searchIndex.projects, 'project');
  searchInType(searchIndex.blog, 'blog');
  searchInType(searchIndex.jobs, 'job');

  // Sort results
  results.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return b.score - a.score;
      case 'title':
        return a.title.localeCompare(b.title, 'vi');
      case 'relevance':
      default:
        return b.score - a.score;
    }
  });

  return results.slice(0, limit);
}

/**
 * Generate highlighted text snippets
 * @param query - Search query
 * @param content - Content to highlight
 * @param maxLength - Maximum length of highlight
 * @returns Array of highlighted snippets
 */
export function generateHighlights(query: string, content: string, maxLength: number): string[] {
  const queryWords = query.toLowerCase().split(/\s+/);
  const contentLower = content.toLowerCase();
  const highlights: string[] = [];

  for (const word of queryWords) {
    const index = contentLower.indexOf(word);
    if (index !== -1) {
      const start = Math.max(0, index - 50);
      const end = Math.min(content.length, index + word.length + 50);
      let snippet = content.substring(start, end);
      
      if (start > 0) snippet = '...' + snippet;
      if (end < content.length) snippet = snippet + '...';
      
      // Highlight the matched word
      const regex = new RegExp(`(${word})`, 'gi');
      snippet = snippet.replace(regex, '<mark>$1</mark>');
      
      if (snippet.length <= maxLength) {
        highlights.push(snippet);
      }
    }
  }

  return highlights.slice(0, 3); // Return max 3 highlights
}

// ============================================================================
// Debounced Search Hook
// ============================================================================

/**
 * Create a debounced search function
 * @param searchFunction - Function to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Debounced function
 */
export function createDebouncedSearch<T extends any[], R>(
  searchFunction: (...args: T) => R,
  delay: number = 300
): (...args: T) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      searchFunction(...args);
    }, delay);
  };
}

// ============================================================================
// Search Suggestions
// ============================================================================

/**
 * Generate search suggestions based on query
 * @param query - Partial search query
 * @param searchIndex - Search index
 * @param limit - Maximum number of suggestions
 * @returns Array of suggestions
 */
export function generateSearchSuggestions(
  query: string,
  searchIndex: SearchIndex,
  limit: number = 5
): string[] {
  if (!query.trim() || query.length < 2) return [];

  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();

  // Collect suggestions from all searchable items
  const allItems = [
    ...searchIndex.pages,
    ...searchIndex.services,
    ...searchIndex.projects,
    ...searchIndex.blog,
    ...searchIndex.jobs
  ];

  for (const item of allItems) {
    // Check title words
    const titleWords = item.title.toLowerCase().split(/\s+/);
    for (const word of titleWords) {
      if (word.startsWith(queryLower) && word.length > queryLower.length) {
        suggestions.add(word);
      }
    }

    // Check keywords
    for (const keyword of item.keywords) {
      if (keyword.startsWith(queryLower) && keyword.length > queryLower.length) {
        suggestions.add(keyword);
      }
    }

    if (suggestions.size >= limit * 2) break; // Collect more than needed for filtering
  }

  return Array.from(suggestions)
    .sort((a, b) => a.length - b.length) // Prefer shorter suggestions
    .slice(0, limit);
}

// ============================================================================
// Search Analytics
// ============================================================================

export interface SearchAnalytics {
  query: string;
  resultsCount: number;
  timestamp: Date;
  clickedResult?: string;
}

/**
 * Track search analytics (client-side only)
 * @param analytics - Search analytics data
 */
export function trackSearchAnalytics(analytics: SearchAnalytics): void {
  // Store in localStorage for client-side analytics
  try {
    const existingData = localStorage.getItem('search_analytics');
    const data = existingData ? JSON.parse(existingData) : [];
    
    data.push({
      ...analytics,
      timestamp: analytics.timestamp.toISOString()
    });
    
    // Keep only last 100 searches
    if (data.length > 100) {
      data.splice(0, data.length - 100);
    }
    
    localStorage.setItem('search_analytics', JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to track search analytics:', error);
  }
}

/**
 * Get popular search queries
 * @param limit - Number of popular queries to return
 * @returns Array of popular queries
 */
export function getPopularSearchQueries(limit: number = 10): string[] {
  try {
    const data = localStorage.getItem('search_analytics');
    if (!data) return [];
    
    const analytics: SearchAnalytics[] = JSON.parse(data);
    const queryCount: Record<string, number> = {};
    
    analytics.forEach(item => {
      queryCount[item.query] = (queryCount[item.query] || 0) + 1;
    });
    
    return Object.entries(queryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([query]) => query);
  } catch (error) {
    console.warn('Failed to get popular search queries:', error);
    return [];
  }
}
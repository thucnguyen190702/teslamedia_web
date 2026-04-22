/**
 * Utility Functions
 * Tesla Media Clone Website
 * 
 * Helper functions for date formatting, reading time calculation,
 * slug generation, and text processing
 */

// ============================================================================
// Date Formatting Functions
// ============================================================================

/**
 * Format date to Vietnamese locale string
 * @param date - Date string or Date object
 * @returns Formatted date string (e.g., "10 tháng 4, 2024")
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Format date to short Vietnamese format
 * @param date - Date string or Date object
 * @returns Short formatted date string (e.g., "10/04/2024")
 */
export function formatDateShort(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Get relative time from now (e.g., "2 ngày trước")
 * @param date - Date string or Date object
 * @returns Relative time string
 */
export function getRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return 'Hôm nay';
  } else if (diffInDays === 1) {
    return 'Hôm qua';
  } else if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} tuần trước`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} tháng trước`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} năm trước`;
  }
}

// ============================================================================
// Reading Time Calculation
// ============================================================================

/**
 * Calculate estimated reading time for content
 * @param content - HTML or plain text content
 * @param wordsPerMinute - Average reading speed (default: 200 words/minute for Vietnamese)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // Count words (Vietnamese text may have different word boundaries)
  const words = plainText.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Calculate reading time and round up to nearest minute
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Minimum 1 minute reading time
  return Math.max(1, readingTime);
}

/**
 * Get word count from content
 * @param content - HTML or plain text content
 * @returns Number of words
 */
export function getWordCount(content: string): number {
  const plainText = content.replace(/<[^>]*>/g, '');
  const words = plainText.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

// ============================================================================
// Slug Generation and Validation
// ============================================================================

/**
 * Generate URL-friendly slug from Vietnamese text
 * @param text - Input text to convert to slug
 * @returns URL-friendly slug
 */
export function generateSlug(text: string): string {
  // Vietnamese character mapping
  const vietnameseMap: Record<string, string> = {
    'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
    'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
    'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
    'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
    'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
    'đ': 'd',
    'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A', 'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
    'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
    'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
    'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
    'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
    'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
    'Đ': 'D'
  };

  return text
    .toLowerCase()
    .trim()
    // Replace Vietnamese characters
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    // Replace special characters with hyphens
    .replace(/[^a-z0-9\s-]/g, '')
    // Replace spaces and multiple hyphens with single hyphen
    .replace(/[\s-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Validate if a string is a valid slug
 * @param slug - Slug to validate
 * @returns True if valid slug
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length > 0 && slug.length <= 100;
}

/**
 * Generate unique slug by appending number if needed
 * @param baseSlug - Base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns Unique slug
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = generateSlug(baseSlug);
  let counter = 1;
  
  while (existingSlugs.includes(slug)) {
    slug = `${generateSlug(baseSlug)}-${counter}`;
    counter++;
  }
  
  return slug;
}

// ============================================================================
// Text Truncation and Excerpt Generation
// ============================================================================

/**
 * Truncate text to specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length (default: 150)
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number = 150, suffix: string = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  // Find the last space before maxLength to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + suffix;
  }
  
  return truncated + suffix;
}

/**
 * Generate excerpt from HTML content
 * @param htmlContent - HTML content to extract excerpt from
 * @param maxLength - Maximum length of excerpt (default: 160)
 * @returns Plain text excerpt
 */
export function generateExcerpt(htmlContent: string, maxLength: number = 160): string {
  // Remove HTML tags
  const plainText = htmlContent.replace(/<[^>]*>/g, '');
  
  // Remove extra whitespace and normalize
  const cleanText = plainText.replace(/\s+/g, ' ').trim();
  
  // Truncate to desired length
  return truncateText(cleanText, maxLength);
}

/**
 * Extract first paragraph from HTML content
 * @param htmlContent - HTML content
 * @returns First paragraph as plain text
 */
export function extractFirstParagraph(htmlContent: string): string {
  // Match first <p> tag content
  const paragraphMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/i);
  
  if (paragraphMatch && paragraphMatch[1]) {
    // Remove any nested HTML tags and return clean text
    return paragraphMatch[1].replace(/<[^>]*>/g, '').trim();
  }
  
  // Fallback: get first 200 characters
  return generateExcerpt(htmlContent, 200);
}

// ============================================================================
// Additional Utility Functions
// ============================================================================

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Clean and normalize Vietnamese text
 * @param text - Text to clean
 * @returns Cleaned text
 */
export function cleanText(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .replace(/[""]/g, '"') // Normalize quotes
    .replace(/['']/g, "'"); // Normalize apostrophes
}

/**
 * Check if text contains Vietnamese characters
 * @param text - Text to check
 * @returns True if contains Vietnamese characters
 */
export function hasVietnameseChars(text: string): boolean {
  const vietnameseRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  return vietnameseRegex.test(text);
}

/**
 * Format number with Vietnamese locale
 * @param num - Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('vi-VN');
}

/**
 * Generate random ID
 * @param length - Length of ID (default: 8)
 * @returns Random ID string
 */
export function generateId(length: number = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
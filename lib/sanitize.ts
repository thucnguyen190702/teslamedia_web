/**
 * HTML Sanitization Utilities
 * Tesla Media Clone Website
 * 
 * Utilities for safely sanitizing HTML content to prevent XSS attacks
 */

/**
 * Sanitize HTML content by removing potentially dangerous elements and attributes
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHTML(html: string): string {
  if (!html) return '';

  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove dangerous attributes
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, ''); // onclick, onload, etc.
  sanitized = sanitized.replace(/\s*javascript\s*:/gi, ''); // javascript: URLs
  sanitized = sanitized.replace(/\s*vbscript\s*:/gi, ''); // vbscript: URLs
  sanitized = sanitized.replace(/\s*data\s*:/gi, ''); // data: URLs (can be dangerous)
  
  // Remove dangerous tags
  const dangerousTags = [
    'script', 'object', 'embed', 'link', 'style', 'meta', 'iframe', 
    'frame', 'frameset', 'applet', 'base', 'form', 'input', 'button',
    'textarea', 'select', 'option'
  ];
  
  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });
  
  // Remove HTML comments that could contain malicious code
  sanitized = sanitized.replace(/<!--[\s\S]*?-->/g, '');
  
  return sanitized;
}

/**
 * Sanitize text content for search highlighting
 * Only allows basic HTML tags for highlighting (mark, strong, em)
 * @param html - HTML string with search highlights
 * @returns Sanitized HTML string
 */
export function sanitizeSearchHighlight(html: string): string {
  if (!html) return '';

  // First apply general sanitization
  let sanitized = sanitizeHTML(html);
  
  // Allow only safe highlighting tags
  const allowedTags = ['mark', 'strong', 'em', 'b', 'i'];
  const allowedTagsRegex = new RegExp(`<\\/?(?:${allowedTags.join('|')})\\b[^>]*>`, 'gi');
  
  // Extract allowed tags
  const allowedMatches = sanitized.match(allowedTagsRegex) || [];
  
  // Remove all HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // Re-add only the allowed tags in their original positions
  // This is a simplified approach - in production, consider using a proper HTML sanitizer library
  allowedMatches.forEach(tag => {
    if (allowedTags.some(allowedTag => tag.toLowerCase().includes(allowedTag))) {
      // This is a basic implementation - for production use DOMPurify or similar
      sanitized = sanitized.replace(tag.replace(/<[^>]*>/g, ''), tag);
    }
  });
  
  return sanitized;
}

/**
 * Escape HTML entities to prevent XSS
 * @param text - Text to escape
 * @returns Escaped text
 */
export function escapeHTML(text: string): string {
  if (!text) return '';
  
  const entityMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  
  return text.replace(/[&<>"'`=\/]/g, (char) => entityMap[char]);
}

/**
 * Sanitize URL to prevent javascript: and data: URLs
 * @param url - URL to sanitize
 * @returns Sanitized URL or empty string if dangerous
 */
export function sanitizeURL(url: string): string {
  if (!url) return '';
  
  const trimmedUrl = url.trim().toLowerCase();
  
  // Block dangerous protocols
  if (
    trimmedUrl.startsWith('javascript:') ||
    trimmedUrl.startsWith('vbscript:') ||
    trimmedUrl.startsWith('data:') ||
    trimmedUrl.startsWith('file:')
  ) {
    return '';
  }
  
  // Allow only http, https, mailto, tel, and relative URLs
  if (
    trimmedUrl.startsWith('http://') ||
    trimmedUrl.startsWith('https://') ||
    trimmedUrl.startsWith('mailto:') ||
    trimmedUrl.startsWith('tel:') ||
    trimmedUrl.startsWith('/') ||
    trimmedUrl.startsWith('./') ||
    trimmedUrl.startsWith('../') ||
    !trimmedUrl.includes(':') // Relative URLs without protocol
  ) {
    return url; // Return original case
  }
  
  return '';
}

/**
 * Sanitize content for blog posts and rich text
 * Allows safe HTML tags while removing dangerous ones
 * @param html - HTML content to sanitize
 * @returns Sanitized HTML
 */
export function sanitizeBlogContent(html: string): string {
  if (!html) return '';

  // Apply basic sanitization first
  let sanitized = sanitizeHTML(html);
  
  // Allow safe formatting tags for blog content
  const safeTags = [
    'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'mark',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'div', 'span'
  ];
  
  // This is a simplified implementation
  // In production, use a proper HTML sanitizer like DOMPurify
  
  return sanitized;
}

/**
 * Create a safe HTML object for React's dangerouslySetInnerHTML
 * @param html - HTML string to sanitize
 * @param sanitizer - Sanitization function to use (default: sanitizeHTML)
 * @returns Object with __html property for React
 */
export function createSafeHTML(
  html: string, 
  sanitizer: (html: string) => string = sanitizeHTML
): { __html: string } {
  return {
    __html: sanitizer(html)
  };
}

/**
 * Validate that HTML content is safe for rendering
 * @param html - HTML to validate
 * @returns True if content appears safe
 */
export function isHTMLSafe(html: string): boolean {
  if (!html) return true;
  
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /on\w+\s*=/i, // Event handlers
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<link/i,
    /<meta/i,
    /<style/i,
    /<form/i
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(html));
}

/**
 * Log security warnings for unsafe HTML usage
 * @param html - HTML content being used
 * @param component - Component name for logging
 */
export function logSecurityWarning(html: string, component: string): void {
  if (!isHTMLSafe(html)) {
    console.warn(`⚠️ Security Warning: Potentially unsafe HTML in ${component}:`, html.substring(0, 100));
  }
}
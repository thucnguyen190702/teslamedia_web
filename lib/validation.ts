/**
 * Validation Schemas
 * Tesla Media Clone Website
 * 
 * Zod schemas for form validation and data validation
 */

import { z } from 'zod';

// ============================================================================
// Contact Form Validation Schema
// ============================================================================

/**
 * Contact form validation schema
 * Validates name, email, phone, service selection, and message
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ tên không được vượt quá 50 ký tự')
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Họ tên chỉ được chứa chữ cái và khoảng trắng'),
  
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ')
    .max(100, 'Email không được vượt quá 100 ký tự')
    .toLowerCase(),
  
  phone: z
    .string()
    .min(1, 'Số điện thoại là bắt buộc')
    .regex(
      /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      'Số điện thoại không hợp lệ (VD: 0901234567)'
    ),
  
  service: z
    .string()
    .min(1, 'Vui lòng chọn dịch vụ quan tâm')
    .refine(
      (value) => [
        'thiet-ke-website',
        'nhan-dien-thuong-hieu', 
        'quan-tri-noi-dung',
        'landing-page',
        'seo-tong-the',
        'phong-marketing-thue-ngoai',
        'khac'
      ].includes(value),
      'Dịch vụ được chọn không hợp lệ'
    ),
  
  message: z
    .string()
    .min(10, 'Nội dung phải có ít nhất 10 ký tự')
    .max(1000, 'Nội dung không được vượt quá 1000 ký tự')
    .optional()
    .or(z.literal('')),
  
  // Optional fields for additional validation
  company: z
    .string()
    .max(100, 'Tên công ty không được vượt quá 100 ký tự')
    .optional()
    .or(z.literal('')),
  
  budget: z
    .string()
    .optional()
    .refine(
      (value) => !value || [
        'duoi-10-trieu',
        '10-50-trieu',
        '50-100-trieu',
        'tren-100-trieu',
        'chua-xac-dinh'
      ].includes(value),
      'Ngân sách được chọn không hợp lệ'
    ),
  
  // Honeypot field for spam protection
  website: z
    .string()
    .max(0, 'Spam detected')
    .optional()
    .or(z.literal(''))
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================================================
// Search Validation Schema
// ============================================================================

/**
 * Search input validation schema
 * Validates search queries and filters
 */
export const searchSchema = z.object({
  query: z
    .string()
    .min(1, 'Từ khóa tìm kiếm không được để trống')
    .max(100, 'Từ khóa tìm kiếm không được vượt quá 100 ký tự')
    .trim()
    .refine(
      (value) => value.length >= 2,
      'Từ khóa tìm kiếm phải có ít nhất 2 ký tự'
    ),
  
  category: z
    .string()
    .optional()
    .refine(
      (value) => !value || [
        'all',
        'pages',
        'services', 
        'projects',
        'blog',
        'jobs'
      ].includes(value),
      'Danh mục tìm kiếm không hợp lệ'
    ),
  
  limit: z
    .number()
    .min(1, 'Số lượng kết quả phải lớn hơn 0')
    .max(50, 'Số lượng kết quả không được vượt quá 50')
    .optional()
    .default(10),
  
  page: z
    .number()
    .min(1, 'Số trang phải lớn hơn 0')
    .optional()
    .default(1)
});

export type SearchData = z.infer<typeof searchSchema>;

// ============================================================================
// Newsletter Subscription Schema
// ============================================================================

/**
 * Newsletter subscription validation schema
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ')
    .max(100, 'Email không được vượt quá 100 ký tự')
    .toLowerCase(),
  
  name: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ tên không được vượt quá 50 ký tự')
    .optional()
    .or(z.literal('')),
  
  interests: z
    .array(z.string())
    .optional()
    .refine(
      (value) => !value || value.every(interest => 
        ['seo', 'web-design', 'digital-marketing', 'branding', 'content'].includes(interest)
      ),
      'Sở thích được chọn không hợp lệ'
    )
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// ============================================================================
// Comment Validation Schema
// ============================================================================

/**
 * Blog comment validation schema
 */
export const commentSchema = z.object({
  name: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ tên không được vượt quá 50 ký tự')
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Họ tên chỉ được chứa chữ cái và khoảng trắng'),
  
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ')
    .max(100, 'Email không được vượt quá 100 ký tự')
    .toLowerCase(),
  
  website: z
    .string()
    .url('Website không hợp lệ')
    .optional()
    .or(z.literal('')),
  
  comment: z
    .string()
    .min(5, 'Bình luận phải có ít nhất 5 ký tự')
    .max(500, 'Bình luận không được vượt quá 500 ký tự'),
  
  parentId: z
    .string()
    .optional(), // For reply comments
  
  // Honeypot field for spam protection
  url: z
    .string()
    .max(0, 'Spam detected')
    .optional()
    .or(z.literal(''))
});

export type CommentData = z.infer<typeof commentSchema>;

// ============================================================================
// Job Application Schema
// ============================================================================

/**
 * Job application validation schema
 */
export const jobApplicationSchema = z.object({
  name: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ tên không được vượt quá 50 ký tự')
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Họ tên chỉ được chứa chữ cái và khoảng trắng'),
  
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ')
    .max(100, 'Email không được vượt quá 100 ký tự')
    .toLowerCase(),
  
  phone: z
    .string()
    .min(1, 'Số điện thoại là bắt buộc')
    .regex(
      /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      'Số điện thoại không hợp lệ (VD: 0901234567)'
    ),
  
  position: z
    .string()
    .min(1, 'Vị trí ứng tuyển là bắt buộc'),
  
  experience: z
    .string()
    .min(1, 'Kinh nghiệm làm việc là bắt buộc')
    .refine(
      (value) => [
        'fresher',
        '1-2-nam',
        '3-5-nam', 
        '5-10-nam',
        'tren-10-nam'
      ].includes(value),
      'Kinh nghiệm được chọn không hợp lệ'
    ),
  
  coverLetter: z
    .string()
    .min(50, 'Thư xin việc phải có ít nhất 50 ký tự')
    .max(2000, 'Thư xin việc không được vượt quá 2000 ký tự'),
  
  cvFile: z
    .string()
    .url('Link CV không hợp lệ')
    .optional()
    .or(z.literal('')),
  
  expectedSalary: z
    .string()
    .optional()
    .refine(
      (value) => !value || [
        'duoi-10-trieu',
        '10-15-trieu',
        '15-20-trieu',
        '20-30-trieu',
        'tren-30-trieu',
        'thuong-luong'
      ].includes(value),
      'Mức lương mong muốn không hợp lệ'
    )
});

export type JobApplicationData = z.infer<typeof jobApplicationSchema>;

// ============================================================================
// Quote Request Schema
// ============================================================================

/**
 * Quote request validation schema
 */
export const quoteRequestSchema = z.object({
  name: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ tên không được vượt quá 50 ký tự')
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Họ tên chỉ được chứa chữ cái và khoảng trắng'),
  
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ')
    .max(100, 'Email không được vượt quá 100 ký tự')
    .toLowerCase(),
  
  phone: z
    .string()
    .min(1, 'Số điện thoại là bắt buộc')
    .regex(
      /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      'Số điện thoại không hợp lệ (VD: 0901234567)'
    ),
  
  company: z
    .string()
    .min(2, 'Tên công ty phải có ít nhất 2 ký tự')
    .max(100, 'Tên công ty không được vượt quá 100 ký tự'),
  
  services: z
    .array(z.string())
    .min(1, 'Vui lòng chọn ít nhất một dịch vụ')
    .refine(
      (value) => value.every(service => 
        [
          'thiet-ke-website',
          'nhan-dien-thuong-hieu',
          'quan-tri-noi-dung', 
          'landing-page',
          'seo-tong-the',
          'phong-marketing-thue-ngoai'
        ].includes(service)
      ),
      'Dịch vụ được chọn không hợp lệ'
    ),
  
  budget: z
    .string()
    .min(1, 'Ngân sách dự kiến là bắt buộc')
    .refine(
      (value) => [
        'duoi-50-trieu',
        '50-100-trieu',
        '100-500-trieu',
        'tren-500-trieu',
        'thuong-luong'
      ].includes(value),
      'Ngân sách được chọn không hợp lệ'
    ),
  
  timeline: z
    .string()
    .min(1, 'Thời gian dự kiến là bắt buộc')
    .refine(
      (value) => [
        'duoi-1-thang',
        '1-3-thang',
        '3-6-thang',
        'tren-6-thang',
        'chua-xac-dinh'
      ].includes(value),
      'Thời gian được chọn không hợp lệ'
    ),
  
  projectDescription: z
    .string()
    .min(20, 'Mô tả dự án phải có ít nhất 20 ký tự')
    .max(1000, 'Mô tả dự án không được vượt quá 1000 ký tự'),
  
  requirements: z
    .string()
    .max(1000, 'Yêu cầu đặc biệt không được vượt quá 1000 ký tự')
    .optional()
    .or(z.literal(''))
});

export type QuoteRequestData = z.infer<typeof quoteRequestSchema>;

// ============================================================================
// Validation Helper Functions
// ============================================================================

/**
 * Validate Vietnamese phone number
 * @param phone - Phone number to validate
 * @returns True if valid Vietnamese phone number
 */
export function isValidVietnamesePhone(phone: string): boolean {
  const phoneRegex = /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns True if valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize HTML input to prevent XSS
 * @param input - Input string to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Check if string contains only Vietnamese characters and common punctuation
 * @param text - Text to validate
 * @returns True if valid Vietnamese text
 */
export function isValidVietnameseText(text: string): boolean {
  const vietnameseRegex = /^[a-zA-ZÀ-ỹ0-9\s\.,!?;:()\-'"]+$/;
  return vietnameseRegex.test(text);
}

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns True if valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Format validation errors for display
 * @param errors - Zod validation errors
 * @returns Formatted error messages
 */
export function formatValidationErrors(errors: z.ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {};
  
  errors.errors.forEach((error) => {
    const field = error.path.join('.');
    formattedErrors[field] = error.message;
  });
  
  return formattedErrors;
}
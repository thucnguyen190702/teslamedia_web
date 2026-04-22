/**
 * TypeScript Data Models and Interfaces
 * Tesla Media Clone Website
 */

// ============================================================================
// Service Interface
// ============================================================================

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  fullDescription: string;
  process: ProcessStep[];
  benefits: string[];
  relatedProjects: string[]; // Project IDs
  relatedPosts?: string[]; // Blog Post IDs
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  images?: {
    hero?: string;
    process?: string;
    benefits?: string;
  };
}

// ============================================================================
// Project Interface
// ============================================================================

export type ProjectCategory =
  | 'website'
  | 'branding'
  | 'landing-page'
  | 'digital-product'
  | 'content-creator'
  | 'other';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  thumbnail: string;
  images: string[];
  client: string;
  description: string;
  technologies: string[];
  completedDate: string;
  metaTitle: string;
  metaDescription: string;
}

// ============================================================================
// Blog Post Interface
// ============================================================================

export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown
  thumbnail: string;
  author: Author;
  publishedDate: string;
  updatedDate?: string;
  categories: string[];
  tags: string[];
  readingTime: number; // minutes
  relatedPosts: string[]; // Post IDs
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

// ============================================================================
// Testimonial Interface
// ============================================================================

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating: number; // 1-5
}

// ============================================================================
// Job Interface
// ============================================================================

export type JobType = 'full-time' | 'part-time' | 'contract';

export interface Job {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: JobType;
  department: string;
  description: string;
  requirements: string[];
  benefits: string[];
  deadline: string;
  applyEmail: string;
  metaTitle: string;
  metaDescription: string;
}

// ============================================================================
// FAQ Interface
// ============================================================================

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// ============================================================================
// Company Info Interface
// ============================================================================

export interface SocialMedia {
  facebook: string;
  zalo: string;
  messenger: string;
}

export interface CompanyInfo {
  name: string;
  taxId: string;
  address: string;
  hotline: string;
  email: string;
  socialMedia: SocialMedia;
  mapEmbedUrl: string;
}

// ============================================================================
// Additional Utility Types
// ============================================================================

export interface Stat {
  value: number;
  label: string;
  icon: string;
}

export interface Logo {
  src: string;
  alt: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface FilterTab {
  id: string;
  label: string;
}

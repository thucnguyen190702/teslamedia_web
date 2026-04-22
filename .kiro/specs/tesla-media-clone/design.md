# Design Document - Tesla Media Clone Website

## Overview

The Tesla Media Clone is a static frontend website built with Next.js 14+ that replicates the functionality and design of teslamedia.vn, a Vietnamese Digital Marketing company. The website features a Facebook-inspired blue theme (#1877F2), showcasing services, projects, blog content, and company information through hardcoded static content.

### Key Design Goals

1. **Static Architecture**: All content (services, projects, blog posts, testimonials) is hardcoded in the codebase
2. **SEO Excellence**: Comprehensive SEO optimization with semantic HTML, structured data, and Core Web Vitals compliance
3. **Facebook-Inspired UI**: Modern, clean design with blue color scheme and card-based layouts
4. **Performance First**: Target Lighthouse score >= 90, LCP < 2.5s, optimized images and code splitting
5. **Responsive Design**: Mobile-first approach with breakpoints for mobile, tablet, and desktop
6. **Rich Interactions**: Smooth animations with Framer Motion, sticky navigation, and interactive components

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Image Optimization**: next/image with WebP format
- **SEO**: next-seo, schema.org structured data
- **Form Validation**: React Hook Form + Zod
- **Icons**: React Icons or Lucide Icons

## Architecture

### Application Structure

```
tesla-media-clone/
├── app/
│   ├── layout.tsx                 # Root layout with SEO, fonts
│   ├── page.tsx                   # Homepage
│   ├── ve-chung-toi/
│   │   └── page.tsx              # About page
│   ├── lien-he/
│   │   └── page.tsx              # Contact page
│   ├── du-an/
│   │   ├── page.tsx              # Projects listing
│   │   └── [slug]/
│   │       └── page.tsx          # Project detail
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx          # Blog post detail
│   ├── tuyen-dung/
│   │   ├── page.tsx              # Careers listing
│   │   └── [slug]/
│   │       └── page.tsx          # Job detail
│   ├── ho-tro-khach-hang/
│   │   └── page.tsx              # Support/FAQ page
│   ├── dich-vu/
│   │   ├── thiet-ke-website/
│   │   ├── nhan-dien-thuong-hieu/
│   │   ├── quan-tri-noi-dung/
│   │   ├── landing-page/
│   │   ├── seo-tong-the/
│   │   └── phong-marketing-thue-ngoai/
│   │       └── page.tsx          # Service pages (6 total)
│   ├── not-found.tsx             # Custom 404 page
│   └── error.tsx                 # Error boundary
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Navigation with dropdown
│   │   ├── Footer.tsx            # Footer with links
│   │   ├── StickyContactBar.tsx # Floating contact buttons
│   │   └── Breadcrumbs.tsx      # Breadcrumb navigation
│   ├── home/
│   │   ├── HeroSection.tsx      # Hero with search
│   │   ├── AboutSection.tsx     # Company intro
│   │   ├── ServicesGrid.tsx     # 6 services display
│   │   ├── StatsSection.tsx     # Animated statistics
│   │   ├── LogoSlider.tsx       # Partner logos
│   │   ├── ProjectGallery.tsx   # Projects with filter
│   │   ├── Testimonials.tsx     # Customer reviews
│   │   └── BlogSection.tsx      # Latest blog posts
│   ├── shared/
│   │   ├── ServiceCard.tsx      # Service display card
│   │   ├── ProjectCard.tsx      # Project display card
│   │   ├── BlogCard.tsx         # Blog post card
│   │   ├── ContactForm.tsx      # Reusable contact form
│   │   ├── SearchBar.tsx        # Search functionality
│   │   ├── FilterTabs.tsx       # Project filter tabs
│   │   ├── Popup.tsx            # Facebook verification popup
│   │   └── SEO.tsx              # SEO component wrapper
│   └── ui/
│       ├── Button.tsx           # Reusable button
│       ├── Card.tsx             # Card component
│       ├── Modal.tsx            # Modal dialog
│       └── Accordion.tsx        # FAQ accordion
├── data/
│   ├── services.ts              # Hardcoded services data
│   ├── projects.ts              # Hardcoded projects data
│   ├── blog-posts.ts            # Hardcoded blog posts
│   ├── testimonials.ts          # Hardcoded testimonials
│   ├── jobs.ts                  # Hardcoded job listings
│   ├── faq.ts                   # Hardcoded FAQ data
│   └── company-info.ts          # Company details
├── lib/
│   ├── search.ts                # Client-side search logic
│   ├── validation.ts            # Form validation schemas
│   └── utils.ts                 # Utility functions
├── public/
│   ├── images/                  # Optimized images
│   ├── profile.pdf              # Company profile
│   ├── sitemap.xml              # Static sitemap
│   ├── robots.txt               # Robots file
│   └── manifest.json            # PWA manifest
└── styles/
    └── globals.css              # Global styles, Tailwind
```

### Routing Strategy

- **Static Generation (SSG)**: All pages are statically generated at build time
- **Dynamic Routes**: Use `generateStaticParams` for blog posts, projects, services, and jobs
- **URL Structure**: Clean, SEO-friendly Vietnamese URLs with hyphens
  - Services: `/dich-vu/[service-slug]/`
  - Projects: `/du-an/[project-slug]/`
  - Blog: `/blog/[post-slug]/`
  - Jobs: `/tuyen-dung/[job-slug]/`

### Data Management

Since all content is static and hardcoded:

1. **Data Files**: TypeScript files in `/data` directory export typed arrays/objects
2. **Type Safety**: Define TypeScript interfaces for all data structures
3. **Content Structure**:
   ```typescript
   interface Service {
     id: string;
     slug: string;
     title: string;
     description: string;
     icon: string;
     fullDescription: string;
     process: string[];
     benefits: string[];
     relatedProjects: string[];
     metaTitle: string;
     metaDescription: string;
   }
   ```

## Components and Interfaces

### Core Layout Components

#### Header Component
```typescript
interface HeaderProps {
  transparent?: boolean;
}

// Features:
// - Logo with link to homepage
// - Main navigation menu with dropdown for services
// - Sticky behavior on scroll
// - Mobile hamburger menu with slide-in animation
// - Active page highlighting
```

#### Footer Component
```typescript
interface FooterProps {
  // No props needed - uses company data
}

// Features:
// - Company information (name, tax ID, address, hotline, email)
// - Navigation links organized by category
// - Social media links (Facebook, Zalo, Messenger)
// - Copyright and legal information
// - Responsive grid layout
```

#### StickyContactBar Component
```typescript
interface StickyContactBarProps {
  position?: 'left' | 'right';
}

// Features:
// - 5 action buttons: Call, Zalo, Messenger, Live Chat, Profile Download
// - Fixed positioning with z-index management
// - Smooth hover animations
// - Mobile-responsive (smaller on mobile)
// - Tooltips on hover
```

#### Breadcrumbs Component
```typescript
interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

// Features:
// - Schema.org BreadcrumbList markup
// - Automatic generation from route
// - Separator icons
// - Last item not clickable
```

### Home Page Components

#### HeroSection Component
```typescript
interface HeroSectionProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  showSearch: boolean;
}

// Features:
// - Full-width background image/video
// - Centered content with title, description, CTA
// - Integrated search bar
// - Responsive typography
// - Framer Motion animations (fade-in, slide-up)
```

#### ServicesGrid Component
```typescript
interface ServicesGridProps {
  services: Service[];
}

// Features:
// - Grid layout (3 columns desktop, 2 tablet, 1 mobile)
// - ServiceCard for each service
// - Hover effects with scale animation
// - Links to individual service pages
```

#### StatsSection Component
```typescript
interface Stat {
  value: number;
  label: string;
  icon: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

// Features:
// - Animated counter from 0 to target value
// - Intersection Observer to trigger on scroll
// - Icon + number + label layout
// - Grid responsive layout
```

#### ProjectGallery Component
```typescript
interface ProjectGalleryProps {
  projects: Project[];
  showFilter: boolean;
  limit?: number;
}

// Features:
// - FilterTabs component for category filtering
// - Grid layout with ProjectCard components
// - Filter state management
// - "View All" link to projects page
// - Smooth filter transitions
```

#### LogoSlider Component
```typescript
interface LogoSliderProps {
  logos: { src: string; alt: string; }[];
  speed?: number;
}

// Features:
// - Infinite horizontal scroll animation
// - Pause on hover
// - Duplicate logos for seamless loop
// - Grayscale with color on hover
```

#### Testimonials Component
```typescript
interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

// Features:
// - Carousel or grid layout
// - Navigation arrows
// - Auto-play with pause on hover
// - Avatar, name, position, company, content display
```

### Shared Components

#### ContactForm Component
```typescript
interface ContactFormProps {
  servicePreselect?: string;
  onSuccess?: () => void;
}

// Features:
// - Fields: name, email, phone, service, message
// - React Hook Form + Zod validation
// - Client-side validation only
// - Error messages per field
// - Success message on valid submission
// - Loading state during validation
```

#### SearchBar Component
```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

// Features:
// - Debounced input (300ms)
// - Search icon
// - Clear button when text present
// - Enter key to submit
// - Fuzzy matching algorithm
```

#### FilterTabs Component
```typescript
interface FilterTab {
  id: string;
  label: string;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

// Features:
// - Horizontal tab layout
// - Active tab highlighting
// - Smooth transition animation
// - Mobile scrollable tabs
```

#### Popup Component
```typescript
interface PopupProps {
  title: string;
  content: string;
  ctaText: string;
  ctaLink: string;
  delay?: number;
  cookieName: string;
  cookieDays?: number;
}

// Features:
// - Delayed appearance (5s or 50% scroll)
// - Close button and outside click to dismiss
// - Cookie to prevent re-showing (7 days)
// - Backdrop overlay
// - Centered modal with animation
```

### Page-Specific Components

#### BlogCard Component
```typescript
interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
}

// Features:
// - Thumbnail image
// - Title, excerpt, author, date
// - Category tags
// - Reading time estimate
// - Hover effect
```

#### ProjectCard Component
```typescript
interface ProjectCardProps {
  project: Project;
}

// Features:
// - Thumbnail with overlay
// - Title and category
// - Hover zoom effect
// - Link to project detail
```

#### ServiceCard Component
```typescript
interface ServiceCardProps {
  service: Service;
}

// Features:
// - Icon display
// - Title and short description
// - "Learn More" link
// - Card hover effect
```

## Data Models

### Service Model
```typescript
interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  fullDescription: string;
  process: ProcessStep[];
  benefits: string[];
  relatedProjects: string[]; // Project IDs
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}
```

### Project Model
```typescript
interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'website' | 'branding' | 'landing-page' | 'digital-product' | 'content-creator' | 'other';
  thumbnail: string;
  images: string[];
  client: string;
  description: string;
  technologies: string[];
  completedDate: string;
  metaTitle: string;
  metaDescription: string;
}
```

### Blog Post Model
```typescript
interface BlogPost {
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

interface Author {
  name: string;
  avatar: string;
  bio: string;
}
```

### Testimonial Model
```typescript
interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating: number; // 1-5
}
```

### Job Model
```typescript
interface Job {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  department: string;
  description: string;
  requirements: string[];
  benefits: string[];
  deadline: string;
  applyEmail: string;
  metaTitle: string;
  metaDescription: string;
}
```

### FAQ Model
```typescript
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
```

### Company Info Model
```typescript
interface CompanyInfo {
  name: string;
  taxId: string;
  address: string;
  hotline: string;
  email: string;
  socialMedia: {
    facebook: string;
    zalo: string;
    messenger: string;
  };
  mapEmbedUrl: string;
}
```

## Error Handling

### Client-Side Error Handling

1. **Form Validation Errors**
   - Display inline error messages below each field
   - Highlight invalid fields with red border
   - Show summary of errors at top of form
   - Prevent submission until all errors resolved

2. **Search Errors**
   - Handle empty results gracefully
   - Show "No results found" message with suggestions
   - Provide alternative search terms or popular pages

3. **404 Not Found**
   - Custom 404 page with friendly message
   - Navigation links to main pages
   - Search bar to find content
   - Suggestions for popular pages

4. **Runtime Errors**
   - Error boundary component to catch React errors
   - Display user-friendly error message
   - Log errors to console for debugging
   - Provide "Go to Homepage" button

5. **Image Loading Errors**
   - Fallback placeholder image
   - Alt text always present
   - Graceful degradation

### Error Logging

- Console logging for development
- Error messages in Vietnamese for user-facing errors
- Technical details in console for developers

## Testing Strategy

### Testing Approach

Since this is a static website with UI rendering, client-side validation, and no complex business logic, **property-based testing is NOT applicable**. Instead, we will use:

1. **Unit Tests** (Jest + React Testing Library)
2. **Integration Tests** (Playwright or Cypress)
3. **Visual Regression Tests** (Chromatic or Percy)
4. **Manual Testing**

### Unit Testing

**Components to Test:**
- Form validation logic (ContactForm)
- Search functionality (fuzzy matching algorithm)
- Filter logic (ProjectGallery filtering)
- Utility functions (date formatting, reading time calculation)

**Example Test Cases:**
```typescript
describe('ContactForm Validation', () => {
  it('should reject invalid email format', () => {
    // Test email validation
  });
  
  it('should reject invalid phone number', () => {
    // Test phone validation
  });
  
  it('should require all mandatory fields', () => {
    // Test required field validation
  });
});

describe('Search Functionality', () => {
  it('should find exact matches', () => {
    // Test exact search
  });
  
  it('should find fuzzy matches', () => {
    // Test fuzzy search
  });
  
  it('should return empty array for no matches', () => {
    // Test no results
  });
});
```

### Integration Testing

**User Flows to Test:**
1. Homepage navigation to service pages
2. Project filtering and viewing project details
3. Blog browsing and reading posts
4. Contact form submission flow
5. Search functionality across pages
6. Mobile menu navigation
7. Sticky contact bar interactions
8. Popup appearance and dismissal

**Example Test:**
```typescript
test('User can filter projects by category', async ({ page }) => {
  await page.goto('/du-an');
  await page.click('[data-filter="website"]');
  const projects = await page.locator('.project-card');
  // Assert only website projects are shown
});
```

### Visual Regression Testing

**Pages to Test:**
- Homepage (desktop, tablet, mobile)
- Service pages (all 6)
- Project listing and detail pages
- Blog listing and post pages
- Contact page
- About page
- 404 page

**Scenarios:**
- Different viewport sizes
- Hover states
- Active states
- Modal/popup open states
- Mobile menu open state

### SEO Testing

**Automated Checks:**
- Lighthouse CI in GitHub Actions
- Meta tags presence and length
- Heading hierarchy validation
- Image alt text presence
- Structured data validation
- Sitemap validation
- Robots.txt validation

**Manual Checks:**
- Google Search Console validation
- Mobile-Friendly Test
- Rich Results Test
- PageSpeed Insights

### Performance Testing

**Metrics to Monitor:**
- Lighthouse Performance score >= 90
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Total page size < 2MB
- Number of requests < 50

**Tools:**
- Lighthouse CI
- WebPageTest
- Chrome DevTools Performance tab

### Accessibility Testing

**Automated:**
- axe-core in unit tests
- Lighthouse accessibility score >= 90

**Manual:**
- Keyboard navigation
- Screen reader testing (NVDA/JAWS)
- Color contrast verification
- Focus management

### Browser Compatibility Testing

**Target Browsers:**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### Test Coverage Goals

- Unit test coverage: >= 80% for utility functions and validation logic
- Integration test coverage: All critical user flows
- Visual regression: All pages and major component states
- SEO: 100% of pages validated

### Testing Tools

- **Unit Testing**: Jest, React Testing Library
- **Integration Testing**: Playwright or Cypress
- **Visual Regression**: Chromatic or Percy
- **SEO Testing**: Lighthouse CI, Google Search Console
- **Accessibility**: axe-core, WAVE
- **Performance**: Lighthouse, WebPageTest

## Implementation Notes

### SEO Implementation

1. **Meta Tags** (every page)
   ```typescript
   <Head>
     <title>{metaTitle}</title>
     <meta name="description" content={metaDescription} />
     <meta name="keywords" content={keywords} />
     <link rel="canonical" href={canonicalUrl} />
     <meta property="og:title" content={ogTitle} />
     <meta property="og:description" content={ogDescription} />
     <meta property="og:image" content={ogImage} />
     <meta property="og:type" content="website" />
     <meta name="twitter:card" content="summary_large_image" />
   </Head>
   ```

2. **Structured Data**
   - Organization schema on homepage
   - WebSite schema with search action
   - Article schema on blog posts
   - Service schema on service pages
   - FAQPage schema on support page
   - JobPosting schema on career pages
   - BreadcrumbList on all pages

3. **Image Optimization**
   - Use next/image for all images
   - Provide width and height attributes
   - Use descriptive filenames
   - Always include alt text
   - Lazy load below-the-fold images
   - Generate WebP format

4. **Internal Linking**
   - Link related services from project pages
   - Link related posts from blog posts
   - Link to relevant services from blog content
   - Use descriptive anchor text with keywords

### Performance Optimization

1. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based code splitting (automatic with Next.js)
   - Lazy load Framer Motion animations

2. **Font Optimization**
   - Use next/font for Google Fonts
   - Preload critical fonts
   - Use font-display: swap

3. **CSS Optimization**
   - Tailwind CSS with PurgeCSS
   - Inline critical CSS
   - Defer non-critical CSS

4. **JavaScript Optimization**
   - Minimize third-party scripts
   - Defer non-critical scripts
   - Use preconnect for external domains

5. **Caching Strategy**
   - Static assets: Cache-Control: public, max-age=31536000, immutable
   - HTML pages: Cache-Control: public, max-age=0, must-revalidate
   - API routes (if any): Appropriate cache headers

### Animation Implementation

1. **Framer Motion Patterns**
   ```typescript
   // Fade in on scroll
   const fadeInVariants = {
     hidden: { opacity: 0, y: 20 },
     visible: { opacity: 1, y: 0 }
   };
   
   // Stagger children
   const containerVariants = {
     hidden: { opacity: 0 },
     visible: {
       opacity: 1,
       transition: { staggerChildren: 0.1 }
     }
   };
   ```

2. **Performance Considerations**
   - Use transform and opacity for animations (GPU-accelerated)
   - Avoid animating layout properties (width, height, top, left)
   - Respect prefers-reduced-motion
   - Limit concurrent animations

### Responsive Breakpoints

```typescript
// Tailwind config
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
};
```

### Color Palette

```typescript
// Tailwind config
const colors = {
  primary: {
    50: '#E7F3FF',
    100: '#D4E9FF',
    200: '#B0D7FF',
    300: '#7DBEFF',
    400: '#4A9FFF',
    500: '#1877F2', // Main Facebook blue
    600: '#1565D8',
    700: '#1153B8',
    800: '#0D4298',
    900: '#093578',
  },
  // Additional colors for success, error, warning, etc.
};
```

### Security Implementation

1. **Content Security Policy**
   ```typescript
   // next.config.js
   const csp = `
     default-src 'self';
     script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com;
     style-src 'self' 'unsafe-inline' *.googleapis.com;
     img-src 'self' data: blob: *.google.com;
     font-src 'self' data: *.gstatic.com;
     connect-src 'self' *.google.com;
     frame-src 'self' *.google.com;
   `;
   ```

2. **Input Sanitization**
   - Use Zod for validation
   - Sanitize user inputs before display
   - Escape HTML in user-generated content

3. **Dependency Management**
   - Regular npm audit
   - Automated dependency updates with Dependabot
   - Review security advisories

### Deployment Considerations

1. **Build Process**
   - Static export with `next build`
   - Generate all static pages at build time
   - Optimize images during build

2. **Hosting Options**
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS S3 + CloudFront
   - Any static hosting service

3. **Environment Variables**
   - Google Maps API key
   - Analytics tracking ID
   - Any third-party service keys

4. **CI/CD Pipeline**
   - Run tests on pull requests
   - Lighthouse CI checks
   - Automated deployment on merge to main

---

## Design Decisions and Rationales

### Why Static Content?

**Decision**: Hardcode all content in TypeScript files instead of using a CMS.

**Rationale**:
- Simpler architecture with no backend dependencies
- Better performance (no API calls)
- Type safety with TypeScript
- Version control for content changes
- Easier to deploy and maintain
- Suitable for content that doesn't change frequently

### Why Next.js App Router?

**Decision**: Use Next.js 14+ with App Router instead of Pages Router.

**Rationale**:
- Better SEO with React Server Components
- Improved performance with streaming
- Simplified data fetching
- Better TypeScript support
- Future-proof architecture
- Built-in metadata API

### Why Client-Side Form Validation Only?

**Decision**: Implement form validation without backend submission.

**Rationale**:
- Requirement specifies static website only
- Immediate user feedback
- No server infrastructure needed
- Can be enhanced later with backend integration
- Demonstrates validation logic for user experience

### Why Framer Motion?

**Decision**: Use Framer Motion for animations instead of CSS animations.

**Rationale**:
- Declarative API for complex animations
- Better performance with automatic optimization
- Gesture support for interactive elements
- Easy to implement scroll-triggered animations
- Good TypeScript support

### Why Tailwind CSS?

**Decision**: Use Tailwind CSS instead of CSS Modules or styled-components.

**Rationale**:
- Rapid development with utility classes
- Consistent design system
- Excellent responsive design support
- PurgeCSS for minimal bundle size
- Great documentation and community

---

This design document provides a comprehensive blueprint for implementing the Tesla Media Clone website, addressing all 29 requirements with a focus on performance, SEO, and user experience. The architecture is designed to be maintainable, scalable, and optimized for static content delivery.


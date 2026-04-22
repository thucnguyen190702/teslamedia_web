# Implementation Plan: Tesla Media Clone Website

## Overview

This implementation plan breaks down the Tesla Media Clone website into discrete, manageable tasks. The website is a static Next.js 14+ application with TypeScript, featuring a Facebook-inspired blue theme, comprehensive SEO optimization, and responsive design. All content is hardcoded in TypeScript data files.

The implementation follows an incremental approach: setup → core infrastructure → data models → layout components → page components → features → optimization → final integration.

## Tasks

- [x] 1. Project setup and configuration
  - Initialize Next.js 14+ project with TypeScript and App Router
  - Configure Tailwind CSS with custom theme (Facebook blue #1877F2)
  - Install dependencies: Framer Motion, React Hook Form, Zod, React Icons
  - Set up project structure (app/, components/, data/, lib/, public/ directories)
  - Configure next.config.js for image optimization and static export
  - Create tsconfig.json with strict type checking
  - Set up ESLint and Prettier for code quality
  - _Requirements: 1.1, 1.2, 1.7, 25.2, 25.3_

- [x] 2. Configure Tailwind theme and global styles
  - Define color palette in tailwind.config.js (primary blue shades, secondary colors, accent colors)
  - Configure typography with sans-serif font family (Inter or Segoe UI)
  - Set up responsive breakpoints (mobile: 640px, tablet: 768px, desktop: 1024px)
  - Create globals.css with base styles and Tailwind directives
  - Configure font optimization with next/font
  - _Requirements: 1.1, 1.2, 1.4, 1.5, 22.2, 25.8_

- [x] 3. Create TypeScript data models and interfaces
  - Define Service interface with all required fields (id, slug, title, description, process, benefits, etc.)
  - Define Project interface with category enum and metadata
  - Define BlogPost interface with author, categories, tags, and content
  - Define Testimonial interface with rating and company info
  - Define Job interface with type enum and requirements
  - Define FAQ interface with category
  - Define CompanyInfo interface with social media links
  - _Requirements: 1.7, 4.1, 7.5, 8.5, 9.5, 14.6, 16.5, 17.4, 18.5, 20.6_

- [-] 4. Create hardcoded data files
  - [x] 4.1 Create data/services.ts with 6 services
    - Export array of Service objects for: Thiết kế website, Nhận diện thương hiệu, Quản trị nội dung, Landing page, SEO tổng thể, Phòng Marketing thuê ngoài
    - Include full descriptions, process steps, benefits, and SEO metadata
    - _Requirements: 4.1, 18.5_
  
  - [x] 4.2 Create data/projects.ts with sample projects
    - Export array of Project objects across all 6 categories
    - Include thumbnails, descriptions, client info, and technologies
    - _Requirements: 7.6, 13.5_
  
  - [x] 4.3 Create data/blog-posts.ts with sample blog posts
    - Export array of BlogPost objects with full content
    - Include author info, categories, tags, and related posts
    - Ensure posts have minimum 800 words for SEO
    - _Requirements: 9.5, 14.6, 15.7_
  
  - [x] 4.4 Create data/testimonials.ts with customer reviews
    - Export array of Testimonial objects with ratings
    - _Requirements: 8.5_
  
  - [x] 4.5 Create data/jobs.ts with job listings
    - Export array of Job objects with requirements and benefits
    - _Requirements: 16.5_
  
  - [x] 4.6 Create data/faq.ts with FAQ items
    - Export array of FAQ objects organized by category
    - _Requirements: 17.4_
  
  - [x] 4.7 Create data/company-info.ts with company details
    - Export CompanyInfo object with address, contact info, and social media links
    - _Requirements: 10.1, 10.3_

- [x] 5. Create utility functions and validation schemas
  - [x] 5.1 Create lib/utils.ts with helper functions
    - Implement date formatting functions
    - Implement reading time calculation
    - Implement slug generation and validation
    - Implement text truncation and excerpt generation
    - _Requirements: 15.8_
  
  - [x] 5.2 Create lib/validation.ts with Zod schemas
    - Define contactFormSchema with email, phone, and required field validation
    - Define searchSchema for search input validation
    - _Requirements: 12.3, 12.4, 29.4_
  
  - [x] 5.3 Create lib/search.ts with search logic
    - Implement fuzzy matching algorithm for client-side search
    - Implement search across pages, services, projects, and blog posts
    - Implement debounced search with 300ms delay
    - Implement result highlighting and ranking
    - _Requirements: 29.1, 29.2, 29.4, 29.8_

- [x] 6. Create root layout and SEO components
  - [x] 6.1 Create app/layout.tsx with root layout
    - Set up HTML structure with lang="vi"
    - Configure fonts with next/font
    - Include global styles and Tailwind CSS
    - Add metadata API for default SEO tags
    - _Requirements: 1.7, 24.1_
  
  - [x] 6.2 Create components/shared/SEO.tsx component
    - Implement meta tags generation (title, description, keywords)
    - Implement Open Graph tags for social sharing
    - Implement canonical URL generation
    - Implement structured data injection
    - _Requirements: 24.1, 24.4, 24.5, 24.6_
  
  - [x] 6.3 Create public/sitemap.xml
    - Generate static sitemap with all pages
    - Include priority and changefreq for each URL
    - _Requirements: 24.2_
  
  - [x] 6.4 Create public/robots.txt
    - Configure crawling rules for search engines
    - _Requirements: 24.3_
  
  - [x] 6.5 Create public/manifest.json for PWA
    - Define app name, icons, and theme color
    - _Requirements: 1.9_

- [x] 7. Create UI components
  - [x] 7.1 Create components/ui/Button.tsx
    - Implement reusable button with variants (primary, secondary, outline)
    - Add hover and active states with Framer Motion
    - _Requirements: 1.5, 23.3_
  
  - [x] 7.2 Create components/ui/Card.tsx
    - Implement card component with shadow and rounded corners
    - Add hover effect with scale animation
    - _Requirements: 1.5, 23.3_
  
  - [x] 7.3 Create components/ui/Modal.tsx
    - Implement modal dialog with backdrop overlay
    - Add open/close animations with Framer Motion
    - Handle outside click and ESC key to close
    - _Requirements: 3.3, 7.4_
  
  - [x] 7.4 Create components/ui/Accordion.tsx
    - Implement accordion for FAQ section
    - Add expand/collapse animation
    - _Requirements: 17.2_

- [x] 8. Create layout components
  - [x] 8.1 Create components/layout/Header.tsx
    - Implement logo with link to homepage
    - Create main navigation menu with links
    - Implement services dropdown menu with 6 service links
    - Add sticky behavior on scroll with Framer Motion
    - Implement mobile hamburger menu with slide-in animation
    - Add active page highlighting
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.7_
  
  - [x] 8.2 Create components/layout/Footer.tsx
    - Display company information from company-info.ts
    - Create navigation links organized by category
    - Add social media links (Facebook, Zalo, Messenger)
    - Implement responsive grid layout
    - Add copyright and legal information
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [x] 8.3 Create components/layout/StickyContactBar.tsx
    - Implement 5 action buttons: Call, Zalo, Messenger, Live Chat, Profile Download
    - Add fixed positioning with proper z-index
    - Implement smooth hover animations
    - Make responsive for mobile (smaller size)
    - Add tooltips on hover
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7, 19.8_
  
  - [x] 8.4 Create components/layout/Breadcrumbs.tsx
    - Implement breadcrumb navigation with schema.org BreadcrumbList markup
    - Generate breadcrumbs from current route
    - Add separator icons
    - Make last item non-clickable
    - _Requirements: 28.2, 28.5, 28.6_

- [x] 9. Create shared components
  - [x] 9.1 Create components/shared/ServiceCard.tsx
    - Display service icon, title, and short description
    - Add "Learn More" link to service page
    - Implement card hover effect
    - _Requirements: 4.3, 4.4_
  
  - [x] 9.2 Create components/shared/ProjectCard.tsx
    - Display project thumbnail with overlay
    - Show title and category
    - Add hover zoom effect
    - Link to project detail page
    - _Requirements: 7.5, 13.2_
  
  - [x] 9.3 Create components/shared/BlogCard.tsx
    - Display thumbnail, title, excerpt, author, and date
    - Show category tags and reading time
    - Implement hover effect
    - Support default and featured variants
    - _Requirements: 9.2, 14.2, 15.8_
  
  - [x] 9.4 Create components/shared/ContactForm.tsx
    - Implement form fields: name, email, phone, service, message
    - Integrate React Hook Form with Zod validation
    - Add client-side validation with error messages
    - Display success message on valid submission
    - Add loading state during validation
    - Support service preselection prop
    - _Requirements: 12.2, 12.3, 12.4, 12.5, 18.4_
  
  - [x] 9.5 Create components/shared/SearchBar.tsx
    - Implement search input with icon
    - Add debounced input handling (300ms)
    - Show clear button when text is present
    - Handle Enter key to submit search
    - _Requirements: 2.2, 2.3, 29.4, 29.7_
  
  - [x] 9.6 Create components/shared/FilterTabs.tsx
    - Implement horizontal tab layout
    - Add active tab highlighting
    - Implement smooth transition animation
    - Make tabs scrollable on mobile
    - _Requirements: 7.2, 7.3, 13.2_
  
  - [x] 9.7 Create components/shared/Popup.tsx
    - Implement delayed popup appearance (5s or 50% scroll)
    - Add close button and outside click to dismiss
    - Implement cookie storage to prevent re-showing (7 days)
    - Add backdrop overlay with animation
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_

- [x] 10. Create homepage components
  - [x] 10.1 Create components/home/HeroSection.tsx
    - Implement full-width background image/video
    - Display centered title, description, and CTA button
    - Integrate SearchBar component
    - Add responsive typography
    - Implement Framer Motion animations (fade-in, slide-up)
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 23.2_
  
  - [x] 10.2 Create components/home/AboutSection.tsx
    - Display company introduction content
    - Embed video with modal player
    - Implement video play functionality
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [x] 10.3 Create components/home/ServicesGrid.tsx
    - Implement grid layout (3 columns desktop, 2 tablet, 1 mobile)
    - Render ServiceCard for each of 6 services
    - Add hover effects with scale animation
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 23.3_
  
  - [x] 10.4 Create components/home/StatsSection.tsx
    - Display 4 statistics: 1000+ projects, 100+ campaigns, 500+ clients, 200+ partners
    - Implement animated counter from 0 to target value
    - Use Intersection Observer to trigger animation on scroll
    - Implement responsive grid layout
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [x] 10.5 Create components/home/LogoSlider.tsx
    - Implement infinite horizontal scroll animation
    - Add pause on hover functionality
    - Duplicate logos for seamless loop
    - Apply grayscale with color on hover
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [x] 10.6 Create components/home/ProjectGallery.tsx
    - Integrate FilterTabs component for category filtering
    - Implement grid layout with ProjectCard components
    - Add filter state management
    - Include "View All" link to projects page
    - Implement smooth filter transitions
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [x] 10.7 Create components/home/Testimonials.tsx
    - Implement carousel or grid layout
    - Display avatar, name, position, company, content, and rating
    - Add navigation arrows
    - Implement auto-play with pause on hover
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [x] 10.8 Create components/home/BlogSection.tsx
    - Display 6 latest blog posts
    - Render BlogCard for each post
    - Add "View All" link to blog page
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [-] 11. Create homepage
  - Implement app/page.tsx with all homepage sections
  - Integrate HeroSection, AboutSection, ServicesGrid, StatsSection, LogoSlider, ProjectGallery, Testimonials, and BlogSection
  - Add SEO metadata with Organization and WebSite schema
  - Implement scroll animations with Framer Motion
  - _Requirements: 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1, 23.2, 24.5_

- [x] 12. Checkpoint - Verify homepage functionality
  - Ensure all homepage sections render correctly
  - Test responsive layout on mobile, tablet, and desktop
  - Verify all animations work smoothly
  - Test search functionality
  - Ensure all tests pass, ask the user if questions arise

- [x] 13. Create service pages
  - [x] 13.1 Create service page template
    - Implement app/dich-vu/[slug]/page.tsx with dynamic routing
    - Use generateStaticParams to generate all 6 service pages
    - Display service title, full description, and icon
    - Show process steps with numbered list
    - Display benefits list
    - Show related projects using ProjectCard
    - Integrate ContactForm with service preselection
    - Add SEO metadata with Service schema
    - _Requirements: 4.2, 18.1, 18.2, 18.3, 18.4, 18.5, 18.6_
  
  - [x] 13.2 Implement breadcrumbs for service pages
    - Add Breadcrumbs component to service page layout
    - _Requirements: 28.2, 28.5_

- [x] 14. Create projects pages
  - [x] 14.1 Create projects listing page
    - Implement app/du-an/page.tsx
    - Display all projects with ProjectCard
    - Integrate FilterTabs for category filtering
    - Implement pagination or infinite scroll
    - Add SEO metadata
    - _Requirements: 13.1, 13.2, 13.3, 13.5_
  
  - [x] 14.2 Create project detail page
    - Implement app/du-an/[slug]/page.tsx with dynamic routing
    - Use generateStaticParams to generate all project pages
    - Display project images in gallery
    - Show project description, client, technologies, and completion date
    - Add link to related service
    - Add SEO metadata
    - _Requirements: 13.4, 13.5_
  
  - [x] 14.3 Implement breadcrumbs for project pages
    - Add Breadcrumbs component to project pages
    - _Requirements: 28.2, 28.5_

- [x] 15. Create blog pages
  - [x] 15.1 Create blog listing page
    - Implement app/blog/page.tsx
    - Display all blog posts with BlogCard
    - Implement pagination
    - Create sidebar with categories, tags, and popular posts
    - Add category and tag filtering
    - Add SEO metadata
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6_
  
  - [x] 15.2 Create blog post detail page
    - Implement app/blog/[slug]/page.tsx with dynamic routing
    - Use generateStaticParams to generate all blog post pages
    - Display post title, content, author info, date, categories, and tags
    - Show table of contents for long posts
    - Display reading time estimate
    - Show related posts at the end
    - Add social media share buttons (Facebook, Twitter, LinkedIn)
    - Add SEO metadata with Article schema
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8_
  
  - [x] 15.3 Implement breadcrumbs for blog pages
    - Add Breadcrumbs component to blog pages
    - _Requirements: 28.2, 28.5_

- [x] 16. Create additional pages
  - [x] 16.1 Create About page
    - Implement app/ve-chung-toi/page.tsx
    - Display company history, vision, mission, and core values
    - Show team and company culture information
    - Add SEO metadata
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_
  
  - [x] 16.2 Create Contact page
    - Implement app/lien-he/page.tsx
    - Integrate ContactForm component
    - Embed Google Maps with company address
    - Display contact information
    - Add SEO metadata
    - _Requirements: 12.1, 12.2, 12.6_
  
  - [x] 16.3 Create Careers listing page
    - Implement app/tuyen-dung/page.tsx
    - Display all job listings with title, description, location, and deadline
    - Add SEO metadata
    - _Requirements: 16.1, 16.2, 16.5_
  
  - [x] 16.4 Create Career detail page
    - Implement app/tuyen-dung/[slug]/page.tsx with dynamic routing
    - Use generateStaticParams to generate all job pages
    - Display job details, requirements, and benefits
    - Add apply link/button
    - Add SEO metadata with JobPosting schema
    - _Requirements: 16.3, 16.4, 16.5, 24.5_
  
  - [x] 16.5 Create Support page
    - Implement app/ho-tro-khach-hang/page.tsx
    - Display FAQ with Accordion component
    - Add search box for FAQ filtering
    - Show support contact information
    - Add SEO metadata with FAQPage schema
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 24.5_
  
  - [x] 16.6 Create custom 404 page
    - Implement app/not-found.tsx
    - Display friendly error message
    - Add navigation links to main pages
    - Include search bar
    - Suggest popular pages
    - _Requirements: 27.1, 27.2, 27.3_
  
  - [x] 16.7 Create error boundary
    - Implement app/error.tsx
    - Display user-friendly error message
    - Add "Go to Homepage" button
    - Log errors to console
    - _Requirements: 27.4, 27.5_

- [x] 17. Implement search functionality
  - Create search results page or modal
  - Integrate search logic from lib/search.ts
  - Display search results with title, excerpt, and link
  - Implement result highlighting
  - Show "no results" message with suggestions
  - Limit results to 10 items per page with pagination
  - _Requirements: 29.1, 29.2, 29.3, 29.5, 29.6, 29.7_

- [x] 18. Implement popup functionality
  - Integrate Popup component into root layout
  - Configure popup to appear after 5s or 50% scroll
  - Set up cookie management for 7-day suppression
  - Add content for "Tích xanh Facebook" service
  - Link popup CTA to service page or contact form
  - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6_

- [x] 19. Checkpoint - Verify all pages and features
  - Test navigation between all pages
  - Verify all forms work correctly with validation
  - Test search functionality across all content types
  - Verify popup appears and dismisses correctly
  - Test sticky contact bar on all pages
  - Ensure all tests pass, ask the user if questions arise

- [x] 20. Implement SEO optimizations
  - [x] 20.1 Optimize meta tags for all pages
    - Ensure unique title and description for each page
    - Verify title length (50-60 characters) and description length (150-160 characters)
    - Add keywords meta tag where appropriate
    - _Requirements: 24.1_
  
  - [x] 20.2 Implement structured data for all page types
    - Add Organization schema to homepage
    - Add WebSite schema with search action to homepage
    - Add Service schema to service pages
    - Add Article schema to blog posts
    - Add JobPosting schema to career pages
    - Add FAQPage schema to support page
    - Validate structured data with Google Rich Results Test
    - _Requirements: 24.5_
  
  - [x] 20.3 Optimize heading hierarchy
    - Ensure each page has unique H1 with primary keyword
    - Verify H2-H6 are properly nested
    - _Requirements: 24.9, 24.10_
  
  - [x] 20.4 Implement internal linking strategy
    - Add links between related services and projects
    - Link related blog posts
    - Use descriptive anchor text with keywords
    - _Requirements: 24.11, 24.12_
  
  - [x] 20.5 Optimize all images
    - Use next/image for all images
    - Add descriptive alt text to all images
    - Provide width and height attributes
    - Implement lazy loading for below-the-fold images
    - Use descriptive filenames
    - _Requirements: 24.7, 25.1_

- [x] 21. Implement performance optimizations
  - [x] 21.1 Optimize code splitting and lazy loading
    - Implement dynamic imports for heavy components (Modal, Popup, Video Player)
    - Lazy load Framer Motion animations
    - _Requirements: 25.2_
  
  - [x] 21.2 Optimize fonts
    - Configure next/font for Google Fonts
    - Preload critical fonts
    - Use font-display: swap
    - _Requirements: 25.8, 25.9_
  
  - [x] 21.3 Optimize CSS
    - Configure Tailwind CSS with PurgeCSS
    - Inline critical CSS for above-the-fold content
    - Defer non-critical CSS
    - _Requirements: 25.3, 25.10, 25.11_
  
  - [x] 21.4 Optimize third-party resources
    - Add preconnect for Google Fonts and Google Maps
    - Add dns-prefetch for non-critical domains
    - Minimize third-party scripts
    - _Requirements: 25.12, 25.13_
  
  - [x] 21.5 Configure caching strategy
    - Set Cache-Control headers for static assets (max-age=31536000, immutable)
    - Set Cache-Control headers for HTML pages (max-age=0, must-revalidate)
    - _Requirements: 25.4_
  
  - [x] 21.6 Implement prefetching
    - Add prefetching for navigation links
    - _Requirements: 25.7_

- [x] 22. Implement security measures
  - Configure Content Security Policy headers in next.config.js
  - Ensure HTTPS is enforced (deployment configuration)
  - Verify all user inputs are validated and sanitized
  - Review dependencies for security vulnerabilities (npm audit)
  - _Requirements: 26.1, 26.2, 26.3, 26.4, 26.5_

- [x] 23. Implement accessibility features
  - Ensure all interactive elements have minimum 44x44px touch target on mobile
  - Verify color contrast ratios meet WCAG AA standards
  - Implement prefers-reduced-motion for animations
  - Test keyboard navigation
  - Add ARIA labels where needed
  - _Requirements: 1.3, 22.4, 23.6_

- [ ] 24. Final responsive testing
  - Test all pages on mobile devices (iPhone, Android phones)
  - Test all pages on tablets (iPad, Android tablets)
  - Test all pages on desktop browsers (Chrome, Firefox, Safari, Edge)
  - Verify mobile-first indexing compatibility
  - Run Google Mobile-Friendly Test
  - _Requirements: 22.1, 22.2, 22.3, 22.5, 22.6, 22.7_

- [ ] 25. Performance testing and optimization
  - Run Lighthouse audit on all major pages
  - Verify Lighthouse Performance score >= 90
  - Verify Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
  - Test page load time on 3G connection (< 3 seconds for homepage)
  - Optimize any pages that don't meet performance targets
  - _Requirements: 24.8, 25.5, 25.6_

- [ ] 26. SEO validation
  - Validate sitemap.xml format and completeness
  - Validate robots.txt configuration
  - Test Open Graph tags with Facebook Debugger
  - Validate all structured data with Google Rich Results Test
  - Verify canonical URLs are correct
  - Check for duplicate content issues
  - _Requirements: 24.2, 24.3, 24.4, 24.5, 24.6_

- [ ] 27. Final integration and testing
  - Test all user flows end-to-end
  - Verify all links work correctly
  - Test all forms with valid and invalid data
  - Verify all animations work smoothly at 60fps
  - Test error handling (404, runtime errors)
  - Verify breadcrumbs work on all pages
  - Test popup behavior and cookie storage
  - Test sticky contact bar on all pages
  - _Requirements: All requirements_

- [ ] 28. Build and deployment preparation
  - Run production build with `next build`
  - Verify static export generates all pages correctly
  - Test production build locally
  - Optimize bundle size if needed
  - Prepare environment variables for deployment
  - Create deployment documentation
  - _Requirements: 25.3, 25.4_

## Notes

- This is a static website with no backend, so all content is hardcoded in TypeScript data files
- All forms use client-side validation only and do not submit to a server
- Testing focuses on unit tests for validation logic, integration tests for user flows, and manual testing for UI/UX
- Property-based testing is not applicable for this UI-focused static website
- SEO optimization is critical throughout the implementation
- Performance targets: Lighthouse >= 90, LCP < 2.5s, FID < 100ms, CLS < 0.1
- All pages must be responsive and work on mobile, tablet, and desktop
- Animations should respect prefers-reduced-motion for accessibility
- Each task references specific requirements for traceability

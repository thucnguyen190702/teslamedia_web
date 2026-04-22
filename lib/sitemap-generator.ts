/**
 * Sitemap Generator for Tesla Media Website
 * Generates comprehensive sitemap.xml for better SEO
 */

import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog-posts';
import { jobs } from '@/data/jobs';

export interface SitemapUrl {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const baseUrl = 'https://teslamedia.vn';

export function generateSitemap(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFreq: 'weekly' as const },
    { path: '/ve-chung-toi', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/lien-he', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/dich-vu', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/du-an', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/blog', priority: 0.8, changeFreq: 'daily' as const },
    { path: '/tuyen-dung', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/ho-tro-khach-hang', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/tim-kiem', priority: 0.5, changeFreq: 'monthly' as const },
  ];

  staticPages.forEach(page => {
    urls.push({
      url: `${baseUrl}${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFreq,
      priority: page.priority
    });
  });

  // Service pages
  services.forEach(service => {
    urls.push({
      url: `${baseUrl}/dich-vu/${service.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    });
  });

  // Project pages
  projects.forEach(project => {
    urls.push({
      url: `${baseUrl}/du-an/${project.slug}`,
      lastModified: project.completedDate,
      changeFrequency: 'yearly',
      priority: 0.6
    });
  });

  // Blog posts
  blogPosts.forEach(post => {
    urls.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedDate || post.publishedDate,
      changeFrequency: 'monthly',
      priority: 0.7
    });
  });

  // Job pages
  jobs.forEach(job => {
    urls.push({
      url: `${baseUrl}/tuyen-dung/${job.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6
    });
  });

  return urls.sort((a, b) => b.priority - a.priority);
}

export function generateSitemapXML(): string {
  const urls = generateSitemap();
  
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';
  
  const urlElements = urls.map(url => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `${xmlHeader}\n${urlsetOpen}${urlElements}\n${urlsetClose}`;
}

// Generate robots.txt content
export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow important files
Allow: /images/
Allow: /icons/
Allow: /*.css
Allow: /*.js

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;
}
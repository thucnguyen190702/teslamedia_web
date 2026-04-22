/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'

export interface SEOProps {
  title: string
  description: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'service'
  structuredData?: object
  noIndex?: boolean
}

// SEO validation helpers
export function validateMetaTitle(title: string): { isValid: boolean; length: number; warning?: string } {
  const length = title.length;
  if (length < 30) {
    return { isValid: false, length, warning: 'Title quá ngắn (nên 50-60 ký tự)' };
  }
  if (length > 60) {
    return { isValid: false, length, warning: 'Title quá dài (nên 50-60 ký tự)' };
  }
  return { isValid: true, length };
}

export function validateMetaDescription(description: string): { isValid: boolean; length: number; warning?: string } {
  const length = description.length;
  if (length < 120) {
    return { isValid: false, length, warning: 'Description quá ngắn (nên 150-160 ký tự)' };
  }
  if (length > 160) {
    return { isValid: false, length, warning: 'Description quá dài (nên 150-160 ký tự)' };
  }
  return { isValid: true, length };
}

export function generateMetadata({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  noIndex = false,
}: SEOProps): Metadata {
  const fullTitle = title.includes('Tesla Media') ? title : `${title} | Tesla Media`
  
  return {
    title: fullTitle,
    description,
    keywords,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      type: ogType,
      locale: 'vi_VN',
      url: canonicalUrl,
      siteName: 'Tesla Media',
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: canonicalUrl ? {
      canonical: canonicalUrl,
    } : undefined,
  }
}

export function generateStructuredData(type: string, data: any): string {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return JSON.stringify(baseStructuredData)
}

// Organization structured data for homepage
export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tesla Media',
  description: 'Công ty chuyên về Digital Marketing tại Việt Nam',
  url: 'https://teslamedia.vn',
  logo: 'https://teslamedia.vn/images/logo.png',
  image: 'https://teslamedia.vn/images/og-image.jpg',
  telephone: '+84-123-456-789',
  email: 'info@teslamedia.vn',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Đường ABC',
    addressLocality: 'Quận 1',
    addressRegion: 'TP. Hồ Chí Minh',
    postalCode: '700000',
    addressCountry: 'VN',
  },
  sameAs: [
    'https://facebook.com/teslamedia',
    'https://zalo.me/teslamedia',
  ],
  foundingDate: '2020',
  numberOfEmployees: '50-100',
  areaServed: 'Vietnam',
  serviceType: [
    'Digital Marketing',
    'Website Design',
    'Brand Identity',
    'Content Management',
    'Landing Page',
    'SEO Services',
    'Marketing Outsourcing',
  ],
}

// Website structured data with search action
export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tesla Media',
  url: 'https://teslamedia.vn',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://teslamedia.vn/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

// Breadcrumb structured data generator
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Article structured data generator
export function generateArticleStructuredData({
  title,
  description,
  author,
  publishedDate,
  updatedDate,
  image,
  url,
}: {
  title: string
  description: string
  author: string
  publishedDate: string
  updatedDate?: string
  image: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: [image],
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tesla Media',
      logo: {
        '@type': 'ImageObject',
        url: 'https://teslamedia.vn/images/logo.png',
      },
    },
    datePublished: publishedDate,
    dateModified: updatedDate || publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

// Service structured data generator
export function generateServiceStructuredData({
  name,
  description,
  provider = 'Tesla Media',
  areaServed = 'Vietnam',
  serviceType,
}: {
  name: string
  description: string
  provider?: string
  areaServed?: string
  serviceType: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    areaServed,
    serviceType,
  }
}

// FAQ structured data generator
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Job posting structured data generator
export function generateJobPostingStructuredData({
  title,
  description,
  location,
  employmentType,
  datePosted,
  validThrough,
  baseSalary,
}: {
  title: string
  description: string
  location: string
  employmentType: string
  datePosted: string
  validThrough: string
  baseSalary?: {
    currency: string
    value: {
      minValue: number
      maxValue: number
    }
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Tesla Media',
      sameAs: 'https://teslamedia.vn',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location,
        addressCountry: 'VN',
      },
    },
    employmentType,
    datePosted,
    validThrough,
    baseSalary: baseSalary ? {
      '@type': 'MonetaryAmount',
      currency: baseSalary.currency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: baseSalary.value.minValue,
        maxValue: baseSalary.value.maxValue,
        unitText: 'MONTH',
      },
    } : undefined,
  }
}

// Component to inject structured data into page head
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}
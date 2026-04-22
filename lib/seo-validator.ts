/**
 * SEO Validation Utilities
 * Helps validate SEO elements across the website
 */

export interface SEOValidationResult {
  isValid: boolean;
  score: number; // 0-100
  issues: string[];
  warnings: string[];
  suggestions: string[];
}

export interface PageSEOData {
  title: string;
  description: string;
  keywords?: string;
  h1: string;
  headingStructure: { level: number; text: string }[];
  images: { src: string; alt: string; hasWidthHeight: boolean }[];
  internalLinks: { href: string; text: string }[];
  canonicalUrl?: string;
  ogImage?: string;
}

export function validatePageSEO(data: PageSEOData): SEOValidationResult {
  const issues: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Title validation
  if (!data.title) {
    issues.push('Thiếu title tag');
    score -= 20;
  } else {
    if (data.title.length < 30) {
      warnings.push('Title quá ngắn (nên 50-60 ký tự)');
      score -= 5;
    } else if (data.title.length > 60) {
      warnings.push('Title quá dài (nên 50-60 ký tự)');
      score -= 5;
    }
    
    if (!data.title.includes('Tesla Media')) {
      suggestions.push('Nên bao gồm tên thương hiệu "Tesla Media" trong title');
      score -= 3;
    }
  }

  // Description validation
  if (!data.description) {
    issues.push('Thiếu meta description');
    score -= 15;
  } else {
    if (data.description.length < 120) {
      warnings.push('Meta description quá ngắn (nên 150-160 ký tự)');
      score -= 5;
    } else if (data.description.length > 160) {
      warnings.push('Meta description quá dài (nên 150-160 ký tự)');
      score -= 5;
    }
  }

  // H1 validation
  if (!data.h1) {
    issues.push('Thiếu H1 tag');
    score -= 15;
  } else {
    // Check if H1 contains primary keyword
    const h1Lower = data.h1.toLowerCase();
    const titleLower = data.title.toLowerCase();
    const hasKeywordOverlap = titleLower.split(' ').some(word => 
      word.length > 3 && h1Lower.includes(word)
    );
    
    if (!hasKeywordOverlap) {
      suggestions.push('H1 nên chứa từ khóa chính từ title');
      score -= 3;
    }
  }

  // Heading hierarchy validation
  const headings = data.headingStructure;
  if (headings.length > 0) {
    let previousLevel = 1;
    let hasH1 = false;
    
    headings.forEach((heading, index) => {
      if (heading.level === 1) {
        if (hasH1) {
          warnings.push('Có nhiều hơn 1 H1 tag trên trang');
          score -= 5;
        }
        hasH1 = true;
      }
      
      if (heading.level > previousLevel + 1) {
        warnings.push(`Heading hierarchy không đúng: H${previousLevel} -> H${heading.level}`);
        score -= 3;
      }
      
      previousLevel = heading.level;
    });
  }

  // Image optimization validation
  const images = data.images;
  let imagesWithoutAlt = 0;
  let imagesWithoutDimensions = 0;
  
  images.forEach(image => {
    if (!image.alt || image.alt.trim().length === 0) {
      imagesWithoutAlt++;
    }
    if (!image.hasWidthHeight) {
      imagesWithoutDimensions++;
    }
  });
  
  if (imagesWithoutAlt > 0) {
    issues.push(`${imagesWithoutAlt} hình ảnh thiếu alt text`);
    score -= Math.min(imagesWithoutAlt * 2, 10);
  }
  
  if (imagesWithoutDimensions > 0) {
    warnings.push(`${imagesWithoutDimensions} hình ảnh thiếu width/height attributes`);
    score -= Math.min(imagesWithoutDimensions * 1, 5);
  }

  // Internal linking validation
  const internalLinks = data.internalLinks;
  if (internalLinks.length < 3) {
    suggestions.push('Nên có ít nhất 3-5 internal links để cải thiện SEO');
    score -= 3;
  }
  
  // Check for generic anchor text
  const genericAnchors = internalLinks.filter(link => 
    ['click here', 'read more', 'xem thêm', 'tại đây', 'here'].includes(link.text.toLowerCase())
  );
  
  if (genericAnchors.length > 0) {
    warnings.push('Có anchor text không mô tả (như "xem thêm", "tại đây")');
    score -= 3;
  }

  // Canonical URL validation
  if (!data.canonicalUrl) {
    warnings.push('Thiếu canonical URL');
    score -= 3;
  }

  // Open Graph validation
  if (!data.ogImage) {
    warnings.push('Thiếu Open Graph image');
    score -= 3;
  }

  // Keywords validation
  if (!data.keywords || data.keywords.trim().length === 0) {
    suggestions.push('Nên thêm meta keywords (mặc dù không quan trọng cho Google)');
    score -= 1;
  }

  return {
    isValid: issues.length === 0,
    score: Math.max(0, Math.min(100, score)),
    issues,
    warnings,
    suggestions
  };
}

// Validate entire website SEO
export function validateWebsiteSEO(pages: { url: string; data: PageSEOData }[]): {
  overallScore: number;
  pageResults: { url: string; result: SEOValidationResult }[];
  globalIssues: string[];
} {
  const pageResults = pages.map(page => ({
    url: page.url,
    result: validatePageSEO(page.data)
  }));

  const overallScore = pageResults.reduce((sum, page) => sum + page.result.score, 0) / pageResults.length;
  
  const globalIssues: string[] = [];
  
  // Check for duplicate titles
  const titles = pages.map(p => p.data.title);
  const duplicateTitles = titles.filter((title, index) => titles.indexOf(title) !== index);
  if (duplicateTitles.length > 0) {
    globalIssues.push('Có title tags trùng lặp');
  }
  
  // Check for duplicate descriptions
  const descriptions = pages.map(p => p.data.description);
  const duplicateDescriptions = descriptions.filter((desc, index) => descriptions.indexOf(desc) !== index);
  if (duplicateDescriptions.length > 0) {
    globalIssues.push('Có meta descriptions trùng lặp');
  }

  return {
    overallScore,
    pageResults,
    globalIssues
  };
}

// Generate SEO report
export function generateSEOReport(results: ReturnType<typeof validateWebsiteSEO>): string {
  let report = `# SEO Audit Report - Tesla Media Website\n\n`;
  report += `**Overall Score: ${results.overallScore.toFixed(1)}/100**\n\n`;
  
  if (results.globalIssues.length > 0) {
    report += `## Global Issues\n`;
    results.globalIssues.forEach(issue => {
      report += `- ❌ ${issue}\n`;
    });
    report += `\n`;
  }
  
  report += `## Page-by-Page Results\n\n`;
  
  results.pageResults.forEach(page => {
    report += `### ${page.url}\n`;
    report += `**Score: ${page.result.score}/100**\n\n`;
    
    if (page.result.issues.length > 0) {
      report += `**Issues:**\n`;
      page.result.issues.forEach(issue => {
        report += `- ❌ ${issue}\n`;
      });
      report += `\n`;
    }
    
    if (page.result.warnings.length > 0) {
      report += `**Warnings:**\n`;
      page.result.warnings.forEach(warning => {
        report += `- ⚠️ ${warning}\n`;
      });
      report += `\n`;
    }
    
    if (page.result.suggestions.length > 0) {
      report += `**Suggestions:**\n`;
      page.result.suggestions.forEach(suggestion => {
        report += `- 💡 ${suggestion}\n`;
      });
      report += `\n`;
    }
    
    report += `---\n\n`;
  });
  
  return report;
}
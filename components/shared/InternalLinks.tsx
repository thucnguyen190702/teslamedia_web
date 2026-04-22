import Link from 'next/link';
import { InternalLink } from '@/lib/internal-links';

interface InternalLinksProps {
  links: InternalLink[];
  title?: string;
  className?: string;
  variant?: 'card' | 'list' | 'inline';
}

export default function InternalLinks({ 
  links, 
  title = "Xem thêm", 
  className = "",
  variant = 'card'
}: InternalLinksProps) {
  if (links.length === 0) return null;

  if (variant === 'inline') {
    return (
      <div className={`inline-flex flex-wrap gap-2 ${className}`}>
        {links.map((link, index) => (
          <span key={link.url}>
            <Link
              href={link.url}
              className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
              title={link.description}
            >
              {link.title}
            </Link>
            {index < links.length - 1 && <span className="text-gray-400 mx-1">•</span>}
          </span>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={`${className}`}>
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        )}
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.url}>
              <Link
                href={link.url}
                className="text-primary-600 hover:text-primary-700 hover:underline font-medium flex items-center group"
                title={link.description}
              >
                <svg 
                  className="w-4 h-4 mr-2 text-gray-400 group-hover:text-primary-600 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {link.title}
              </Link>
              {link.description && (
                <p className="text-sm text-gray-600 ml-6 mt-1">{link.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Default card variant
  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      <div className="grid gap-3">
        {links.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all group"
            title={link.description}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  {link.title}
                </h4>
                {link.description && (
                  <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                )}
              </div>
              <svg 
                className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
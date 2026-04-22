'use client';

import Link from 'next/link';

interface SkipLinkProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Skip link component for keyboard navigation accessibility
 * Allows users to skip directly to main content
 */
export default function SkipLink({ 
  targetId, 
  children, 
  className = '' 
}: SkipLinkProps) {
  return (
    <Link
      href={`#${targetId}`}
      className={`
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
        bg-primary-600 text-white px-4 py-2 rounded-md z-50 
        font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600
        min-h-touch min-w-touch flex items-center justify-center
        ${className}
      `}
      onClick={() => {
        // Ensure the target element receives focus
        const target = document.getElementById(targetId);
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }}
    >
      {children}
    </Link>
  );
}

/**
 * Multiple skip links component for complex pages
 */
interface SkipLinksProps {
  links: Array<{
    targetId: string;
    label: string;
  }>;
}

export function SkipLinks({ links }: SkipLinksProps) {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <div className="fixed top-4 left-4 z-50 flex flex-col gap-2">
        {links.map((link) => (
          <SkipLink key={link.targetId} targetId={link.targetId}>
            {link.label}
          </SkipLink>
        ))}
      </div>
    </div>
  );
}
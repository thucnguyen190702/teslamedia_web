'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    hover = true, 
    padding = 'md', 
    className = '', 
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'bg-white rounded-card border border-secondary-200 transition-shadow duration-200';
    
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };
    
    const shadowClasses = hover 
      ? 'shadow-card hover:shadow-card-hover' 
      : 'shadow-card';
    
    const classes = `${baseClasses} ${shadowClasses} ${paddingClasses[padding]} ${className}`;
    
    const cardContent = (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
    
    if (hover) {
      return (
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {cardContent}
        </motion.div>
      );
    }
    
    return cardContent;
  }
);

Card.displayName = 'Card';

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`mb-4 ${className}`} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Title Component
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = 'h3', className = '', children, ...props }, ref) => {
    return (
      <Component 
        ref={ref} 
        className={`text-lg font-semibold text-secondary-900 ${className}`} 
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

// Card Content Component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`text-secondary-700 ${className}`} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

// Card Footer Component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`mt-4 pt-4 border-t border-secondary-200 ${className}`} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;
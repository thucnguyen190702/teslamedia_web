'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenItems?: string[];
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenItems = [],
  className = ''
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(defaultOpenItems)
  );

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (newOpenItems.has(itemId)) {
        newOpenItems.delete(itemId);
      } else {
        if (!allowMultiple) {
          newOpenItems.clear();
        }
        newOpenItems.add(itemId);
      }
      
      return newOpenItems;
    });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
};

interface AccordionItemComponentProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItemComponent: React.FC<AccordionItemComponentProps> = ({
  item,
  isOpen,
  onToggle
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border border-secondary-200 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Question Button */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset transition-colors min-h-touch"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.id}`}
        id={`accordion-button-${item.id}`}
      >
        <span className="text-lg font-medium text-secondary-900 pr-4">
          {item.question}
        </span>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <svg 
            className="w-5 h-5 text-secondary-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </motion.div>
      </button>

      {/* Answer Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-content-${item.id}`}
            ref={contentRef}
            role="region"
            aria-labelledby={`accordion-button-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: 'easeInOut'
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 pt-2 border-t border-secondary-100">
              <div 
                className="text-secondary-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Single Accordion Item Component (for standalone use)
export interface SingleAccordionProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
  className?: string;
}

export const SingleAccordion: React.FC<SingleAccordionProps> = ({
  question,
  answer,
  defaultOpen = false,
  className = ''
}) => {
  // State is intentionally unused but kept for future expansion
  useState(defaultOpen);

  return (
    <Accordion
      items={[{ id: 'single', question, answer }]}
      defaultOpenItems={defaultOpen ? ['single'] : []}
      className={className}
    />
  );
};

export default Accordion;
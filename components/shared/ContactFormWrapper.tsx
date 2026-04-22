'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ContactForm from './ContactForm';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');

  return <ContactForm servicePreselect={serviceParam || undefined} />;
}

export default function ContactFormWrapper() {
  return (
    <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded"></div>}>
      <ContactFormContent />
    </Suspense>
  );
}
'use client';

import { useState } from 'react';
import { Button, Card, CardHeader, CardTitle, CardContent, Modal, ModalContent, ModalFooter, Accordion } from './index';

// Test component to verify all UI components work
const TestComponents: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accordionItems = [
    {
      id: '1',
      question: 'What is Tesla Media?',
      answer: 'Tesla Media is a digital marketing company specializing in website design, branding, and SEO services.'
    },
    {
      id: '2',
      question: 'What services do you offer?',
      answer: 'We offer website design, brand identity, content management, landing pages, comprehensive SEO, and outsourced marketing services.'
    }
  ];

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-secondary-900 mb-8">UI Components Test</h1>
      
      {/* Button Tests */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </section>

      {/* Card Tests */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
            </CardHeader>
            <CardContent>
              This is a basic card with hover effects and shadow.
            </CardContent>
          </Card>
          
          <Card hover={false}>
            <CardHeader>
              <CardTitle>No Hover Card</CardTitle>
            </CardHeader>
            <CardContent>
              This card doesn't have hover effects.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modal Test */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Modal</h2>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Test Modal"
          size="md"
        >
          <ModalContent>
            <p>This is a test modal with animations and proper accessibility features.</p>
            <p className="mt-4">You can close it by clicking the X button, pressing Escape, or clicking outside.</p>
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      {/* Accordion Test */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Accordion</h2>
        <Accordion items={accordionItems} />
      </section>
    </div>
  );
};

export default TestComponents;
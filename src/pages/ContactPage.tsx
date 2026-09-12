import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ContactSection } from '../components/home/ContactSection';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-28 bg-white text-[#0f172a]">
      <section className="py-16 sm:py-20 border-b border-[#e2e8f0] bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Initiate Engagement"
            title="Strategic Financial & Gold Consultation"
            highlight="With Scalen Stone."
            description="Begin a confidential dialogue with our Senior Advisory Partners. We provide impartial, high-conviction guidance for your instant gold loans and balance sheet."
            align="center"
          />
        </div>
      </section>

      <ContactSection />
    </div>
  );
};

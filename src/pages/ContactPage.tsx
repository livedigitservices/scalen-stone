import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ContactSection } from '../components/home/ContactSection';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-28 bg-white text-[#0e1353]">
      <section className="relative py-20 sm:py-28 border-b border-blue-100/70 overflow-hidden bg-[#f8fafc]">
        {/* Matching Hero Background Image with Luxury Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600&auto=format&fit=crop"
            alt="Scalen Stone corporate headquarters and consultation lounge"
            className="w-full h-full object-cover object-center opacity-15 sm:opacity-20 mix-blend-multiply filter contrast-110"
            loading="eager"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

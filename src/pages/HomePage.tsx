import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { GoldCalculator } from '../components/ui/GoldCalculator';
import { CTASection } from '../components/home/CTASection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <main className="relative">
      {/* 1. Hero Section matching cyangold.in */}
      <HeroSection />

      {/* 2. Feature Split Section ("Secure Gold Loans at Best Rates") */}
      <AboutSection />

      {/* 3. Live Interactive Gold Valuation & Loan Calculator */}
      <section id="calculator" className="py-16 sm:py-20 bg-white relative scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoldCalculator />
        </div>
      </section>

      {/* 4. Services Grid Section (6 Services matching cyangold.in) */}
      <ServicesSection />

      {/* 5. Bottom Royal Navy CTA Banner */}
      <CTASection />

      {/* 6. Contact & Enquiry Form Section */}
      <ContactSection />
    </main>
  );
};

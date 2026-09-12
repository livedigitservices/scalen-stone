import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStatsSection } from '../components/home/TrustStatsSection';
import { AboutSection } from '../components/home/AboutSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { FeaturedSolutionsSection } from '../components/home/FeaturedSolutionsSection';
import { WhyScalenStoneSection } from '../components/home/WhyScalenStoneSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { InvestmentSolutionsSection } from '../components/home/InvestmentSolutionsSection';
import { InsightsSection } from '../components/home/InsightsSection';
import { CTASection } from '../components/home/CTASection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <main className="relative">
      <HeroSection />
      <TrustStatsSection />
      <AboutSection />
      <ServicesSection />
      <FeaturedSolutionsSection />
      <WhyScalenStoneSection />
      <ProcessSection />
      <InvestmentSolutionsSection />
      <InsightsSection />
      <CTASection />
      <ContactSection />
    </main>
  );
};

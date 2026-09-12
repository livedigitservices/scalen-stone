import React from 'react';
import { Check, Scale } from 'lucide-react';
import { Button } from '../ui/Button';

export const AboutSection: React.FC = () => {
  const focuses = [
    "Strategic gold asset monetization",
    "Instant low-interest gold loans",
    "Release of pledged gold & bank buy-back",
    "Certified laser purity testing",
    "Business & working capital finance",
    "Swiss-standard insured vault storage",
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#a67c42]/30 bg-[#fbf7f0] text-xs font-semibold tracking-wider uppercase text-[#a67c42]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a67c42]" />
                About Scalen Stone Finance
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0f172a] leading-[1.15] font-display">
                More Than Finance.{' '}
                <span className="gold-gradient-text block">A Long-Term Partnership.</span>
              </h2>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop"
                alt="Scalen Stone executive conference room and boardroom"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#e2e8f0] flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-xs font-bold text-[#0f172a]">Uncompromising Fiduciary Focus</p>
                  <p className="text-[11px] text-[#475569]">Every decision structured for client capital preservation.</p>
                </div>
                <Scale size={24} className="text-[#a67c42] flex-shrink-0 ml-3" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-lg text-[#334155] leading-relaxed font-normal">
              At <strong className="text-[#0f172a] font-bold">Scalen Stone Finance</strong>, we believe true wealth is not created through speculative guesswork or fleeting market sentiment. It is built systematically through structured, objective, and deeply personalized financial frameworks.
            </p>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              We serve as dedicated financial navigators for families, enterprise founders, and forward-thinking professionals. Our multidisciplinary approach bridges personal life aspirations with institutional-grade capital allocation, instant gold monetization, and rigorous balance sheet defense.
            </p>

            <div className="pt-2">
              <h3 className="text-xs font-bold tracking-wider text-[#a67c42] uppercase mb-4">
                Core Advisory Focus Areas:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {focuses.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#a67c42]/40 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-[#fbf7f0] border border-[#a67c42]/30 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-[#a67c42]" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#334155]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button href="/about" variant="primary" size="md" showArrow>
                Discover Scalen Stone
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Meet Advisory Team
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

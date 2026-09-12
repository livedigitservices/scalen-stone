import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { FEATURED_SOLUTIONS, CLIENT_PERSONAS } from '../data/solutions';
import { Check } from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-white text-[#0f172a]">
      <section className="py-16 sm:py-24 border-b border-[#e2e8f0] bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Lifecycle Architecture"
            title="Strategic Financial & Gold"
            highlight="Solutions."
            description="Whether unlocking 15-minute liquid capital against physical gold, liberating pledged assets from lenders, or building bullion reserves, we tailor solutions to your exact needs."
            align="center"
          />
        </div>
      </section>

      {/* Persona Segments */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Targeted Client Portfolios"
          title="Solutions Tailored By"
          highlight="Client Need."
          description="We align our solutions with individual borrowers, debt-release seekers, and enterprise promoters."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLIENT_PERSONAS.map((persona, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-[#e2e8f0] bg-white shadow-sm flex flex-col justify-between hover:border-[#a67c42] hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#a67c42] uppercase tracking-wider px-2.5 py-1 rounded bg-[#fbf7f0] border border-[#a67c42]/30 inline-block">
                  {persona.tag}
                </span>
                <h3 className="text-lg font-bold text-[#0f172a] font-display">{persona.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{persona.desc}</p>
              </div>
              <div className="pt-6">
                <Button href="/contact" variant="ghost" size="sm" showArrow className="px-0 text-[#a67c42]">
                  Discuss Solution
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The 4 Journey Stages */}
      <section className="py-20 bg-[#f8fafc] border-t border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeader
            eyebrow="Sequential Mastery"
            title="The Four Pillars Of"
            highlight="Gold Monetization."
            description="Our structured discipline guides clients through the natural sequence of wealth creation, asset liberation, and multi-generational security."
            align="center"
          />

          <div className="space-y-12">
            {FEATURED_SOLUTIONS.map((stage) => (
              <div
                key={stage.number}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm"
              >
                <div className="lg:col-span-4 rounded-xl overflow-hidden h-64 border border-[#e2e8f0]">
                  <img src={stage.imageUrl} alt={stage.imageAlt} className="w-full h-full object-cover" />
                </div>
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-[#a67c42]">STAGE {stage.number}</span>
                    <span className="text-xs text-[#94a3b8]">•</span>
                    <span className="text-xs uppercase font-bold text-[#0f172a] tracking-wider">{stage.stage}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0f172a] font-display">{stage.headline}</h3>
                  <p className="text-sm text-[#475569] leading-relaxed">{stage.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    {stage.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#334155]">
                        <Check size={12} className="text-[#a67c42] flex-shrink-0" />
                        <span className="font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

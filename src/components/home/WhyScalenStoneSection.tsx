import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { WHY_SCALEN_STONE, PrincipleItem } from '../../data/principles';

export const WhyScalenStoneSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-[#f8fafc] border-t border-b border-[#e2e8f0] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          eyebrow="The Scalen Stone Difference"
          title="Why Scalen"
          highlight="Stone?"
          description="In an industry clouded by hidden deductions, predatory pawn interest, and lack of transparency, we operate on four uncompromising foundational pillars."
          align="center"
          className="mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {WHY_SCALEN_STONE.map((item: PrincipleItem) => (
            <div
              key={item.number}
              className="relative p-8 sm:p-10 rounded-2xl border border-[#e2e8f0] bg-white space-y-6 shadow-sm hover:shadow-xl hover:border-[#a67c42] transition-all duration-300"
            >
              <div className="flex items-center justify-between pb-6 border-b border-[#e2e8f0]">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#a67c42]">
                    {item.number}
                  </span>
                  <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight font-display">
                    {item.title}
                  </h3>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#a67c42]" />
              </div>

              <blockquote className="text-base sm:text-lg italic font-medium text-[#8c642a] leading-snug">
                "{item.quote}"
              </blockquote>

              <p className="text-sm text-[#475569] leading-relaxed">
                {item.explanation}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-[#e2e8f0]">
                {item.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a67c42] mt-1.5 flex-shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { FEATURED_SOLUTIONS, SolutionBlock } from '../../data/solutions';

export const FeaturedSolutionsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          eyebrow="Lifecycle Financial Roadmap"
          title="Solutions For Every Stage Of Your"
          highlight="Financial Journey."
          description="From unlocking immediate liquidity via dormant gold to liberating predatory debt and building multi-asset resilience, our phased solutions adapt to your needs."
          align="center"
          className="mb-20"
        />

        <div className="space-y-20 lg:space-y-28">
          {FEATURED_SOLUTIONS.map((block: SolutionBlock, idx: number) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={block.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-xl group">
                    <img
                      src={block.imageUrl}
                      alt={block.imageAlt}
                      className="w-full h-80 sm:h-96 lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-6 left-6 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#a67c42]/30 text-xs font-mono font-bold text-[#a67c42] shadow-sm">
                      STAGE {block.number}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#e2e8f0] shadow-md">
                      <p className="text-xs font-bold text-[#a67c42] uppercase tracking-wider">{block.stage}</p>
                      <p className="text-sm font-semibold text-[#0f172a]">{block.subheadline}</p>
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-[#a67c42]">
                      {block.number}
                    </span>
                    <span className="w-8 h-px bg-[#a67c42]/50" />
                    <span className="text-xs uppercase tracking-widest font-bold text-[#64748b]">
                      Stage {block.stage}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight leading-snug font-display">
                    {block.headline}
                  </h3>

                  <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                    {block.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {block.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-3 text-sm text-[#334155]">
                        <div className="w-4 h-4 rounded-full bg-[#fbf7f0] border border-[#a67c42]/30 flex items-center justify-center flex-shrink-0">
                          <Check size={11} className="text-[#a67c42]" />
                        </div>
                        <span className="font-medium">{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button href="/solutions" variant="secondary" size="md" showArrow>
                      Explore Stage {block.stage}
                    </Button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

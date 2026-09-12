import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { PROCESS_STEPS, ProcessStep } from '../../data/process';

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          eyebrow="Our 4-Step Methodology"
          title="A Simpler Way"
          highlight="Forward."
          description="We replace financial ambiguity with a structured, transparent, and sequential roadmap engineered to compound your long-term success."
          align="center"
          className="mb-20"
        />

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative mb-12">
          <div className="absolute top-1/4 left-12 right-12 h-0.5 bg-gradient-to-r from-[#a67c42]/20 via-[#a67c42] to-[#a67c42]/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {PROCESS_STEPS.map((step: ProcessStep) => (
              <div
                key={step.step}
                className="group relative p-6 rounded-xl border border-[#e2e8f0] bg-white shadow-sm flex flex-col justify-between hover:border-[#a67c42] hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full border-2 border-[#a67c42] bg-white flex items-center justify-center font-mono font-bold text-sm text-[#a67c42] group-hover:scale-110 shadow-sm transition-all">
                      {step.step}
                    </div>
                    <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
                      {step.name}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0f172a] mb-2 font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#475569] leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-[11px] text-[#334155] space-y-1">
                    <p className="text-[9px] uppercase font-bold text-[#a67c42] tracking-wider">Milestone</p>
                    <p className="font-semibold text-[#0f172a]">{step.deliverable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="lg:hidden space-y-6 relative">
          <div className="absolute top-6 bottom-6 left-6 w-0.5 bg-[#a67c42]/30 z-0" />

          {PROCESS_STEPS.map((step: ProcessStep) => (
            <div key={step.step} className="relative z-10 pl-16">
              <div className="absolute top-4 left-2 w-9 h-9 -translate-x-1/2 rounded-full border-2 border-[#a67c42] bg-white flex items-center justify-center font-mono text-xs font-bold text-[#a67c42] shadow-sm">
                {step.step}
              </div>

              <div className="p-6 rounded-xl border border-[#e2e8f0] bg-white shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#a67c42] uppercase tracking-wider">{step.name}</span>
                  <span className="text-[10px] text-[#64748b] font-mono">STEP {step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0f172a]">{step.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{step.description}</p>
                <div className="pt-2">
                  <span className="text-[11px] text-[#8c642a] bg-[#fbf7f0] px-2.5 py-1 rounded border border-[#a67c42]/30 inline-block font-medium">
                    Deliverable: {step.deliverable}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

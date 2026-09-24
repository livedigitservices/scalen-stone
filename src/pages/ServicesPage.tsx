import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Compass, 
  Building2, 
  Lock, 
  Layers, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { SERVICES_DATA, ServiceItem } from '../data/services';
import { FAQS } from '../data/faq';

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck size={32} className="text-[#a67c42]" />,
  TrendingUp: <TrendingUp size={32} className="text-[#a67c42]" />,
  Compass: <Compass size={32} className="text-[#a67c42]" />,
  Building2: <Building2 size={32} className="text-[#a67c42]" />,
  Lock: <Lock size={32} className="text-[#a67c42]" />,
  Layers: <Layers size={32} className="text-[#a67c42]" />,
};

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-white text-[#0f172a]">
      <section className="relative py-20 sm:py-28 border-b border-[#e2e8f0] overflow-hidden bg-[#f8fafc]">
        {/* Matching Hero Background Image with Luxury Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=1600&auto=format&fit=crop"
            alt="Gold bullion bars and financial reserves"
            className="w-full h-full object-cover object-center opacity-15 sm:opacity-20 mix-blend-multiply filter contrast-115"
            loading="eager"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            eyebrow="Specialized Gold & Financial Solutions"
            title="Comprehensive Gold Financial Services"
            highlight="Engineered For Growth."
            description="Explore our six core advisory and monetization practices. Each service operates with scientific precision, strict fiduciary alignment, and complete transparency."
            align="center"
          />
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {SERVICES_DATA.map((srv: ServiceItem) => (
          <div
            key={srv.id}
            id={srv.id}
            className="p-8 sm:p-12 rounded-2xl border border-[#e2e8f0] bg-white shadow-md space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-[#fbf7f0] border border-[#a67c42]/20">
                  {iconMap[srv.iconName]}
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-[#a67c42]">
                    SERVICE {srv.number}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-display">
                    {srv.title}
                  </h2>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#475569] px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] w-fit">
                {srv.audience}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-base text-[#8c642a] font-semibold leading-relaxed">
                  {srv.tagline}
                </p>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {srv.description}
                </p>

                <div className="pt-4">
                  <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-3">
                    Strategic Focus Areas:
                  </h4>
                  <div className="space-y-2">
                    {srv.keyPillars.map((pillar, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#334155]">
                        <Check size={14} className="text-[#a67c42] flex-shrink-0" />
                        <span className="font-medium">{pillar}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#a67c42] uppercase tracking-wider mb-3">
                    Key Deliverables:
                  </h4>
                  <ul className="space-y-2 text-xs text-[#475569]">
                    {srv.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a67c42] mt-1.5 flex-shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#e2e8f0]">
                  <Button href="/contact" variant="primary" size="sm" showArrow className="w-full">
                    Consult on {srv.title}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="py-20 bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="Clarity & Disclosures"
            title="Frequently Asked"
            highlight="Questions."
            description="Straightforward answers on gold valuations, loan-to-value ratios, debt clearance, and vault security."
            align="center"
          />

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-2">
                <h3 className="text-base font-bold text-[#0f172a]">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

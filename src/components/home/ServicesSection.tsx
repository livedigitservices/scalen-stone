import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  TrendingUp, 
  Compass, 
  Building2, 
  Lock, 
  Layers, 
  ArrowRight 
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { SERVICES_DATA, ServiceItem } from '../../data/services';

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck size={26} className="text-[#a67c42]" />,
  TrendingUp: <TrendingUp size={26} className="text-[#a67c42]" />,
  Compass: <Compass size={26} className="text-[#a67c42]" />,
  Building2: <Building2 size={26} className="text-[#a67c42]" />,
  Lock: <Lock size={26} className="text-[#a67c42]" />,
  Layers: <Layers size={26} className="text-[#a67c42]" />,
};

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-[#f8fafc] border-t border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          eyebrow="Our Advisory Services"
          title="Financial Solutions Built"
          highlight="Around You."
          description="From immediate 15-minute gold loans and debt-release buy-backs to corporate treasury credit, we provide bespoke financial solutions with complete transparency."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group relative rounded-xl border border-[#e2e8f0] bg-white p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#a67c42] hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-lg bg-[#fbf7f0] border border-[#a67c42]/20 group-hover:border-[#a67c42] transition-colors">
                    {iconMap[service.iconName] || <ShieldCheck size={26} className="text-[#a67c42]" />}
                  </div>
                  <span className="font-mono text-sm font-bold text-[#94a3b8] group-hover:text-[#a67c42] transition-colors">
                    {service.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0f172a] tracking-tight group-hover:text-[#a67c42] transition-colors mb-3 font-display">
                  {service.title}
                </h3>

                <p className="text-sm text-[#475569] leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-8 pt-4 border-t border-[#e2e8f0]">
                  {service.keyPillars.map((pillar, pIdx) => (
                    <li key={pIdx} className="text-xs text-[#334155] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a67c42]" />
                      <span>{pillar}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/services#${service.id}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a67c42] hover:text-[#0f172a] transition-colors"
              >
                <span>Explore</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

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
  ShieldCheck: <ShieldCheck size={22} className="text-[#0e1353]" />,
  TrendingUp: <TrendingUp size={22} className="text-[#0e1353]" />,
  Compass: <Compass size={22} className="text-[#0e1353]" />,
  Building2: <Building2 size={22} className="text-[#0e1353]" />,
  Lock: <Lock size={22} className="text-[#0e1353]" />,
  Layers: <Layers size={22} className="text-[#0e1353]" />,
};

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-[#f8fafc] border-t border-b border-blue-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          eyebrow="Our Core Services"
          title="Financial Services Built"
          highlight="Around You."
          description="Explore our competitive gold loans, gold purchase, and bank buy-back solutions engineered with Swiss vault security and complete transparency."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group relative rounded-2xl border border-blue-100/80 bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#0e1353] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(14,19,83,0.12)] shadow-md"
            >
              {/* Reference Website Card Image */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1353]/50 via-transparent to-transparent pointer-events-none" />

                {/* Service Number Tag */}
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-md bg-[#0e1353]/90 text-white font-mono text-xs font-bold shadow-xs backdrop-blur-xs">
                  {service.number}
                </div>

                {/* Floating Service Icon Pill */}
                <div className="absolute bottom-3.5 left-4 p-2.5 rounded-xl bg-white/95 border border-white/80 shadow-md backdrop-blur-xs">
                  {iconMap[service.iconName] || <ShieldCheck size={22} className="text-[#0e1353]" />}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0e1353] tracking-tight group-hover:text-[#ca8a04] transition-colors mb-2 font-display">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#475569] leading-relaxed mb-5 font-normal">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                    {service.keyPillars.map((pillar, pIdx) => (
                      <li key={pIdx} className="text-xs text-[#334155] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ca8a04] flex-shrink-0" />
                        <span>{pillar}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={service.ctaLink || `/services#${service.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ca8a04] hover:text-[#0e1353] transition-colors group/link"
                  >
                    <span>{service.ctaText || "Explore Service"}</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

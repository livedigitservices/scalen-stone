import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { INSIGHTS_DATA, InsightItem } from '../../data/insights';

export const InsightsSection: React.FC = () => {
  const featured = INSIGHTS_DATA.slice(0, 3);

  return (
    <section className="py-24 sm:py-32 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeader
            eyebrow="Market Intelligence & Fiduciary Perspectives"
            title="Perspectives That Help You"
            highlight="Move Forward."
            description="Clear viewpoints on gold asset optimization, debt liberation, and multi-generational capital strategies."
            align="left"
            className="max-w-2xl"
          />

          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#a67c42] hover:text-[#0f172a] transition-colors"
          >
            <span>View All Insights</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((item: InsightItem) => (
            <article
              key={item.id}
              className="group rounded-xl border border-[#e2e8f0] bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#a67c42] hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#a67c42]/30 text-[10px] font-bold uppercase tracking-wider text-[#a67c42] shadow-sm">
                  {item.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-[#64748b]">
                    <Clock size={13} />
                    <span>{item.readTime}</span>
                    <span>•</span>
                    <span>{item.publishedDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0f172a] tracking-tight leading-snug group-hover:text-[#a67c42] transition-colors font-display">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] line-clamp-3 leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e2e8f0]">
                  <Link
                    to={`/insights/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#a67c42] group-hover:text-[#0f172a] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

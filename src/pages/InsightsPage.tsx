import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Search } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { INSIGHTS_DATA, InsightItem } from '../data/insights';

export const InsightsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Financial Planning', 'Investment Insights', 'Wealth Management'];

  const filtered = INSIGHTS_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 bg-white text-[#0f172a]">
      <section className="py-16 sm:py-24 border-b border-[#e2e8f0] bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Market Intelligence"
            title="Insights & Fiduciary"
            highlight="Perspectives."
            description="Explore our latest publications on gold asset monetization, debt liberation, and precious metal macro strategies."
            align="center"
          />
        </div>
      </section>

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#e2e8f0]">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#a67c42] text-white shadow-sm'
                    : 'bg-[#f1f5f9] text-[#475569] hover:bg-slate-200 hover:text-[#0f172a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search insights..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f8fafc] border border-[#cbd5e1] text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#a67c42] focus:bg-white"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
          {filtered.map((item: InsightItem) => (
            <article
              key={item.id}
              className="group rounded-xl border border-[#e2e8f0] bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#a67c42] hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#a67c42]/30 text-[10px] font-bold uppercase tracking-wider text-[#a67c42] shadow-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
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
                    <span>Read Full Perspective</span>
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

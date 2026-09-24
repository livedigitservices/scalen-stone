import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { INSIGHTS_DATA } from '../data/insights';

export const InsightDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const insight = INSIGHTS_DATA.find((item) => item.slug === slug);

  if (!insight) {
    return <Navigate to="/insights" replace />;
  }

  return (
    <article className="pt-28 pb-24 bg-white text-[#0f172a] min-h-screen">
      {/* Top Hero Header Section with matching background image */}
      <section className="relative pt-10 pb-14 border-b border-[#e2e8f0] overflow-hidden bg-[#f8fafc] mb-10">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1600&auto=format&fit=crop"
            alt="Financial editorial research and market intelligence"
            className="w-full h-full object-cover object-center opacity-15 sm:opacity-20 mix-blend-multiply filter contrast-110"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-[#f8fafc]" />
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#64748b] hover:text-[#a67c42] transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            <span>Back to Insights</span>
          </Link>

          <div className="space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#fbf7f0] border border-[#a67c42]/30 text-xs font-bold uppercase tracking-wider text-[#a67c42]">
              {insight.category}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] tracking-tight leading-tight font-display">
              {insight.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#64748b] pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#a67c42]" />
                  <span>{insight.readTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#a67c42]" />
                  <span>{insight.publishedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-medium">
                <span className="text-[#0f172a] font-bold">{insight.author}</span>
                <span>•</span>
                <span className="text-[#64748b]">{insight.authorRole}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="my-10 rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-xl">
          <img
            src={insight.imageUrl}
            alt={insight.title}
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>

        <div className="max-w-none space-y-6 text-sm sm:text-base text-[#334155] leading-relaxed">
          {insight.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-start gap-4">
          <ShieldCheck size={28} className="text-[#a67c42] flex-shrink-0 mt-1" />
          <div className="text-xs text-[#475569] space-y-1">
            <p className="font-bold text-[#0f172a]">Editorial & Fiduciary Disclosure</p>
            <p>
              This publication is distributed for informational and educational purposes only. It does not constitute a formal solicitation. For individual gold loan evaluations or debt release calculations, contact a qualified Scalen Stone advisor.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center p-8 rounded-2xl bg-[#fbf7f0] border border-[#a67c42]/30 space-y-4">
          <h3 className="text-xl font-bold text-[#0f172a]">Discuss this perspective with our desk</h3>
          <p className="text-xs text-[#475569] max-w-lg mx-auto">
            Our gold valuation and debt release officers are available for private consultations across Hyderabad and Visakhapatnam.
          </p>
          <Button href="/contact" variant="primary" size="md" showArrow>
            Schedule Briefing
          </Button>
        </div>

      </div>
    </article>
  );
};

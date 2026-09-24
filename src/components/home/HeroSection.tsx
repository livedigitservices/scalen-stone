import React from 'react';
import { ShieldCheck, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useGsapScrollTrigger } from '../../hooks/useGsapScrollTrigger';
import gsap from 'gsap';
import { BRAND } from '../../constants/theme';

export const HeroSection: React.FC = () => {
  const containerRef = useGsapScrollTrigger<HTMLElement>((self, el) => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      el.querySelectorAll('.hero-eyebrow'),
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.2
    )
    .fromTo(
      el.querySelectorAll('.hero-title-line'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
      0.4
    )
    .fromTo(
      el.querySelectorAll('.hero-desc'),
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.9 },
      0.8
    )
    .fromTo(
      el.querySelectorAll('.hero-cta'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
      1.0
    )
    .fromTo(
      el.querySelectorAll('.hero-secondary'),
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      1.2
    )
    .fromTo(
      el.querySelectorAll('.hero-floating-card'),
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.2 },
      1.0
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-36 pb-20 overflow-hidden bg-white"
    >
      {/* Architectural luxury financial skyscraper backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
          alt="Financial district architectural skyscraper"
          className="w-full h-full object-cover object-top opacity-12 sm:opacity-18 mix-blend-multiply filter contrast-125 saturate-50"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 text-left space-y-6">
            
            {/* Small Eyebrow */}
            <div className="hero-eyebrow inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#a67c42]/30 bg-[#fbf7f0] text-xs font-semibold tracking-widest uppercase text-[#a67c42] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#a67c42] animate-pulse" />
              <span>SCALEN STONE FINANCE • GOLD FINANCIAL SERVICES</span>
            </div>

            {/* Main Editorial Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0f172a] leading-[1.08] font-display">
              <span className="hero-title-line block">Build Your Financial</span>
              <span className="hero-title-line block text-[#0f172a]">
                Future With{' '}
                <span className="gold-gradient-text italic font-serif font-medium">Confidence.</span>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="hero-desc text-base sm:text-lg md:text-xl text-[#475569] max-w-2xl leading-relaxed font-normal">
              Strategic financial solutions designed to help individuals and businesses make smarter decisions, manage wealth, unlock instant gold liquidity, and pursue long-term growth.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-wrap items-center gap-4 pt-2">
              <Button href="/solutions" variant="primary" size="lg" showArrow>
                Explore Solutions
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Talk To An Expert
              </Button>
            </div>

            {/* Subtle Secondary Tagline */}
            <div className="hero-secondary pt-4 border-t border-[#e2e8f0] flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#475569]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#a67c42]" />
                <span className="font-medium">Trusted strategies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#a67c42]" />
                <span className="font-medium">Clear decisions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#a67c42]" />
                <span className="font-medium">Long-term growth</span>
              </div>
            </div>
          </div>

          {/* Right Floating Visual Highlight Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="hero-floating-card relative rounded-2xl p-6 border border-[#e2e8f0] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#fbf7f0] text-[#a67c42]">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0f172a] tracking-wide">Gold Valuation Standard</p>
                    <p className="text-[11px] text-[#a67c42] font-semibold">German Laser Purity Testing</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#a67c42] px-2 py-0.5 rounded bg-[#fbf7f0] border border-[#a67c42]/30 font-mono">
                  15-MIN
                </span>
              </div>

              {/* Metric Highlights */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-1">
                  <p className="text-xs font-semibold text-[#64748b]">Live Benchmark Rate (22K)</p>
                  <p className="text-2xl font-bold text-[#0f172a] font-mono">{BRAND.liveRates.gold22k} <span className="text-xs text-[#a67c42]">/ gram</span></p>
                  <p className="text-[11px] text-[#a67c42] font-semibold flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>Highest per-gram valuation guaranteed</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-1">
                  <p className="text-xs font-semibold text-[#64748b]">Pledged Gold Liberated</p>
                  <p className="text-2xl font-bold text-[#0f172a] font-display">₹500 Cr+</p>
                  <p className="text-[11px] text-[#475569]">Freed from high-interest debt traps</p>
                </div>
              </div>

              <div className="pt-1 text-[11px] text-[#64748b] leading-tight">
                Complete transparency. 100% insured bank vault custody. Zero hidden melt loss.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

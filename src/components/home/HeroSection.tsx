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
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 text-left space-y-6">
            
            {/* Small Eyebrow Badge */}
            <div className="hero-eyebrow inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-amber-200 bg-amber-50/90 text-xs font-semibold tracking-widest uppercase text-amber-900 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#ca8a04] animate-pulse" />
              <span>MOST TRUSTED GOLD LOAN PARTNER SINCE 2011</span>
            </div>

            {/* Main Editorial Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0e1353] leading-[1.08] font-display">
              <span className="hero-title-line block">Welcome to</span>
              <span className="hero-title-line block text-[#0e1353]">
                Scalen Stone{' '}
                <span className="gold-gradient-text italic font-serif font-medium">Finance.</span>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="hero-desc text-base sm:text-lg md:text-xl text-[#475569] max-w-2xl leading-relaxed font-normal">
              Transform your gold into instant opportunity. Competitive loan rates up to ₹7,000 per gram, minimal interest from 0.79% per month, and instant disbursal with complete transparency.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-wrap items-center gap-4 pt-2">
              <Button href="/gold-purchase" variant="gold" size="lg" showArrow>
                Apply for Gold Loan
              </Button>
              <Button href="#calculator" variant="primary" size="lg">
                Calculate Loan Value
              </Button>
            </div>

            {/* Subtle Secondary Tagline */}
            <div className="hero-secondary pt-4 border-t border-slate-200 flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#475569]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#ca8a04]" />
                <span className="font-medium text-[#1e293b]">15-Min Fast Disbursal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#ca8a04]" />
                <span className="font-medium text-[#1e293b]">₹7,000/g Max Valuation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#ca8a04]" />
                <span className="font-medium text-[#1e293b]">100% Insured Vault Custody</span>
              </div>
            </div>
          </div>

          {/* Right Floating Visual Highlight Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="hero-floating-card relative rounded-2xl p-6 border border-blue-100/80 bg-white shadow-[0_20px_50px_rgba(14,19,83,0.08)] space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-[#ca8a04] border border-amber-200/60">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0e1353] tracking-wide">Gold Valuation Standard</p>
                    <p className="text-[11px] text-[#ca8a04] font-semibold">German Laser Purity Testing</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#0e1353] px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 font-mono">
                  15-MIN DISBURSAL
                </span>
              </div>

              {/* Metric Highlights */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#f8fafc] border border-blue-50 space-y-1">
                  <p className="text-xs font-semibold text-[#64748b]">Live Benchmark Rate (22K)</p>
                  <p className="text-2xl font-bold text-[#0e1353] font-mono">{BRAND.liveRates.gold22k} <span className="text-xs text-[#ca8a04]">/ gram</span></p>
                  <p className="text-[11px] text-[#ca8a04] font-semibold flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>Highest per-gram valuation guaranteed</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#f8fafc] border border-blue-50 space-y-1">
                  <p className="text-xs font-semibold text-[#64748b]">Pledged Gold Liberated</p>
                  <p className="text-2xl font-bold text-[#0e1353] font-display">₹500 Cr+</p>
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

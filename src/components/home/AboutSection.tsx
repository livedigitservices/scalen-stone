import React from 'react';
import { ShieldCheck, Percent, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-blue-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, description, and 3 key features */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-xs font-semibold tracking-wider uppercase text-amber-900 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ca8a04]" />
              <span>Transparent & Instant Gold Financing</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0e1353] leading-tight font-display">
              Secure Gold Loans at{' '}
              <span className="gold-gradient-text">Best Rates</span>
            </h2>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
              Transform your gold into opportunity with our competitive loan rates, zero hidden charges, and quick 15-minute transparent process.
            </p>

            {/* 3 Core Features matching cyangold.in */}
            <div className="space-y-5 pt-2">
              {/* Feature 1: Secure Storage */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100 hover:border-[#0e1353]/30 transition-colors">
                <div className="p-2.5 rounded-lg bg-[#0e1353] text-white flex-shrink-0 mt-0.5">
                  <ShieldCheck size={20} className="text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0e1353]">Secure Storage</h3>
                  <p className="text-sm text-[#475569] mt-0.5">Your gold is stored in our highly secure, bank-grade vaults with 24/7 CCTV surveillance and 100% comprehensive insurance coverage.</p>
                </div>
              </div>

              {/* Feature 2: Competitive Rates */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 hover:border-[#ca8a04] transition-colors">
                <div className="p-2.5 rounded-lg bg-[#ca8a04] text-white flex-shrink-0 mt-0.5">
                  <Percent size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0e1353]">Competitive Rates</h3>
                  <p className="text-sm text-[#475569] mt-0.5">Get loans up to ₹7,000 per gram with minimal monthly interest starting from just 0.79% and flexible tenure options.</p>
                </div>
              </div>

              {/* Feature 3: Quick Processing */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100 hover:border-[#0e1353]/30 transition-colors">
                <div className="p-2.5 rounded-lg bg-[#0e1353] text-white flex-shrink-0 mt-0.5">
                  <Zap size={20} className="text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0e1353]">Quick Processing</h3>
                  <p className="text-sm text-[#475569] mt-0.5">Get your loan evaluated, verified, and sanctioned within 15–30 minutes with minimal documentation and instant bank credit.</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button href="/gold-purchase" variant="gold" size="md" showArrow>
                Apply for Gold Loan
              </Button>
              <Button href="/about" variant="primary" size="md">
                About Scalen Stone
              </Button>
            </div>
          </div>

          {/* Right Column: High Quality Gold Visual Asset matching cyangold */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-blue-100">
              <img
                src="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1000&q=80"
                alt="Pure gold bullion and ornaments"
                className="w-full h-[450px] sm:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1353]/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating highlight badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-blue-100 shadow-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#ca8a04]">
                    <CheckCircle2 size={15} />
                    <span>VERIFIED GERMAN LASER TESTING</span>
                  </div>
                  <p className="text-xs text-[#0e1353] font-semibold mt-0.5">
                    Highest Market Valuation per gram with zero deduction.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Max Loan</span>
                  <span className="text-base font-bold font-mono text-[#0e1353]">₹7,000/g</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

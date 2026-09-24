import React from 'react';
import { ShieldCheck, Target, Award, Users, Scale } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { TRUST_STATS } from '../data/stats';
import { StatCounter } from '../components/ui/StatCounter';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-white text-[#0f172a]">
      <section className="relative py-20 sm:py-28 border-b border-[#e2e8f0] overflow-hidden bg-[#f8fafc]">
        {/* Matching Hero Background Image with Luxury Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
            alt="Corporate heritage boardroom"
            className="w-full h-full object-cover object-center opacity-15 sm:opacity-20 mix-blend-multiply filter contrast-110"
            loading="eager"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            eyebrow="Our Heritage & Purpose"
            title="More Than Finance."
            highlight="A Fiduciary Commitment."
            description="Scalen Stone Finance was founded with a singular conviction: that gold financial services and wealth advisory should be transparent, mathematically disciplined, and strictly aligned with client longevity."
            align="center"
          />
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] tracking-tight font-display">
              Built on Discipline, <span className="gold-gradient-text">Grounded in Clarity.</span>
            </h2>
            <p className="text-base text-[#334155] leading-relaxed">
              In an industry too often characterized by hidden deductions, predatory pawn interest, and lack of transparency, Scalen Stone Finance represents an anchor of stability. We treat gold not merely as a transaction, but as your family's hard-earned heritage.
            </p>
            <p className="text-sm text-[#475569] leading-relaxed">
              We operate exclusively under strict fiduciary and scientific evaluation frameworks. This means German laser spectrometers for zero-destruction testing, 100% insured bank vault custody, and instant liquid fund transfers with radical honesty.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <ShieldCheck size={24} className="text-[#a67c42] mb-2" />
                <h4 className="text-sm font-bold text-[#0f172a]">Fiduciary Standard</h4>
                <p className="text-xs text-[#475569] mt-1">Legally and morally bound to your best financial interests.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <Scale size={24} className="text-[#a67c42] mb-2" />
                <h4 className="text-sm font-bold text-[#0f172a]">Zero Hidden Deductions</h4>
                <p className="text-xs text-[#475569] mt-1">Zero melt loss or stone weight deductions.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                alt="Corporate leadership boardroom"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#f8fafc] border-t border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_STATS.map((stat, idx) => (
              <StatCounter
                key={idx}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                sublabel={stat.sublabel}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="governance" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Governance & Integrity"
          title="Institutional Oversight &"
          highlight="Custodial Safety."
          description="Your physical gold is stored in high-security biometric vault chambers, sealed in your presence, and backed by 100% underwritten insurance."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl border border-[#e2e8f0] bg-white shadow-sm space-y-4">
            <Target size={28} className="text-[#a67c42]" />
            <h3 className="text-lg font-bold text-[#0f172a]">Scientific Purity Testing</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              We eliminate subjective appraisal guessing with computerized German laser spectrometers, ensuring exact karat purity to two decimal places.
            </p>
          </div>
          <div className="p-8 rounded-xl border border-[#e2e8f0] bg-white shadow-sm space-y-4">
            <Award size={28} className="text-[#a67c42]" />
            <h3 className="text-lg font-bold text-[#0f172a]">Decade of Excellence</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Over 10 years of consistent, disciplined counsel guiding thousands of clients, MSMEs, and family estates through gold asset monetization.
            </p>
          </div>
          <div className="p-8 rounded-xl border border-[#e2e8f0] bg-white shadow-sm space-y-4">
            <Users size={28} className="text-[#a67c42]" />
            <h3 className="text-lg font-bold text-[#0f172a]">Senior Partner Discretion</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Every consultation is held inside private executive boardrooms under strict non-disclosure agreements, respecting your privacy and dignity.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button href="/contact" variant="primary" size="lg" showArrow>
            Schedule Private Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

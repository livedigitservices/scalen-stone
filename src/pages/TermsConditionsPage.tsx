import React from 'react';
import { Scale, AlertCircle, FileCheck } from 'lucide-react';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-white text-[#0e1353]">
      <section className="relative py-16 sm:py-24 border-b border-blue-100/70 overflow-hidden bg-[#f8fafc]">
        {/* Matching Hero Background Image with Luxury Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600&auto=format&fit=crop"
            alt="Statutory and regulatory legal governance"
            className="w-full h-full object-cover object-center opacity-15 sm:opacity-20 mix-blend-multiply filter contrast-110"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-[#f8fafc]" />
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-xs font-semibold uppercase tracking-wider text-amber-900">
            <Scale size={14} className="text-[#ca8a04]" />
            Statutory & Regulatory Disclosures
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#0e1353] font-display">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#64748b]">Effective Date: February 2026 | Scalen Stone Finance</p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-sm text-[#334155] leading-relaxed">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0e1353]">1. Advisory Scope & Gold Loan Agreement</h2>
          <p>
            Welcome to Scalen Stone Finance. By utilizing our valuation services, gold loans, or pledged release facilities, you acknowledge and agree to these regulatory terms.
          </p>
        </div>

        <div id="fiduciary" className="space-y-4 p-6 rounded-2xl bg-[#f8fafc] border border-blue-100/80">
          <div className="flex items-center gap-3 text-[#0e1353] font-bold text-base">
            <FileCheck size={18} className="text-[#ca8a04]" />
            <h3>2. Loan Terms & Custody Provisions</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569]">
            Gold loans are sanctioned based on live market per-gram valuations and statutory Loan-To-Value (LTV) limits. Pledged items remain 100% insured under our commercial vault policy during the entire loan tenure.
          </p>
        </div>

        <div id="regulatory" className="space-y-4">
          <h2 className="text-xl font-bold text-[#0e1353]">3. Market Benchmark Notice</h2>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
            <AlertCircle size={20} className="flex-shrink-0 mt-0.5 text-amber-700" />
            <p>
              Gold prices fluctuate according to international and domestic exchange markets. Loan eligibility is calculated on the net gold content excluding stones, enamel, or non-precious attachments.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0e1353]">4. Governing Law</h2>
          <p>
            These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Hyderabad / Visakhapatnam.
          </p>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { Scale, AlertCircle, FileCheck } from 'lucide-react';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-white text-[#0f172a]">
      <section className="py-16 border-b border-[#e2e8f0] bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#a67c42]/30 bg-[#fbf7f0] text-xs font-semibold uppercase tracking-wider text-[#a67c42]">
            <Scale size={14} />
            Statutory & Regulatory Disclosures
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#0f172a] font-display">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#64748b]">Effective Date: February 2026 | Scalen Stone Finance</p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-sm text-[#334155] leading-relaxed">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0f172a]">1. Advisory Scope & Gold Loan Agreement</h2>
          <p>
            Welcome to Scalen Stone Finance. By utilizing our valuation services, gold loans, or pledged release facilities, you acknowledge and agree to these regulatory terms.
          </p>
        </div>

        <div id="fiduciary" className="space-y-4 p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
          <div className="flex items-center gap-3 text-[#0f172a] font-bold text-base">
            <FileCheck size={18} className="text-[#a67c42]" />
            <h3>2. Loan Terms & Custody Provisions</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569]">
            Gold loans are sanctioned based on live market per-gram valuations and statutory Loan-To-Value (LTV) limits. Pledged items remain 100% insured under our commercial vault policy during the entire loan tenure.
          </p>
        </div>

        <div id="regulatory" className="space-y-4">
          <h2 className="text-xl font-bold text-[#0f172a]">3. Market Benchmark Notice</h2>
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
            <AlertCircle size={20} className="flex-shrink-0 mt-0.5 text-amber-700" />
            <p>
              Gold prices fluctuate according to international and domestic exchange markets. Loan eligibility is calculated on the net gold content excluding stones, enamel, or non-precious attachments.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0f172a]">4. Governing Law</h2>
          <p>
            These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Hyderabad / Visakhapatnam.
          </p>
        </div>
      </section>
    </div>
  );
};

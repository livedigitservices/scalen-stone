import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { WHY_SCALEN_STONE } from '../data/principles';

export const WhyChooseUsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-white text-[#0f172a]">
      <section className="relative py-20 sm:py-28 border-b border-[#e2e8f0] overflow-hidden bg-[#f8fafc]">
        {/* Matching Hero Background Image with Luxury Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop"
            alt="Bank grade security and institutional vault architecture"
            className="w-full h-full object-cover object-center opacity-15 sm:opacity-20 mix-blend-multiply filter contrast-110"
            loading="eager"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            eyebrow="The Scalen Stone Advantage"
            title="Why Discerning Clients"
            highlight="Choose Us."
            description="We contrast traditional pawn shops and predatory lenders with certified fiduciary gold financial services. Experience radical honesty."
            align="center"
          />
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WHY_SCALEN_STONE.map((p) => (
            <div key={p.number} className="p-8 rounded-2xl border border-[#e2e8f0] bg-white shadow-sm space-y-4 hover:border-[#a67c42] hover:shadow-md transition-all">
              <span className="font-mono text-xl font-bold text-[#a67c42]">{p.number}</span>
              <h3 className="text-2xl font-bold text-[#0f172a] font-display">{p.title}</h3>
              <p className="text-sm text-[#8c642a] italic font-medium">"{p.quote}"</p>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{p.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-[#f8fafc] border-t border-b border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Institutional Comparison"
            title="The Fiduciary"
            highlight="Difference."
            description="Compare our transparent valuation process with legacy pawnbrokers and local moneylenders."
            align="center"
            className="mb-14"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-xl overflow-hidden border border-[#e2e8f0] bg-white text-sm shadow-sm">
              <thead>
                <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                  <th className="p-4 sm:p-6 text-xs font-bold text-[#0f172a] uppercase">Advisory Dimension</th>
                  <th className="p-4 sm:p-6 text-xs font-bold text-[#a67c42] uppercase bg-[#fbf7f0]">
                    Scalen Stone Finance
                  </th>
                  <th className="p-4 sm:p-6 text-xs font-bold text-[#64748b] uppercase">
                    Traditional Pawnbrokers
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] text-xs sm:text-sm">
                <tr>
                  <td className="p-4 sm:p-6 font-bold text-[#0f172a]">Purity Verification</td>
                  <td className="p-4 sm:p-6 text-[#a67c42] bg-[#fbf7f0] font-semibold">
                    German laser spectrometer (zero scraping or destruction)
                  </td>
                  <td className="p-4 sm:p-6 text-[#64748b]">Crude acid rub & subjective manual estimation</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-bold text-[#0f172a]">Weight Deductions</td>
                  <td className="p-4 sm:p-6 text-[#a67c42] bg-[#fbf7f0] font-semibold">
                    Zero melting loss deductions; exact certified net weight
                  </td>
                  <td className="p-4 sm:p-6 text-[#64748b]">10% to 20% arbitrary deductions for wax, solder, and stones</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-bold text-[#0f172a]">Interest Transparency</td>
                  <td className="p-4 sm:p-6 text-[#a67c42] bg-[#fbf7f0] font-semibold">
                    Starting from 0.79% p.m.; zero hidden penalty clauses
                  </td>
                  <td className="p-4 sm:p-6 text-[#64748b]">Compounding 2% to 4% p.m. with harsh compounding fees</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-bold text-[#0f172a]">Storage & Custody</td>
                  <td className="p-4 sm:p-6 text-[#a67c42] bg-[#fbf7f0] font-semibold">
                    100% insured bank vault; sealed in client's presence
                  </td>
                  <td className="p-4 sm:p-6 text-[#64748b]">Uninsured shop safe; risk of substitution or loss</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-bold text-[#0f172a]">Debt Release Assistance</td>
                  <td className="p-4 sm:p-6 text-[#a67c42] bg-[#fbf7f0] font-semibold">
                    Direct legal settlement of existing loans with instant cash surplus
                  </td>
                  <td className="p-4 sm:p-6 text-[#64748b]">Refusal or threats of immediate auction</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-14 text-center">
            <Button href="/contact" variant="primary" size="lg" showArrow>
              Partner With Scalen Stone
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

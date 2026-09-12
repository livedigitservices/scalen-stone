import React from 'react';
import { PieChart, Landmark, ShieldCheck, Scale, Award } from 'lucide-react';
import { Button } from '../ui/Button';

export const InvestmentSolutionsSection: React.FC = () => {
  const pillars = [
    {
      title: "Gold-Backed Liquidity",
      desc: "Fast, flexible borrowing with minimum paperwork and zero credit history constraints.",
      icon: <PieChart className="text-[#a67c42]" size={22} />,
    },
    {
      title: "Pledged Gold Liberation",
      desc: "Clearing outstanding debts from moneylenders and returning maximum leftover cash.",
      icon: <Landmark className="text-[#a67c42]" size={22} />,
    },
    {
      title: "Bullion & Wealth Advisory",
      desc: "Physical gold accumulation, Sovereign Gold Bonds, and multi-asset wealth hedging.",
      icon: <Scale className="text-[#a67c42]" size={22} />,
    },
    {
      title: "Insured Vault Custody",
      desc: "100% comprehensive insurance coverage by premier global underwriters with zero locker rent.",
      icon: <ShieldCheck className="text-[#a67c42]" size={22} />,
    },
    {
      title: "Business Working Capital",
      desc: "Collateralized business overdrafts designed to stabilize corporate cash flows.",
      icon: <Award className="text-[#a67c42]" size={22} />,
    },
    {
      title: "Instant Gold Purchase",
      desc: "Fair-market cash payout for old or scrap jewellery via scientific German karatmeters.",
      icon: <PieChart className="text-[#a67c42]" size={22} />,
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative bg-[#f8fafc] border-t border-b border-[#e2e8f0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#a67c42]/30 bg-[#fbf7f0] text-xs font-semibold tracking-wider uppercase text-[#a67c42]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a67c42]" />
              Investment & Liquidity Excellence
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight font-display">
              Make Every Financial Decision{' '}
              <span className="gold-gradient-text block">Count.</span>
            </h2>

            <p className="text-base text-[#475569] leading-relaxed">
              We engineer bespoke financial architectures combining empirical quantitative discipline with physical gold monetization. Our fiduciary mandate ensures every asset serves your ultimate vision.
            </p>

            <div className="pt-2">
              <Button href="/contact" variant="primary" size="lg" showArrow>
                Discuss Your Goals
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] mt-8 shadow-sm">
              <p className="text-xs italic text-[#334155] leading-relaxed">
                "Disciplined capital preservation is not the absence of ambition; it is the mathematical prerequisite for compounding over generations."
              </p>
              <p className="text-[10px] font-bold text-[#a67c42] mt-2 tracking-wider uppercase">
                Scalen Stone Credit & Investment Committee
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#a67c42] hover:shadow-md transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="p-3 rounded-lg bg-[#fbf7f0] border border-[#a67c42]/20 w-fit mb-4 group-hover:border-[#a67c42] transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#0f172a] mb-2 font-display group-hover:text-[#a67c42] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

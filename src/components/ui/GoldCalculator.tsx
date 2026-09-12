import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { Button } from './Button';
import { BRAND } from '../../constants/theme';

export const GoldCalculator: React.FC = () => {
  const [karat, setKarat] = useState<number>(22);
  const [weight, setWeight] = useState<number>(50);
  const [serviceType, setServiceType] = useState<'loan' | 'sell'>('loan');

  const ratePerGram: Record<number, number> = {
    24: 7850,
    22: 7200,
    18: 5890,
  };

  const currentRate = ratePerGram[karat] || 7200;
  const totalMarketValue = Math.round(weight * currentRate);
  const loanEligibility = Math.round(totalMarketValue * 0.80);
  const estimatedMonthlyInterest = Math.round(loanEligibility * 0.0079);

  return (
    <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
      {/* Decorative ambient subtle glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#fbf7f0] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#e2e8f0] relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#a67c42]/30 bg-[#fbf7f0] text-xs font-semibold uppercase tracking-wider text-[#a67c42] mb-2">
            <Calculator size={14} />
            Live Gold Valuation & Loan Calculator
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-display">
            Estimate Your Instant Gold Liquidity
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] mt-1">
            Calculated against live MCX market benchmark rate: <span className="text-[#a67c42] font-bold">{BRAND.liveRates.gold22k}/gm (22K)</span>
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-[#f1f5f9] border border-[#e2e8f0] w-fit">
          <button
            type="button"
            onClick={() => setServiceType('loan')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              serviceType === 'loan'
                ? 'bg-white text-[#0f172a] shadow-sm border border-[#e2e8f0]'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            Instant Gold Loan
          </button>
          <button
            type="button"
            onClick={() => setServiceType('sell')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              serviceType === 'sell'
                ? 'bg-white text-[#0f172a] shadow-sm border border-[#e2e8f0]'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            Sell / Monetize Gold
          </button>
        </div>
      </div>

      {/* Interactive Controls & Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 relative z-10">
        
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#334155] mb-2">
              Select Gold Purity (Karat)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[24, 22, 18].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKarat(k)}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    karat === k
                      ? 'border-[#a67c42] bg-[#fbf7f0] text-[#0f172a] shadow-sm'
                      : 'border-[#e2e8f0] bg-white text-[#64748b] hover:border-slate-300'
                  }`}
                >
                  <p className="font-mono text-lg font-bold text-[#0f172a]">{k}K</p>
                  <p className="text-[10px] text-[#a67c42] font-semibold mt-0.5">
                    ₹{ratePerGram[k].toLocaleString()}/gm
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#334155]">
                Total Gold Weight (Grams)
              </label>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                <input
                  type="number"
                  min={1}
                  max={2000}
                  value={weight}
                  onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                  className="w-16 bg-transparent font-mono text-sm font-bold text-[#0f172a] text-right focus:outline-none"
                />
                <span className="text-xs text-[#64748b]">grams</span>
              </div>
            </div>

            <input
              type="range"
              min={5}
              max={500}
              step={5}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#a67c42]"
            />
            <div className="flex justify-between text-[10px] text-[#64748b] mt-1.5 font-mono">
              <span>5 gm</span>
              <span>100 gm</span>
              <span>250 gm</span>
              <span>500 gm+</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#e2e8f0]">
            <div className="flex items-center gap-2 text-xs text-[#334155]">
              <Check size={14} className="text-[#a67c42]" />
              <span>Zero melting loss deduction guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#334155]">
              <Check size={14} className="text-[#a67c42]" />
              <span>Direct RTGS/IMPS transfer to your bank in 15 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#334155]">
              <Check size={14} className="text-[#a67c42]" />
              <span>100% insured vault custody with zero locker charges</span>
            </div>
          </div>
        </div>

        {/* Calculation Result Column */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] relative">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
              <span className="text-xs text-[#64748b] uppercase tracking-wider font-bold">Total Net Market Value</span>
              <span className="font-mono text-xl font-bold text-[#0f172a]">₹{totalMarketValue.toLocaleString()}</span>
            </div>

            {serviceType === 'loan' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#fbf7f0] border border-[#a67c42]/30 space-y-1">
                  <p className="text-xs uppercase tracking-wider font-bold text-[#a67c42]">
                    Eligible Instant Loan Amount (80% LTV)
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] font-display">
                    ₹{loanEligibility.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-[#475569]">
                    Interest starts at just ~₹{estimatedMonthlyInterest.toLocaleString()}/mo (0.79% p.m.)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-[#334155]">
                  <div className="p-3 rounded-lg bg-white border border-[#e2e8f0]">
                    <p className="text-[#64748b] text-[10px] uppercase font-bold">Turnaround</p>
                    <p className="font-bold text-[#0f172a] mt-0.5">15 Minutes</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-[#e2e8f0]">
                    <p className="text-[#64748b] text-[10px] uppercase font-bold">Pre-Closure Fee</p>
                    <p className="font-bold text-emerald-600 mt-0.5">₹0 (Zero)</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#fbf7f0] border border-[#a67c42]/30 space-y-1">
                  <p className="text-xs uppercase tracking-wider font-bold text-[#a67c42]">
                    Instant Spot Cash Payout
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] font-display">
                    ₹{totalMarketValue.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-[#475569]">
                    100% full live value credited to your account on the spot
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-[#334155]">
                  <div className="p-3 rounded-lg bg-white border border-[#e2e8f0]">
                    <p className="text-[#64748b] text-[10px] uppercase font-bold">Purity Method</p>
                    <p className="font-bold text-[#0f172a] mt-0.5">Laser Karatmeter</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-[#e2e8f0]">
                    <p className="text-[#64748b] text-[10px] uppercase font-bold">Stone Deductions</p>
                    <p className="font-bold text-emerald-600 mt-0.5">Exact Net Weight</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-[#e2e8f0]">
            <Button href="/contact" variant="primary" size="lg" showArrow className="w-full">
              {serviceType === 'loan' ? 'Apply For Instant Gold Loan' : 'Schedule Gold Valuation & Cash Out'}
            </Button>
            <p className="text-[10px] text-[#64748b] text-center mt-2.5">
              Available at our Hyderabad & Visakhapatnam offices, or request secure doorstep evaluation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

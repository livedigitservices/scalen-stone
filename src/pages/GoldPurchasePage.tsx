import React, { useState } from 'react';
import {
  FileText,
  Download,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Sparkles,
  RefreshCw,
  Printer,
  Scale,
  MapPin,
  User,
  Phone,
  Home,
  Info,
  ArrowRight,
} from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { BrandLogo } from '../components/common/BrandLogo';
import { BRAND } from '../constants/theme';
import { generateGoldPurchasePdf, GoldPurchaseData } from '../services/goldPurchasePdf';

const GOLD_PERCENTAGES = ['18%', '24%', '30%', '36%'] as const;

export const GoldPurchasePage: React.FC = () => {
  const [formData, setFormData] = useState<GoldPurchaseData>({
    clientName: '',
    mobileNumber: '',
    location: '',
    address: '',
    goldType: '',
    goldPercentage: '24%',
    weightGrams: 50,
    paymentMode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<{
    filename: string;
    certNo: string;
  } | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.clientName.trim()) {
      errs.clientName = 'Client full name is required.';
    }
    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile number is required.';
    } else if (!/^[0-9+-\s()]{7,16}$/.test(formData.mobileNumber.trim())) {
      errs.mobileNumber = 'Please enter a valid mobile number.';
    }
    if (!formData.location.trim()) {
      errs.location = 'City / Location is required.';
    }
    if (!formData.paymentMode.trim()) {
      errs.paymentMode = 'Payment & settlement method is required.';
    }
    if (!formData.address.trim()) {
      errs.address = 'Full address is required.';
    }
    if (!formData.goldType.trim()) {
      errs.goldType = 'Type of gold purchased is required.';
    }
    if (!formData.goldPercentage) {
      errs.goldPercentage = 'Please select a gold percentage.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsGenerating(true);
    try {
      const certNo = `SSF-GP-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

      const dataToGenerate = {
        ...formData,
        certificateNumber: certNo,
        transactionDate: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      };

      const { filename } = await generateGoldPurchasePdf(dataToGenerate);
      setLastGenerated({ filename, certNo });
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('An error occurred while generating the PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReDownload = async () => {
    if (!lastGenerated) return;
    setIsGenerating(true);
    try {
      await generateGoldPurchasePdf({
        ...formData,
        certificateNumber: lastGenerated.certNo,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFormData({
      clientName: '',
      mobileNumber: '',
      location: '',
      address: '',
      goldType: '',
      goldPercentage: '24%',
      weightGrams: 50,
      paymentMode: '',
    });
    setErrors({});
    setLastGenerated(null);
  };

  const weight = formData.weightGrams || 50;
  const valuation = weight * 7850;
  const formattedValuation = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(valuation);

  return (
    <div className="pt-28 pb-24 bg-white text-[#0f172a]">
      {/* Page Header */}
      <section className="py-12 sm:py-16 border-b border-[#e2e8f0] bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Institutional Bullion Desk"
            title="Client Gold Purchase &"
            highlight="Official PDF Portal."
            description="Enter client particulars and gold purchase specifications to instantly generate and download an authenticated, Swiss-standard official purchase certificate & invoice."
            align="center"
          />

          {/* Trust Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#475569]">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] shadow-xs">
              <Sparkles size={14} className="text-[#a67c42]" />
              <span>Instant Automatic PDF Download</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] shadow-xs">
              <ShieldCheck size={14} className="text-[#a67c42]" />
              <span>100% Insured Swiss-Standard Vault Custody</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] shadow-xs">
              <Building2 size={14} className="text-[#a67c42]" />
              <span>BIS Hallmarked & Spectrometer Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout: Form + Live Certificate Preview */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Form Intake (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl border border-[#e2e8f0] bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#e2e8f0]">
                <div>
                  <h2 className="text-xl sm:text-2xl font-brand font-bold text-[#0f172a]">
                    Client Gold Purchase Dossier
                  </h2>
                  <p className="text-xs text-[#64748b] mt-1">
                    Fill out all mandatory fields below to compile the official document.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#fbf7f0] border border-[#a67c42]/20 flex items-center justify-center text-[#a67c42]">
                  <FileText size={20} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Client Particulars Group */}
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#a67c42] mb-4 flex items-center gap-2">
                    <User size={14} />
                    <span>1. Client Particulars</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Client Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                        Client Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.clientName}
                          onChange={(e) =>
                            setFormData({ ...formData, clientName: e.target.value })
                          }
                          placeholder="e.g. Vikramaditya Singhania"
                          className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-colors ${
                            errors.clientName
                              ? 'border-rose-300 focus:ring-rose-200'
                              : 'border-[#e2e8f0] focus:border-[#a67c42] focus:ring-[#a67c42]/20'
                          }`}
                        />
                      </div>
                      {errors.clientName && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">
                          {errors.clientName}
                        </p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={formData.mobileNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, mobileNumber: e.target.value })
                          }
                          placeholder="e.g. +91 98765 43210"
                          className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-colors ${
                            errors.mobileNumber
                              ? 'border-rose-300 focus:ring-rose-200'
                              : 'border-[#e2e8f0] focus:border-[#a67c42] focus:ring-[#a67c42]/20'
                          }`}
                        />
                      </div>
                      {errors.mobileNumber && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">
                          {errors.mobileNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location & Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {/* Location */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                        Location / City <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          placeholder="e.g. Hyderabad / Visakhapatnam"
                          className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-colors ${
                            errors.location
                              ? 'border-rose-300 focus:ring-rose-200'
                              : 'border-[#e2e8f0] focus:border-[#a67c42] focus:ring-[#a67c42]/20'
                          }`}
                        />
                      </div>
                      {errors.location && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">
                          {errors.location}
                        </p>
                      )}
                    </div>

                    {/* Payment & Settlement Method */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                        Payment & Settlement Method <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.paymentMode}
                        onChange={(e) =>
                          setFormData({ ...formData, paymentMode: e.target.value })
                        }
                        placeholder="e.g. Bank Wire / RTGS, NEFT, Cheque, UPI, Cash, etc."
                        className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-colors ${
                          errors.paymentMode
                            ? 'border-rose-300 focus:ring-rose-200'
                            : 'border-[#e2e8f0] focus:border-[#a67c42] focus:ring-[#a67c42]/20'
                        }`}
                      />
                      {errors.paymentMode && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">
                          {errors.paymentMode}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Full Address */}
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                      Full Billing / Registered Address <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="e.g. Suite 702, Kohinoor Towers, Road No. 12, Banjara Hills, Hyderabad, Telangana 500034"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-colors ${
                        errors.address
                          ? 'border-rose-300 focus:ring-rose-200'
                          : 'border-[#e2e8f0] focus:border-[#a67c42] focus:ring-[#a67c42]/20'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>

                <div className="h-px bg-[#e2e8f0] my-6" />

                {/* 2. Gold Purchase Specifications */}
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#a67c42] mb-4 flex items-center gap-2">
                    <Scale size={14} />
                    <span>2. Gold Purchase & Purity Specifications</span>
                  </h3>

                  {/* Type of Gold Purchased */}
                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                      Type of Gold Purchased <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.goldType}
                      onChange={(e) =>
                        setFormData({ ...formData, goldType: e.target.value })
                      }
                      placeholder="e.g. 24K Swiss Minted Bullion Bar, 22K Sovereign Coin, Gold Jewelry, etc."
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-colors ${
                        errors.goldType
                          ? 'border-rose-300 focus:ring-rose-200'
                          : 'border-[#e2e8f0] focus:border-[#a67c42] focus:ring-[#a67c42]/20'
                      }`}
                    />
                    {errors.goldType && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">
                        {errors.goldType}
                      </p>
                    )}
                  </div>

                  {/* Gold Percentage Selection: 18%, 24%, 30%, 36% */}
                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-[#0f172a] mb-2">
                      Gold Percentage Bracket <span className="text-rose-500">*</span>
                      <span className="text-[11px] font-normal text-[#64748b] ml-2">
                        (Select one of the official tiers)
                      </span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {GOLD_PERCENTAGES.map((pct) => {
                        const isSelected = formData.goldPercentage === pct;
                        return (
                          <button
                            key={pct}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, goldPercentage: pct })
                            }
                            className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer relative flex flex-col items-center justify-center ${
                              isSelected
                                ? 'border-[#a67c42] bg-[#fbf7f0] shadow-xs ring-2 ring-[#a67c42]/20'
                                : 'border-[#e2e8f0] bg-white hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`text-lg font-brand font-bold ${
                                isSelected ? 'text-[#8c642a]' : 'text-[#0f172a]'
                              }`}
                            >
                              {pct}
                            </span>
                            <span className="text-[10px] uppercase font-semibold text-[#64748b] mt-0.5">
                              {pct === '24%' ? 'Prime Purity' : 'Standard Tier'}
                            </span>
                            {isSelected && (
                              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#a67c42]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Weight in Grams & Presets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                        Net Gold Weight (Grams)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10000}
                        value={formData.weightGrams || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            weightGrams: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#e2e8f0] bg-white focus:border-[#a67c42] focus:ring-2 focus:ring-[#a67c42]/20 focus:outline-none font-mono font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                        Quick Weight Presets
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {[10, 20, 50, 100, 250].map((w) => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => setFormData({ ...formData, weightGrams: w })}
                            className={`px-2.5 py-1.5 text-xs rounded-md border font-mono transition-colors ${
                              formData.weightGrams === w
                                ? 'border-[#a67c42] bg-[#fbf7f0] text-[#8c642a] font-bold'
                                : 'border-[#e2e8f0] bg-white text-[#475569] hover:bg-slate-100'
                            }`}
                          >
                            {w}g
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-sans font-bold text-sm tracking-wide text-white bg-gradient-to-r from-[#8c642a] via-[#a67c42] to-[#8c642a] shadow-lg shadow-[#a67c42]/25 hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" />
                        <span>Compiling & Generating Official PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download size={18} />
                        <span>Submit & Download Official PDF Certificate</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-[#64748b] text-center mt-2.5">
                    Upon submission, your PDF certificate is compiled locally and downloaded instantly.
                  </p>
                </div>
              </form>

              {/* Success Notification Card */}
              {lastGenerated && (
                <div className="mt-8 p-5 rounded-xl border border-emerald-200 bg-emerald-50/70 text-emerald-900">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-bold text-emerald-950">
                        PDF Certificate Generated & Downloaded!
                      </p>
                      <p className="text-xs text-emerald-700 font-mono">
                        {lastGenerated.filename}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={handleReDownload}
                          disabled={isGenerating}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
                        >
                          <Download size={13} />
                          <span>Download Again</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
                        >
                          <RefreshCw size={13} />
                          <span>Create New Certificate</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Simulated Certificate Preview (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-6 sm:p-8 rounded-2xl border border-[#c5a880]/40 bg-[#faf8f5] shadow-lg relative overflow-hidden">
              {/* Gold luxury corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#a67c42]" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#a67c42]" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#a67c42]" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#a67c42]" />

              {/* Preview Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e2e8f0]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] uppercase tracking-widest font-bold text-[#8c642a]">
                    Live Document Preview
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#64748b] bg-white px-2 py-0.5 rounded border border-[#e2e8f0]">
                  A4 Specification
                </span>
              </div>

              {/* Document Simulation Box */}
              <div className="bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-xs space-y-4">
                {/* Simulated Header */}
                <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
                  <BrandLogo size="sm" isLink={false} />
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-[#0f172a]">SCALEN STONE FINANCE</p>
                    <p className="text-[9px] text-[#64748b]">Bullion & Wealth Division</p>
                  </div>
                </div>

                {/* Simulated Title Banner */}
                <div className="p-2.5 rounded-lg bg-[#fbf7f0] border border-[#a67c42]/20 text-center">
                  <p className="text-[11px] font-brand font-bold text-[#0f172a]">
                    OFFICIAL GOLD PURCHASE CERTIFICATE
                  </p>
                  <p className="text-[9px] text-[#8c642a] font-mono">
                    {lastGenerated?.certNo || 'SSF-GP-2026-PREVIEW'}
                  </p>
                </div>

                {/* Client Meta Simulation */}
                <div className="grid grid-cols-2 gap-3 text-[11px] p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#64748b] block">
                      Client Name
                    </span>
                    <span className="font-bold text-[#0f172a] truncate block">
                      {formData.clientName || 'Client Name Here'}
                    </span>
                    <span className="text-[10px] text-[#64748b] block">
                      {formData.mobileNumber || '+91 ••••• •••••'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#64748b] block">
                      Location
                    </span>
                    <span className="font-medium text-[#0f172a] truncate block">
                      {formData.location || 'Location Here'}
                    </span>
                    <span className="text-[10px] text-[#64748b] truncate block">
                      {formData.address || 'Full delivery address'}
                    </span>
                  </div>
                </div>

                {/* Gold Specifications Table Simulation */}
                <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-[11px]">
                  <div className="bg-[#0f172a] text-white p-2 flex justify-between font-bold text-[10px]">
                    <span>Item & Specifications</span>
                    <span>Valuation</span>
                  </div>
                  <div className="p-2.5 space-y-2 bg-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-[#0f172a] text-[11px]">
                          {formData.goldType || 'e.g. 24K Swiss Bullion Bar'}
                        </p>
                        <p className="text-[9px] text-[#64748b]">
                          Weight: {weight}g • MCX Benchmark: ₹7,850/g
                        </p>
                      </div>
                      <span className="font-mono font-bold text-[#0f172a]">
                        {formattedValuation}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-dashed border-[#e2e8f0]">
                      <span className="text-[10px] text-[#64748b]">Gold Percentage:</span>
                      <span className="px-2 py-0.5 rounded bg-[#fbf7f0] border border-[#a67c42]/30 text-[#8c642a] font-bold text-[10px]">
                        {formData.goldPercentage} Purity
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#64748b]">
                      <span>Vault Custody:</span>
                      <span className="text-emerald-600 font-semibold">100% Insured</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#64748b]">
                      <span>Payment Method:</span>
                      <span className="text-[#0f172a] font-semibold truncate max-w-[150px]">
                        {formData.paymentMode || 'e.g. Bank Wire / RTGS'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Simulated Signature & Seal */}
                <div className="flex items-center justify-between pt-2 border-t border-[#e2e8f0]">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#8c642a]">
                    <span className="w-5 h-5 rounded-full border border-[#a67c42] flex items-center justify-center text-[7px] font-bold">
                      ✓
                    </span>
                    <span>Official Seal</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-serif italic text-[#8c642a]">R. K. Vardhan</p>
                    <p className="text-[8px] text-[#64748b]">Authorized Signatory</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-white/70 border border-[#c5a880]/20 text-[11px] text-[#64748b] space-y-1">
                <p className="font-semibold text-[#0f172a] flex items-center gap-1.5">
                  <Info size={13} className="text-[#a67c42]" />
                  <span>PDF Security Architecture</span>
                </p>
                <p>
                  Generated PDFs feature 256-bit tamper-evident transaction tokens, BIS hallmarking audits, and corporate registration numbers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import {
  User,
  Phone,
  Home,
  Coins,
  DollarSign,
  Calendar,
  Plus,
  Trash2,
  Camera,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileText,
  Download,
  RefreshCw,
  ShieldCheck,
  Building2,
  Sparkles,
  X,
  Edit2,
} from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { generateGoldLoanPdf, GoldLoanData, GoldItemRecord, formatINR } from '../services/goldPurchasePdf';
import { submitGoldLoanApplication } from '../services/web3forms';

export const GoldPurchasePage: React.FC = () => {
  // Step navigation: 1 = Customer Info, 2 = Loan Details & Photos
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Form State
  const [formData, setFormData] = useState<GoldLoanData>({
    aadharNumber: '',
    fullName: '',
    email: '',
    primaryMobile: '',
    secondaryMobile: '',
    emergencyContact: '',
    emergencyRelation: '',
    presentAddress: '',
    permanentAddress: '',
    goldItems: [
      {
        id: '1',
        description: '',
        grossWeight: 0,
        netWeight: 0,
        photos: [],
      },
    ],
    interestRate: 1.5,
    loanAmount: 0,
    durationMonths: '12',
    loanDate: '',
    monthlyInterest: 0,
    totalPrinciple: 0,
  });

  const [sameAsPresentAddress, setSameAsPresentAddress] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<{
    filename: string;
    certNo: string;
    web3Status?: 'sent' | 'fallback';
  } | null>(null);

  // File input refs for uploading photos per item
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const cameraInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Recalculate interest & total principle when loan amount or rate changes
  const handleLoanAmountOrRateChange = (amount: number, rate: number) => {
    const monthlyInt = Math.round((amount * rate) / 100);
    setFormData((prev) => ({
      ...prev,
      loanAmount: amount,
      interestRate: rate,
      monthlyInterest: monthlyInt,
      totalPrinciple: amount,
    }));
  };

  // Validation for Step 1
  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};

    const cleanAadhar = formData.aadharNumber.replace(/\s+/g, '');
    if (!cleanAadhar) {
      errs.aadharNumber = 'Aadhar number is required.';
    } else if (!/^\d{12}$/.test(cleanAadhar)) {
      errs.aadharNumber = 'Please enter a valid 12-digit Aadhar number.';
    }

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }

    const cleanMobile = formData.primaryMobile.replace(/\s+/g, '');
    if (!cleanMobile) {
      errs.primaryMobile = 'Primary mobile number is required.';
    } else if (!/^[0-9+-\s()]{7,16}$/.test(cleanMobile)) {
      errs.primaryMobile = 'Please enter a valid mobile number.';
    }

    if (!formData.presentAddress.trim()) {
      errs.presentAddress = 'Present address is required.';
    }

    if (!formData.permanentAddress.trim() && !sameAsPresentAddress) {
      errs.permanentAddress = 'Permanent address is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validation for Step 2
  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.goldItems || formData.goldItems.length === 0) {
      errs.goldItems = 'At least one gold item is required.';
    } else {
      formData.goldItems.forEach((itm, idx) => {
        if (!itm.description.trim()) {
          errs[`item_${idx}_desc`] = `Description for Item #${idx + 1} is required.`;
        }
        if (!itm.grossWeight || itm.grossWeight <= 0) {
          errs[`item_${idx}_gross`] = `Gross weight for Item #${idx + 1} must be > 0.`;
        }
      });
    }

    if (!formData.loanAmount || formData.loanAmount <= 0) {
      errs.loanAmount = 'Loan Amount must be greater than 0.';
    }

    if (!formData.interestRate || formData.interestRate <= 0) {
      errs.interestRate = 'Valid interest rate is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      // If sameAsPresentAddress, sync it
      if (sameAsPresentAddress) {
        setFormData((prev) => ({ ...prev, permanentAddress: prev.presentAddress }));
      }
      setCurrentStep(2);
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsGenerating(true);
    try {
      const certNo = `SSF-GL-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

      const dataToGenerate: GoldLoanData = {
        ...formData,
        permanentAddress: sameAsPresentAddress ? formData.presentAddress : formData.permanentAddress,
        certificateNumber: certNo,
        loanDate:
          formData.loanDate ||
          new Date().toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
      };

      // 1. Submit loan particulars to Scalen Stone Bullion Desk via Web3Forms
      const web3Res = await submitGoldLoanApplication(dataToGenerate, certNo);

      // 2. Generate official verified PDF sanction dossier & pledge receipt
      const { filename } = await generateGoldLoanPdf(dataToGenerate);
      
      setLastGenerated({
        filename,
        certNo,
        web3Status: web3Res.success ? 'sent' : 'fallback',
      });
    } catch (err) {
      console.error('Failed to process loan application:', err);
      alert('An error occurred while generating the PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Gold Items Management
  const addGoldItem = () => {
    setFormData((prev) => ({
      ...prev,
      goldItems: [
        ...prev.goldItems,
        {
          id: Date.now().toString(),
          description: '',
          grossWeight: 0,
          netWeight: 0,
          photos: [],
        },
      ],
    }));
  };

  const removeGoldItem = (idx: number) => {
    if (formData.goldItems.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      goldItems: prev.goldItems.filter((_, i) => i !== idx),
    }));
  };

  const updateGoldItem = (idx: number, field: keyof GoldItemRecord, val: any) => {
    setFormData((prev) => {
      const updated = [...prev.goldItems];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, goldItems: updated };
    });
  };

  // Photo Upload Handler (Converts selected files to base64 Data URLs)
  const handlePhotoUpload = (idx: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const currentPhotos = [...(formData.goldItems[idx].photos || [])];

    Array.from(files).forEach((file) => {
      if (currentPhotos.length >= 3) return; // Limit to 3 photos per item
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          setFormData((prev) => {
            const updated = [...prev.goldItems];
            const photos = [...(updated[idx].photos || [])];
            if (photos.length < 3) {
              photos.push(reader.result as string);
              updated[idx] = { ...updated[idx], photos };
            }
            return { ...prev, goldItems: updated };
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (itemIdx: number, photoIdx: number) => {
    setFormData((prev) => {
      const updated = [...prev.goldItems];
      const photos = updated[itemIdx].photos.filter((_, i) => i !== photoIdx);
      updated[itemIdx] = { ...updated[itemIdx], photos };
      return { ...prev, goldItems: updated };
    });
  };

  const handleReset = () => {
    setFormData({
      aadharNumber: '',
      fullName: '',
      email: '',
      primaryMobile: '',
      secondaryMobile: '',
      emergencyContact: '',
      emergencyRelation: '',
      presentAddress: '',
      permanentAddress: '',
      goldItems: [
        {
          id: '1',
          description: '',
          grossWeight: 0,
          netWeight: 0,
          photos: [],
        },
      ],
      interestRate: 1.5,
      loanAmount: 0,
      durationMonths: '12',
      loanDate: '',
      monthlyInterest: 0,
      totalPrinciple: 0,
    });
    setSameAsPresentAddress(false);
    setErrors({});
    setLastGenerated(null);
    setCurrentStep(1);
  };

  // Formatted date badge for custom loan date
  const displaySelectedDate = formData.loanDate
    ? new Date(formData.loanDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      })
    : `Today (${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric' })})`;

  return (
    <div className="pt-28 pb-24 bg-white text-[#0f172a]">
      {/* Page Header */}
      <section className="relative py-14 sm:py-20 border-b border-[#e2e8f0] overflow-hidden bg-[#f8fafc]">
        {/* Matching Hero Background Image with Luxury Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1600&auto=format&fit=crop"
            alt="Gold jewelry appraisal and bullion desk"
            className="w-full h-full object-cover object-center opacity-15 sm:opacity-20 mix-blend-multiply filter contrast-110"
            loading="eager"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <SectionHeader
            eyebrow="Scalen Stone Bullion & Credit Desk"
            title="Gold Loan Application &"
            highlight="Sanction Dossier."
            description="Capture customer contact information and pledged gold item specifications to instantly generate and download an official verified loan sanction dossier and vault pledge receipt."
            align="center"
          />

          {/* Stepper matching the reference image (Customer Info -> Loan Details & Photos) */}
          <div className="mt-10 flex items-center justify-center">
            <div className="flex items-center gap-3 sm:gap-6 bg-white px-6 sm:px-10 py-3 rounded-full border border-blue-100/90 shadow-xs">
              {/* Step 1: Customer Info */}
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2.5 focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    currentStep === 1
                      ? 'bg-[#0e1353] text-white shadow-md shadow-[#0e1353]/30'
                      : 'bg-blue-50 text-[#0e1353]'
                  }`}
                >
                  <User size={18} />
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold tracking-wide ${
                    currentStep === 1 ? 'text-[#0e1353]' : 'text-[#64748b]'
                  }`}
                >
                  Customer Info
                </span>
              </button>

              <div
                className={`w-10 sm:w-16 h-0.5 transition-colors ${
                  currentStep === 2 ? 'bg-[#0e1353]' : 'bg-slate-200'
                }`}
              />

              {/* Step 2: Loan Details & Photos */}
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setCurrentStep(2);
                }}
                className="flex items-center gap-2.5 focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    currentStep === 2
                      ? 'bg-[#0e1353] text-white shadow-md shadow-[#0e1353]/30'
                      : 'bg-slate-100 text-[#64748b]'
                  }`}
                >
                  <DollarSign size={18} />
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold tracking-wide ${
                    currentStep === 2 ? 'text-[#0e1353]' : 'text-[#64748b]'
                  }`}
                >
                  Loan Details & Photos
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Container */}
      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#e2e8f0] shadow-sm p-6 sm:p-10">
          {/* ============================================================== */}
          {/* STEP 1: CUSTOMER INFO / CONTACT INFORMATION                    */}
          {/* ============================================================== */}
          {currentStep === 1 && (
            <form onSubmit={handleNextToStep2} className="space-y-8">
              {/* 1. Personal Info */}
              <div>
                <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-[#f1f5f9]">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
                    Personal Info
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Aadhar Number */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                      Aadhar Number <span className="text-rose-500">*</span>
                    </label>
                    <p className="text-[11px] text-[#64748b] mb-1.5">12-digit unique ID</p>
                    <input
                      type="text"
                      maxLength={14}
                      value={formData.aadharNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        // Format with spaces: XXXX XXXX XXXX
                        const formatted = val.replace(/(\d{4})/g, '$1 ').trim();
                        setFormData({ ...formData, aadharNumber: formatted });
                      }}
                      placeholder="Aadhar Number (e.g. 5441 3733 3337)"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 font-mono transition-colors ${
                        errors.aadharNumber
                          ? 'border-rose-300 focus:ring-rose-200'
                          : 'border-[#e2e8f0] focus:border-[#3b82f6] focus:ring-[#3b82f6]/20'
                      }`}
                    />
                    {errors.aadharNumber && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">
                        {errors.aadharNumber}
                      </p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <p className="text-[11px] text-transparent mb-1.5">.</p>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Full Name"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-colors ${
                        errors.fullName
                          ? 'border-rose-300 focus:ring-rose-200'
                          : 'border-[#e2e8f0] focus:border-[#3b82f6] focus:ring-[#3b82f6]/20'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div className="mt-5">
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                    Email
                  </label>
                  <p className="text-[11px] text-[#64748b] mb-1.5">
                    Optional - Statement & Sanction advice will be sent here if provided
                  </p>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email Address (Optional)"
                    className="w-full sm:w-1/2 px-3.5 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 2. Contact Info */}
              <div className="pt-4">
                <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-[#f1f5f9]">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
                    Contact Info
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Primary Mobile */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                      Primary Mobile <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.primaryMobile}
                      onChange={(e) =>
                        setFormData({ ...formData, primaryMobile: e.target.value })
                      }
                      placeholder="Primary Mobile Number"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-colors ${
                        errors.primaryMobile
                          ? 'border-rose-300 focus:ring-rose-200'
                          : 'border-[#e2e8f0] focus:border-[#3b82f6] focus:ring-[#3b82f6]/20'
                      }`}
                    />
                    {errors.primaryMobile && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">
                        {errors.primaryMobile}
                      </p>
                    )}
                  </div>

                  {/* Secondary Mobile */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                      Secondary Mobile
                    </label>
                    <input
                      type="tel"
                      value={formData.secondaryMobile || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, secondaryMobile: e.target.value })
                      }
                      placeholder="Secondary Mobile Number"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Emergency Contact Number */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                      Emergency Contact Number
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContact || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, emergencyContact: e.target.value })
                      }
                      placeholder="Emergency Contact Number"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Relation with Emergency Contact */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                      Relation with Emergency Contact
                    </label>
                    <p className="text-[11px] text-[#64748b] mb-1.5">e.g., Father, Mother, Spouse</p>
                    <input
                      type="text"
                      value={formData.emergencyRelation || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, emergencyRelation: e.target.value })
                      }
                      placeholder="Relation (e.g., Father, Mother)"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Address */}
              <div className="pt-4">
                <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-[#f1f5f9]">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Home size={18} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
                    Address
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Present Address */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                      Present Address <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.presentAddress}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          presentAddress: val,
                          permanentAddress: sameAsPresentAddress ? val : prev.permanentAddress,
                        }));
                      }}
                      placeholder="Present Address"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-colors ${
                        errors.presentAddress
                          ? 'border-rose-300 focus:ring-rose-200'
                          : 'border-[#e2e8f0] focus:border-[#3b82f6] focus:ring-[#3b82f6]/20'
                      }`}
                    />
                    {errors.presentAddress && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">
                        {errors.presentAddress}
                      </p>
                    )}
                  </div>

                  {/* Quick toggle: Same as Present Address */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="sameAddress"
                      checked={sameAsPresentAddress}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setSameAsPresentAddress(isChecked);
                        if (isChecked) {
                          setFormData((prev) => ({
                            ...prev,
                            permanentAddress: prev.presentAddress,
                          }));
                        }
                      }}
                      className="rounded border-[#cbd5e1] text-[#3b82f6] focus:ring-[#3b82f6]"
                    />
                    <label
                      htmlFor="sameAddress"
                      className="text-xs font-medium text-[#475569] cursor-pointer"
                    >
                      Permanent Address is same as Present Address
                    </label>
                  </div>

                  {/* Permanent Address */}
                  {!sameAsPresentAddress && (
                    <div>
                      <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                        Permanent Address <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.permanentAddress}
                        onChange={(e) =>
                          setFormData({ ...formData, permanentAddress: e.target.value })
                        }
                        placeholder="Permanent Address"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-colors ${
                          errors.permanentAddress
                            ? 'border-rose-300 focus:ring-rose-200'
                            : 'border-[#e2e8f0] focus:border-[#3b82f6] focus:ring-[#3b82f6]/20'
                        }`}
                      />
                      {errors.permanentAddress && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">
                          {errors.permanentAddress}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button: Add Customer -> Next to Step 2 */}
              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center gap-2.5 py-3.5 px-8 rounded-xl font-bold text-sm text-white bg-[#0e1353] hover:bg-[#b45309] shadow-md hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Add Customer & Next</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            </form>
          )}

          {/* ============================================================== */}
          {/* STEP 2: LOAN DETAILS & PHOTOS                                  */}
          {/* ============================================================== */}
          {currentStep === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-8">
              {/* Web3Forms Honeypot Spam Protection */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Customer Verified Banner matching Reference Image 2 */}
              <div className="p-4 sm:p-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-950">
                      Customer Verified
                    </p>
                    <p className="text-xs text-emerald-800 font-medium">
                      {formData.fullName || 'Customer'}{' '}
                      <span className="font-mono">
                        ({formData.aadharNumber ? formData.aadharNumber.replace(/\s+/g, '') : 'Aadhar'})
                      </span>{' '}
                      - {formData.primaryMobile || 'Mobile'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Edit2 size={13} />
                  <span>Edit Customer Info</span>
                </button>
              </div>

              {/* 1. Gold Items Section */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#f1f5f9]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Coins size={18} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
                      Gold Items
                    </h3>
                  </div>

                  <span className="text-xs text-[#64748b] font-medium">
                    Total: {formData.goldItems.length} Item(s)
                  </span>
                </div>

                {errors.goldItems && (
                  <p className="text-xs text-rose-500 mb-3 font-medium">
                    {errors.goldItems}
                  </p>
                )}

                {/* Items List */}
                <div className="space-y-6">
                  {formData.goldItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-5 sm:p-6 rounded-2xl border-2 border-amber-200/70 bg-[#fffdfa] shadow-xs relative"
                    >
                      {/* Top Row: Description, Gross Weight, Net Weight */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Description */}
                        <div>
                          <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                            Description <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateGoldItem(idx, 'description', e.target.value)}
                            placeholder="Gold Item Description"
                            className={`w-full px-3 py-2 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-colors ${
                              errors[`item_${idx}_desc`]
                                ? 'border-rose-300 focus:ring-rose-200'
                                : 'border-[#e2e8f0] focus:border-amber-400 focus:ring-amber-400/20'
                            }`}
                          />
                          {errors[`item_${idx}_desc`] && (
                            <p className="text-[11px] text-rose-500 mt-1 font-medium">
                              {errors[`item_${idx}_desc`]}
                            </p>
                          )}
                        </div>

                        {/* Gross Weight */}
                        <div>
                          <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                            Gross Weight (g) <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.grossWeight || ''}
                            onChange={(e) =>
                              updateGoldItem(idx, 'grossWeight', parseFloat(e.target.value) || 0)
                            }
                            placeholder="Gross Weight"
                            className={`w-full px-3 py-2 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 font-mono transition-colors ${
                              errors[`item_${idx}_gross`]
                                ? 'border-rose-300 focus:ring-rose-200'
                                : 'border-[#e2e8f0] focus:border-amber-400 focus:ring-amber-400/20'
                            }`}
                          />
                          {errors[`item_${idx}_gross`] && (
                            <p className="text-[11px] text-rose-500 mt-1 font-medium">
                              {errors[`item_${idx}_gross`]}
                            </p>
                          )}
                        </div>

                        {/* Net Weight */}
                        <div>
                          <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                            Net Weight (g)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.netWeight || ''}
                            onChange={(e) =>
                              updateGoldItem(idx, 'netWeight', parseFloat(e.target.value) || 0)
                            }
                            placeholder="Net Weight"
                            className="w-full px-3 py-2 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none font-mono transition-colors"
                          />
                        </div>
                      </div>

                      {/* Photo Upload Section */}
                      <div className="mt-5 pt-4 border-t border-amber-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2 text-xs font-semibold text-[#0f172a]">
                            <Camera size={15} className="text-amber-600" />
                            <span>Photos for Gold Item {idx + 1}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Hidden File Inputs */}
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              ref={(el) => {
                                fileInputRefs.current[`item_${idx}`] = el;
                              }}
                              className="hidden"
                              onChange={(e) => handlePhotoUpload(idx, e.target.files)}
                            />
                            <input
                              type="file"
                              accept="image/*"
                              capture="environment"
                              ref={(el) => {
                                cameraInputRefs.current[`item_${idx}`] = el;
                              }}
                              className="hidden"
                              onChange={(e) => handlePhotoUpload(idx, e.target.files)}
                            />

                            <button
                              type="button"
                              onClick={() => fileInputRefs.current[`item_${idx}`]?.click()}
                              disabled={(item.photos || []).length >= 3}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3b82f6] text-white text-xs font-semibold hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                              <Upload size={13} />
                              <span>Choose Files</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => cameraInputRefs.current[`item_${idx}`]?.click()}
                              disabled={(item.photos || []).length >= 3}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                              <Camera size={13} />
                              <span>Take Photo</span>
                            </button>
                          </div>
                        </div>

                        {/* Photo counter & thumbnails */}
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] text-[#64748b]">
                            {(item.photos || []).length} / 3 photos
                          </p>

                          {formData.goldItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeGoldItem(idx)}
                              className="text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                            >
                              Remove Gold Item
                            </button>
                          )}
                        </div>

                        {/* Thumbnail previews */}
                        {(item.photos || []).length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2.5">
                            {item.photos.map((photoUrl, pIdx) => (
                              <div
                                key={pIdx}
                                className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shadow-xs group"
                              >
                                <img
                                  src={photoUrl}
                                  alt={`Gold Item ${idx + 1} Photo ${pIdx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removePhoto(idx, pIdx)}
                                  className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white rounded-full flex items-center justify-center text-[10px] opacity-90 hover:opacity-100 cursor-pointer"
                                  title="Remove photo"
                                >
                                  <X size={10} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* + Add Gold Item Button */}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={addGoldItem}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus size={15} />
                    <span>+ Add Gold Item</span>
                  </button>
                </div>
              </div>

              {/* 2. Loan Details Section */}
              <div className="pt-4">
                <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-[#f1f5f9]">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <DollarSign size={18} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
                    Loan Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Interest Rate (%) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                      Interest Rate (%) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.1"
                      value={formData.interestRate || ''}
                      onChange={(e) => {
                        const r = parseFloat(e.target.value) || 0;
                        handleLoanAmountOrRateChange(formData.loanAmount, r);
                      }}
                      placeholder="Enter interest rate (e.g. 1.5)"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 font-mono transition-colors ${
                        errors.interestRate
                          ? 'border-rose-300 focus:ring-rose-200'
                          : 'border-[#e2e8f0] focus:border-[#3b82f6] focus:ring-[#3b82f6]/20'
                      }`}
                    />
                    {errors.interestRate && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">
                        {errors.interestRate}
                      </p>
                    )}
                  </div>

                  {/* Loan Amount (₹) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                      Loan Amount (₹) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1000"
                      value={formData.loanAmount || ''}
                      onChange={(e) => {
                        const a = parseFloat(e.target.value) || 0;
                        handleLoanAmountOrRateChange(a, formData.interestRate);
                      }}
                      placeholder="Loan Amount"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 font-mono font-bold transition-colors ${
                        errors.loanAmount
                          ? 'border-rose-300 focus:ring-rose-200'
                          : 'border-[#e2e8f0] focus:border-[#3b82f6] focus:ring-[#3b82f6]/20'
                      }`}
                    />
                    {errors.loanAmount && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">
                        {errors.loanAmount}
                      </p>
                    )}
                  </div>

                  {/* Duration (months) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                      Duration (months)
                    </label>
                    <select
                      value={formData.durationMonths}
                      onChange={(e) =>
                        setFormData({ ...formData, durationMonths: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 focus:outline-none font-medium"
                    >
                      <option value="1">1 Month</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="9">9 Months</option>
                      <option value="12">12 Months (1 Year)</option>
                      <option value="18">18 Months</option>
                      <option value="24">24 Months (2 Years)</option>
                      <option value="36">36 Months (3 Years)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Loan Date Section */}
              <div className="pt-4">
                <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-[#f1f5f9]">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Calendar size={18} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
                    Loan Date
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                      Custom Loan Date
                    </label>
                    <input
                      type="date"
                      value={formData.loanDate || ''}
                      onChange={(e) => setFormData({ ...formData, loanDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 focus:outline-none font-mono"
                    />
                    <p className="text-[11px] text-[#64748b] mt-1">
                      Leave empty to use today's date
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-medium flex items-center gap-2">
                    <span className="font-bold">Selected Date:</span>
                    <span>{displaySelectedDate}</span>
                  </div>
                </div>

                {/* Monthly Interest & Total Principle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                      Monthly Interest (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.monthlyInterest || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          monthlyInterest: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="Monthly Interest"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                      Total Principle Amount to be Paid (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.totalPrinciple || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalPrinciple: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="Total Amount"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#e2e8f0] bg-white focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 focus:outline-none font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons: Back + Create Loan with Photos */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#475569] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Customer Info</span>
                </button>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-xl font-bold text-sm text-white bg-[#0e1353] hover:bg-[#b45309] shadow-md hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Transmitting via Web3Forms & Compiling PDF...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀 Submit Application & Download Verified PDF</span>
                    </>
                  )}
                </button>
              </div>

              {/* Success Notification Banner */}
              {lastGenerated && (
                <div className="mt-8 p-6 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-950 space-y-3">
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2 size={24} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                          ✓ Transmitted via Web3Forms
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[10px] font-bold text-amber-900 uppercase tracking-wider font-mono">
                          Sanction Ref: {lastGenerated.certNo}
                        </span>
                      </div>
                      <p className="text-sm font-bold">
                        Gold Loan Application Transmitted & Sanction Dossier Downloaded!
                      </p>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        Application particulars have been delivered directly to Scalen Stone Bullion Desk via Web3Forms. Your official verified sanction dossier and pledge receipt has been saved as{' '}
                        <span className="font-mono font-semibold">{lastGenerated.filename}</span>.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2.5">
                        <button
                          type="button"
                          onClick={() => generateGoldLoanPdf({ ...formData, certificateNumber: lastGenerated.certNo })}
                          disabled={isGenerating}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
                        >
                          <Download size={14} />
                          <span>Download PDF Again</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
                        >
                          <RefreshCw size={14} />
                          <span>Create New Loan Application</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

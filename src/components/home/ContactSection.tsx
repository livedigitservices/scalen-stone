import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { BRAND } from '../../constants/theme';
import { submitContactEnquiry } from '../../services/web3forms';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceInterestedIn: 'Instant Gold Loan',
    estimatedGrams: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Contact number is required';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Please provide brief details (minimum 10 characters)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const res = await submitContactEnquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        serviceInterestedIn: formData.serviceInterestedIn,
        estimatedGrams: formData.estimatedGrams,
        message: formData.message,
      });

      if (res.success) {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setStatusMessage(res.message);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          serviceInterestedIn: 'Instant Gold Loan',
          estimatedGrams: '',
          message: '',
        });
      } else {
        setIsSubmitting(false);
        setSubmitStatus('error');
        setStatusMessage(res.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setIsSubmitting(false);
      setSubmitStatus('error');
      setStatusMessage('An unexpected network error occurred. Please try again.');
    }
  };

  return (
    <section id="contact-enquiry" className="py-24 sm:py-32 relative bg-white border-t border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          eyebrow="Direct Advisory Connect"
          title="Connect With Our"
          highlight="Gold & Finance Desk."
          description="Schedule an in-branch evaluation or request certified doorstep gold valuation across Hyderabad and Visakhapatnam."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#0f172a] font-display">
                Executive Offices
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Visit our high-security valuation boardrooms or reach out for immediate assistance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafc] border border-blue-100/70 hover:border-[#0e1353]/30 transition-colors">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-[#ca8a04] flex-shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-[#0e1353]">Hyderabad Corporate Desk</p>
                  <p className="text-xs text-[#475569] leading-relaxed">{BRAND.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafc] border border-blue-100/70 hover:border-[#0e1353]/30 transition-colors">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-[#ca8a04] flex-shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-[#0e1353]">Visakhapatnam Operations Desk</p>
                  <p className="text-xs text-[#475569] leading-relaxed">{BRAND.contact.branchAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafc] border border-blue-100/70 hover:border-[#0e1353]/30 transition-colors">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-[#ca8a04] flex-shrink-0 mt-0.5">
                  <Phone size={20} />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-[#0e1353]">Instant Disbursal Hotline</p>
                  <p className="text-xs text-[#0e1353] font-semibold">
                    <a href={`tel:${BRAND.contact.phone.replace(/\s+/g, '')}`} className="hover:text-[#ca8a04] transition-colors">
                      {BRAND.contact.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafc] border border-blue-100/70 hover:border-[#0e1353]/30 transition-colors">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-[#ca8a04] flex-shrink-0 mt-0.5">
                  <Mail size={20} />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-[#0e1353]">Confidential Correspondence</p>
                  <p className="text-xs text-[#0e1353] font-semibold">
                    <a href={`mailto:${BRAND.contact.email}`} className="hover:text-[#ca8a04] transition-colors">
                      {BRAND.contact.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafc] border border-blue-100/70 hover:border-[#0e1353]/30 transition-colors">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-[#ca8a04] flex-shrink-0 mt-0.5">
                  <Clock size={20} />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-[#0e1353]">Business Hours</p>
                  <p className="text-xs text-[#475569] leading-relaxed">{BRAND.contact.businessHours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-blue-100/90 bg-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(14,19,83,0.07)]">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#0e1353] font-display">
                  Initiate Gold & Finance Discussion
                </h3>
                <p className="text-xs text-[#475569] mt-1">
                  Connect directly with our senior appraisal officers for instant loan sanctions or gold releases.
                </p>
              </div>

              {submitStatus === 'success' ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-amber-100 border-2 border-[#ca8a04] flex items-center justify-center mx-auto text-[#ca8a04] shadow-sm">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-2">
                      ✓ Delivered via Web3Forms
                    </span>
                    <h4 className="text-xl font-bold text-[#0e1353] font-display">Enquiry Successfully Delivered</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                    {statusMessage ||
                      'Thank you. A Senior Appraisal Officer from Scalen Stone Finance will review your request and call you within 15 minutes.'}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitStatus('idle');
                        setStatusMessage('');
                      }}
                      className="px-6 py-2.5 rounded-lg bg-[#0e1353] text-white text-xs font-bold hover:bg-[#b45309] transition-colors cursor-pointer shadow-sm"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Web3Forms Honeypot Spam Protection */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Submission Error Alert */}
                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-3">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-500" />
                      <div className="flex-1">
                        <p className="font-bold">Transmission Error</p>
                        <p className="mt-0.5">{statusMessage || 'Unable to deliver your message. Please check your connection and try again.'}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSubmitStatus('idle')}
                        className="text-red-800 font-bold hover:underline ml-2"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikramaditya Rao"
                      className={`w-full px-4 py-3 rounded-lg bg-[#f8fafc] border text-sm text-[#0e1353] placeholder-[#94a3b8] focus:outline-none focus:border-[#0e1353] focus:bg-white transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className={`w-full px-4 py-3 rounded-lg bg-[#f8fafc] border text-sm text-[#0e1353] placeholder-[#94a3b8] focus:outline-none focus:border-[#0e1353] focus:bg-white transition-colors ${
                          errors.email ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 rounded-lg bg-[#f8fafc] border text-sm text-[#0e1353] placeholder-[#94a3b8] focus:outline-none focus:border-[#0e1353] focus:bg-white transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                        Service Interested In
                      </label>
                      <select
                        value={formData.serviceInterestedIn}
                        onChange={(e) => setFormData({ ...formData, serviceInterestedIn: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-sm text-[#0e1353] focus:outline-none focus:border-[#0e1353] focus:bg-white transition-colors cursor-pointer"
                      >
                        <option value="Instant Gold Loan">Instant Gold Loan (15-Min Disbursal)</option>
                        <option value="Release Pledged Gold">Release Pledged Gold (Bank Buy-Back)</option>
                        <option value="Sell Gold / Cash Out">Sell Gold / Instant Cash Out</option>
                        <option value="Business Gold Finance">Business & Merchant Gold Finance</option>
                        <option value="Bullion & Wealth Advisory">Bullion & Wealth Advisory</option>
                        <option value="Doorstep Gold Valuation">Doorstep Gold Valuation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                        Estimated Gold Weight (Approx)
                      </label>
                      <input
                        type="text"
                        value={formData.estimatedGrams}
                        onChange={(e) => setFormData({ ...formData, estimatedGrams: e.target.value })}
                        placeholder="e.g. 50 grams / sovereign"
                        className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-sm text-[#0e1353] placeholder-[#94a3b8] focus:outline-none focus:border-[#0e1353] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                      Message / Requirements *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention your requirements, preferred branch (Hyderabad or Visakhapatnam), or whether you have gold pledged with another bank..."
                      className={`w-full px-4 py-3 rounded-lg bg-[#f8fafc] border text-sm text-[#0e1353] placeholder-[#94a3b8] focus:outline-none focus:border-[#0e1353] focus:bg-white transition-colors ${
                        errors.message ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#0e1353] text-white font-semibold text-sm hover:bg-[#b45309] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Processing Request...</span>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-[#64748b] text-center">
                    Direct delivery via Web3Forms • 100% Confidential • Strict Fiduciary Non-Disclosure.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { BRAND } from '../../constants/theme';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        serviceInterestedIn: 'Instant Gold Loan',
        estimatedGrams: '',
        message: '',
      });
    }, 1000);
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
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="p-3 rounded-lg bg-[#fbf7f0] border border-[#a67c42]/30 text-[#a67c42] flex-shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-[#0f172a]">Hyderabad Corporate Desk</p>
                  <p className="text-xs text-[#475569] leading-relaxed">{BRAND.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="p-3 rounded-lg bg-[#fbf7f0] border border-[#a67c42]/30 text-[#a67c42] flex-shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-[#0f172a]">Visakhapatnam Operations Desk</p>
                  <p className="text-xs text-[#475569] leading-relaxed">{BRAND.contact.branchAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="p-3 rounded-lg bg-[#fbf7f0] border border-[#a67c42]/30 text-[#a67c42] flex-shrink-0 mt-0.5">
                  <Phone size={20} />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-[#0f172a]">Instant Disbursal Hotline</p>
                  <p className="text-xs text-[#0f172a] font-semibold">
                    <a href={`tel:${BRAND.contact.phone.replace(/\s+/g, '')}`} className="hover:text-[#a67c42] transition-colors">
                      {BRAND.contact.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="p-3 rounded-lg bg-[#fbf7f0] border border-[#a67c42]/30 text-[#a67c42] flex-shrink-0 mt-0.5">
                  <Mail size={20} />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-[#0f172a]">Confidential Correspondence</p>
                  <p className="text-xs text-[#0f172a] font-semibold">
                    <a href={`mailto:${BRAND.contact.email}`} className="hover:text-[#a67c42] transition-colors">
                      {BRAND.contact.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="p-3 rounded-lg bg-[#fbf7f0] border border-[#a67c42]/30 text-[#a67c42] flex-shrink-0 mt-0.5">
                  <Clock size={20} />
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-[#0f172a]">Business Hours</p>
                  <p className="text-xs text-[#475569] leading-relaxed">{BRAND.contact.businessHours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-8 sm:p-10 shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#0f172a] font-display">
                  Initiate Gold & Finance Discussion
                </h3>
                <p className="text-xs text-[#475569] mt-1">
                  Connect directly with our senior appraisal officers for instant loan sanctions or gold releases.
                </p>
              </div>

              {submitStatus === 'success' ? (
                <div className="p-6 rounded-xl bg-[#fbf7f0] border border-[#a67c42]/40 space-y-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#fbf7f0] border border-[#a67c42] flex items-center justify-center mx-auto text-[#a67c42]">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-lg font-bold text-[#0f172a]">Enquiry Received</h4>
                  <p className="text-xs sm:text-sm text-[#475569] max-w-md mx-auto">
                    Thank you. A Senior Appraisal Officer from Scalen Stone Finance will review your request and call you within 15 minutes.
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="text-xs text-[#a67c42] hover:underline font-bold pt-2"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikramaditya Rao"
                      className={`w-full px-4 py-3 rounded-lg bg-[#f8fafc] border text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#a67c42] focus:bg-white transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-[#cbd5e1]'
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
                        className={`w-full px-4 py-3 rounded-lg bg-[#f8fafc] border text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#a67c42] focus:bg-white transition-colors ${
                          errors.email ? 'border-red-500' : 'border-[#cbd5e1]'
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
                        className={`w-full px-4 py-3 rounded-lg bg-[#f8fafc] border text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#a67c42] focus:bg-white transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-[#cbd5e1]'
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
                        className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-[#cbd5e1] text-sm text-[#0f172a] focus:outline-none focus:border-[#a67c42] focus:bg-white transition-colors cursor-pointer"
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
                        className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-[#cbd5e1] text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#a67c42] focus:bg-white transition-colors"
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
                      className={`w-full px-4 py-3 rounded-lg bg-[#f8fafc] border text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#a67c42] focus:bg-white transition-colors ${
                        errors.message ? 'border-red-500' : 'border-[#cbd5e1]'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#a67c42] via-[#b38e5d] to-[#8c642a] text-white font-semibold text-sm hover:from-[#b38e5d] hover:to-[#a67c42] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(166,124,66,0.3)] disabled:opacity-50"
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
                    All evaluations are conducted under strict non-disclosure. 100% confidential.
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

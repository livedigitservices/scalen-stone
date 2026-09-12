import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { BRAND } from '../constants/theme';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-white text-[#0f172a]">
      <section className="py-16 border-b border-[#e2e8f0] bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#a67c42]/30 bg-[#fbf7f0] text-xs font-semibold uppercase tracking-wider text-[#a67c42]">
            <ShieldCheck size={14} />
            Data Governance & Confidentiality
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#0f172a] font-display">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#64748b]">Last Updated: February 2026 | Scalen Stone Finance</p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-sm text-[#334155] leading-relaxed">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0f172a]">1. Commitment to Client Confidentiality</h2>
          <p>
            Scalen Stone Finance is dedicated to safeguarding the personal and financial information of our clients, prospective borrowers, and partners. Because we operate under a strict fiduciary mandate, the confidentiality of your gold holdings, loan amounts, and personal data is paramount.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0f172a]">2. Information We Collect</h2>
          <p>We may collect information necessary to deliver gold appraisals and financial loans:</p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#475569]">
            <li>Contact details: Full legal name, email, phone number, and residential address.</li>
            <li>Financial profile: Pledged loan slips, bank account details for direct loan transfer, and government identification (Aadhaar/PAN).</li>
          </ul>
        </div>

        <div id="security" className="space-y-4 p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
          <div className="flex items-center gap-3 text-[#0f172a] font-bold text-base">
            <Lock size={18} className="text-[#a67c42]" />
            <h3>3. Bank-Grade Security Architecture</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569]">
            All communications, digital receipts, and client submissions are protected using 256-bit encryption. Physical gold custody records are maintained with dual-key biometric controls.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0f172a]">4. Contact Our Privacy Counsel</h2>
          <p>
            For inquiries concerning data rights or our confidentiality protocols, contact us at <a href={`mailto:${BRAND.contact.email}`} className="text-[#a67c42] font-semibold underline">{BRAND.contact.email}</a>.
          </p>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { FOOTER_NAV } from '../../data/navigation';
import { BRAND } from '../../constants/theme';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#070b14] text-[#94a3b8] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0c1425]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-6">
            <BrandLogo size="lg" variant="light" />
            <p className="text-sm text-[#94a3b8] leading-relaxed max-w-sm">
              Scalen Stone Finance provides institutional gold financial solutions, instant gold loans, and asset monetization designed to help individuals and businesses plan, grow, and protect their future.
            </p>

            <div className="space-y-2.5 text-xs text-[#cbd5e1]">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#c5a880] mt-0.5 flex-shrink-0" />
                <span>{BRAND.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#c5a880] flex-shrink-0" />
                <a href={`tel:${BRAND.contact.phone.replace(/\s+/g, '')}`} className="hover:text-white font-semibold transition-colors">
                  {BRAND.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#c5a880] flex-shrink-0" />
                <a href={`mailto:${BRAND.contact.email}`} className="hover:text-white font-semibold transition-colors">
                  {BRAND.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#c5a880] bg-[#c5a880]/10 border border-[#c5a880]/20 rounded-md px-3 py-1.5 w-fit">
              <ShieldCheck size={16} />
              <span>100% Insured Bank Vault Storage & Purity Testing</span>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-bold tracking-wider text-white uppercase">Company</p>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{link.label}</span>
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a880]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-bold tracking-wider text-white uppercase">Advisory Services</p>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.services.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{link.label}</span>
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a880]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Governance & Legal */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-bold tracking-wider text-white uppercase">Governance & Legal</p>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{link.label}</span>
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a880]" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <p className="text-xs text-[#64748b] leading-relaxed">
                All gold loans, appraisals, and safe-custody accounts comply strictly with applicable Indian regulatory directives.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <p>© 2026 Scalen Stone Finance. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#cbd5e1] font-medium">Designed with purpose.</span>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { FOOTER_NAV } from '../../data/navigation';
import { BRAND } from '../../constants/theme';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0e1353] text-blue-100 border-t-4 border-[#ca8a04] pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-blue-900/60">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-6">
            <BrandLogo size="lg" variant="light" />
            <p className="text-sm text-blue-100/80 leading-relaxed max-w-sm">
              Scalen Stone Finance provides institutional gold financial solutions, instant gold loans, and asset monetization designed to help individuals and businesses plan, grow, and protect their future.
            </p>

            <div className="space-y-2.5 text-xs text-blue-100/90">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>{BRAND.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-yellow-400 flex-shrink-0" />
                <a href={`tel:${BRAND.contact.phone.replace(/\s+/g, '')}`} className="hover:text-yellow-400 font-bold transition-colors">
                  {BRAND.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-yellow-400 flex-shrink-0" />
                <a href={`mailto:${BRAND.contact.email}`} className="hover:text-yellow-400 font-bold transition-colors">
                  {BRAND.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-yellow-300 bg-yellow-500/15 border border-yellow-400/30 rounded-lg px-3 py-2 w-fit">
              <ShieldCheck size={16} className="text-yellow-400" />
              <span>100% Insured Bank Vault Storage & Purity Testing</span>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-bold tracking-wider text-yellow-400 uppercase">Company</p>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-1 group font-medium">
                    <span>{link.label}</span>
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-bold tracking-wider text-yellow-400 uppercase">Advisory Services</p>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.services.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-1 group font-medium">
                    <span>{link.label}</span>
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Access & Legal */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-bold tracking-wider text-yellow-400 uppercase">Quick Access</p>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.quickAccess.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-1 group font-medium">
                    <span>{link.label}</span>
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <p className="text-xs font-bold tracking-wider text-yellow-400 uppercase mb-2">Legal Disclosures</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                {FOOTER_NAV.legal.map((link) => (
                  <Link key={link.href} to={link.href} className="text-blue-200/80 hover:text-white transition-colors underline">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-1">
              <p className="text-xs text-blue-200/70 leading-relaxed">
                All gold loans, appraisals, and safe-custody accounts comply strictly with applicable Indian regulatory directives.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/70">
          <p>© 2026 Scalen Stone Finance. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-yellow-400 font-semibold">Institutional Trust & Precision.</span>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowUpRight, Sparkles } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { Button } from '../ui/Button';
import { NAV_ITEMS } from '../../data/navigation';
import { BRAND } from '../../constants/theme';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Live Gold Rate Bar - Cyangold Royal Navy Theme */}
      <div className="bg-[#0e1353] border-b border-blue-900/50 py-2 px-4 text-[11px] text-blue-100 hidden md:block shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-yellow-400 font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
              <span>Live Gold Benchmark (MCX):</span>
            </div>
            <div className="flex items-center gap-3">
              <span>24K: <strong className="text-white font-mono font-bold">{BRAND.liveRates.gold24k}/g</strong></span>
              <span className="text-blue-400/50">|</span>
              <span>22K: <strong className="text-white font-mono font-bold">{BRAND.liveRates.gold22k}/g</strong></span>
              <span className="text-blue-400/50">|</span>
              <span>18K: <strong className="text-white font-mono font-bold">{BRAND.liveRates.gold18k}/g</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-yellow-300 font-semibold flex items-center gap-1">
              <Sparkles size={12} className="text-yellow-400" />
              <span>Instant 15-Minute Disbursal • Minimal Interest Rates</span>
            </span>
            <span className="text-blue-400/50">|</span>
            <a href={`tel:${BRAND.contact.phone.replace(/\s+/g, '')}`} className="text-yellow-400 font-bold hover:text-white transition-colors">
              Hotline: {BRAND.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-3 shadow-md border-b border-blue-100'
            : 'bg-white/95 backdrop-blur-md py-4 border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <BrandLogo size="md" />
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `px-3.5 py-2 text-sm font-semibold tracking-wide rounded-md transition-colors relative ${
                      isActive
                        ? 'text-[#ca8a04] font-bold'
                        : 'text-[#0e1353] hover:text-[#ca8a04] hover:bg-blue-50/50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#ca8a04] rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${BRAND.contact.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-xs font-bold text-[#0e1353] hover:text-[#ca8a04] transition-colors"
              >
                <Phone size={14} className="text-[#ca8a04]" />
                <span>{BRAND.contact.phoneDisplay}</span>
              </a>
              <Button href="/contact" variant="primary" size="sm" showArrow>
                Get Started
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-3">
              <Button href="/contact" variant="primary" size="sm" className="hidden sm:inline-flex px-3 py-1.5 text-xs">
                Get Started
              </Button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg border border-blue-100 bg-white text-[#0e1353] hover:text-[#ca8a04] transition-colors focus:outline-none shadow-sm cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-white/98 backdrop-blur-2xl border-t border-gray-100 transition-all duration-300 overflow-y-auto px-6 py-8 flex flex-col justify-between shadow-2xl ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/70 text-xs text-slate-700 space-y-1">
            <p className="text-[#0e1353] font-bold uppercase tracking-wider">Live Gold Rates Today:</p>
            <p className="font-mono font-bold text-[#0e1353]">24K: {BRAND.liveRates.gold24k}/g • 22K: {BRAND.liveRates.gold22k}/g</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-[#ca8a04] font-bold mb-3 px-2">Navigation</p>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3.5 rounded-lg text-lg font-bold transition-all ${
                    isActive
                      ? 'bg-amber-50 text-[#ca8a04] border border-amber-200'
                      : 'text-[#0e1353] hover:bg-slate-50'
                  }`
                }
              >
                <span>{item.label}</span>
                <ArrowUpRight size={18} className="opacity-60" />
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
          <div className="text-xs text-slate-600 space-y-1">
            <p className="font-bold text-[#0e1353]">Gold Advisory & Disbursal Desk:</p>
            <p>{BRAND.contact.phoneDisplay} ({BRAND.contact.city})</p>
          </div>
          <Button href="/contact" variant="primary" size="lg" className="w-full" showArrow>
            Request Gold Valuation
          </Button>
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { MapPin, Phone, Clock, ShieldCheck, Navigation, CheckCircle2, Building, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { BRAND } from '../constants/theme';

interface BranchLocation {
  id: string;
  name: string;
  city: string;
  isHeadquarters?: boolean;
  address: string;
  phone: string;
  email: string;
  hours: string;
  facilities: string[];
  mapEmbedUrl: string;
}

const BRANCHES: BranchLocation[] = [
  {
    id: 'vizag-hq',
    name: 'Scalen Stone Main Branch (HQ)',
    city: 'Visakhapatnam',
    isHeadquarters: true,
    address: 'BK Towers, Main Road, Akkayyapalem, Visakhapatnam, Andhra Pradesh 530016',
    phone: BRAND.contact.phoneDisplay,
    email: BRAND.contact.email,
    hours: 'Mon - Sat: 9:00 AM - 6:30 PM (Sun: Closed)',
    facilities: [
      'Instant Gold Loan Disbursal Desk (15 Mins)',
      'German Laser Purity Testing Lab',
      'Bank-Grade Insured Vault Lockers',
      'Pledged Gold Liberation & Release Assistance',
      'Spot Cash & RTGS Immediate Transfer'
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.98888785469!2d83.3012111!3d17.7291111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39433e1471f301%3A0x6b4ef84c31165ad5!2sAkkayyapalem%2C%20Visakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
  },
  {
    id: 'hyderabad-hub',
    name: 'Scalen Stone Hyderabad Regional Hub',
    city: 'Hyderabad',
    address: 'Plot 42, Road No. 36, Near Metro Pillar 1680, Jubilee Hills, Hyderabad, Telangana 500033',
    phone: '+91 97000 49444',
    email: 'hyderabad@scalenstone.com',
    hours: 'Mon - Sat: 9:30 AM - 6:30 PM (Sun: Closed)',
    facilities: [
      'High-Value Gold Loan Desk (Up to ₹5 Cr)',
      'Certified Non-Destructive Assaying',
      'Private High-Security Appraisal Chambers',
      'Dedicated Corporate Bullion Facility'
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.666874311894!2d78.4069352!3d17.4277778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9727402657d1%3A0xb3e648c66e4a2c9!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin'
  },
  {
    id: 'vijayawada-branch',
    name: 'Scalen Stone Vijayawada Branch',
    city: 'Vijayawada',
    address: 'Opposite Gateway Hotel, MG Road, Labbipet, Vijayawada, Andhra Pradesh 520010',
    phone: '+91 97000 49444',
    email: 'vijayawada@scalenstone.com',
    hours: 'Mon - Sat: 9:00 AM - 6:30 PM (Sun: Closed)',
    facilities: [
      'Instant Cash for Gold Monetization',
      'Doorstep Gold Evaluation on Request',
      'Pledged Gold Takeover from Any Bank',
      'Zero Valuation Fees Guarantee'
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.438515749721!2d80.6480111!3d16.5034111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fab062c3e1e9%3A0x6b139c8928c0b588!2sLabbipet%2C%20Vijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000002!5m2!1sen!2sin'
  },
  {
    id: 'bengaluru-branch',
    name: 'Scalen Stone Bengaluru Central',
    city: 'Bengaluru',
    address: '840, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    phone: '+91 97000 49444',
    email: 'bengaluru@scalenstone.com',
    hours: 'Mon - Sat: 9:30 AM - 6:30 PM (Sun: Closed)',
    facilities: [
      'Institutional Bullion Advisory',
      'Instant Disbursal via RTGS/IMPS',
      'Complete Insurance Safe Custody',
      'Biometric Vault Access Protection'
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001655823194!2d77.6409111!3d12.9719111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a7e0f34d1b%3A0xb3be54efebc3e66!2s100%20Feet%20Rd%2C%20Indiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000003!5m2!1sen!2sin'
  }
];

export const LocationPage: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<BranchLocation>(BRANCHES[0]);

  return (
    <div className="pt-28 pb-24 bg-white">
      {/* Hero Section matching cyangold visual style */}
      <section className="relative py-20 bg-blue-50/70 border-b border-blue-100 overflow-hidden">
        {/* Subtle background overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80"
            alt="Vault locations"
            className="w-full h-full object-cover mix-blend-multiply"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-xs font-semibold tracking-wider uppercase text-amber-900 mb-4 shadow-xs">
            <MapPin size={13} className="text-[#ca8a04]" />
            <span>Pan-India Presence & Vault Network</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0e1353] mb-6 font-display">
            Our <span className="gold-gradient-text">Locations</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#475569] max-w-3xl mx-auto leading-relaxed font-normal">
            Find your nearest Scalen Stone Finance branch. We have multiple secure locations across major cities in India equipped with bank-grade vaults, instant evaluation, and certified appraisal desks to serve you better.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Branch Cards List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-100">
              <h2 className="text-lg font-bold text-[#0e1353] flex items-center gap-2">
                <Building size={18} className="text-[#ca8a04]" />
                Select a Branch
              </h2>
              <span className="text-xs text-[#ca8a04] font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                {BRANCHES.length} Verified Centers
              </span>
            </div>

            {BRANCHES.map((branch) => {
              const isSelected = selectedBranch.id === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-[#0e1353] bg-blue-50/60 shadow-md ring-2 ring-[#0e1353]/10'
                      : 'border-blue-100/80 bg-white hover:border-[#0e1353]/40 hover:bg-slate-50/50 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-[#0e1353] font-display">
                      {branch.name}
                    </h3>
                    {branch.isHeadquarters && (
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-[#0e1353] text-white px-2 py-0.5 rounded-full">
                        Headquarters
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5 text-sm text-[#475569]">
                    <div className="flex items-start gap-2.5">
                      <MapPin size={16} className="text-[#ca8a04] mt-0.5 flex-shrink-0" />
                      <p className="leading-snug">{branch.address}</p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone size={16} className="text-[#ca8a04] flex-shrink-0" />
                      <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="font-semibold text-[#0e1353] hover:text-[#ca8a04] transition-colors">
                        {branch.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs text-[#64748b]">
                      <Clock size={15} className="text-[#ca8a04] flex-shrink-0" />
                      <span>{branch.hours}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-blue-100/60 flex items-center justify-between text-xs">
                    <span className="text-[#0e1353] font-bold">
                      {isSelected ? '✓ Currently Viewing' : 'Click to View Details'}
                    </span>
                    <span className="text-[#ca8a04] font-medium flex items-center gap-1">
                      <span>View Map</span>
                      <Navigation size={12} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Branch Detailed View & Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-blue-100/90 shadow-lg p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blue-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ca8a04] uppercase tracking-wider mb-1">
                    <span>{selectedBranch.city} Branch</span>
                    {selectedBranch.isHeadquarters && <span>• Corporate HQ</span>}
                  </div>
                  <h2 className="text-2xl font-bold text-[#0e1353] font-display">
                    {selectedBranch.name}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${selectedBranch.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0e1353] text-white text-xs font-bold hover:bg-[#b45309] transition-colors shadow-xs"
                  >
                    <Phone size={14} />
                    <span>Call Desk</span>
                  </a>
                  <Button href="/contact" variant="gold" size="sm">
                    Book Visit
                  </Button>
                </div>
              </div>

              {/* Address & Timings Banner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0e1353] mb-1">
                    <MapPin size={15} className="text-[#ca8a04]" />
                    <span>Physical Address</span>
                  </div>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    {selectedBranch.address}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                    <Clock size={15} className="text-[#ca8a04]" />
                    <span>Operating Hours</span>
                  </div>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    {selectedBranch.hours}
                  </p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">
                    ● Open Today for Walk-in Appraisals
                  </p>
                </div>
              </div>

              {/* Branch Available Facilities */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-[#0e1353] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#ca8a04]" />
                  Branch Services & Facilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedBranch.facilities.map((facility, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-[#1e293b]">
                      <CheckCircle2 size={14} className="text-[#ca8a04] flex-shrink-0" />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Map Embed */}
              <div className="rounded-xl overflow-hidden border border-blue-100/90 shadow-inner h-80 relative">
                <iframe
                  title={`Map of ${selectedBranch.name}`}
                  src={selectedBranch.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Map Footer Assistance */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#64748b]">
                <p>Need navigation assistance? Contact our local branch desk directly.</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedBranch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-[#0e1353] hover:text-[#ca8a04] transition-colors"
                >
                  <Navigation size={13} className="text-[#ca8a04]" />
                  <span>Open in Google Maps &rarr;</span>
                </a>
              </div>
            </div>

            {/* Quick Action Bottom Card */}
            <div className="p-6 rounded-2xl bg-[#0e1353] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border-t-4 border-[#ca8a04]">
              <div>
                <h4 className="text-lg font-bold font-display text-white">Prefer a Doorstep Gold Appraisal?</h4>
                <p className="text-sm text-blue-100/80 mt-1">Our certified bullion evaluators can visit your home or office with portable laser testing equipment.</p>
              </div>
              <Button href="/contact" variant="gold" size="md" className="flex-shrink-0">
                Request Doorstep Visit
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

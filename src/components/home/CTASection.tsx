import React from 'react';
import { Button } from '../ui/Button';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-[#0e1353] text-white border-t-4 border-[#ca8a04]">
      {/* Ambient luxury lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#ca8a04]/12 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-300/40 bg-white/10 text-xs font-semibold tracking-wider uppercase text-amber-300 shadow-sm backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#eab308] animate-pulse" />
          Take The Next Strategic Step
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] font-display">
          Your Financial Future Starts With{' '}
          <span className="gold-gradient-text block sm:inline">A Conversation.</span>
        </h2>

        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Whether you're looking for instant gold loans, releasing pledged gold from banks, or planning for long-term growth, let's start with a conversation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button href="/contact" variant="gold" size="lg" showArrow>
            Get Started
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Schedule Consultation
          </Button>
        </div>

        <p className="text-xs text-blue-200/80">
          Strict confidentiality guaranteed. Certified non-destructive purity testing for every transaction.
        </p>
      </div>
    </section>
  );
};

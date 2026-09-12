import React from 'react';
import { Button } from '../ui/Button';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] border-t border-[#e2e8f0]">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#a67c42]/30 bg-[#fbf7f0] text-xs font-semibold tracking-wider uppercase text-[#a67c42] shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a67c42] animate-pulse" />
          Take The Next Strategic Step
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] leading-[1.15] font-display">
          Your Financial Future Starts With{' '}
          <span className="gold-gradient-text block sm:inline">A Conversation.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
          Whether you're looking for instant gold loans, releasing pledged gold from banks, or planning for long-term growth, let's start with a conversation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button href="/contact" variant="primary" size="lg" showArrow>
            Get Started
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Us
          </Button>
        </div>

        <p className="text-xs text-[#64748b]">
          Strict confidentiality guaranteed. Certified non-destructive purity testing for every transaction.
        </p>
      </div>
    </section>
  );
};

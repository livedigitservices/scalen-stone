import React from 'react';
import { StatCounter } from '../ui/StatCounter';
import { TRUST_STATS } from '../../data/stats';

export const TrustStatsSection: React.FC = () => {
  return (
    <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-[#e2e8f0] bg-white shadow-xl p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-[#e2e8f0]">
          {TRUST_STATS.map((stat, idx) => (
            <div key={idx} className={idx > 0 ? 'pt-4 sm:pt-0 lg:pl-6' : ''}>
              <StatCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                sublabel={stat.sublabel}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

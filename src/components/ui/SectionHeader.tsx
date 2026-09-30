import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-amber-200/80 bg-amber-50 text-xs font-semibold tracking-wider uppercase text-amber-800 shadow-xs ${isCenter ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
          {eyebrow}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0e1353] leading-[1.15]">
        {title} {highlight && <span className="gold-gradient-text block sm:inline">{highlight}</span>}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};

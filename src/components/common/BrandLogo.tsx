import React from 'react';
import { Link } from 'react-router-dom';
import logoDark from '../../assets/scalen-stone-logo.png';
import logoLight from '../../assets/scalen-stone-logo-light.png';

interface BrandLogoProps {
  variant?: 'light' | 'dark'; // 'dark' = dark text for light/white backgrounds (default); 'light' = white text for dark backgrounds (footer)
  size?: 'sm' | 'md' | 'lg';
  showSubheading?: boolean;
  className?: string;
  isLink?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  isLink = true,
}) => {
  const isLight = variant === 'light'; // true when on dark background (e.g., footer)

  // Height mappings matching official aspect ratio (~2.11:1)
  const heightClass =
    size === 'sm'
      ? 'h-8 sm:h-9'
      : size === 'lg'
      ? 'h-14 sm:h-16 md:h-20'
      : 'h-10 sm:h-11 md:h-12';

  const logoSrc = isLight ? logoLight : logoDark;

  const content = (
    <div className={`inline-flex items-center select-none group ${className}`}>
      <img
        src={logoSrc}
        alt="Scalen Stone Finance"
        className={`${heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] filter ${
          isLight
            ? 'drop-shadow-[0_2px_12px_rgba(197,168,128,0.2)]'
            : 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
        }`}
        loading="eager"
        decoding="async"
      />
    </div>
  );

  if (!isLink) {
    return content;
  }

  return (
    <Link
      to="/"
      className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a67c42] rounded-md transition-opacity hover:opacity-95"
      aria-label="Scalen Stone Finance Home"
    >
      {content}
    </Link>
  );
};

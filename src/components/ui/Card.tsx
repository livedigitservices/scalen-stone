import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
}) => {
  return (
    <div
      className={`relative rounded-xl border border-white/[0.08] bg-[#0c1425]/80 backdrop-blur-md p-6 sm:p-8 ${
        hoverEffect ? 'transition-all duration-300 hover:border-[#c5a880]/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]' : ''
      } ${className}`}
    >
      {/* Subtle top edge specular highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {children}
    </div>
  );
};

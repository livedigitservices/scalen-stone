import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  showArrow = false,
  className = '',
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-medium',
    md: 'px-6 py-3 text-sm font-semibold tracking-wide',
    lg: 'px-8 py-4 text-base font-semibold tracking-wide',
  }[size];

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#a67c42] via-[#b38e5d] to-[#8c642a] text-white hover:from-[#b38e5d] hover:to-[#a67c42] shadow-[0_4px_20px_rgba(166,124,66,0.25)] hover:shadow-[0_6px_25px_rgba(166,124,66,0.4)] border border-[#a67c42]/30',
    secondary:
      'bg-white text-[#0f172a] hover:bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#a67c42]/60 shadow-sm',
    outline:
      'bg-transparent text-[#0f172a] hover:text-[#a67c42] border border-[#cbd5e1] hover:border-[#a67c42] hover:bg-[#fbf7f0]/50',
    ghost:
      'bg-transparent text-[#475569] hover:text-[#0f172a] hover:bg-slate-100 border border-transparent',
    dark:
      'bg-[#0f172a] text-white hover:bg-[#1e293b] border border-[#0f172a]',
  }[variant];

  const baseClasses =
    'relative inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a67c42] cursor-pointer group';

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
          className="transition-transform duration-300 group-hover:translate-x-1 text-current flex-shrink-0"
        />
      )}
    </>
  );

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses}>
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};

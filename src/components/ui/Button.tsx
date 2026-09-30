import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark' | 'gold';
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
    sm: 'px-4 py-2 text-xs font-semibold',
    md: 'px-6 py-3 text-sm font-semibold tracking-wide',
    lg: 'px-8 py-4 text-base font-semibold tracking-wide',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#0e1353] text-white hover:bg-[#b45309] shadow-md hover:shadow-xl transition-all duration-200 border border-transparent',
    gold:
      'bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#b45309] text-white hover:from-[#b45309] hover:to-[#d97706] shadow-md hover:shadow-xl transition-all duration-200 border border-amber-300/30',
    secondary:
      'bg-white text-[#0e1353] hover:bg-blue-50/60 border border-slate-200 hover:border-[#0e1353]/60 shadow-sm',
    outline:
      'bg-transparent text-[#0e1353] hover:text-white border-2 border-[#0e1353] hover:bg-[#0e1353]',
    ghost:
      'bg-transparent text-[#475569] hover:text-[#0e1353] hover:bg-slate-100 border border-transparent',
    dark:
      'bg-[#0a0f3d] text-white hover:bg-[#0e1353] border border-[#0a0f3d]',
  }[variant];

  const baseClasses =
    'relative inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e1353] cursor-pointer group';

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

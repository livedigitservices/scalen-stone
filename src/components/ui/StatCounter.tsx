import React, { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  duration?: number;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  sublabel,
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (elRef.current) {
      observer.observe(elRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * end);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isVisible, value, duration]);

  return (
    <div ref={elRef} className="flex flex-col p-6 rounded-xl border border-[#e2e8f0] bg-white transition-all duration-300 hover:border-[#a67c42]/50 hover:shadow-md">
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-2xl sm:text-3xl font-semibold text-[#a67c42]">{prefix}</span>}
        <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-display">
          {count.toLocaleString()}
        </span>
        {suffix && <span className="text-2xl sm:text-3xl font-semibold text-[#a67c42]">{suffix}</span>}
      </div>
      <h3 className="mt-3 text-base sm:text-lg font-semibold text-[#0f172a] tracking-tight">{label}</h3>
      {sublabel && <p className="mt-1 text-xs sm:text-sm text-[#475569] leading-relaxed">{sublabel}</p>}
    </div>
  );
};

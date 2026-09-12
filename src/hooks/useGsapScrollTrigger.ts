import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  animationCallback: (context: gsap.Context, element: T) => void,
  dependencies: any[] = []
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check user preference for reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // In reduced motion mode, ensure elements are fully visible immediately
      gsap.set(el.querySelectorAll('.hero-bg-img, .hero-eyebrow, .hero-title-line, .hero-desc, .hero-cta, .hero-secondary, .hero-floating-card'), {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        clearProps: 'all'
      });
      return;
    }

    // gsap.context passes the context instance 'self' directly as the first argument to the callback!
    const ctx = gsap.context((self) => {
      animationCallback(self, el);
    }, el);

    return () => {
      ctx.revert();
    };
  }, dependencies);

  return containerRef;
}

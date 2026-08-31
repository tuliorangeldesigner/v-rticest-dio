import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    __smoothScrollTo?: (target: number | string | HTMLElement, options?: { immediate?: boolean }) => void;
  }
}

const resolveScrollTarget = (target: number | string | HTMLElement) => {
  if (typeof target === 'number') return target;

  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!element) return null;

  return element.getBoundingClientRect().top + window.scrollY;
};

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    window.__smoothScrollTo = (target, options) => {
      const top = resolveScrollTarget(target);
      if (top === null) return;

      lenisRef.current?.scrollTo(top, { immediate: options?.immediate });
    };

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
      delete window.__smoothScrollTo;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
};

export default SmoothScroll;

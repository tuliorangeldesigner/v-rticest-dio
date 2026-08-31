import { useEffect, useRef } from 'react';
import { getCarouselPreloadBatches } from '@/lib/carouselIndex';

type CachedImage = {
  element: HTMLImageElement;
  ready: Promise<void>;
};

export const useCarouselImagePreload = (sources: string[], activeIndex: number | null) => {
  const cacheRef = useRef(new Map<string, CachedImage>());
  const sourceKey = sources.join('\u0000');

  useEffect(() => {
    let cancelled = false;

    const preload = (src: string, priority: 'high' | 'low' = 'low') => {
      const cached = cacheRef.current.get(src);
      if (cached) {
        if (priority === 'high') cached.element.fetchPriority = 'high';
        return cached.ready;
      }

      const element = new Image();
      element.fetchPriority = priority;
      element.src = src;
      const ready = element.decode().catch(() => undefined);
      cacheRef.current.set(src, { element, ready });
      return ready;
    };

    const preloadSequentially = async (indexes: number[]) => {
      for (const index of indexes) {
        if (cancelled) return;
        await preload(sources[index]);
      }
    };

    if (activeIndex !== null && sources.length > 1) {
      const { priority, background } = getCarouselPreloadBatches(activeIndex, sources.length);
      void Promise.all(priority.map((index) => preload(sources[index], 'high')))
        .then(() => preloadSequentially(background));
    } else {
      const startBackgroundPreload = () => void preloadSequentially(sources.map((_, index) => index));
      const idleWindow = window as Window & {
        requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

      if (idleWindow.requestIdleCallback) {
        const handle = idleWindow.requestIdleCallback(startBackgroundPreload, { timeout: 600 });
        return () => {
          cancelled = true;
          idleWindow.cancelIdleCallback?.(handle);
        };
      }

      const handle = window.setTimeout(startBackgroundPreload, 150);
      return () => {
        cancelled = true;
        window.clearTimeout(handle);
      };
    }

    return () => {
      cancelled = true;
    };
  }, [activeIndex, sourceKey, sources]);
};

import { lazy, Suspense, useEffect, useState } from 'react';

const CustomCursor = lazy(() => import('@/components/CustomCursor'));

const canUseCustomCursor = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ConditionalCustomCursor = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(canUseCustomCursor());

    update();
    hoverQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);

    return () => {
      hoverQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <CustomCursor />
    </Suspense>
  );
};

export default ConditionalCustomCursor;

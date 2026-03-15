import { type ReactNode, useEffect, useRef, useState } from 'react';

interface DeferredSectionProps {
  children: ReactNode;
  className?: string;
  minHeight?: string;
  rootMargin?: string;
}

const DeferredSection = ({
  children,
  className = '',
  minHeight = '720px',
  rootMargin = '300px 0px',
}: DeferredSectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={ref} className={className} style={!isVisible ? { minHeight } : undefined}>
      {isVisible ? children : null}
    </div>
  );
};

export default DeferredSection;

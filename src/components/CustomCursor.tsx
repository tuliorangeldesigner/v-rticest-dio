import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  const onMouseEnter = useCallback(() => setIsHidden(false), []);
  const onMouseLeave = useCallback(() => setIsHidden(true), []);

  useEffect(() => {
    const eventOptions = { passive: true };
    document.addEventListener('mousemove', onMouseMove, eventOptions);
    document.addEventListener('mouseenter', onMouseEnter, eventOptions);
    document.addEventListener('mouseleave', onMouseLeave, eventOptions);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseMove, onMouseEnter, onMouseLeave]);

  useEffect(() => {
    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]';
    const viewSelector = '[data-cursor="view"]';
    const combinedSelector = `${viewSelector}, ${interactiveSelector}`;
    const resetCursor = () => {
      setIsHovering(false);
      setCursorText('');
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;
      if (target.closest(viewSelector)) {
        setIsHovering(true);
        setCursorText('View');
        return;
      }
      if (target.closest(interactiveSelector)) {
        setIsHovering(true);
        setCursorText('');
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target || !target.closest(combinedSelector)) return;
      const relatedTarget = event.relatedTarget as Element | null;
      if (relatedTarget?.closest(combinedSelector)) return;
      resetCursor();
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 80 : 12,
            height: isHovering ? 80 : 12,
            opacity: isHidden ? 0 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 300,
            mass: 0.5,
          }}
          className="relative flex items-center justify-center rounded-full bg-foreground"
          style={{
            marginLeft: isHovering ? -40 : -6,
            marginTop: isHovering ? -40 : -6,
          }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-xs font-medium text-background uppercase tracking-wider"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Outer ring (trails behind) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 90 : 40,
            height: isHovering ? 90 : 40,
            opacity: isHidden ? 0 : 0.3,
            borderWidth: isHovering ? 1 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 200,
            mass: 0.8,
          }}
          className="rounded-full border border-foreground/50"
          style={{
            marginLeft: isHovering ? -45 : -20,
            marginTop: isHovering ? -45 : -20,
          }}
        />
      </motion.div>

      {/* Global cursor hide styles */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;

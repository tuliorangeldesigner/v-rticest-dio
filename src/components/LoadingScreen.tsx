import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 2;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onLoadingComplete, 800);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress, onLoadingComplete]);

  const logoText = "STUDIO";
  const letters = logoText.split("");

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          {/* Background grid - consistent with other sections */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-foreground/5"
                style={{ top: `${20 * (i + 1)}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.1, duration: 1.5 }}
              />
            ))}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px bg-foreground/5"
                style={{ left: `${25 * (i + 1)}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 1.5 }}
              />
            ))}
          </div>

          {/* Floating shapes - consistent with sections */}
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 border border-accent/20 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-32 left-16 w-24 h-24 border border-border"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3, rotate: 45 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-1/3 left-20 w-4 h-4 bg-accent/30 rounded-full"
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Corner decorations - consistent with cards */}
          <motion.div
            className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-accent/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-accent/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          />

          {/* Logo container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Section number - consistent with section headers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-8 bg-accent" />
              <span className="text-xs font-mono text-accent">00</span>
              <span className="text-xs font-mono text-muted-foreground tracking-wider">LOADING</span>
              <div className="h-px w-8 bg-accent" />
            </motion.div>

            {/* Animated logo */}
            <div className="flex items-center overflow-hidden">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + index * 0.08,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  className="font-syne text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.9,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="font-syne text-5xl md:text-7xl lg:text-8xl font-bold text-accent"
              >
                .
              </motion.span>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.19, 1, 0.22, 1] }}
              className="mt-4 text-muted-foreground label"
            >
              Digital Experiences
            </motion.p>

            {/* Progress section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-16 flex flex-col items-center gap-4"
            >
              {/* Progress bar container - styled like section bottom lines */}
              <div className="relative w-64 h-px bg-border overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>

              {/* Progress percentage */}
              <div className="flex items-center gap-6">
                <motion.span
                  className="font-mono text-sm text-muted-foreground tabular-nums"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  {Math.round(progress)}%
                </motion.span>
                <span className="w-px h-4 bg-border" />
                <motion.span
                  className="font-mono text-xs text-muted-foreground/60 tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  INITIALIZING
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* Bottom scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-10 bg-gradient-to-b from-foreground/30 to-transparent"
            />
          </motion.div>

          {/* Side labels - like in AboutSection */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <span className="text-xs font-mono text-muted-foreground/40 tracking-widest">
              CREATIVE STUDIO
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg) translateY(50%)' }}
          >
            <span className="text-xs font-mono text-muted-foreground/40 tracking-widest">
              EST. 2019
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

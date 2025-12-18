import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500; // Total loading time in ms
    const interval = 30; // Update interval
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
          {/* Background gradient animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10"
          />

          {/* Animated circles */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="absolute w-[600px] h-[600px] rounded-full border border-foreground/10"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.05 }}
            transition={{ duration: 2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="absolute w-[800px] h-[800px] rounded-full border border-foreground/10"
          />

          {/* Logo container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated logo */}
            <div className="flex items-center overflow-hidden">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + index * 0.08,
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
                  delay: 0.7,
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
              transition={{ duration: 0.6, delay: 1, ease: [0.19, 1, 0.22, 1] }}
              className="mt-4 text-muted-foreground label"
            >
              Digital Experiences
            </motion.p>

            {/* Progress section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              {/* Progress bar container */}
              <div className="w-48 h-px bg-border relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>

              {/* Progress percentage */}
              <motion.span
                className="font-syne text-sm text-muted-foreground tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                {Math.round(progress)}%
              </motion.span>
            </motion.div>
          </div>

          {/* Bottom decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

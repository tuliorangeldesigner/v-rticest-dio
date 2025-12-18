import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

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
        setShowReveal(true);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onLoadingComplete, 1200);
        }, 600);
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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000]"
        >
          {/* Split curtain reveal - Top */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-background z-20"
            initial={{ y: 0 }}
            animate={{ y: showReveal ? '-100%' : 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Accent line at bottom */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-px bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: showReveal ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
          </motion.div>

          {/* Split curtain reveal - Bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-background z-20"
            initial={{ y: 0 }}
            animate={{ y: showReveal ? '100%' : 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Accent line at top */}
            <motion.div 
              className="absolute top-0 left-0 right-0 h-px bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: showReveal ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
          </motion.div>

          {/* Main content layer */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10"
            animate={{ 
              scale: showReveal ? 0.9 : 1,
              opacity: showReveal ? 0 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Background grid */}
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

            {/* Floating shapes */}
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

            {/* Corner decorations */}
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
              {/* Section number */}
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
              <motion.div 
                className="flex items-center overflow-hidden"
                animate={{ 
                  scale: showReveal ? 1.2 : 1,
                  y: showReveal ? -20 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              >
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ 
                      y: 0, 
                      opacity: 1,
                    }}
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
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showReveal ? 0 : 1, y: showReveal ? -10 : 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-muted-foreground label"
              >
                Digital Experiences
              </motion.p>

              {/* Progress section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showReveal ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="mt-16 flex flex-col items-center gap-4"
              >
                {/* Progress bar */}
                <div className="relative w-64 h-px bg-border overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-accent"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                  />
                </div>

                {/* Progress info */}
                <div className="flex items-center gap-6">
                  <motion.span className="font-mono text-sm text-muted-foreground tabular-nums">
                    {Math.round(progress)}%
                  </motion.span>
                  <span className="w-px h-4 bg-border" />
                  <motion.span className="font-mono text-xs text-muted-foreground/60 tracking-wider">
                    {progress < 100 ? 'INITIALIZING' : 'READY'}
                  </motion.span>
                </div>
              </motion.div>

              {/* Ready indicator - shows when complete */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: showReveal ? 1 : 0, 
                  scale: showReveal ? 1 : 0.8 
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-2 h-2 bg-accent rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                  <span className="text-xs font-mono text-accent tracking-wider">ENTERING</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showReveal ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-px h-10 bg-gradient-to-b from-foreground/30 to-transparent"
              />
            </motion.div>

            {/* Side labels */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showReveal ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              <span className="text-xs font-mono text-muted-foreground/40 tracking-widest">
                CREATIVE STUDIO
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showReveal ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg) translateY(50%)' }}
            >
              <span className="text-xs font-mono text-muted-foreground/40 tracking-widest">
                EST. 2019
              </span>
            </motion.div>
          </motion.div>

          {/* Flash overlay for dramatic effect */}
          <motion.div
            className="absolute inset-0 bg-accent/10 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: showReveal ? [0, 0.3, 0] : 0 }}
            transition={{ duration: 0.4, times: [0, 0.5, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from '@/components/MagneticButton';
import ScrollIndicator from '@/components/ScrollIndicator';
import heroBg from '@/assets/hero-bg.jpg';

const words = [
  { text: 'We', number: '01' },
  { text: 'Create', number: '02' },
  { text: 'Digital', number: '03' },
  { text: 'Experiences', number: '04', accent: true },
];

export const HeroSection = () => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState('');
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], ['0%', '10%']);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Mouse follower
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 100, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 50,
      y: (e.clientY - rect.top - rect.height / 2) / 50,
    });
  };

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Horizontal lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-foreground/5"
            style={{ top: `${12.5 * (i + 1)}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 + i * 0.05, duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          />
        ))}
        {/* Vertical lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-foreground/5"
            style={{ left: `${16.66 * (i + 1)}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.8 + i * 0.05, duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          />
        ))}
      </div>
      
      {/* Floating orbs with mouse parallax */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]"
        style={{ 
          x: springX, 
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Animated geometric shapes */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 45 }}
        transition={{ duration: 2, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className="absolute top-1/4 left-[10%] w-20 h-20 border border-foreground/10"
        style={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
        className="absolute bottom-1/4 right-[15%] w-32 h-32 rounded-full border border-accent/20"
        style={{
          x: mousePosition.x * -3,
          y: mousePosition.y * -3,
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute top-[60%] left-[20%] w-2 h-2 bg-accent rounded-full"
        style={{
          x: mousePosition.x * 4,
          y: mousePosition.y * 4,
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
        className="absolute top-[30%] right-[25%] w-3 h-3 bg-foreground/20 rounded-full"
        style={{
          x: mousePosition.x * -2,
          y: mousePosition.y * -2,
        }}
      />

      {/* Side decorators */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-foreground/30 to-transparent" />
        <motion.div 
          className="text-xs font-mono text-muted-foreground tracking-widest"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          SCROLL TO EXPLORE
        </motion.div>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-foreground/30 to-transparent" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
      >
        <span className="text-xs font-mono text-muted-foreground">{currentTime}</span>
        <div className="w-px h-12 bg-foreground/20" />
        <span className="text-xs font-mono text-muted-foreground">EST</span>
      </motion.div>

      {/* Main content */}
      <motion.div style={{ y }} className="container-wide relative z-10 pt-24 md:pt-32 px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Top label with line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{ duration: 1, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="flex items-center gap-4 mb-12 md:mb-16"
          >
            <motion.div 
              className="h-px bg-accent flex-shrink-0"
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            <span className="text-sm font-mono text-muted-foreground tracking-wider">
              DIGITAL AGENCY — SINCE 2018
            </span>
          </motion.div>

          {/* Main Headline with numbers */}
          <h1 className="mb-8 md:mb-12">
            {words.map((word, index) => (
              <div key={word.text} className="overflow-hidden relative">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.7 + index * 0.15, 
                    ease: [0.19, 1, 0.22, 1] 
                  }}
                  className="flex items-baseline gap-4"
                >
                  {/* Number indicator */}
                  <motion.span 
                    className="text-sm font-mono text-accent/60 hidden sm:inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
                  >
                    {word.number}
                  </motion.span>
                  
                  {/* Word */}
                  <span 
                    className={`font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.9] ${
                      word.accent ? 'text-accent' : 'text-foreground'
                    }`}
                  >
                    {word.text}
                  </span>
                </motion.div>
                
                {/* Decorative line after each word */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-px bg-foreground/10"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.8 }}
                />
              </div>
            ))}
          </h1>

          {/* Description and CTA row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
            {/* Subtext with animated reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="max-w-md"
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                A creative studio crafting immersive digital products, brands, 
                and experiences that captivate and inspire.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton>
                <Link 
                  to="/work" 
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-semibold rounded-full overflow-hidden"
                >
                  <span className="relative z-10">View Our Work</span>
                  <motion.div
                    className="relative z-10 w-6 h-6 rounded-full bg-background/20 flex items-center justify-center"
                    whileHover={{ rotate: 45 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 11L11 3M11 3H5M11 3V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-accent"
                    initial={{ y: '100%' }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  />
                </Link>
              </MagneticButton>
              
              <MagneticButton>
                <Link 
                  to="/contact" 
                  className="group relative inline-flex items-center gap-3 px-8 py-4 border border-foreground/20 text-foreground font-semibold rounded-full overflow-hidden hover:border-accent/50 transition-colors duration-300"
                >
                  <span className="relative z-10">Start a Project</span>
                  <motion.span 
                    className="relative z-10 text-accent"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2, ease: [0.19, 1, 0.22, 1] }}
            className="mt-16 md:mt-24 pt-8 border-t border-foreground/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '150+', label: 'Projects Completed' },
                { number: '50+', label: 'Happy Clients' },
                { number: '12', label: 'Team Members' },
                { number: '6+', label: 'Years Experience' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 + i * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <div className="text-3xl md:text-4xl font-syne font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ScrollIndicator />
    </motion.section>
  );
};

export default HeroSection;

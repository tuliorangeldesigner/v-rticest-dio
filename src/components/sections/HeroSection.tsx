import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '@/components/MagneticButton';
import ScrollIndicator from '@/components/ScrollIndicator';
import heroBg from '@/assets/hero-bg.jpg';

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], ['0%', '10%']);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      </div>
      
      {/* Animated circles */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
        className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full border border-foreground/10"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 2.5, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className="absolute -bottom-1/4 -right-1/4 w-[1000px] h-[1000px] rounded-full border border-foreground/10"
      />

      <motion.div style={{ y }} className="container-wide relative z-10 text-center px-4">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="mb-6 sm:mb-8"
        >
          <span className="label text-muted-foreground">Award-Winning Digital Agency</span>
        </motion.div>

        {/* Main Headline */}
        <h1 className="heading-display mb-6 sm:mb-8">
          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="block"
          >
            We Create
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="block"
          >
            Digital
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.19, 1, 0.22, 1] }}
            className="block text-accent"
          >
            Experiences
          </motion.span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className="body-lg text-muted-foreground max-w-md sm:max-w-lg md:max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12"
        >
          A creative studio crafting immersive digital products, brands, 
          and experiences that captivate and inspire.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <MagneticButton className="group relative px-10 py-5 bg-accent text-accent-foreground font-syne font-semibold text-lg overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              Explore Our Work
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M4 10H16M16 10L11 5M16 10L11 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-foreground"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            />
          </MagneticButton>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </motion.section>
  );
};

export default HeroSection;

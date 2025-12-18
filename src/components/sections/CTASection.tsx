import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from '@/components/MagneticButton';
import { AnimatedLine } from '@/components/AnimatedText';

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-accent/10"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-accent/20"
      />

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedLine delay={0.2}>
            <span className="label text-accent mb-8 block">Start a Project</span>
          </AnimatedLine>

          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="heading-display"
            >
              Let's Create
            </motion.h2>
          </div>
          
          <div className="overflow-hidden mb-12 md:mb-16">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="heading-display"
            >
              Something
              <span className="relative inline-block ml-4">
                <span className="text-accent">Great</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-accent origin-left"
                />
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="body-lg text-muted-foreground max-w-xl mx-auto mb-12 md:mb-14"
          >
            Ready to transform your digital presence? Let's discuss your next project 
            and create something extraordinary together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton className="group relative px-10 py-5 bg-accent text-accent-foreground font-syne font-semibold text-base overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                Get in Touch
                <svg
                  width="18"
                  height="18"
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
                </svg>
              </span>
              <motion.div
                className="absolute inset-0 bg-foreground"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              />
            </MagneticButton>

            <MagneticButton className="group px-10 py-5 border border-foreground/20 font-syne font-semibold text-base hover:border-foreground/40 transition-colors duration-300">
              <span className="flex items-center gap-3">
                View Our Work
                <svg
                  width="18"
                  height="18"
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
                </svg>
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
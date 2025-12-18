import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { AnimatedLine } from '@/components/AnimatedText';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin by understanding your vision, goals, and audience. Deep research and strategic analysis form the foundation of every project.',
    icon: '◇',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Insights transform into actionable plans. We define the approach, set milestones, and align on success metrics.',
    icon: '○',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Ideas take visual form. Our design process is iterative, collaborative, and focused on creating meaningful experiences.',
    icon: '△',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Designs become reality. We build with precision, performance, and scalability as core principles.',
    icon: '□',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'The culmination of our work. We ensure a seamless launch and provide ongoing support for continued success.',
    icon: '⬡',
  },
];

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-foreground/5"
            style={{ top: `${20 * (i + 1)}%` }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: i * 0.05, duration: 1.2 }}
          />
        ))}
      </div>

      {/* Floating accent orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
        style={{ top: '30%', right: '-10%' }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-sm font-mono text-accent">04</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">OUR PROCESS</span>
            </motion.div>

            <AnimatedLine delay={0.3}>
              <h2 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1]">
                A structured approach to exceptional outcomes.
              </h2>
            </AnimatedLine>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground max-w-md"
          >
            Every project follows our proven methodology, refined over years of delivering successful digital products.
          </motion.p>
        </div>

        {/* Process Steps - Horizontal on desktop */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-12 left-0 right-0 h-px bg-border origin-left hidden lg:block"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
                className="group relative"
              >
                {/* Step card */}
                <div className={`relative p-6 lg:p-4 xl:p-6 border transition-all duration-500 ${
                  activeStep === index 
                    ? 'bg-accent/5 border-accent/30' 
                    : 'bg-card/30 border-border/50'
                }`}>
                  {/* Number circle */}
                  <motion.div 
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-6 transition-all duration-300 ${
                      activeStep === index 
                        ? 'border-accent bg-accent text-accent-foreground' 
                        : 'border-foreground/20 text-foreground/60'
                    }`}
                    animate={{ scale: activeStep === index ? 1.1 : 1 }}
                  >
                    <span className="font-mono text-sm font-bold">{step.number}</span>
                  </motion.div>

                  {/* Icon */}
                  <motion.span 
                    className={`absolute top-4 right-4 text-xl transition-all duration-300 ${
                      activeStep === index ? 'text-accent opacity-100' : 'text-muted-foreground/30 opacity-50'
                    }`}
                    animate={{ rotate: activeStep === index ? 180 : 0 }}
                  >
                    {step.icon}
                  </motion.span>

                  {/* Content */}
                  <motion.h3 
                    className="font-syne font-bold text-lg md:text-xl mb-3 transition-colors duration-300 group-hover:text-accent"
                    animate={{ x: activeStep === index ? 4 : 0 }}
                  >
                    {step.title}
                  </motion.h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeStep === index ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Corner decoration */}
                  <motion.div
                    className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeStep === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Arrow connector (desktop only) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute -right-2 top-12 text-muted-foreground/30"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

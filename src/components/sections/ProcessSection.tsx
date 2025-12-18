import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { AnimatedLine } from '@/components/AnimatedText';
import { Compass, Target, Palette, Code, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin by understanding your vision, goals, and audience. Deep research and strategic analysis form the foundation of every project.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Insights transform into actionable plans. We define the approach, set milestones, and align on success metrics.',
    icon: Target,
  },
  {
    number: '03',
    title: 'Design',
    description: 'Ideas take visual form. Our design process is iterative, collaborative, and focused on creating meaningful experiences.',
    icon: Palette,
  },
  {
    number: '04',
    title: 'Development',
    description: 'Designs become reality. We build with precision, performance, and scalability as core principles.',
    icon: Code,
  },
  {
    number: '05',
    title: 'Launch',
    description: 'The culmination of our work. We ensure a seamless launch and provide ongoing support for continued success.',
    icon: Rocket,
  },
];

interface StepItemProps {
  step: typeof steps[0];
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  isLast: boolean;
}

const StepItem = ({ step, index, activeIndex, setActiveIndex, isLast }: StepItemProps) => {
  const Icon = step.icon;
  const isActive = activeIndex === index;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      className="group relative"
    >
      <div className="flex gap-6 md:gap-12">
        {/* Left: Number */}
        <div className="flex flex-col items-center">
          <motion.div
            className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border-2 transition-all duration-500 ${
              isActive 
                ? 'border-accent bg-accent/10' 
                : 'border-border bg-card/30'
            }`}
            animate={{ scale: isActive ? 1.05 : 1 }}
          >
            <span className={`font-syne font-bold text-2xl md:text-3xl transition-colors duration-300 ${
              isActive ? 'text-accent' : 'text-muted-foreground'
            }`}>
              {step.number}
            </span>
          </motion.div>
          
          {/* Connecting line */}
          {!isLast && (
            <motion.div
              className="w-px flex-1 min-h-[60px] bg-border mt-4"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ originY: 0 }}
            />
          )}
        </div>

        {/* Right: Content */}
        <div className={`flex-1 pb-12 md:pb-16 border-b transition-colors duration-300 ${
          isLast ? 'border-transparent' : 'border-border/50'
        }`}>
          <div className={`p-6 md:p-8 border transition-all duration-500 ${
            isActive 
              ? 'bg-accent/5 border-accent/30' 
              : 'bg-card/30 border-border/50 hover:border-border'
          }`}>
            {/* Icon & Title Row */}
            <div className="flex items-start gap-4 mb-4">
              <motion.div
                animate={{ 
                  rotate: isActive ? 360 : 0,
                  scale: isActive ? 1.1 : 1 
                }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="w-12 h-12 flex items-center justify-center relative flex-shrink-0"
              >
                <div className={`absolute inset-0 rounded-lg border transition-all duration-300 ${
                  isActive ? 'border-accent bg-accent/10' : 'border-border'
                }`} />
                <Icon className={`w-6 h-6 relative z-10 transition-colors duration-300 ${
                  isActive ? 'text-accent' : 'text-foreground/70'
                }`} strokeWidth={1.5} />
              </motion.div>

              <motion.h3 
                className="font-syne font-bold text-xl md:text-2xl lg:text-3xl transition-colors duration-300 pt-2"
                animate={{ x: isActive ? 5 : 0 }}
              >
                {step.title}
              </motion.h3>
            </div>

            <p className="text-muted-foreground leading-relaxed md:text-lg">
              {step.description}
            </p>

            {/* Bottom line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            />

            {/* Corner accent */}
            <motion.div
              className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-accent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`grid-${i}`}
            className="absolute left-0 right-0 h-px bg-foreground/5"
            style={{ top: `${20 * (i + 1)}%` }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 1.5 }}
          />
        ))}
      </div>

      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border border-accent/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-4 h-4 bg-accent/30 rounded-full"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-wide relative z-10">
        {/* Section header */}
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

        {/* Steps - Vertical Stack */}
        <div className="max-w-4xl">
          {steps.map((step, index) => (
            <StepItem 
              key={step.number} 
              step={step} 
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

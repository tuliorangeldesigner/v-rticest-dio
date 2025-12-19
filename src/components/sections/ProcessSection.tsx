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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      className="group relative grid grid-cols-12 gap-4 md:gap-8"
    >
      {/* Left: Large Number */}
      <div className="col-span-2 md:col-span-1 relative flex flex-col items-center">
        <motion.span 
          className={`font-syne font-bold text-4xl md:text-6xl lg:text-7xl transition-colors duration-500 ${
            isActive ? 'text-accent' : 'text-muted-foreground/30'
          }`}
          animate={{ scale: isActive ? 1.05 : 1 }}
        >
          {step.number}
        </motion.span>
        
        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className={`w-px flex-1 min-h-[40px] mt-4 transition-colors duration-500 ${
              isActive ? 'bg-accent/50' : 'bg-border'
            }`}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ originY: 0 }}
          />
        )}
      </div>

      {/* Right: Content Card */}
      <div className="col-span-10 md:col-span-11 pb-8 md:pb-12">
        <motion.div 
          className={`relative p-6 md:p-8 border transition-all duration-500 ${
            isActive 
              ? 'bg-accent/5 border-accent/40' 
              : 'bg-card/30 border-border/50 hover:border-border'
          }`}
          animate={{ x: isActive ? 8 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Icon & Title Row */}
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              animate={{ 
                rotate: isActive ? 360 : 0,
                scale: isActive ? 1.1 : 1 
              }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border transition-all duration-300 ${
                isActive ? 'border-accent bg-accent/10' : 'border-border'
              }`}
            >
              <Icon className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                isActive ? 'text-accent' : 'text-foreground/70'
              }`} strokeWidth={1.5} />
            </motion.div>

            <h3 className={`font-syne font-bold text-xl md:text-2xl lg:text-3xl transition-colors duration-300 ${
              isActive ? 'text-accent' : 'text-foreground'
            }`}>
              {step.title}
            </h3>
          </div>

          <p className="text-muted-foreground leading-relaxed text-sm md:text-base lg:text-lg pl-14 md:pl-16">
            {step.description}
          </p>

          {/* Corner accents */}
          <motion.div
            className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 border-r-2 border-t-2 border-accent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-4 h-4 md:w-6 md:h-6 border-l-2 border-b-2 border-accent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          />

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          />
        </motion.div>
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
        <div className="max-w-5xl mx-auto">
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

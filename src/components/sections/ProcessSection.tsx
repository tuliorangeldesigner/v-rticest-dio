import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { AnimatedLine } from '@/components/AnimatedText';
import { Compass, Target, Palette, Code, Rocket, ArrowRight } from 'lucide-react';

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

interface StepCardProps {
  step: typeof steps[0];
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const StepCard = ({ step, index, activeIndex, setActiveIndex }: StepCardProps) => {
  const Icon = step.icon;
  const isActive = activeIndex === index;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.19, 1, 0.22, 1] }}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      className="group relative"
    >
      {/* Glow effect behind card */}
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/20 via-primary/10 to-accent/20 blur-xl opacity-0 transition-opacity duration-500"
        animate={{ opacity: isActive ? 0.6 : 0 }}
      />

      {/* Main Card */}
      <motion.div
        className={`relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-500 ${
          isActive 
            ? 'bg-card/80 border border-accent/30 shadow-[0_0_40px_-10px] shadow-accent/30' 
            : 'bg-card/40 border border-border/30 hover:bg-card/60'
        }`}
        animate={{ 
          scale: isActive ? 1.01 : 1,
          y: isActive ? -4 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
        
        {/* Accent line on left */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/50 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ originY: 0 }}
        />

        {/* Content */}
        <div className="relative p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            {/* Number */}
            <motion.div
              className="flex-shrink-0"
              animate={{ scale: isActive ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className={`font-syne font-black text-5xl md:text-6xl bg-gradient-to-br transition-all duration-500 bg-clip-text text-transparent ${
                isActive 
                  ? 'from-accent via-accent to-primary' 
                  : 'from-muted-foreground/30 to-muted-foreground/10'
              }`}>
                {step.number}
              </span>
            </motion.div>

            {/* Icon */}
            <motion.div
              className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-all duration-500 ${
                isActive 
                  ? 'bg-accent/20 border border-accent/40' 
                  : 'bg-muted/30 border border-border/30'
              }`}
              animate={{ 
                rotate: isActive ? 3 : 0,
              }}
            >
              <Icon className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-300 ${
                isActive ? 'text-accent' : 'text-muted-foreground'
              }`} strokeWidth={1.5} />
            </motion.div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <motion.h3 
                className={`font-syne font-bold text-2xl md:text-3xl mb-3 transition-colors duration-300 ${
                  isActive ? 'text-foreground' : 'text-foreground/80'
                }`}
                animate={{ x: isActive ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {step.title}
              </motion.h3>
              <p className={`text-base md:text-lg leading-relaxed transition-colors duration-300 ${
                isActive ? 'text-muted-foreground' : 'text-muted-foreground/70'
              }`}>
                {step.description}
              </p>
            </div>

            {/* Arrow */}
            <motion.div
              className="hidden md:flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full transition-all duration-500"
              animate={{ 
                backgroundColor: isActive ? 'hsl(var(--accent) / 0.15)' : 'transparent',
                borderColor: isActive ? 'hsl(var(--accent) / 0.4)' : 'hsl(var(--border) / 0.3)',
                x: isActive ? 4 : 0,
              }}
              style={{ borderWidth: '1px' }}
            >
              <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                isActive ? 'text-accent' : 'text-muted-foreground/50'
              }`} />
            </motion.div>
          </div>
        </div>

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          animate={{ x: isActive ? '200%' : '-100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Connector dot */}
      {index < steps.length - 1 && (
        <div className="flex justify-center py-6">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <div className="w-2 h-2 rounded-full bg-border" />
            <motion.div
              className="absolute inset-0 w-2 h-2 rounded-full bg-accent"
              animate={{ scale: isActive || activeIndex === index + 1 ? 1.5 : 1, opacity: isActive || activeIndex === index + 1 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent" />
            <span className="text-sm font-mono text-accent">04</span>
            <span className="text-sm font-mono text-muted-foreground tracking-wider">OUR PROCESS</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent" />
          </motion.div>

          <AnimatedLine delay={0.3}>
            <h2 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] mb-6">
              A structured approach to <span className="text-accent">exceptional</span> outcomes.
            </h2>
          </AnimatedLine>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-lg"
          >
            Every project follows our proven methodology, refined over years of delivering successful digital products.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 md:mt-20 text-center"
        >
          <motion.a 
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-full font-medium text-accent-foreground transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button background with glow */}
            <div className="absolute inset-0 bg-accent rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <div className="absolute -inset-1 bg-accent/50 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            
            <span className="relative">Start Your Project</span>
            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;

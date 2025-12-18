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
    color: 'from-blue-500/20 to-blue-600/5',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Insights transform into actionable plans. We define the approach, set milestones, and align on success metrics.',
    icon: Target,
    color: 'from-emerald-500/20 to-emerald-600/5',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Ideas take visual form. Our design process is iterative, collaborative, and focused on creating meaningful experiences.',
    icon: Palette,
    color: 'from-violet-500/20 to-violet-600/5',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Designs become reality. We build with precision, performance, and scalability as core principles.',
    icon: Code,
    color: 'from-orange-500/20 to-orange-600/5',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'The culmination of our work. We ensure a seamless launch and provide ongoing support for continued success.',
    icon: Rocket,
    color: 'from-rose-500/20 to-rose-600/5',
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
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      className="group relative"
    >
      <motion.div
        className={`relative overflow-hidden border transition-all duration-500 ${
          isActive 
            ? 'bg-card border-accent/40 shadow-2xl shadow-accent/10' 
            : 'bg-card/50 border-border/50 hover:border-border'
        }`}
        animate={{ 
          scale: isActive ? 1.02 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-500`}
          animate={{ opacity: isActive ? 1 : 0 }}
        />

        {/* Content Grid */}
        <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-8 p-8 md:p-12 items-center">
          {/* Left: Number & Icon */}
          <div className="flex items-center gap-6">
            {/* Large Number */}
            <motion.div
              className="relative"
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className={`font-syne font-black text-7xl md:text-8xl transition-colors duration-300 ${
                isActive ? 'text-accent' : 'text-muted-foreground/20'
              }`}>
                {step.number}
              </span>
            </motion.div>

            {/* Icon Container */}
            <motion.div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                isActive 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-muted/50 text-muted-foreground'
              }`}
              animate={{ 
                rotate: isActive ? 6 : 0,
                scale: isActive ? 1.05 : 1
              }}
            >
              <Icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Center: Title & Description */}
          <div className="space-y-4">
            <motion.h3 
              className="font-syne font-bold text-3xl md:text-4xl"
              animate={{ x: isActive ? 10 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {step.title}
            </motion.h3>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              {step.description}
            </p>
          </div>

          {/* Right: Arrow Indicator */}
          <motion.div
            className="hidden md:flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300"
            animate={{ 
              borderColor: isActive ? 'hsl(var(--accent))' : 'hsl(var(--border))',
              backgroundColor: isActive ? 'hsl(var(--accent) / 0.1)' : 'transparent',
              x: isActive ? 5 : 0
            }}
          >
            <ArrowRight className={`w-6 h-6 transition-colors duration-300 ${
              isActive ? 'text-accent' : 'text-muted-foreground'
            }`} />
          </motion.div>
        </div>

        {/* Bottom progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-accent"
          initial={{ width: '0%' }}
          animate={{ width: isActive ? '100%' : '0%' }}
          transition={{ duration: 0.5 }}
        />

        {/* Corner decorations */}
        <motion.div
          className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Connector line to next card */}
      {index < steps.length - 1 && (
        <div className="flex justify-center py-4">
          <motion.div
            className="w-0.5 h-8 bg-border"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          />
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
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Large decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-accent" />
            <span className="text-sm font-mono text-accent">04</span>
            <span className="text-sm font-mono text-muted-foreground tracking-wider">OUR PROCESS</span>
            <div className="h-px w-12 bg-accent" />
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

        {/* Stacked Cards */}
        <div className="max-w-5xl mx-auto">
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <motion.a 
            href="#contact"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-accent text-accent-foreground font-medium text-lg rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-accent/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;

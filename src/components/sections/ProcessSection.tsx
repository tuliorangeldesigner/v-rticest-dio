import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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

interface TimelineItemProps {
  step: typeof steps[0];
  index: number;
  isLeft: boolean;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const TimelineItem = ({ step, index, isLeft, activeIndex, setActiveIndex }: TimelineItemProps) => {
  const Icon = step.icon;
  const isActive = activeIndex === index;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
    >
      {/* Content Card */}
      <div 
        className={`w-full md:w-[calc(50%-40px)] ${isLeft ? 'md:pr-0 md:text-right' : 'md:pl-0 md:text-left'} text-left`}
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <motion.div
          className={`relative p-8 border transition-all duration-500 ${
            isActive 
              ? 'bg-accent/5 border-accent/30' 
              : 'bg-card/30 border-border/50 hover:border-border'
          }`}
          whileHover={{ y: -5 }}
        >
          {/* Number badge */}
          <motion.div
            className={`absolute -top-4 ${isLeft ? 'md:right-8 left-8' : 'md:left-8 left-8'} bg-background border border-border px-3 py-1`}
            animate={{ scale: isActive ? 1.1 : 1 }}
          >
            <span className={`text-xs font-mono transition-colors duration-300 ${
              isActive ? 'text-accent' : 'text-muted-foreground'
            }`}>
              STEP {step.number}
            </span>
          </motion.div>

          {/* Icon */}
          <motion.div
            className={`w-14 h-14 border-2 flex items-center justify-center mb-6 transition-all duration-500 ${
              isActive 
                ? 'border-accent bg-accent/10' 
                : 'border-border bg-transparent'
            } ${isLeft ? 'md:ml-auto' : ''}`}
            animate={{ rotate: isActive ? 45 : 0 }}
          >
            <motion.div animate={{ rotate: isActive ? -45 : 0 }}>
              <Icon className={`w-6 h-6 transition-colors duration-300 ${
                isActive ? 'text-accent' : 'text-foreground/70'
              }`} strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.h3 
            className="font-syne font-bold text-2xl md:text-3xl mb-4 transition-colors duration-300 group-hover:text-accent"
            animate={{ x: isActive ? (isLeft ? -5 : 5) : 0 }}
          >
            {step.title}
          </motion.h3>
          <p className="text-muted-foreground leading-relaxed">
            {step.description}
          </p>

          {/* Corner accents */}
          <motion.div
            className={`absolute top-0 ${isLeft ? 'right-0 border-r-2 border-t-2' : 'left-0 border-l-2 border-t-2'} w-6 h-6 border-accent`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
          />
          <motion.div
            className={`absolute bottom-0 ${isLeft ? 'left-0 border-l-2 border-b-2' : 'right-0 border-r-2 border-b-2'} w-6 h-6 border-accent`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
          />

          {/* Connecting line to center */}
          <div 
            className={`hidden md:block absolute top-1/2 ${isLeft ? '-right-10' : '-left-10'} w-10 h-[2px]`}
          >
            <motion.div
              className="h-full bg-border"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              style={{ originX: isLeft ? 0 : 1 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Center Node */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className={`w-12 h-12 border-2 flex items-center justify-center transition-all duration-500 ${
            isActive 
              ? 'bg-accent border-accent' 
              : 'bg-background border-border'
          }`}
          animate={{ 
            scale: isActive ? 1.2 : 1,
            rotate: isActive ? 45 : 0
          }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.span 
            className={`font-mono text-sm font-bold transition-colors ${
              isActive ? 'text-accent-foreground' : 'text-foreground'
            }`}
            animate={{ rotate: isActive ? -45 : 0 }}
          >
            {step.number}
          </motion.span>
        </motion.div>
      </div>

      {/* Empty space for opposite side */}
      <div className="hidden md:block w-[calc(50%-40px)]" />
    </motion.div>
  );
};

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 30);
      mouseY.set((clientY / innerHeight - 0.5) * 30);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating shapes */}
      <motion.div
        className="absolute top-32 right-20 w-24 h-24 border border-accent/10"
        style={{ x: smoothX, y: smoothY, rotate: 45 }}
      />
      <motion.div
        className="absolute bottom-40 left-16 w-16 h-16 bg-primary/5 rounded-full"
        style={{ x: smoothX, y: smoothY }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-8 h-8 border border-primary/20"
        style={{ x: smoothX, y: smoothY }}
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
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

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2 origin-top"
          />

          {/* Progress line overlay */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 w-[2px] bg-accent -translate-x-1/2 origin-top"
            style={{ 
              height: activeIndex !== null ? `${((activeIndex + 1) / steps.length) * 100}%` : '0%'
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <TimelineItem
                key={step.number}
                step={step}
                index={index}
                isLeft={index % 2 === 0}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>

          {/* End marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.5 }}
            className="hidden md:flex absolute -bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-4 h-4 bg-accent rotate-45" />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 border border-border bg-card/50">
            <div className="w-3 h-3 bg-accent animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">
              Ready to start your project?
            </span>
            <motion.a 
              href="#contact"
              className="text-accent font-medium hover:underline"
              whileHover={{ x: 5 }}
            >
              Let's talk →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
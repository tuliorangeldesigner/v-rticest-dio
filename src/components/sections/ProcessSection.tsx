import { motion, useInView, useScroll, useTransform } from 'framer-motion';
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

export const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Update active step based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const stepIndex = Math.min(Math.floor(value * steps.length), steps.length - 1);
      setActiveStep(stepIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const ActiveIcon = steps[activeStep].icon;

  return (
    <section ref={sectionRef} className="relative">
      {/* Section Header */}
      <div className="section-padding pb-0">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
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
        </div>
      </div>

      {/* Sticky Split Layout */}
      <div ref={containerRef} className="relative min-h-[250vh]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left: Sticky Step List */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 py-8 lg:py-16">
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <motion.button
                      key={step.number}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        const progress = index / steps.length;
                        const container = containerRef.current;
                        if (container) {
                          const scrollTarget = container.offsetTop + (container.offsetHeight * progress);
                          window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                        }
                      }}
                      className={`w-full flex items-center gap-4 p-4 text-left transition-all duration-300 border-l-2 ${
                        activeStep === index
                          ? 'border-accent bg-accent/5'
                          : 'border-transparent hover:border-border hover:bg-muted/30'
                      }`}
                    >
                      <span className={`font-mono text-sm transition-colors duration-300 ${
                        activeStep === index ? 'text-accent' : 'text-muted-foreground'
                      }`}>
                        {step.number}
                      </span>
                      <span className={`font-syne font-semibold text-lg transition-colors duration-300 ${
                        activeStep === index ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Progress indicator */}
                <motion.div 
                  className="mt-8 flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent rounded-full"
                      style={{ 
                        width: `${((activeStep + 1) / steps.length) * 100}%`,
                        transition: 'width 0.3s ease-out'
                      }}
                    />
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">
                    {activeStep + 1}/{steps.length}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Right: Detail Card (Sticky) */}
            <div className="lg:col-span-8">
              <div className="lg:sticky lg:top-32 py-8 lg:py-16">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative p-8 md:p-12 border border-border bg-card/50 backdrop-blur-sm"
                >
                  {/* Large number watermark */}
                  <span className="absolute top-4 right-6 font-syne font-bold text-[120px] md:text-[180px] leading-none text-foreground/[0.03] pointer-events-none select-none">
                    {steps[activeStep].number}
                  </span>

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0.8, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                      className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-accent/30 bg-accent/10 mb-8"
                    >
                      <ActiveIcon className="w-8 h-8 md:w-10 md:h-10 text-accent" strokeWidth={1.5} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
                      {steps[activeStep].title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl">
                      {steps[activeStep].description}
                    </p>

                    {/* Accent line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mt-8 h-0.5 w-24 bg-accent origin-left"
                    />
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-accent" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-accent" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { AnimatedLine } from '@/components/AnimatedText';
import { Palette, Code, Megaphone, Lightbulb, BarChart3, Globe } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Creating distinctive visual identities that capture essence and resonate with audiences.',
    number: '01',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Building performant, accessible, and beautifully crafted digital experiences.',
    number: '02',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Strategic campaigns that amplify your message and drive measurable growth.',
    number: '03',
  },
  {
    icon: Lightbulb,
    title: 'Creative Direction',
    description: 'Guiding vision from concept to execution with purpose and precision.',
    number: '04',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Transforming insights into actionable strategies for continuous improvement.',
    number: '05',
  },
  {
    icon: Globe,
    title: 'Global Strategy',
    description: 'Expanding reach across markets with culturally aware, localized approaches.',
    number: '06',
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const ServiceCard = ({ service, index, activeIndex, setActiveIndex }: ServiceCardProps) => {
  const Icon = service.icon;
  const isActive = activeIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      className="group relative"
    >
      <div className={`relative h-full p-8 md:p-10 border transition-all duration-500 flex flex-col ${
        isActive 
          ? 'bg-accent/5 border-accent/30' 
          : 'bg-card/30 border-border/50 hover:border-border'
      }`}>
        {/* Number */}
        <motion.span 
          className={`absolute top-4 right-4 text-xs font-mono transition-colors duration-300 ${
            isActive ? 'text-accent' : 'text-muted-foreground/40'
          }`}
          animate={{ opacity: isActive ? 1 : 0.4 }}
        >
          {service.number}
        </motion.span>

        {/* Icon with animation */}
                <motion.div
                  animate={{
                    rotate: isActive ? 360 : 0,
                    scale: isActive ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  className="w-14 h-14 flex items-center justify-center mb-6 relative"
                >
                  <div className={`absolute inset-0 rounded-none border transition-all duration-300 ${
                    isActive ? 'border-accent bg-accent/10' : 'border-border'
                  }`} />
                  <Icon className={`w-7 h-7 relative z-10 transition-colors duration-300 ${
                    isActive ? 'text-accent' : 'text-foreground/70'
                  }`} strokeWidth={1.5} />
                </motion.div>

                {/* Content */}
                <motion.h3
                  className="font-syne font-bold text-xl md:text-2xl mb-3 transition-colors duration-300"
                  animate={{ x: isActive ? 5 : 0 }}
                >
                  {service.title}
                </motion.h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {service.description}
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
                  className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
                  transition={{ duration: 0.3 }}
                />
        
                {/* Arrow */}
                <motion.div
                  className="absolute bottom-4 right-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          );
        };
        
        export const ServicesSection = () => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: '-100px' });
          const [activeIndex, setActiveIndex] = useState<number | null>(null);
        
          return (
            <section id="services" ref={ref} className="section-padding relative overflow-hidden">
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
                className="absolute top-20 right-20 w-32 h-32 border border-accent/20 rounded-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-40 left-10 w-4 h-4 bg-accent/30 rounded-none"
                animate={{ y: [-20, 20, -20], rotate: [0, 45, 0] }}
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
              <span className="text-sm font-mono text-accent">02</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">WHAT WE DO</span>
            </motion.div>

            <AnimatedLine delay={0.3}>
              <h2 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1]">
                Crafting solutions that elevate brands.
              </h2>
            </AnimatedLine>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground max-w-md"
          >
            We offer a comprehensive suite of services designed to transform your digital presence and drive meaningful results.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

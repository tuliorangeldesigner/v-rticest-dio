import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { AnimatedLine } from '@/components/AnimatedText';
import { Palette, Code, Megaphone, Lightbulb, BarChart3, Globe } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Creating distinctive visual identities that capture essence and resonate with audiences.',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Building performant, accessible, and beautifully crafted digital experiences.',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Strategic campaigns that amplify your message and drive measurable growth.',
  },
  {
    icon: Lightbulb,
    title: 'Creative Direction',
    description: 'Guiding vision from concept to execution with purpose and precision.',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Transforming insights into actionable strategies for continuous improvement.',
  },
  {
    icon: Globe,
    title: 'Global Strategy',
    description: 'Expanding reach across markets with culturally aware, localized approaches.',
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-6 sm:p-8 md:p-10 border border-border bg-card/50 backdrop-blur-sm rounded-lg cursor-pointer card-interactive"
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--accent) / 0.08) 0%, transparent 50%)',
        }}
      />

      {/* Icon */}
      <motion.div
        animate={{ 
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="relative w-14 h-14 flex items-center justify-center mb-6 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300"
      >
        <Icon className="w-7 h-7 text-accent icon-bounce" strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <h3 className="heading-md mb-4 group-hover:text-accent transition-colors duration-300 text-slide-up">
        {service.title}
      </h3>

      {/* Description */}
      <p className="body-md text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
        {service.description}
      </p>

      {/* Hover line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent/50 origin-left rounded-b-lg"
      />

      {/* Corner accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.5,
          rotate: isHovered ? 0 : -45,
        }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className="absolute top-4 right-4"
      >
        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="section-padding">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-20">
          <AnimatedLine delay={0.2}>
            <span className="label text-accent mb-6 block">What We Do</span>
          </AnimatedLine>
          <AnimatedLine delay={0.4}>
            <h2 className="heading-xl">
              Crafting solutions that elevate brands and inspire action.
            </h2>
          </AnimatedLine>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

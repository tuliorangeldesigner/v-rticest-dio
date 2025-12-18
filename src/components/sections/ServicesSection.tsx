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
      className="group relative p-8 lg:p-10 border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:bg-secondary/50 cursor-pointer"
      style={{
        transform: isHovered ? 'perspective(1000px) rotateX(2deg) rotateY(-2deg)' : 'none',
      }}
    >
      {/* Icon */}
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="w-12 h-12 flex items-center justify-center mb-6"
      >
        <Icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <h3 className="heading-md mb-4 group-hover:text-accent transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="body-sm text-muted-foreground">
        {service.description}
      </p>

      {/* Hover line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
      />

      {/* Corner accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-6 right-6"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          />
        </svg>
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
        <div className="max-w-3xl mb-16 lg:mb-20">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
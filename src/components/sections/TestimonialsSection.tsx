import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { AnimatedLine } from '@/components/AnimatedText';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: 'Eles não apenas redesenharam nossa marca. Mudaram a forma como o mercado nos enxerga.',
    author: 'Marina Duarte',
    role: 'Diretora Comercial | Clínica Estética',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    quote: 'Nossa percepção de valor subiu e as conversões melhoraram em poucas semanas.',
    author: 'Rafael Mendes',
    role: 'Fundador | Consultoria Empresarial',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    quote: 'O trabalho conectou branding, site e criativos em uma única operação de crescimento.',
    author: 'Bianca Alencar',
    role: 'Head de Marketing | E-commerce de Moda',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
  },
];

const clients = [
  'LUMINARY', 'ETHEREAL', 'ZENITH', 'CASCADE', 'AURORA', 'NEXUS',
  'VERTEX', 'PRISM', 'ORBIT', 'STELLAR',
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute left-0 right-0 h-px bg-foreground/5"
            style={{ top: `${25 * (i + 1)}%` }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 1.2 }}
          />
        ))}
      </div>

      {/* Large quote decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.03, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-20 left-10 pointer-events-none"
      >
        <Quote className="w-64 h-64 text-foreground" strokeWidth={1} />
      </motion.div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-sm font-mono text-accent">05</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">DEPOIMENTO</span>
            </motion.div>

            <AnimatedLine delay={0.3}>
              <h2 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1]">
                Autoridade se prova.
              </h2>
            </AnimatedLine>
          </div>

          {/* Navigation arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="flex gap-3"
          >
            <button
              onClick={prevSlide}
              className="w-12 h-12 border border-foreground/20 flex items-center justify-center hover:border-accent hover:bg-accent/5 transition-all duration-300 group"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5 group-hover:text-accent transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 border border-foreground/20 flex items-center justify-center hover:border-accent hover:bg-accent/5 transition-all duration-300 group"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5 group-hover:text-accent transition-colors" />
            </button>
          </motion.div>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative min-h-[320px] md:min-h-[280px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 50,
                }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className={`absolute inset-0 ${activeIndex === index ? 'pointer-events-auto' : 'pointer-events-none'}`}
              >
                <div className="p-8 md:p-12 border border-border/50 bg-card/30 backdrop-blur-sm">
                  {/* Quote icon */}
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-8">
                    <Quote className="w-5 h-5 text-accent" />
                  </div>

                  {/* Quote text */}
                  <blockquote className="font-syne text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-border/60">
                      <img
                        src={testimonial.avatarUrl}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <span className="font-syne font-semibold block">{testimonial.author}</span>
                      <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                    </div>
                  </div>

                  {/* Decorative corners */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent/30" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/30" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="group relative h-2 transition-all duration-300"
              >
                <div className={`w-12 h-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-accent' : 'bg-border hover:bg-border/80'
                }`} />
                {activeIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-accent"
                    layoutId="active-indicator"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Client Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 md:mt-28 relative"
        >
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-mono text-muted-foreground">MARCAS ATENDIDAS</span>
            <div className="flex-1 h-px bg-border/50 ml-8" />
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/30 to-transparent z-10" />

            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="flex gap-16 whitespace-nowrap py-4"
            >
              {[...clients, ...clients].map((client, index) => (
                <span
                  key={index}
                  className="text-xl font-syne font-bold text-muted-foreground/40 hover:text-foreground transition-colors duration-300 cursor-default"
                >
                  {client}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;






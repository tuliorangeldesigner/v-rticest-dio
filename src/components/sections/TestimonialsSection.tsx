import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { AnimatedLine } from '@/components/AnimatedText';

const testimonials = [
  {
    id: 1,
    quote: "Working with STUDIO was transformative. They didn't just deliver a website—they crafted an experience that perfectly captures our brand's essence.",
    author: 'Sarah Chen',
    role: 'CEO, Luminary Tech',
  },
  {
    id: 2,
    quote: "Their attention to detail and creative vision exceeded every expectation. The results speak for themselves—our engagement has never been higher.",
    author: 'Michael Rivera',
    role: 'Founder, Cascade Ventures',
  },
  {
    id: 3,
    quote: "A true partnership from day one. They challenged our thinking, pushed boundaries, and delivered work we're incredibly proud of.",
    author: 'Emma Watson',
    role: 'CMO, Ethereal Design',
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

  return (
    <section ref={ref} className="section-padding bg-secondary/30 overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <AnimatedLine delay={0.2}>
            <span className="label text-accent mb-6 block">Testimonials</span>
          </AnimatedLine>
          <AnimatedLine delay={0.4}>
            <h2 className="heading-xl">
              Words from those we've worked with.
            </h2>
          </AnimatedLine>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="relative min-h-[280px] sm:min-h-[240px] md:min-h-[220px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  filter: activeIndex === index ? 'blur(0px)' : 'blur(10px)',
                  y: activeIndex === index ? 0 : 20,
                }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <blockquote className="heading-md mb-8 text-balance">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <span className="font-syne font-semibold block">{testimonial.author}</span>
                  <span className="text-muted-foreground">{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative h-2 rounded-full transition-all duration-500 overflow-hidden ${
                  activeIndex === index ? 'w-12 bg-accent' : 'w-8 bg-border hover:bg-muted-foreground/30'
                }`}
              >
                {activeIndex === index && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Client Marquee */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/30 to-transparent z-10" />
          
          <div className="overflow-hidden py-8 border-y border-border">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="flex gap-16 whitespace-nowrap"
            >
              {[...clients, ...clients].map((client, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.1, color: 'hsl(var(--foreground))' }}
                  className="label text-muted-foreground/60 cursor-default transition-colors duration-300"
                >
                  {client}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

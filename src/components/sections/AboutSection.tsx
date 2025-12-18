import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedLine } from '@/components/AnimatedText';

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <AnimatedLine delay={0.2}>
              <span className="label text-accent mb-6 block">About Us</span>
            </AnimatedLine>
            
            <div className="space-y-6">
              <AnimatedLine delay={0.3}>
                <h2 className="heading-lg">
                  We are a team of creative minds, strategists, and craftsmen.
                </h2>
              </AnimatedLine>

              <AnimatedLine delay={0.5}>
                <p className="body-lg text-muted-foreground">
                  Founded in 2019, our studio has been at the forefront of digital innovation. 
                  We blend strategy, creativity, and technology to build experiences that 
                  resonate with audiences and drive meaningful results.
                </p>
              </AnimatedLine>

              <AnimatedLine delay={0.7}>
                <p className="body-md text-muted-foreground">
                  Our approach is rooted in collaboration. We work closely with brands 
                  to understand their vision, challenge conventions, and create work 
                  that stands apart in today's crowded digital landscape.
                </p>
              </AnimatedLine>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.19, 1, 0.22, 1] }}
              className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 pt-10 border-t border-border"
            >
              {[
                { number: '150+', label: 'Projects' },
                { number: '12', label: 'Awards' },
                { number: '98%', label: 'Happy Clients' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-default"
                >
                  <span className="heading-md text-accent">{stat.number}</span>
                  <span className="block label text-muted-foreground mt-2">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="order-1 lg:order-2 relative aspect-[4/5] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent mix-blend-overlay z-10" />
            <img
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80"
              alt="Creative team at work"
              className="w-full h-full object-cover"
            />
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1, ease: [0.19, 1, 0.22, 1] }}
              className="absolute -right-4 bottom-12 bg-background px-6 py-4 shadow-elegant"
            >
              <span className="label text-muted-foreground">Since</span>
              <span className="block heading-md mt-1">2019</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

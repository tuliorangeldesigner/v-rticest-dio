import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { AnimatedLine } from '@/components/AnimatedText';
import imageHero from '@/assets/vertice.webp';

const stats = [
  { number: '01', label: 'Percepção premium', description: 'Posicionamento de autoridade' },
  { number: '02', label: 'Conversão real', description: 'Decisões orientadas por dados' },
  { number: '03', label: 'Presença forte', description: 'Marca que domina categoria' },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 30,
      y: (e.clientY - rect.top - rect.height / 2) / 30,
    });
  };

  return (
    <section 
      id="about" 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="section-padding bg-secondary/30 relative overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-foreground/5"
            style={{ top: `${16.66 * (i + 1)}%` }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: i * 0.05, duration: 1.2 }}
          />
        ))}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-foreground/5"
            style={{ left: `${25 * (i + 1)}%` }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.2 + i * 0.05, duration: 1.2 }}
          />
        ))}
      </div>

      {/* Floating accent orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none"
        style={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
          top: '20%',
          right: '10%',
        }}
      />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 relative">
            {/* Section header with number - moved inside for better flow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-sm font-mono text-accent">01</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">SOBRE</span>
            </motion.div>

            <AnimatedLine delay={0.2}>
              <h2 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight mb-8 leading-[1.1]">Construímos Percepção Que Vende.</h2>
            </AnimatedLine>

            <div className="space-y-6 mb-10">
              <AnimatedLine delay={0.4}>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  A maioria das empresas não sofre por falta de tráfego.
                  Sofre por parecer comum.
                </p>
              </AnimatedLine>

              <AnimatedLine delay={0.5}>
                <p className="text-muted-foreground leading-relaxed max-w-xl">
                  Nós reestruturamos identidade, ambiente digital e ativos de performance para que sua marca pareça premium e converta como tal.
                  <br />
                  <br />
                  Da identidade ao criativo de tráfego, controlamos cada camada da sua presença digital.
                </p>
              </AnimatedLine>
            </div>

            {/* Stats with improved spacing */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 py-8 border-t border-border/50"
            >
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <div className="pl-4 border-l-2 border-accent/30 group-hover:border-accent transition-colors duration-300">
                    <span className="font-syne font-bold text-3xl md:text-4xl text-foreground group-hover:text-accent transition-colors duration-300 block mb-1">
                      {stat.number}
                    </span>
                    <span className="block text-sm font-medium text-foreground mb-1">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image with unique frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2 relative"
            style={{
              x: mousePosition.x * -1,
              y: mousePosition.y * -1,
            }}
          >
            {/* Decorative frame */}
            <motion.div 
              className="absolute -top-4 -right-4 w-full h-full border border-accent/30"
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <img
                src={imageHero}
                alt="Creative team at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/50" />
            </div>
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -left-6 bottom-12 bg-background border border-border px-6 py-4 shadow-xl"
            >
              <span className="text-xs font-mono text-muted-foreground">ESTABLISHED</span>
              <span className="block font-syne font-bold text-3xl mt-1">2019</span>
            </motion.div>

            {/* Side label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="absolute -right-12 top-1/2 -translate-y-1/2 hidden xl:block"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              <span className="text-xs font-mono text-muted-foreground tracking-widest">
                CRAFTING DIGITAL EXPERIENCES
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;



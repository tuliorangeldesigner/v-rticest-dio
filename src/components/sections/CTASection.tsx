import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from '@/components/MagneticButton';
import { AnimatedLine } from '@/components/AnimatedText';
import { Mail, ArrowUpRight } from 'lucide-react';

const words = [
  { text: 'Presença', number: '01' },
  { text: 'Que', number: '02' },
  { text: 'Impõe', number: '03' },
  { text: 'Respeito', number: '04', accent: true },
];

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    });
  };

  return (
    <section 
      id="contact" 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="section-padding relative overflow-hidden"
    >
      {/* Background grid */}
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

      {/* Animated circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-accent/10"
        style={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-accent/20"
        style={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
      />

      {/* Floating accent orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
        style={{
          x: mousePosition.x * 3,
          y: mousePosition.y * 3,
          top: '30%',
          left: '20%',
        }}
      />

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-20 right-[15%] w-16 h-16 border border-accent/20"
        style={{ transform: 'rotate(45deg)', x: mousePosition.x * 2, y: mousePosition.y * 2 }}
        animate={{ rotate: [45, 90, 45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 left-[10%] w-4 h-4 bg-accent/30 rounded-full"
        style={{ x: mousePosition.x * -3, y: mousePosition.y * -3 }}
      />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <span className="text-sm font-mono text-accent">06</span>
          <div className="h-px w-12 bg-accent" />
          <span className="text-sm font-mono text-muted-foreground tracking-wider">DIAGNÓSTICO</span>
        </motion.div>

        <div className="max-w-6xl mr-auto ml-0 md:ml-8 lg:ml-12">
          {/* Main headline with numbers */}
          <div className="mb-12 md:mb-16">
            {words.map((word, index) => (
              <div key={word.text} className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ 
                    duration: 1, 
                    delay: 0.2 + index * 0.1, 
                    ease: [0.19, 1, 0.22, 1] 
                  }}
                  className="flex items-baseline gap-4"
                >
                  <motion.span 
                    className="text-sm font-mono text-accent/60 hidden sm:inline-block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {word.number}
                  </motion.span>
                  <span 
                    className={`font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[124px] tracking-tight leading-[0.93] ${
                      word.accent ? 'text-accent' : 'text-foreground'
                    }`}
                  >
                    {word.text}
                    {word.accent && (
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="block h-1.5 bg-accent mt-2 origin-left"
                      />
                    )}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Description and CTA */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
            >
              E percepção.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 md:ml-auto md:translate-x-16 lg:translate-x-24"
            >
              <MagneticButton>
                <a
                  href="https://wa.me/5541987448273"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-semibold text-sm md:text-base rounded-full overflow-hidden"
                >
                  <Mail className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Solicitar Diagnóstico</span>
                  <motion.div
                    className="relative z-10 w-6 h-6 rounded-full bg-background/20 flex items-center justify-center"
                    whileHover={{ rotate: 45 }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-accent"
                    initial={{ y: '100%' }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  />
                </a>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/work"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 border border-foreground/20 text-foreground font-semibold rounded-full overflow-hidden hover:border-accent/50 transition-colors duration-300"
                >
                  <span className="relative z-10">Ver Todos Projetos</span>
                  <motion.span
                    className="relative z-10 text-accent"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {'->'}
                  </motion.span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Contact info row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 pt-8 border-t border-foreground/10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { label: 'WhatsApp', value: '(41) 98744-8273', href: 'https://wa.me/5541987448273' },
                { label: 'Localização', value: 'Morretes, PR', href: null },
                { label: 'Email', value: 'tuliorangeldesigner@gmail.com', href: 'mailto:tuliorangeldesigner@gmail.com' },
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="group"
                >
                  <span className="text-xs font-mono text-muted-foreground block mb-2">{item.label}</span>
                  {item.href ? (
                    <a 
                      href={item.href} 
                      className="font-syne font-semibold text-lg hover:text-accent transition-colors duration-300 inline-flex items-center gap-2"
                    >
                      {item.value}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <span className="font-syne font-semibold text-lg">{item.value}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;





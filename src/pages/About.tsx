import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import MagneticButton from '@/components/MagneticButton';
import Navigation from '@/components/Navigation';

const values = [
  {
    title: 'Estratégia Antes de Estética',
    description: 'Design sem direção • apenas decoração.',
    icon: '?',
    number: '01',
  },
  {
    title: 'Percepção Define Preço',
    description: 'Se o mercado te vê como comum, ele negocia.',
    icon: '?',
    number: '02',
  },
  {
    title: 'Clareza Gera Autoridade',
    description: 'Comunicação confusa nunca escala.',
    icon: '?',
    number: '03',
  },
  {
    title: 'Performance • Métrica, Não Opinião',
    description: 'Resultado se mede. Não se imagina.',
    icon: '?',
    number: '04',
  },
];

const milestones = [
  { year: '2016', event: 'Início da atuação profissional na área digital' },
  { year: '2018', event: 'Especialização em branding e identidade visual' },
  { year: '2019', event: 'Expansão para desenvolvimento web estratégico' },
  { year: '2021', event: 'Integração com criativos para performance' },
  { year: '2023', event: 'Estruturação do método Vértice Studio™' },
  { year: '2024', event: 'Consolidação como sistema integrado de presença e conversão' },
];

const About = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const structureRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroInView = useInView(heroRef, { once: true });
  const storyInView = useInView(storyRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const structureInView = useInView(structureRef, { once: true, margin: '-100px' });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: (e.clientX - window.innerWidth / 2) / 30,
      y: (e.clientY - window.innerHeight / 2) / 30,
    });
  };

  return (
    <div className="min-h-screen bg-background" onMouseMove={handleMouseMove}>
      <Navigation />

      <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-foreground/5"
              style={{ top: `${16.66 * (i + 1)}%` }}
              initial={{ scaleX: 0 }}
              animate={heroInView ? { scaleX: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 1.2 }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-foreground/5"
              style={{ left: `${25 * (i + 1)}%` }}
              initial={{ scaleY: 0 }}
              animate={heroInView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.05, duration: 1.2 }}
            />
          ))}
        </div>

        <motion.div
          className="absolute top-32 right-[10%] w-20 h-20 border border-accent/20"
          style={{ transform: 'rotate(45deg)', x: mousePosition.x * 2, y: mousePosition.y * 2 }}
        />
        <motion.div
          className="absolute bottom-20 left-[15%] w-32 h-32 rounded-full border border-accent/10"
          style={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
        />

        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
          style={{ top: '20%', right: '10%', x: mousePosition.x * 3, y: mousePosition.y * 3 }}
        />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-sm font-mono text-accent">01</span>
            <div className="h-px w-12 bg-accent" />
            <span className="text-sm font-mono text-muted-foreground tracking-wider">SOBRE</span>
          </motion.div>

          <div className="max-w-5xl">
            {["Não Somos Uma Equipe.", 'Somos Um Operador Tático.'].map((text, index) => (
              <div key={text} className="overflow-visible">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={heroInView ? { y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                  className={`font-epic font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] ${
                    index === 1 ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {text}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mt-8 space-y-4"
          >
            <p>
              Há mais de 8 anos atuando em branding, web e performance digital, a Vértice Studio™ nasceu para uma única missão:
            </p>
            <p>Reprogramar a percepção de marcas que querem crescer com autoridade.</p>
            <p>Sem barulho.<br />Sem modismo.<br />Sem promessa vazia.</p>
          </motion.div>
        </div>
      </section>

      <section ref={storyRef} className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <span className="text-sm font-mono text-accent">02</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">HISTÓRIA</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-syne font-bold text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
            >
              Experiência Não Se Improvisa.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
            >
              <p>
                Minha trajetória começou há mais de 8 anos, atuando diretamente em design, desenvolvimento web e produção de ativos digitais para diferentes nichos.
              </p>
              <p>
                Ao longo do tempo, um padrão ficou evidente:
                <br />
                Empresas não crescem por falta de esforço.
                <br />
                Crescem quando são percebidas como referência.
              </p>
              <p>
                Foi dessa constatação que nasceu a Vértice Studio™ - um sistema estruturado para unir identidade, ambiente digital e performance em um único processo estratégico.
              </p>
              <p>
                Não é sobre estética.
                <br />
                É sobre posicionamento.
              </p>
              <p>
                Não é sobre volume.
                <br />
                É sobre impacto.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 40 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group relative pt-8 border-t border-border hover:border-accent transition-colors duration-500"
              >
                <div className="flex flex-col gap-4">
                  <span className="text-5xl md:text-6xl font-syne font-bold text-foreground/20 group-hover:text-accent transition-colors duration-500">
                    {milestone.year}
                  </span>
                  <p className="text-foreground/80 font-medium leading-relaxed max-w-xs group-hover:text-foreground transition-colors duration-300">
                    {milestone.event}
                  </p>
                </div>
                <div className="absolute top-[-5px] right-0 w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={valuesRef} className="py-24 md:py-32 relative overflow-hidden">
        <div className="container-wide mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-sm font-mono text-accent">03</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">PRINCÍPIOS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-syne font-bold">Princípios Que Sustentam Cada Projeto.</h2>
          </motion.div>
        </div>

        <div className="w-full border-y border-border">
          <div className="flex flex-col lg:flex-row h-auto lg:h-[600px] divide-y lg:divide-y-0 lg:divide-x divide-border">
            {values.map((value) => (
              <div
                key={value.title}
                className="group relative flex-1 p-8 lg:p-12 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-[3] bg-background hover:bg-accent/5 overflow-hidden flex flex-col justify-between min-h-[300px] lg:min-h-0"
              >
                <div className="flex justify-between items-start">
                  <span className="text-sm font-mono text-accent">{value.number}</span>
                  <span className="text-3xl text-foreground/20 group-hover:text-accent transition-colors duration-500 transform group-hover:rotate-180">
                    {value.icon}
                  </span>
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="text-2xl lg:text-4xl font-syne font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                    {value.title}
                  </h3>
                  <div className="lg:max-w-md lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-8 lg:group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <p className="text-muted-foreground leading-relaxed text-lg">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={structureRef} className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={structureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-sm font-mono text-accent">04</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">ESTRUTURA</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-syne font-bold leading-tight mb-8">Estrutura Enxuta. Foco Total.</h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              A Vértice Studio™ funciona com estrutura enxuta e execução direta.
              <br />
              <br />
              Sem camadas desnecessárias.
              <br />
              Sem ruído interno.
              <br />
              Sem promessas que dependem de terceiros.
              <br />
              <br />
              Cada projeto recebe atenção estratégica e execução precisa.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { number: '8+', suffix: '', label: 'anos de experiência' },
              { number: '40+', suffix: '', label: 'marcas atendidas' },
              { number: '10+', suffix: '', label: 'nichos atendidos' },
              { number: '100%', suffix: '', label: 'foco em crescimento estratégico' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                className="group aspect-square rounded-full border border-border flex flex-col items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-500 cursor-default relative overflow-hidden"
              >
                <div className="relative z-10 text-center px-2">
                  <div className="flex items-start justify-center gap-1 leading-none">
                    <span className="text-4xl md:text-6xl font-syne font-bold tracking-tighter">{stat.number}</span>
                    <span className="text-2xl md:text-3xl font-syne font-medium text-accent group-hover:text-background transition-colors duration-500">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest mt-3 text-muted-foreground group-hover:text-background/70 transition-colors duration-500">
                    {stat.label}
                  </p>
                </div>

                <div className="absolute inset-0 rounded-full border border-accent/0 group-hover:border-accent/50 group-hover:scale-110 transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-foreground/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        <div className="container-wide text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono text-accent mb-6 block">PRÓXIMO PASSO</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
              Se Você Quer Crescer Com Autoridade, Começa Aqui.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
              Trabalhamos com empresas que entendem que percepção e conversão andam juntas.
              <br />
              Se sua marca já está pronta para sair do comum, o próximo passo é estratégico.
            </p>
            <MagneticButton>
              <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full">
                Agendar Diagnóstico Estratégico
                <motion.div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center" whileHover={{ rotate: 45 }}>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

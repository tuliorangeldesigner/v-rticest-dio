import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import MagneticButton from '@/components/MagneticButton';
import Navigation from '@/components/Navigation';

const services = [
  {
    id: 'brand-reprogramming',
    title: 'Reprogramação de Marca',
    tagline: 'Reposicionamento estratégico para elevar percepção de valor',
    description:
      'Reposicionamento estratégico para empresas que precisam elevar percepção de valor.',
    includes: [
      'Diagnóstico de posicionamento',
      'Identidade visual premium',
      'Direção estética estruturada',
      'Sistema visual coerente',
    ],
    outcome: 'Indicado para empresas que querem parar de competir por preço.',
    number: '01',
  },
  {
    id: 'conversion-architecture',
    title: 'Arquitetura de Site & Conversão',
    tagline: 'Estruturamos ambientes digitais que conduzem decisão',
    description: 'Estruturamos ambientes digitais que conduzem decisão.',
    includes: [
      'Estrutura estratégica de páginas',
      'Copy com autoridade',
      'UX focado em ao',
      'Landing pages de alta performance',
    ],
    outcome: 'Seu site deixa de ser vitrine e passa a ser máquina de conversão.',
    number: '02',
  },
  {
    id: 'performance-creatives',
    title: 'Criativos de Performance',
    tagline: 'Ativos para dominar atenção e reduzir custo por aquisição',
    description:
      'Ativos digitais desenvolvidos para dominar atenção e reduzir custo por aquisição.',
    includes: ['Criativos para tráfego pago', 'Vídeos estratégicos', 'Testes A/B', 'Otimização contínua'],
    outcome: 'Performance não é estética. É métrica.',
    number: '03',
  },
  {
    id: 'neural-system',
    title: 'Sistema Completo Vértice Studio™',
    tagline: 'Integração total entre marca, ambiente digital e performance',
    description:
      'Integração total entre marca, ambiente digital e performance. Para empresas que querem controle estratégico da própria presença.',
    includes: [
      'Diagnóstico estratégico',
      'Branding, ambiente digital e performance',
      'Execução integrada por fases',
      'Acompanhamento orientado por dados',
    ],
    outcome: 'Projeto estruturado do diagnóstico à escala.',
    number: '04',
  },
];

const investmentStructure = [
  {
    name: 'Sprint de Reposicionamento',
    summary: 'Reprogramação de marca + ajustes estratégicos de presença digital.',
    model: 'Projeto fechado.',
    number: '01',
  },
  {
    name: 'Arquitetura de Conversão',
    summary: 'Criação ou reestruturação completa de site com foco em autoridade e conversão.',
    model: 'Projeto fechado.',
    number: '02',
  },
  {
    name: 'Performance Mensal',
    summary: 'Criação e otimização contínua de criativos para tráfego pago.',
    model: 'Modelo recorrente.',
    number: '03',
  },
  {
    name: 'Vértice Studio™ Completa',
    summary: 'Integração total entre branding, site e performance.',
    model: 'Projeto estratégico de médio prazo.',
    number: '04',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Auditoria de Percepção',
    desc: 'Mapeamento de posicionamento, autoridade visual e gargalos.',
    icon: '?',
  },
  {
    step: '02',
    title: 'Estratégia',
    desc: 'Definição clara de direção estética, estrutura e narrativa.',
    icon: '?',
  },
  {
    step: '03',
    title: 'Implantação',
    desc: 'Execução de branding, site ou criativos conforme escopo.',
    icon: '?',
  },
  {
    step: '04',
    title: 'Escala',
    desc: 'Ajustes orientados por dados para maximizar impacto.',
    icon: '?',
  },
];

const Services = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const investmentRef = useRef(null);
  const processRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const investmentInView = useInView(investmentRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });

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
            <span className="text-sm font-mono text-muted-foreground tracking-wider">SERVIÇOS</span>
          </motion.div>

          <div className="max-w-5xl overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={heroInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]"
            >
              Serviços & Estrutura de <span className="text-accent">Planos</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mt-8"
          >
            A Vértice Studio™ não vende peças isoladas.
            <br />
            Estruturamos identidade, presença digital e performance como um sistema integrado de crescimento.
            <br />
            <br />
            Cada projeto é desenhado para gerar percepção premium e conversão real.
          </motion.p>
        </div>
      </section>

      <section ref={servicesRef} className="py-24 md:py-32 relative">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-mono text-accent">02</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">INTRODUÇÃO</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-syne font-bold leading-tight max-w-4xl">
              Soluções Estratégicas Para Marcas Que Querem Crescer Com Autoridade.
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mt-8 leading-relaxed">
              Não trabalhamos com entregas genéricas.
              <br />
              <br />
              Cada projeto começa com uma análise profunda de posicionamento e termina com um sistema estruturado de presença e conversão.
              <br />
              <br />
              Se sua marca quer apenas "design bonito", talvez este não seja o lugar certo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 border-t border-l border-border">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative border-r border-b border-border min-h-[520px] overflow-hidden bg-background p-8 md:p-12 flex flex-col"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="text-6xl md:text-8xl font-syne font-bold text-foreground/10">{service.number}</span>
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 -rotate-45 text-accent" />
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-syne font-bold leading-tight mb-3">{service.title}</h3>
                <p className="text-sm font-mono tracking-wider text-muted-foreground uppercase mb-5">{service.tagline}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>

                <div className="mb-6">
                  <p className="text-xs font-mono text-accent mb-3 tracking-widest uppercase">Inclui</p>
                  <div className="space-y-2">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-auto pt-6 border-t border-border/50 text-sm md:text-base font-medium text-foreground/90">
                  {service.outcome}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={investmentRef} className="py-24 md:py-32 relative overflow-hidden">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={investmentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-sm font-mono text-accent">03</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">INVESTIMENTO</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-syne font-bold max-w-3xl mx-auto">Estrutura de Investimento</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
              Estrutura definida por escopo, profundidade e objetivo estratégico. Valores são apresentados após diagnóstico.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto border-t border-border">
            {investmentStructure.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={investmentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group relative flex flex-col md:flex-row md:items-baseline justify-between py-12 md:py-16 border-b border-border"
              >
                <div className="flex items-baseline gap-8 md:gap-16">
                  <span className="font-mono text-sm text-accent/70">{item.number}</span>
                  <div>
                    <h3 className="text-3xl md:text-5xl font-syne font-bold text-foreground mb-3">{item.name}</h3>
                    <p className="text-muted-foreground text-lg max-w-3xl">{item.summary}</p>
                  </div>
                </div>
                <p className="font-mono text-base md:text-lg text-foreground/80 mt-6 md:mt-0 pl-[calc(2rem+1px)] md:pl-0">
                  {item.model}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={processRef} className="py-24 md:py-32 relative overflow-hidden bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-sm font-mono text-accent">04</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">METODOLOGIA</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-syne font-bold max-w-2xl mx-auto">Metodologia Estruturada.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 border-y border-border">
            {processSteps.map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 40 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group relative flex flex-col justify-between p-8 md:p-12 min-h-[420px] border-b md:border-b-0 md:border-r border-border last:border-b-0 last:border-r-0 hover:bg-foreground hover:text-background transition-colors duration-500"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xl font-mono group-hover:text-accent transition-colors duration-300">{phase.step}</span>
                  <span className="text-3xl text-accent opacity-50 group-hover:opacity-100 group-hover:text-background transition-all duration-300">
                    {phase.icon}
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="text-3xl font-syne font-bold mb-6 group-hover:text-background transition-colors duration-300">
                    {phase.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-background/80 transition-colors duration-300">
                    {phase.desc}
                  </p>
                  <div className="h-px w-8 bg-border mt-8 group-hover:w-full group-hover:bg-accent transition-all duration-700 ease-out" />
                </div>
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
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-foreground/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        <div className="container-wide text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono text-accent mb-6 block">PRÓXIMO PASSO</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">Pronto Para Elevar Sua Presença Digital?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-10 text-lg">
              Se sua empresa está pronta para sair do comum e assumir posição estratégica no mercado, o próximo passo é diagnóstico.
              <br />
              <br />
              Projetos são limitados por capacidade de execução.
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

export default Services;







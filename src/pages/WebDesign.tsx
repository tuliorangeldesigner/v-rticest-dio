import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Code, Code2, Compass, HelpCircle, MessageCircle, Palette, Quote, Rocket, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AnimatedLine } from '@/components/AnimatedText';
import Footer from '@/components/Footer';
import MagneticButton from '@/components/MagneticButton';
import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';
import { projects } from '@/data/projects';
import { trackConversion } from '@/lib/conversion';
import { getWhatsAppLink } from '@/lib/whatsapp';
import backHeroVideo from '@/assets/backhero1-web.mp4';

const siteProjectIds = [
  'larroyd-studios',
  'naturis',
  'orbits',
  'elektra',
  'poema-cru',
  'lucas-portfolio',
  'amanda-felisbino',
];

const siteProjects = siteProjectIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

const steps = [
  {
    number: '01',
    title: 'Imersão e diagnóstico',
    description: 'Antes de pensar na tela, eu entendo sua oferta, o público e a conversa que esse site precisa abrir.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Estrutura e direção',
    description: 'Organizamos a jornada, a mensagem e a direção visual para a página fazer sentido desde o primeiro acesso.',
    icon: Target,
  },
  {
    number: '03',
    title: 'Design e desenvolvimento',
    description: 'A estrutura vira uma experiência responsiva, com ritmo, hierarquia e detalhes que sustentam a percepção de valor.',
    icon: Code,
  },
  {
    number: '04',
    title: 'Revisão e publicação',
    description: 'Fazemos os ajustes finais e colocamos a página no ar pronta para receber tráfego, indicação e conversas.',
    icon: Rocket,
  },
];

const firstImpressions = [
  { label: 'Clareza', question: 'Isso é para mim?', answer: 'A oferta precisa ser compreendida sem esforço — antes que a atenção acabe.', signal: 'Oferta reconhecida' },
  { label: 'Confiança', question: 'Essa marca parece séria?', answer: 'Direção visual, estrutura e detalhes constroem percepção antes mesmo do primeiro contato.', signal: 'Autoridade percebida' },
  { label: 'Ação', question: 'Vale a pena chamar?', answer: 'Quando o próximo passo é claro, o interesse deixa de ficar parado na tela.', signal: 'Contato facilitado' },
];

const webOffers = [
  {
    title: 'Site Institucional',
    description: 'Para apresentar sua marca, serviços e diferenciais sem fazer o cliente procurar o que importa.',
    points: ['Arquitetura de páginas', 'Direção visual coerente', 'Copy de posicionamento', 'Jornada de contato'],
    result: 'Mais clareza para quem chega. Mais confiança para quem decide.',
    icon: Palette,
  },
  {
    title: 'Landing Page de Conversão',
    description: 'Uma página dedicada para transformar interesse em uma ação concreta.',
    points: ['Oferta e narrativa', 'CTAs estratégicos', 'Estrutura para campanhas', 'Experiência mobile-first'],
    result: 'Menos distração. Mais intenção de contato.',
    icon: Code2,
  },
  {
    title: 'Portfólio & Página Autoral',
    description: 'Para profissionais e projetos que precisam ser lembrados antes da primeira reunião.',
    points: ['Direção criativa', 'Curadoria de trabalhos', 'Apresentação de serviços', 'Presença digital autoral'],
    result: 'Seu trabalho passa a falar com mais presença por você.',
    icon: Sparkles,
  },
];

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

const clients = ['GWAPO', 'CAR WEB', 'BEACH TENNIS', 'ROCHA OBRAS', 'AURORA', 'NEXUS', 'VERTEX', 'PRISM', 'ORBIT', 'STELLAR'];

const SectionMarker = ({ number, label, inverse = false }: { number: string; label: string; inverse?: boolean }) => (
  <div className={`flex items-center gap-4 font-mono text-sm tracking-wider ${inverse ? 'text-accent-foreground/70' : 'text-muted-foreground'}`}>
    <span className={inverse ? 'text-accent-foreground' : 'text-accent'}>{number}</span>
    <div className={`h-px w-12 ${inverse ? 'bg-accent-foreground/60' : 'bg-accent'}`} />
    <span>{label}</span>
  </div>
);

const faqItems = [
  {
    question: 'Você faz site institucional e landing page?',
    answer: 'Sim. A escolha depende do objetivo: um site institucional organiza presença, serviços e autoridade; uma landing page concentra a conversa em uma oferta, campanha ou ação específica.',
  },
  {
    question: 'Eu preciso ter tudo pronto antes de começar?',
    answer: 'Não. Você precisa conhecer seu negócio. A partir daí, organizamos o que é essencial para a página comunicar com clareza — incluindo referências, materiais e conteúdo disponível.',
  },
  {
    question: 'Quanto tempo leva?',
    answer: 'O prazo varia conforme escopo, páginas e velocidade das aprovações. Na conversa inicial, você recebe uma visão realista das etapas e do cronograma do seu projeto.',
  },
  {
    question: 'Como funciona o investimento?',
    answer: 'Cada site é orçado de acordo com a necessidade do projeto. A proposta deixa claro o que será entregue, o cronograma e o investimento antes de qualquer início.',
  },
  {
    question: 'Você também me ajuda com os textos?',
    answer: 'Sim. A copy faz parte da estrutura do projeto. O objetivo é transformar o que você já sabe sobre seu negócio em uma mensagem que o visitante entenda e valorize.',
  },
  {
    question: 'O site vai funcionar bem no celular?',
    answer: 'Sim. A experiência é pensada para telas menores desde o início, porque boa parte dos acessos e dos contatos acontece pelo celular.',
  },
  {
    question: 'Posso pedir alterações durante o processo?',
    answer: 'Sim. O projeto tem momentos de apresentação e alinhamento justamente para que os ajustes aconteçam com contexto, sem virar uma sequência confusa de mudanças.',
  },
  {
    question: 'Já tenho logo e identidade visual. Ainda faz sentido?',
    answer: 'Faz. O site pode usar a identidade que você já possui e transformar esse material em uma presença digital mais organizada, atual e coerente.',
  },
  {
    question: 'E se minha marca ainda não tiver identidade visual?',
    answer: 'A conversa inicial serve para entender o ponto de partida. Se o visual atual não sustentar o site que sua marca precisa, isso entra no escopo de forma transparente antes de começarmos.',
  },
  {
    question: 'O que preciso enviar para iniciar?',
    answer: 'O básico é ter clareza sobre serviço, público e objetivo. Fotos, textos, referências e materiais existentes ajudam, mas não precisam estar todos prontos para a primeira conversa.',
  },
  {
    question: 'Depois de publicado, posso usar o site em campanhas?',
    answer: 'Sim. A estrutura é pensada para receber visitas de indicação, redes sociais e campanhas. Na etapa inicial, alinhamos qual ação o site precisa priorizar.',
  },
];

const ProjectPreviewCard = ({ project, index }: { project: (typeof projects)[number]; index: number }) => {
  const [activeImage, setActiveImage] = useState(0);
  const images = [project.thumbnail, ...project.gallery.slice(0, 2)].filter(Boolean);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const nextImage = Math.min(images.length - 1, Math.floor(relativeX * images.length));
    setActiveImage(nextImage);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.07, 0.28) }}
      className={index % 2 === 1 ? 'md:mt-16' : ''}
    >
      <Link
        to={`/work/${project.id}`}
        onMouseMove={handleMove}
        onMouseLeave={() => setActiveImage(0)}
        className="group block"
      >
        <div className="relative aspect-[16/10] overflow-hidden border border-border bg-card p-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={images[activeImage]}
              src={images[activeImage]}
              alt={`Projeto ${project.title}`}
              loading={index < 3 ? 'eager' : 'lazy'}
              decoding="async"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.32, ease: [0.19, 1, 0.22, 1] }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-2 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
          <span className="absolute left-5 top-5 bg-background/90 px-2 py-1 font-mono text-[10px] tracking-widest text-accent backdrop-blur-sm">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="absolute inset-0 hidden items-center justify-center md:flex">
            <div className="flex h-20 w-20 scale-75 items-center justify-center rounded-full bg-background/95 font-mono text-[10px] uppercase tracking-widest text-foreground opacity-0 shadow-2xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              Ver case
            </div>
          </div>
          <div className="absolute inset-x-5 bottom-5 flex justify-between gap-4 md:hidden">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/65">Ver case</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/65">{activeImage + 1}/{images.length}</span>
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4 border-t border-border pt-4 transition-colors group-hover:border-accent/60">
          <div>
            <h3 className="text-2xl font-bold tracking-[-0.035em] transition-colors group-hover:text-accent">{project.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{project.category}</p>
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
        </div>
      </Link>
    </motion.article>
  );
};

const WebOfferCard = ({ offer, index, activeIndex, setActiveIndex }: {
  offer: (typeof webOffers)[number];
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}) => {
  const Icon = offer.icon;
  const isActive = activeIndex === index;
  const href = getWhatsAppLink(`Olá, Túlio! Quero conversar sobre ${offer.title.toLowerCase()}.`);

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
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackConversion('whatsapp_click')}
        className={`relative flex h-full min-h-[25rem] flex-col border p-8 transition-all duration-500 md:p-10 ${
          isActive ? 'border-accent/30 bg-accent/5' : 'border-border/50 bg-card/30 hover:border-border'
        }`}
      >
        <motion.span
          className={`absolute right-4 top-4 font-mono text-xs transition-colors duration-300 ${isActive ? 'text-accent' : 'text-muted-foreground/40'}`}
          animate={{ opacity: isActive ? 1 : 0.4 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
        <motion.div
          animate={{ rotate: isActive ? 360 : 0, scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="relative mb-6 flex h-14 w-14 items-center justify-center"
        >
          <div className={`absolute inset-0 border transition-all duration-300 ${isActive ? 'border-accent bg-accent/10' : 'border-border'}`} />
          <Icon className={`relative z-10 h-7 w-7 transition-colors duration-300 ${isActive ? 'text-accent' : 'text-foreground/70'}`} strokeWidth={1.5} />
        </motion.div>
        <motion.h3 className="mb-3 text-xl font-bold transition-colors duration-300 md:text-2xl" animate={{ x: isActive ? 5 : 0 }}>
          {offer.title}
        </motion.h3>
        <p className="flex-grow leading-relaxed text-muted-foreground">{offer.description}</p>
        <ul className="mt-5 space-y-1 text-sm text-muted-foreground">
          {offer.points.map((point) => <li key={point}>— {point}</li>)}
        </ul>
        <p className="mt-5 text-sm text-foreground/90"><span className="font-semibold">Resultado:</span> {offer.result}</p>
        <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-accent" initial={{ scaleX: 0 }} animate={{ scaleX: isActive ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }} />
        <motion.div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-accent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }} transition={{ duration: 0.3 }} />
        <motion.div className="absolute bottom-4 right-4" initial={{ opacity: 0, x: -10 }} animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }} transition={{ duration: 0.3 }}>
          <ArrowUpRight className="h-5 w-5 text-accent" />
        </motion.div>
      </a>
    </motion.div>
  );
};

const WebTestimonials = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = window.setInterval(() => setActiveIndex((current) => (current + 1) % testimonials.length), 6000);
    return () => window.clearInterval(interval);
  }, [isInView]);

  const previous = () => setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIndex((current) => (current + 1) % testimonials.length);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border bg-secondary/30 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        {[...Array(4)].map((_, index) => (
          <motion.div key={index} className="absolute left-0 right-0 h-px bg-foreground/5" style={{ top: `${25 * (index + 1)}%` }} initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ delay: index * 0.1, duration: 1.2 }} />
        ))}
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 0.03, scale: 1 } : {}} transition={{ duration: 1 }} className="pointer-events-none absolute left-8 top-20">
        <Quote className="h-56 w-56 text-foreground md:h-64 md:w-64" strokeWidth={1} />
      </motion.div>

      <div className="container-wide relative z-10">
        <div className="mb-16 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="mb-8 flex items-center gap-4">
              <SectionMarker number="06" label="DEPOIMENTOS" />
            </motion.div>
            <AnimatedLine delay={0.3}><h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.04em] md:text-6xl">Autoridade se prova.</h2></AnimatedLine>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="flex gap-3">
            <button onClick={previous} className="group flex h-12 w-12 items-center justify-center border border-foreground/20 transition-all hover:border-accent hover:bg-accent/5" aria-label="Depoimento anterior"><ChevronLeft className="h-5 w-5 transition-colors group-hover:text-accent" /></button>
            <button onClick={next} className="group flex h-12 w-12 items-center justify-center border border-foreground/20 transition-all hover:border-accent hover:bg-accent/5" aria-label="Próximo depoimento"><ChevronRight className="h-5 w-5 transition-colors group-hover:text-accent" /></button>
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="relative min-h-[360px] md:min-h-[300px]">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: activeIndex === index ? 1 : 0, x: activeIndex === index ? 0 : 50 }} transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }} className={`absolute inset-0 ${activeIndex === index ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className="relative border border-border/50 bg-card/75 p-8 shadow-xl shadow-background/20 md:p-12">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10"><Quote className="h-5 w-5 text-accent" /></div>
                  <blockquote className="mb-8 text-xl font-medium leading-relaxed md:text-2xl lg:text-3xl">“{testimonial.quote}”</blockquote>
                  <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-border/60"><img src={testimonial.avatarUrl} alt={testimonial.author} className="h-full w-full object-cover" loading="lazy" decoding="async" /></div>
                    <div><span className="block font-syne font-semibold">{testimonial.author}</span><span className="text-sm text-muted-foreground">{testimonial.role}</span></div>
                  </div>
                  <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-accent/30" /><div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-accent/30" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-3">
            {testimonials.map((testimonial, index) => <button key={testimonial.id} onClick={() => setActiveIndex(index)} className="h-2" aria-label={`Ver depoimento ${index + 1}`}><div className={`h-full w-12 transition-colors ${activeIndex === index ? 'bg-accent' : 'bg-border hover:bg-border/80'}`} /></button>)}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 0.8 }} className="relative mt-20 md:mt-28">
          <div className="mb-8 flex items-center justify-between"><span className="font-mono text-sm text-muted-foreground">MARCAS ATENDIDAS</span><div className="ml-8 h-px flex-1 bg-border/50" /></div>
          <div className="relative overflow-hidden"><div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-secondary/30 to-transparent" /><div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-secondary/30 to-transparent" /><motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="flex gap-16 whitespace-nowrap py-4">{[...clients, ...clients].map((client, index) => <span key={`${client}-${index}`} className="cursor-default font-syne text-xl font-bold text-muted-foreground/40 transition-colors hover:text-foreground">{client}</span>)}</motion.div></div>
        </motion.div>
      </div>
    </section>
  );
};

const WebDesign = () => {
  const whatsappHref = getWhatsAppLink('Olá, Túlio! Vim pela página de Web Design e quero conversar sobre meu site.');
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const [activeImpression, setActiveImpression] = useState(0);
  const offersRef = useRef<HTMLElement | null>(null);
  const faqRef = useRef<HTMLElement | null>(null);
  const processRef = useRef<HTMLElement | null>(null);
  const offersInView = useInView(offersRef, { once: true, margin: '-100px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Criação de Sites e Landing Pages"
        description="Sites e landing pages com direção visual, estratégia e narrativa para transformar visitas em conversas de negócio."
        url="/webdesign"
        image="/trdesigner-social-share.jpg"
      />
      <Navigation />

      <main>
        <section className="relative isolate min-h-[100svh] overflow-hidden border-b border-border pt-32 md:pt-40">
          <div className="absolute inset-0 -z-20">
            <video autoPlay loop muted playsInline preload="auto" aria-hidden="true" className="h-full w-full scale-110 object-cover opacity-55">
              <source src={backHeroVideo} type="video/mp4" />
            </video>
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,hsl(var(--background)/0.96)_0%,hsl(var(--background)/0.77)_53%,hsl(var(--background)/0.91)_100%),linear-gradient(0deg,hsl(var(--background)/0.88)_0%,transparent_45%)]" />
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(hsl(var(--border)/0.32)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.32)_1px,transparent_1px)] [background-size:4.5rem_4.5rem]" />
          <div className="pointer-events-none absolute -right-24 top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-[120px]" />

          <div className="container-wide grid gap-14 pb-12 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-16">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="mb-8"
              >
                <SectionMarker number="01" label="WEB DESIGN" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="max-w-5xl font-syne text-[clamp(3.5rem,9.5vw,9.4rem)] font-bold leading-[0.82] tracking-[-0.065em]"
              >
                Sites que fazem <span className="text-accent">sentido.</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.7 }}
              className="lg:col-span-4 lg:pb-2"
            >
              <p className="max-w-md text-lg leading-relaxed text-foreground/78 md:text-xl">
                Crio sites que traduzem o valor da sua marca, organizam sua oferta e deixam o próximo passo mais natural para o cliente.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion('whatsapp_click')}
                className="group mt-8 inline-flex items-center gap-4 bg-accent px-6 py-4 font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-1"
              >
                Quero falar sobre meu site
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-foreground/15">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="container-wide"
          >
            <div className="group relative overflow-hidden border border-white/15 bg-background/40 p-2 backdrop-blur-sm md:p-3">
              <img
                src={siteProjects[0]?.thumbnail}
                alt="Projeto de site Larroyd Studios"
                className="aspect-[16/7] w-full object-cover object-top opacity-90 transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 md:inset-x-8 md:bottom-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">Destaque do portfólio</p>
                  <p className="mt-1 font-syne text-2xl font-bold text-white md:text-4xl">Larroyd Studios</p>
                </div>
                <Link to="/work/larroyd-studios" className="hidden items-center gap-2 border border-white/30 bg-black/25 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground sm:flex">
                  Ver case <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          <a href="#projetos" className="mx-auto mt-10 flex w-max items-center gap-3 pb-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-accent">
            Conheça os projetos <ArrowDown className="h-4 w-4" />
          </a>
        </section>

        <section className="relative overflow-hidden border-b border-border bg-card/40 py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.35)_1px,transparent_1px)] [background-size:5rem_5rem]" />
          <div className="container-wide relative z-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <SectionMarker number="02" label="PRIMEIRA IMPRESSÃO" />
                <h2 className="mt-5 text-4xl font-bold leading-[0.95] tracking-[-0.04em] md:text-6xl">Uma presença que sustenta a sua venda.</h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7 md:text-xl">
                <p>Nos primeiros segundos, quem chega tenta responder três perguntas. Um site forte antecipa cada uma delas sem parecer que está forçando uma venda.</p>
                <p className="text-sm text-foreground/65">Explore os pontos abaixo e veja o que a página precisa resolver.</p>
              </div>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:gap-8">
              <div className="relative min-h-[28rem] overflow-hidden border border-border bg-background p-5 md:p-8 lg:col-span-7">
                <div className="absolute inset-x-0 top-0 flex h-10 items-center gap-2 border-b border-border bg-card px-4"><span className="h-2 w-2 rounded-full bg-accent" /><span className="h-2 w-2 rounded-full bg-foreground/15" /><span className="h-2 w-2 rounded-full bg-foreground/15" /><div className="ml-3 h-4 w-40 rounded-full bg-foreground/5" /></div>
                <div className="relative flex h-full min-h-[22rem] flex-col justify-between pt-12">
                  <div className="flex items-center justify-between border-b border-border pb-5"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Leitura do visitante</span><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">0{activeImpression + 1} / 03</span></div>
                  <AnimatePresence mode="wait">
                    <motion.div key={firstImpressions[activeImpression].label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }} className="py-8 md:py-10">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{firstImpressions[activeImpression].label}</p>
                      <h3 className="mt-4 max-w-xl text-4xl font-bold leading-[0.95] tracking-[-0.045em] md:text-6xl">{firstImpressions[activeImpression].question}</h3>
                      <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">{firstImpressions[activeImpression].answer}</p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex items-center justify-between gap-4 border-t border-border pt-5"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Sinal que fica</span><span className="rounded-full border border-accent/35 bg-accent/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{firstImpressions[activeImpression].signal}</span></div>
                </div>
                <motion.div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full border-[28px] border-accent/10" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} />
              </div>

              <div className="grid gap-3 lg:col-span-5">
                {firstImpressions.map((item, index) => {
                  const active = activeImpression === index;
                  return (
                    <button key={item.label} onMouseEnter={() => setActiveImpression(index)} onFocus={() => setActiveImpression(index)} onClick={() => setActiveImpression(index)} className={`group relative overflow-hidden border p-6 text-left transition-all duration-500 md:p-7 ${active ? 'border-accent/50 bg-accent/10' : 'border-border bg-background hover:border-foreground/35'}`}>
                      <div className="relative flex items-start justify-between gap-5"><span className={`font-mono text-xs transition-colors ${active ? 'text-accent' : 'text-muted-foreground'}`}>0{index + 1}</span><span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${active ? 'scale-125 bg-accent' : 'bg-foreground/15 group-hover:bg-accent/60'}`} /></div>
                      <h3 className="relative mt-5 text-2xl font-bold tracking-[-0.035em]">{item.label}</h3><p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{item.question}</p>
                      <motion.div className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent" initial={false} animate={{ scaleX: active ? 1 : 0 }} transition={{ duration: 0.35 }} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="projetos" className="scroll-mt-24 py-24 md:py-32">
          <div className="container-wide">
            <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
              <div>
                <SectionMarker number="03" label="PROJETOS" />
                <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[0.93] tracking-[-0.045em] md:text-6xl">Cada site pede um jeito próprio de contar a história.</h2>
              </div>
              <Link to="/work/sites" className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-accent">
                Ver todos os projetos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="mb-8 -mt-5 text-sm text-muted-foreground md:hidden">Toque em um projeto para conhecer o case.</p>
            <div className="grid gap-x-5 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {siteProjects.map((project, index) => <ProjectPreviewCard key={project.id} project={project} index={index} />)}
            </div>
          </div>
        </section>

        <section id="processo" ref={processRef} className="relative bg-background py-24 md:py-32">
          <div className="container-wide">
            <div className="mb-24 md:mb-32">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={processInView ? { opacity: 1, y: 0 } : {}} className="mb-6"><SectionMarker number="04" label="PROCESSO" /></motion.div>
              <AnimatedLine><h2 className="max-w-4xl text-5xl font-bold leading-[0.9] tracking-tight md:text-7xl">Do briefing à <span className="text-accent">presença.</span></h2></AnimatedLine>
            </div>
            <div className="relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="sticky top-32 mb-8 min-h-[50vh] last:mb-0" style={{ zIndex: index + 1 }}>
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group relative overflow-hidden border border-border bg-card shadow-2xl shadow-black/5">
                      <div className="absolute inset-x-0 top-0 z-20 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                      <div className="grid min-h-[400px] grid-cols-1 md:grid-cols-12">
                        <div className="flex items-start justify-between border-b border-border bg-secondary/10 p-8 md:col-span-2 md:flex-col md:border-b-0 md:border-r">
                          <span className="text-4xl font-bold text-foreground/20 transition-colors duration-300 group-hover:text-accent">{step.number}</span><div className="hidden h-16 w-px bg-foreground/10 md:block" />
                        </div>
                        <div className="relative z-10 flex flex-col justify-center bg-background p-8 md:col-span-6 md:p-12">
                          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform duration-500 group-hover:scale-110"><Icon size={32} strokeWidth={1.5} /></div>
                          <h3 className="mb-6 text-3xl font-bold transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">{step.title}</h3>
                          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{step.description}</p>
                        </div>
                        <div className="relative hidden overflow-hidden border-l border-border bg-secondary/5 md:col-span-4 md:block">
                          <div className="absolute inset-0 opacity-20"><div className={`absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[20px] border-foreground/5 ${index % 2 === 0 ? 'animate-spin-slow border-dashed' : 'animate-pulse-slow border-solid'}`} /></div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"><span className="whitespace-nowrap -rotate-90 font-mono text-xs uppercase tracking-[0.3em] text-accent">Fase {step.number}</span></div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={offersRef} className="relative overflow-hidden py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0">
            {[...Array(5)].map((_, index) => <motion.div key={index} className="absolute left-0 right-0 h-px bg-foreground/5" style={{ top: `${20 * (index + 1)}%` }} initial={{ scaleX: 0 }} animate={offersInView ? { scaleX: 1 } : {}} transition={{ delay: index * 0.1, duration: 1.5 }} />)}
          </div>
          <motion.div className="absolute right-20 top-20 hidden h-32 w-32 border border-accent/20 md:block" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute bottom-40 left-10 h-4 w-4 bg-accent/30" animate={{ y: [-20, 20, -20], rotate: [0, 45, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="container-wide relative z-10">
            <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={offersInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="mb-8"><SectionMarker number="05" label="SOLUÇÕES WEB" /></motion.div>
                <AnimatedLine delay={0.3}><h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.045em] md:text-6xl">Uma página para cada decisão que sua marca precisa facilitar.</h2></AnimatedLine>
              </div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={offersInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="max-w-md text-muted-foreground">O formato muda, mas a lógica é a mesma: mostrar valor com clareza e conduzir o visitante para uma próxima ação.</motion.p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {webOffers.map((offer, index) => <WebOfferCard key={offer.title} offer={offer} index={index} activeIndex={activeOffer} setActiveIndex={setActiveOffer} />)}
            </div>
          </div>
        </section>

        <WebTestimonials />

        <section ref={faqRef} className="relative overflow-hidden border-t border-border bg-secondary/30 py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0">{[...Array(5)].map((_, index) => <motion.div key={index} className="absolute left-0 right-0 h-px bg-foreground/5" style={{ top: `${20 * (index + 1)}%` }} initial={{ scaleX: 0 }} animate={faqInView ? { scaleX: 1 } : {}} transition={{ delay: index * 0.08, duration: 1.1 }} />)}</div>
          <motion.div initial={{ opacity: 0, rotate: -8, scale: 0.9 }} animate={faqInView ? { opacity: 0.04, rotate: 0, scale: 1 } : {}} transition={{ duration: 1 }} className="pointer-events-none absolute -right-10 top-16"><HelpCircle className="h-56 w-56 text-foreground md:h-72 md:w-72" strokeWidth={1} /></motion.div>
          <div className="container-wide relative z-10">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={faqInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="mb-10 md:mb-12"><SectionMarker number="07" label="FAQ" /></motion.div>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <motion.h2 initial={{ opacity: 0, y: 30 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-[-0.045em] md:text-6xl">Dúvidas antes de <span className="text-accent">tirar seu site do papel.</span></motion.h2>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.25 }} className="mt-8 border border-accent/30 bg-accent/5 p-6 md:mt-10 md:p-8">
                  <p className="text-2xl font-bold leading-tight md:text-3xl">Ainda está em dúvida? A conversa pode mostrar o que está travando sua presença hoje.</p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">Sem compromisso: você me conta o cenário e eu te digo qual caminho faz sentido.</p>
                  <div className="mt-7"><MagneticButton><a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click')} className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background md:text-base"><span className="relative z-10">Falar sobre meu projeto</span><motion.div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background/20" whileHover={{ rotate: 45 }}><ArrowUpRight className="h-4 w-4" /></motion.div><motion.div className="absolute inset-0 origin-bottom bg-accent" initial={{ scaleY: 0 }} whileHover={{ scaleY: 1 }} transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }} /></a></MagneticButton></div>
                </motion.div>
              </div>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="border border-border/60 bg-card/70 shadow-xl shadow-background/20 lg:col-span-7">
                <Accordion type="single" collapsible className="divide-y divide-border/60">
                  {faqItems.map((item, index) => <AccordionItem key={item.question} value={`item-${index}`} className="border-b-0"><AccordionTrigger className="px-5 py-5 text-left text-base font-bold hover:text-accent hover:no-underline md:px-7 md:py-6 md:text-lg"><span className="pr-5">{item.question}</span></AccordionTrigger><AccordionContent className="px-5 pb-6 text-base leading-relaxed text-muted-foreground md:px-7">{item.answer}</AccordionContent></AccordionItem>)}
                </Accordion>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-24 md:py-36">
          <div className="container-wide relative overflow-hidden bg-accent px-6 py-14 text-accent-foreground md:px-12 md:py-20">
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border-[40px] border-accent-foreground/10" />
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SectionMarker number="08" label="CONTATO" inverse />
                <h2 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.86] tracking-[-0.055em] md:text-7xl">Vamos criar uma presença que represente o tamanho da sua ideia.</h2>
              </div>
              <div className="lg:col-span-4 lg:pb-1">
                <p className="max-w-sm text-lg leading-relaxed text-accent-foreground/70">Me conte onde sua marca está hoje e o que esse site precisa destravar.</p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion('whatsapp_click')}
                  className="group mt-7 inline-flex items-center gap-3 bg-background px-6 py-4 font-semibold text-foreground transition-transform hover:-translate-y-1"
                >
                  <MessageCircle className="h-5 w-5 text-accent" />
                  Chamar no WhatsApp
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WebDesign;

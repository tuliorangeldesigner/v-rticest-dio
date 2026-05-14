import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { thumbnails } from '@/data/thumbnails';
import { esportLogos } from '@/data/esportLogos';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';
import { ArrowUpRight, ArrowRight, Images } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

const logoProjects = projects.filter((project) =>
  ['luminary', 'funk', 'voix', 'cascade', 'excellent-solucoes'].includes(project.id)
);
const socialMediaProjects = projects.filter((project) =>
  ['ethereal', 'zenith'].includes(project.id)
);
const siteProjects = projects.filter((project) =>
  ['naturis', 'orbits', 'elektra', 'amanda-felisbino'].includes(project.id)
);
const videoProjects = projects.filter((project) =>
  ['edicao-de-video'].includes(project.id)
);

const Projects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });


  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: (e.clientX - window.innerWidth / 2) / 30,
      y: (e.clientY - window.innerHeight / 2) / 30,
    });
  };

  return (
    <div className="min-h-screen bg-background" onMouseMove={handleMouseMove}>
      <SEO
        title="Projetos"
        description="Portfólio estratégico da TR Designer com cases de branding, presença digital e performance orientados para autoridade e conversão."
        url="/work"
      />
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Grid overlay */}
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

        {/* Floating shapes */}
        <motion.div
          className="absolute top-32 right-[10%] w-20 h-20 border border-accent/20"
          style={{ transform: 'rotate(45deg)', x: mousePosition.x * 2, y: mousePosition.y * 2 }}
        />
        <motion.div
          className="absolute bottom-20 left-[15%] w-32 h-32 rounded-full border border-accent/10"
          style={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
        />

        {/* Accent orb */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
          style={{ top: '20%', right: '10%', x: mousePosition.x * 3, y: mousePosition.y * 3 }}
        />

        <div className="container-wide relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-sm font-mono text-accent">01</span>
            <div className="h-px w-12 bg-accent" />
            <span className="text-sm font-mono text-muted-foreground tracking-wider">PORTFÓLIO</span>
          </motion.div>

          <div className="max-w-4xl">
            {['Projetos Que', 'Elevam Marcas.'].map((text, index) => (
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

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mt-8"
          >
            Cada projeto apresentado aqui passou por um processo estratégico de reprogramação de percepção, ambiente digital e conversão.
            <br />
            <br />
            Não são peças isoladas.
            <br />
            São sistemas implantados.
          </motion.p>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-wide">
          <div className="max-w-4xl text-muted-foreground text-lg leading-relaxed space-y-4">
            <p>Não trabalhamos com estética solta.</p>
            <p>
              Cada marca abaixo enfrentava um problema claro: baixa percepção de valor, ambiente digital fraco ou performance inconsistente.
            </p>
            <p>O que você verá aqui é o antes e depois estratégico.</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-wide">
          <div className="border border-foreground/10 bg-card overflow-hidden">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-5 p-6 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-foreground/10 flex flex-col justify-between gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-mono text-accent">02</span>
                    <div className="h-px w-12 bg-accent" />
                    <span className="text-sm font-mono text-muted-foreground tracking-wider">LOGOS</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold leading-tight mb-6">
                    Identidades Visuais Para Marcas Premium.
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                    Projetos de logo e identidade reunidos em uma área só, para o lead encontrar rapidamente os cases de marca, símbolo e reposicionamento visual.
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6 pt-6 border-t border-foreground/10">
                  <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-foreground/60">
                    <Images className="w-5 h-5 text-accent" />
                    {logoProjects.length} cases
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest text-foreground/70">
                    Branding
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-4 md:p-6 bg-foreground/[0.03]">
                <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
                  {logoProjects.map((project, index) => (
                    <Link
                      key={project.id}
                      to={`/work/${project.id}`}
                      className="group relative overflow-hidden border border-foreground/10 bg-background"
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute left-3 top-3 px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-background/90 text-foreground border border-foreground/10">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 block mb-2">
                          {project.category}
                        </span>
                        <div className="flex items-end justify-between gap-3">
                          <h3 className="text-xl md:text-2xl font-syne font-bold text-white leading-tight group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="pb-20">
        <div className="container-wide">
          <div className="border border-foreground/10 bg-card overflow-hidden">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-5 p-6 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-foreground/10 flex flex-col justify-between gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-mono text-accent">03</span>
                    <div className="h-px w-12 bg-accent" />
                    <span className="text-sm font-mono text-muted-foreground tracking-wider">SOCIAL MEDIA</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold leading-tight mb-6">
                    Criativos Para Conteúdo e Conversão.
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                    Projetos de social media organizados para o lead encontrar rapidamente exemplos de posts, direção criativa e comunicação visual pensada para gerar atenção e resposta.
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6 pt-6 border-t border-foreground/10">
                  <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-foreground/60">
                    <Images className="w-5 h-5 text-accent" />
                    {socialMediaProjects.length} cases
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest text-foreground/70">
                    Conteúdo
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-4 md:p-6 bg-foreground/[0.03]">
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {socialMediaProjects.map((project, index) => (
                    <Link
                      key={project.id}
                      to={`/work/${project.id}`}
                      className="group relative overflow-hidden border border-foreground/10 bg-background"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute left-3 top-3 px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-background/90 text-foreground border border-foreground/10">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 block mb-2">
                          {project.category}
                        </span>
                        <div className="flex items-end justify-between gap-3">
                          <h3 className="text-2xl md:text-3xl font-syne font-bold text-white leading-tight group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="pb-20">
        <div className="container-wide">
          <div className="border border-foreground/10 bg-card overflow-hidden">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-5 p-6 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-foreground/10 flex flex-col justify-between gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-mono text-accent">04</span>
                    <div className="h-px w-12 bg-accent" />
                    <span className="text-sm font-mono text-muted-foreground tracking-wider">SITES E LANDING PAGES</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold leading-tight mb-6">
                    Páginas Criadas Para Converter Interesse em Ação.
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                    Sites, landing pages e portfólios reunidos em uma seção direta, para o lead avaliar rapidamente estrutura, estética, narrativa e experiência digital.
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6 pt-6 border-t border-foreground/10">
                  <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-foreground/60">
                    <Images className="w-5 h-5 text-accent" />
                    {siteProjects.length} cases
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest text-foreground/70">
                    Web Design
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-4 md:p-6 bg-foreground/[0.03]">
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {siteProjects.map((project, index) => (
                    <Link
                      key={project.id}
                      to={`/work/${project.id}`}
                      className="group relative overflow-hidden border border-foreground/10 bg-background"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute left-3 top-3 px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-background/90 text-foreground border border-foreground/10">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 block mb-2">
                          {project.category}
                        </span>
                        <div className="flex items-end justify-between gap-3">
                          <h3 className="text-2xl md:text-3xl font-syne font-bold text-white leading-tight group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="pb-20">
        <div className="container-wide">
          <div className="border border-foreground/10 bg-card overflow-hidden">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-5 p-6 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-foreground/10 flex flex-col justify-between gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-mono text-accent">05</span>
                    <div className="h-px w-12 bg-accent" />
                    <span className="text-sm font-mono text-muted-foreground tracking-wider">EDIÇÃO DE VÍDEO E MOTION</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold leading-tight mb-6">
                    Vídeos Criados Para Reter Atenção e Gerar Resposta.
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                    Uma área dedicada aos projetos de edição, motion design e criativos em vídeo, para o lead encontrar rapidamente exemplos de ritmo, narrativa e acabamento visual.
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6 pt-6 border-t border-foreground/10">
                  <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-foreground/60">
                    <Images className="w-5 h-5 text-accent" />
                    {videoProjects.length} case
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest text-foreground/70">
                    Motion
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-4 md:p-6 bg-foreground/[0.03]">
                <div className="grid gap-3 md:gap-4">
                  {videoProjects.map((project, index) => (
                    <Link
                      key={project.id}
                      to={`/work/${project.id}`}
                      className="group relative overflow-hidden border border-foreground/10 bg-background"
                    >
                      <div className="aspect-[21/9] overflow-hidden">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute left-3 top-3 px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-background/90 text-foreground border border-foreground/10">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 block mb-2">
                          {project.category}
                        </span>
                        <div className="flex items-end justify-between gap-3">
                          <h3 className="text-2xl md:text-4xl font-syne font-bold text-white leading-tight group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="w-6 h-6 text-white/70 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="pb-20">
        <div className="container-wide">
          <Link
            to="/thumbnail"
            className="group block border border-foreground/10 bg-card overflow-hidden hover:border-accent/60 transition-colors duration-500"
          >
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-5 p-6 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-foreground/10 flex flex-col justify-between gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-mono text-accent">06</span>
                    <div className="h-px w-12 bg-accent" />
                    <span className="text-sm font-mono text-muted-foreground tracking-wider">THUMBNAILS</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold leading-tight mb-6 group-hover:text-accent transition-colors duration-300">
                    Thumbnails Que Vendem o Clique.
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                    Uma galeria dedicada a thumbnails criadas para parar o scroll, sintetizar promessa e aumentar intenção de clique antes mesmo do conteúdo começar.
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6 pt-6 border-t border-foreground/10">
                  <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-foreground/60">
                    <Images className="w-5 h-5 text-accent" />
                    {thumbnails.length} peças
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    Ver Página <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-4 md:p-6 bg-foreground/[0.03]">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {thumbnails.slice(0, 4).map((thumb, index) => (
                    <div
                      key={thumb.id}
                      className={`relative overflow-hidden border border-foreground/10 bg-background ${
                        index === 0 ? 'sm:row-span-2' : ''
                      }`}
                    >
                      <div className={index === 0 ? 'aspect-[16/11] sm:h-full' : 'aspect-video'}>
                        <img
                          src={thumb.src}
                          alt={thumb.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute left-3 top-3 px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-background/90 text-foreground border border-foreground/10">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>


      <section className="pb-20">
        <div className="container-wide">
          <Link to="/logos-e-sport" className="group block border border-foreground/10 bg-card overflow-hidden hover:border-accent/60 transition-colors duration-500">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-5 p-6 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-foreground/10 flex flex-col justify-between gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-mono text-accent">07</span>
                    <div className="h-px w-12 bg-accent" />
                    <span className="text-sm font-mono text-muted-foreground tracking-wider">LOGOS E-SPORT</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold leading-tight mb-6">
                    Marcas Para Times, Players e Projetos Competitivos.
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                    Logos e-sport reunidas em uma seção própria para facilitar a avaliação de símbolo, impacto visual, personalidade e presença competitiva.
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6 pt-6 border-t border-foreground/10">
                  <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-foreground/60">
                    <Images className="w-5 h-5 text-accent" />
                    {esportLogos.length} logos
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    Ver Página <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-4 md:p-6 bg-foreground/[0.03]">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                  {esportLogos.slice(0, 6).map((logo, index) => (
                    <div
                      key={logo.id}
                      className="group relative overflow-hidden border border-foreground/10 bg-background text-left"
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={logo.src}
                          alt={logo.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                      <div className="absolute left-3 top-3 px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-background/90 text-foreground border border-foreground/10">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-foreground/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
              Sua Marca Pode Ser a Próxima Operação.
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-10">
              Se sua empresa está pronta para deixar de parecer comum e assumir posicionamento estratégico, o próximo passo é diagnóstico.
              <br />
              <br />
              Projetos são selecionados com base em alinhamento e potencial de crescimento.
            </p>
            <MagneticButton>
              <Link 
                to="/contact" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full"
              >
                Agendar Diagnóstico Estratégico
                <motion.div
                  className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center"
                  whileHover={{ rotate: 45 }}
                >
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

export default Projects;

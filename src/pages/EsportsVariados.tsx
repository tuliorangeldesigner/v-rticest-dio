import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Crosshair, Trophy, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ConditionalCustomCursor from '@/components/ConditionalCustomCursor';
import { esportsVariados } from '@/data/esportsVariados';

const EsportsVariados = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activeImage]);

  return (
    <div className="min-h-screen bg-background selection:bg-accent/20 flex flex-col">
      <SEO
        title="E-Sports Variados"
        description="Criativos para e-sports, campeonatos, players e comunidades gamer que precisam parecer profissionais antes do primeiro clique."
        url="/e-sports-variados"
      />
      <Navigation />
      <ConditionalCustomCursor />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50" style={{ scaleX }} />

      <main className="flex-1 pt-24 md:pt-32">
        <section className="container-wide max-w-[90rem] mx-auto px-4 sm:px-6 mb-20">
          <div className="border border-foreground/10 bg-background relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-foreground/10">
              <div className="col-span-1 lg:col-span-3 p-6 border-b lg:border-b-0 lg:border-r border-foreground/10 flex items-center">
                <Link to="/" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-accent transition-colors">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Voltar para Home
                </Link>
                <span className="mx-4 text-foreground/20">/</span>
                <span className="text-sm text-foreground/40 uppercase tracking-wider">Gaming visual</span>
              </div>

              <div className="col-span-1 p-6 flex items-center justify-between lg:justify-center text-sm font-medium text-foreground/80">
                <span className="lg:hidden text-foreground/40 uppercase tracking-wider">Arquivo</span>
                <div className="flex items-center gap-2 font-mono">
                  {String(esportsVariados.length).padStart(2, '0')} ARTES
                </div>
              </div>
            </div>

            <div className="p-6 md:p-12 lg:p-16 border-b border-foreground/10">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-mono uppercase tracking-widest text-accent block mb-6"
              >
                E-Sports Variados
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-epic font-bold leading-[1.05] tracking-tight text-foreground uppercase"
              >
                Artes Para Quem Precisa Parecer Grande Antes da Partida Começar.
              </motion.h1>

              <div className="mt-8 md:mt-12 grid gap-8 lg:grid-cols-12">
                <p className="lg:col-span-7 text-lg md:text-xl text-foreground/60 leading-relaxed">
                  No e-sports, visual amador custa atenção, respeito e oportunidade. O público decide em segundos se
                  um campeonato, player ou comunidade parece sério o suficiente para seguir, assistir, entrar no
                  servidor ou clicar na próxima chamada.
                </p>
                <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
                  {[
                    ['01', 'Presença de torneio'],
                    ['02', 'Criativo para player'],
                    ['03', 'Leitura em thumbnail'],
                    ['04', 'Impacto de comunidade'],
                  ].map(([number, label]) => (
                    <div key={number} className="bg-background p-5">
                      <span className="block text-accent font-mono text-xs mb-3">{number}</span>
                      <span className="text-sm font-syne font-bold leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[50vh]">
              <aside className="lg:col-span-3 border-r border-foreground/10 bg-background">
                <div className="sticky top-24">
                  <div className="p-6 border-b border-foreground/10">
                    <Crosshair className="w-6 h-6 text-accent mb-5" />
                    <h2 className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 mb-4">Dor do nicho</h2>
                    <p className="text-lg font-syne font-bold leading-tight">
                      A cena é competitiva. Quem parece improvisado perde confiança antes de mostrar habilidade.
                    </p>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 mb-4">Aplicações</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Torneios', 'Players', 'Times', 'Lives', 'Discord', 'Anuncios'].map((item) => (
                        <span
                          key={item}
                          className="inline-block px-3 py-1 border border-foreground/10 text-[11px] font-mono uppercase tracking-wide rounded-sm text-foreground/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              <section className="lg:col-span-9 p-4 md:p-8 lg:p-12">
                <div className="mb-10 max-w-3xl">
                  <span className="text-xs font-mono uppercase tracking-widest text-foreground/40 block mb-3">Impacto competitivo</span>
                  <h2 className="text-3xl md:text-4xl font-syne font-bold mb-5">Visual que faz o projeto ser levado a sério</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Se a sua comunicação gamer não transmite energia, organização e profissionalismo, ela vira só mais
                    uma arte passando no feed. Esta seleção mostra caminhos visuais para criar desejo de participação,
                    aumentar percepção de valor e dar cara de evento grande mesmo antes do primeiro resultado.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                  {esportsVariados.map((item, index) => (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveImage(item.src)}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.18) }}
                      className="group block w-full text-left border border-foreground/10 bg-foreground/5 hover:border-accent/60 transition-colors overflow-hidden"
                      aria-label={`Ver ${item.title} em tamanho completo`}
                    >
                      <div className="relative aspect-square w-full bg-black overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.title}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          fetchPriority={index === 0 ? 'high' : 'auto'}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                        <div className="absolute left-3 top-3 px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-background/90 text-foreground border border-foreground/10">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-16 bg-accent text-accent-foreground p-8 md:p-12 rounded-sm">
                  <div className="grid gap-8 md:grid-cols-12 md:items-start">
                    <div className="md:col-span-4">
                      <Trophy className="w-8 h-8 mb-5" />
                      <span className="text-xs font-mono uppercase tracking-widest font-bold opacity-70">Insight competitivo</span>
                    </div>
                    <p className="md:col-span-8 text-xl md:text-2xl font-syne font-bold leading-snug">
                      Em e-sports, bom design não é enfeite. É o sinal visual que diz: este projeto tem estrutura, comunidade e motivo para receber atenção.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="border-t border-foreground/10 bg-foreground/5 py-20">
          <div className="container-wide max-w-[90rem] mx-auto px-4 sm:px-6">
            <Link
              to="/contact"
              className="group block border border-foreground/10 bg-background p-8 hover:border-accent transition-colors relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Próximo round</div>
                  <h2 className="text-3xl md:text-5xl font-syne font-bold leading-tight mb-4">
                    Criar uma presença gamer que não pareça amadora.
                  </h2>
                  <p className="text-foreground/60 max-w-2xl">
                    Para torneios, players, streamers e comunidades que precisam ganhar confiança antes do clique.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                  Solicitar Projeto <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {activeImage && (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm px-4 py-8 md:p-10 flex items-center justify-center"
          onClick={() => setActiveImage(null)}
        >
          <div className="w-full max-w-[1100px]" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-foreground/70">
                Visualização completa
              </span>
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="h-9 w-9 border border-foreground/20 bg-background/70 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                aria-label="Fechar imagem"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="w-full border border-foreground/15 bg-black flex items-center justify-center p-2 md:p-3">
              <img
                src={activeImage}
                alt="Arte de e-sports em tamanho completo"
                className="max-h-[82vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default EsportsVariados;

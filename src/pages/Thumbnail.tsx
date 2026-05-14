import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import CustomCursor from '@/components/CustomCursor';
import { thumbnails } from '@/data/thumbnails';

const Thumbnail = () => {
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
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
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
        title="Thumbnails"
        description="Galeria de thumbnails criadas para capturar atenção, comunicar valor em segundos e transformar o primeiro impacto visual em clique."
        url="/thumbnail"
      />
      <Navigation />
      <CustomCursor />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      <main className="flex-1 pt-24 md:pt-32">
        <section className="container-wide max-w-[90rem] mx-auto px-4 sm:px-6 mb-20">
          <div className="border border-foreground/10 bg-background relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-foreground/10">
              <div className="col-span-1 lg:col-span-3 p-6 border-b lg:border-b-0 lg:border-r border-foreground/10 flex items-center">
                <Link to="/work" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-accent transition-colors">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Voltar para Projetos
                </Link>
                <span className="mx-4 text-foreground/20">/</span>
                <span className="text-sm text-foreground/40 uppercase tracking-wider">Criativos de atenção</span>
              </div>

              <div className="col-span-1 p-6 flex items-center justify-between lg:justify-center text-sm font-medium text-foreground/80">
                <span className="lg:hidden text-foreground/40 uppercase tracking-wider">Arquivo</span>
                <div className="flex items-center gap-2 font-mono">
                  {String(thumbnails.length).padStart(2, '0')} PEÇAS
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-12 p-6 md:p-12 lg:p-16 border-b border-foreground/10">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xs font-mono uppercase tracking-widest text-accent block mb-6"
                >
                  Thumbnail Design
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-epic font-bold leading-[1.05] tracking-tight text-foreground uppercase"
                >
                  Thumbnails Que Vendem o Clique.
                </motion.h1>

                <div className="mt-8 md:mt-12 grid gap-8 lg:grid-cols-12">
                  <p className="lg:col-span-7 text-lg md:text-xl text-foreground/60 leading-relaxed">
                    Thumbnail não é capa bonita. É uma decisão visual tomada antes do conteúdo começar.
                    A composição precisa organizar promessa, contraste, expressão, leitura rápida e desejo
                    em poucos segundos, porque o clique acontece antes da explicação.
                  </p>
                  <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
                    {[
                      ['01', 'Atenção imediata'],
                      ['02', 'Leitura rápida'],
                      ['03', 'Promessa clara'],
                      ['04', 'Cliques qualificados'],
                    ].map(([number, label]) => (
                      <div key={number} className="bg-background p-5">
                        <span className="block text-accent font-mono text-xs mb-3">{number}</span>
                        <span className="text-sm font-syne font-bold leading-tight">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[50vh]">
              <aside className="lg:col-span-3 border-r border-foreground/10 bg-background">
                <div className="sticky top-24">
                  <div className="p-6 border-b border-foreground/10">
                    <h2 className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 mb-4">Direção</h2>
                    <p className="text-lg font-syne font-bold leading-tight">
                      Criativos pensados para parar o scroll e aumentar intenção de clique.
                    </p>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 mb-4">Escopo</h3>
                    <div className="flex flex-wrap gap-2">
                      {['YouTube', 'Gaming', 'Social Media', 'Retenção', 'CTR'].map((item) => (
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

              <section className="lg:col-span-9 p-6 md:p-12 lg:p-16">
                <div className="mb-12 max-w-3xl">
                  <span className="text-xs font-mono uppercase tracking-widest text-foreground/40 block mb-3">Arquivo Visual</span>
                  <h2 className="text-3xl md:text-4xl font-syne font-bold mb-5">Galeria de Thumbnails</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Cada peça abaixo trabalha hierarquia agressiva, contraste e leitura instantânea para transformar
                    uma ideia em uma imagem que compete no feed, na busca e na recomendação.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {thumbnails.map((thumb, index) => (
                    <motion.button
                      key={thumb.id}
                      type="button"
                      onClick={() => setActiveImage(thumb.src)}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.25) }}
                      className="group text-left relative overflow-hidden border border-foreground/10 bg-foreground/5"
                      aria-label={`Ver ${thumb.title} em tamanho completo`}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={thumb.src}
                          alt={thumb.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-4 py-2 bg-background text-foreground text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          Ver Completo
                        </span>
                      </div>
                      <div className="absolute left-3 top-3 px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-background/90 text-foreground border border-foreground/10">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-20 bg-accent text-accent-foreground p-8 md:p-12 rounded-sm">
                  <div className="grid gap-8 md:grid-cols-12 md:items-start">
                    <div className="md:col-span-4">
                      <span className="text-3xl md:text-4xl font-syne font-black block leading-none mb-2">Insight</span>
                      <span className="text-xs font-mono uppercase tracking-widest font-bold opacity-70">Estratégia visual</span>
                    </div>
                    <p className="md:col-span-8 text-xl md:text-2xl font-syne font-bold leading-snug">
                      Uma thumbnail forte reduz o tempo entre curiosidade e clique. Ela não conta tudo: ela cria tensão suficiente para a pessoa querer ver.
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
                  <div className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Próximo passo</div>
                  <h2 className="text-3xl md:text-5xl font-syne font-bold leading-tight mb-4">
                    Criar thumbnails para sua operação.
                  </h2>
                  <p className="text-foreground/60 max-w-2xl">
                    Se o conteúdo já existe, a thumbnail pode ser o gargalo entre publicação e performance.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                  Solicitar Diagnóstico <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
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
          <div className="w-full max-w-[1200px]" onClick={(event) => event.stopPropagation()}>
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
                alt="Thumbnail em tamanho completo"
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

export default Thumbnail;


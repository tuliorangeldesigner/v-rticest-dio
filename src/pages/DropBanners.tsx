import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingBag, Target, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ConditionalCustomCursor from '@/components/ConditionalCustomCursor';
import { dropBannerCount, dropBannerGroups } from '@/data/dropBanners';
import { useCarouselImagePreload } from '@/lib/useCarouselImagePreload';

const DropBanners = () => {
  const [activeGallery, setActiveGallery] = useState<{ groupIndex: number; imageIndex: number } | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const changeImage = useCallback((direction: number) => {
    setActiveGallery((current) => {
      if (!current) return null;
      const images = dropBannerGroups[current.groupIndex].images;
      return { ...current, imageIndex: (current.imageIndex + direction + images.length) % images.length };
    });
  }, []);
  const showPrevious = useCallback(() => changeImage(-1), [changeImage]);
  const showNext = useCallback(() => changeImage(1), [changeImage]);
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
    if (!activeGallery) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveGallery(null);
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeGallery, showNext, showPrevious]);

  const activeGroup = activeGallery ? dropBannerGroups[activeGallery.groupIndex] : null;
  const activeImage = activeGallery && activeGroup ? activeGroup.images[activeGallery.imageIndex] : null;
  const carouselSources = useMemo(
    () => activeGroup?.images.map((image) => image.src) ?? dropBannerGroups.flatMap((group) => group.images.map((image) => image.src)),
    [activeGroup],
  );
  useCarouselImagePreload(carouselSources, activeGallery?.imageIndex ?? null);

  return (
    <div className="min-h-screen bg-background selection:bg-accent/20 flex flex-col">
      <SEO
        title="Banners E-commerce e Dropshipping"
        description="Banners de e-commerce e dropshipping criados para destacar produto, oferta e urgência com leitura rápida e foco em conversão."
        url="/banners-ecommerce-dropshipping"
      />
      <Navigation />
      <ConditionalCustomCursor />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50" style={{ scaleX }} />

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
                <span className="text-sm text-foreground/40 uppercase tracking-wider">Criativos de venda</span>
              </div>

              <div className="col-span-1 p-6 flex items-center justify-between lg:justify-center text-sm font-medium text-foreground/80">
                <span className="lg:hidden text-foreground/40 uppercase tracking-wider">Arquivo</span>
                <div className="flex items-center gap-2 font-mono">
                  {String(dropBannerCount).padStart(2, '0')} BANNERS
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
                E-commerce / Dropshipping
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-epic font-bold leading-[1.05] tracking-tight text-foreground uppercase"
              >
                Banners Que Transformam Produto em Desejo de Compra.
              </motion.h1>

              <div className="mt-8 md:mt-12 grid gap-8 lg:grid-cols-12">
                <p className="lg:col-span-7 text-lg md:text-xl text-foreground/60 leading-relaxed">
                  No e-commerce, o cliente decide rápido: parar, comparar ou comprar. Cada banner precisa vender
                  benefício antes do preço, destacar a oferta sem poluir a tela e criar uma percepção de produto
                  mais desejável nos primeiros segundos.
                </p>
                <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
                  {[
                    ['01', 'Produto em evidência'],
                    ['02', 'Oferta com leitura rápida'],
                    ['03', 'Hierarquia para anúncio'],
                    ['04', 'Visual pronto para vender'],
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
                    <h2 className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 mb-4">Direção</h2>
                    <p className="text-lg font-syne font-bold leading-tight">
                      Criativos pensados para loja virtual, campanha de produto e operação de dropshipping.
                    </p>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 mb-4">Foco</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Oferta', 'Produto', 'Anúncio', 'Conversão', 'Vitrine'].map((item) => (
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
                  <span className="text-xs font-mono uppercase tracking-widest text-foreground/40 block mb-3">Banners que vendem</span>
                  <h2 className="text-3xl md:text-4xl font-syne font-bold mb-5">Criativos prontos para aumentar o clique</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Se o seu ecommerce perde atencao porque a oferta parece comum, o produto nao se destaca e o banner
                    nao conduz ao clique, aqui voce encontra pecas pensadas para transformar vitrines, lancamentos e
                    promocoes em chamadas comerciais claras, desejaveis e prontas para vender mais.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 md:gap-8">
                  {dropBannerGroups.map((group, index) => (
                    <motion.button
                      key={group.slug}
                      type="button"
                      onClick={() => setActiveGallery({ groupIndex: index, imageIndex: 0 })}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.18) }}
                      className="group block w-full text-left border border-foreground/10 bg-foreground/5 hover:border-accent/60 transition-colors overflow-hidden"
                      aria-label={`Ver galeria ${group.title}`}
                    >
                      <div className="relative aspect-[4/3] w-full bg-black overflow-hidden">
                        <img
                          src={group.cover?.src}
                          alt={`Banner da coleção ${group.title}`}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          fetchpriority={index === 0 ? 'high' : 'auto'}
                          className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-16 text-white">
                          <div>
                            <span className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-white/60">
                              {String(group.images.length).padStart(2, '0')} imagens
                            </span>
                            <span className="text-xl font-syne font-bold">{group.title}</span>
                          </div>
                          <span className="border border-white/40 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                            Ver
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-16 bg-accent text-accent-foreground p-8 md:p-12 rounded-sm">
                  <div className="grid gap-8 md:grid-cols-12 md:items-start">
                    <div className="md:col-span-4">
                      <span className="text-3xl md:text-4xl font-syne font-black block leading-none mb-2">Insight</span>
                      <span className="text-xs font-mono uppercase tracking-widest font-bold opacity-70">Criativo comercial</span>
                    </div>
                    <p className="md:col-span-8 text-xl md:text-2xl font-syne font-bold leading-snug">
                      Banner forte não só mostra o produto. Ele organiza motivo de compra, percepção de valor e ação em uma imagem que vende antes do clique.
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
                    Criar banners para vender mais na sua loja.
                  </h2>
                  <p className="text-foreground/60 max-w-2xl">
                    Para produtos que precisam sair da vitrine comum e ganhar criativos com mais desejo, clareza e resposta.
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

      {activeGallery && activeGroup && activeImage && (
        <div
          className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-sm p-3 md:p-10 flex items-center justify-center"
          onClick={() => setActiveGallery(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria ${activeGroup.title}`}
        >
          <div className="w-full max-w-[1200px]" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-white/70">
                {activeGroup.title} · {activeGallery.imageIndex + 1} de {activeGroup.images.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveGallery(null)}
                className="h-10 w-10 border border-white/20 bg-black/60 text-white flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                aria-label="Fechar imagem"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div
              className="relative w-full border border-white/15 bg-black flex items-center justify-center p-1 md:p-3"
              onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
              onTouchEnd={(event) => {
                if (touchStart === null) return;
                const distance = touchStart - event.changedTouches[0].clientX;
                if (Math.abs(distance) > 45) {
                  if (distance > 0) showNext();
                  else showPrevious();
                }
                setTouchStart(null);
              }}
            >
              <img
                src={activeImage.src}
                alt={`Banner ${activeGallery.imageIndex + 1} da coleção ${activeGroup.title}`}
                decoding="sync"
                fetchPriority="high"
                className="max-h-[78vh] w-auto max-w-full select-none object-contain"
              />
              {activeGroup.images.length > 1 && (
                <>
                  <button type="button" onClick={showPrevious} className="absolute left-2 md:left-4 h-11 w-11 rounded-full border border-white/30 bg-black/65 text-white flex items-center justify-center hover:border-accent hover:text-accent transition-colors" aria-label="Imagem anterior">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={showNext} className="absolute right-2 md:right-4 h-11 w-11 rounded-full border border-white/30 bg-black/65 text-white flex items-center justify-center hover:border-accent hover:text-accent transition-colors" aria-label="Próxima imagem">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DropBanners;

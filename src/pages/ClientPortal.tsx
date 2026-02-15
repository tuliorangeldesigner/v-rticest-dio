import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Lock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { getClientPortalBySlug, type PortalSectionKey } from '@/data/clientPortal';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://verticestudio.vercel.app').replace(/\/$/, '');

const sectionLabels: Record<PortalSectionKey, string> = {
  'visao-geral': 'Visão Geral',
  conceito: 'Conceito',
  manual: 'Manual',
  aplicacoes: 'Aplicações',
  mockups: 'Mockups',
  downloads: 'Downloads',
};

const ClientPortal = () => {
  const { slug } = useParams<{ slug: string }>();
  const portal = getClientPortalBySlug(slug || '');
  const [activeSection, setActiveSection] = useState<PortalSectionKey>('visao-geral');

  const activeContent = useMemo(() => {
    if (!portal) return [];
    switch (activeSection) {
      case 'visao-geral':
        return portal.overview;
      case 'conceito':
        return portal.conceito;
      case 'manual':
        return portal.manual;
      case 'aplicacoes':
        return portal.aplicacoes;
      case 'mockups':
        return portal.mockups;
      default:
        return [];
    }
  }, [activeSection, portal]);

  if (!portal) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <SEO
          title="Portal do Cliente"
          description="Área privada de acompanhamento e entrega de projeto."
          url={`${SITE_URL}/portal`}
          robots="noindex, nofollow"
        />
        <main className="flex-1 flex items-center justify-center pt-28">
          <div className="container-wide text-center border border-border bg-card/30 p-10 md:p-14 max-w-2xl">
            <p className="text-xs font-mono tracking-widest text-accent mb-4">PORTAL PRIVADO</p>
            <h1 className="font-epic text-4xl md:text-6xl leading-[1.05] mb-4 uppercase">Link Inválido</h1>
            <p className="text-muted-foreground mb-8">
              Este portal não foi encontrado. Verifique o link enviado ou solicite um novo acesso.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full">
              Voltar ao Site
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SEO
        title={`Portal do Cliente | ${portal.clientName}`}
        description={`Acompanhamento e entregas do projeto ${portal.projectName}.`}
        url={`${SITE_URL}/portal/${portal.slug}`}
        robots="noindex, nofollow"
      />

      <main className="pt-32 pb-20">
        <section className="container-wide mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-border bg-card/30 p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-xs font-mono tracking-widest text-accent mb-4">PORTAL DO CLIENTE</p>
                <h1 className="font-epic text-4xl sm:text-5xl md:text-7xl leading-[1.05] uppercase">
                  {portal.clientName}
                </h1>
                <p className="text-lg text-muted-foreground mt-4">{portal.projectName}</p>
              </div>
              <div className="flex flex-col gap-2 text-sm font-mono">
                <span className="text-foreground/70">Status: <strong className="text-foreground">{portal.status}</strong></span>
                <span className="text-foreground/70">Atualização: <strong className="text-foreground">{portal.updatedAt}</strong></span>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="container-wide mb-8">
          <div className="border border-border bg-background">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-border">
              {(Object.keys(sectionLabels) as PortalSectionKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`h-14 px-4 text-xs sm:text-sm font-mono uppercase tracking-wider transition-colors ${
                    activeSection === key
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card'
                  }`}
                >
                  {sectionLabels[key]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {portal.coverImage ? (
          <section className="container-wide mb-12">
            <motion.figure
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="border border-border bg-card/20 overflow-hidden"
            >
              <img
                src={portal.coverImage}
                alt={`Identidade visual ${portal.clientName}`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.figure>
          </section>
        ) : null}

        {activeSection !== 'downloads' ? (
          <section className="container-wide">
            <motion.article
              key={activeSection}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto max-w-4xl"
            >
              <div className="w-16 h-px bg-accent mb-8" />
              <h2 className="font-syne text-3xl md:text-5xl font-bold mb-8">
                {sectionLabels[activeSection]}
              </h2>
              <div className="space-y-7">
                {activeContent.map((item, index) => (
                  <p
                    key={item}
                    className={`leading-[1.9] text-lg ${
                      index === 0 ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </motion.article>
          </section>
        ) : (
          <section className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="border border-border bg-card/20 p-8 md:p-12"
            >
              <h2 className="font-syne text-2xl md:text-4xl font-bold mb-8">Downloads</h2>
              <div className="space-y-4">
                {portal.downloads.map((file) => (
                  <div
                    key={file.label}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-border/60 p-5 bg-background/70"
                  >
                    <div>
                      <p className="font-syne text-xl font-bold">{file.label}</p>
                      <p className="text-muted-foreground">{file.description}</p>
                    </div>
                    {file.unlocked ? (
                      <a
                        href={file.href}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-foreground text-background rounded-full text-sm font-semibold"
                      >
                        Baixar
                        <Download className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-muted-foreground rounded-full text-sm font-semibold"
                      >
                        Disponível após pagamento final
                        <Lock className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ClientPortal;

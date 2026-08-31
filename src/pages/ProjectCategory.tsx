import { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, Copy, Images } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { projects } from '@/data/projects';
import { newLogoProjectIds } from '@/data/newLogoProjects';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.tuliorangeldesigner.com.br').replace(/\/$/, '');

const categoryGroups = {
  logos: {
    label: 'LOGOS',
    title: 'Logos e Identidade Visual',
    seoTitle: 'Projetos de Logos e Identidade Visual',
    description:
      'Projetos de marca, símbolo e identidade visual para clientes que precisam avaliar posicionamento, presença e acabamento premium.',
    ids: [
      'luminary',
      'funk',
      'voix',
      'lx-company',
      'cathome',
      'coringa-cga',
      'picaro',
      'cascade',
      'excellent-solucoes',
      ...newLogoProjectIds,
    ],
    format: 'portrait',
  },
  sites: {
    label: 'SITES',
    title: 'Sites e Landing Pages',
    seoTitle: 'Projetos de Sites, Landing Pages e Portfólios',
    description:
      'Sites, landing pages e portfólios reunidos em uma área direta para avaliar estrutura, narrativa, estética e experiência digital.',
    ids: ['larroyd-studios', 'naturis', 'orbits', 'elektra', 'poema-cru', 'lucas-portfolio', 'amanda-felisbino'],
    format: 'landscape',
  },
  'social-media': {
    label: 'SOCIAL',
    title: 'Social Media e Criativos',
    seoTitle: 'Projetos de Social Media e Criativos',
    description:
      'Criativos, posts e direção visual para marcas que precisam chamar atenção, comunicar com clareza e gerar resposta.',
    ids: ['ethereal', 'zenith', 'burger-zone', 'acaini', 'live-crypto', 'variados'],
    format: 'square',
  },
  video: {
    label: 'VIDEO',
    title: 'Edição de Vídeo e Motion',
    seoTitle: 'Projetos de Edição de Vídeo e Motion Design',
    description:
      'Projetos de edição, ritmo e motion design para mostrar acabamento, retenção e narrativa visual em movimento.',
    ids: ['edicao-de-video'],
    format: 'wide',
  },
} as const;

type CategorySlug = keyof typeof categoryGroups;

const isCategorySlug = (slug: string | undefined): slug is CategorySlug =>
  Boolean(slug && slug in categoryGroups);

const aspectByFormat = {
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[16/10]',
  square: 'aspect-[4/3]',
  wide: 'aspect-[21/9]',
};

const ProjectCategory = () => {
  const location = useLocation();
  const { category } = useParams();
  const pathCategory = location.pathname.split('/').filter(Boolean).pop();
  const activeCategory = isCategorySlug(category)
    ? category
    : isCategorySlug(pathCategory)
      ? pathCategory
      : 'logos';
  const group = categoryGroups[activeCategory];

  const categoryProjects = useMemo(
    () => group.ids.map((id) => projects.find((project) => project.id === id)).filter(Boolean),
    [group.ids]
  );

  const sharePath = `/work/${activeCategory}`;
  const shareUrl = `${SITE_URL}${sharePath}`;
  const previewImage = categoryProjects[0]?.thumbnail ?? '/dc2-social.jpg';
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: group.seoTitle,
    description: group.description,
    url: shareUrl,
    inLanguage: 'pt-BR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'TR Designer',
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categoryProjects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project?.title,
        url: `${SITE_URL}/work/${project?.id}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={group.seoTitle}
        description={group.description}
        image={previewImage}
        url={sharePath}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Projetos', url: `${SITE_URL}/work` },
          { name: group.title, url: shareUrl },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>
      <Navigation />

      <section className="pt-32 pb-14 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, index) => (
            <div
              key={`line-${index}`}
              className="absolute left-0 right-0 h-px bg-foreground/5"
              style={{ top: `${16.66 * (index + 1)}%` }}
            />
          ))}
        </div>

        <div className="container-wide relative z-10">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao portfolio
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-mono text-accent">LINK DIRETO</span>
                <div className="h-px w-12 bg-accent" />
                <span className="text-sm font-mono text-muted-foreground tracking-wider">{group.label}</span>
              </div>
              <h1 className="font-epic font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.02]">
                {group.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mt-8 leading-relaxed">
                {group.description}
              </p>
            </div>

            <div className="lg:col-span-4 border border-foreground/10 bg-card p-5 md:p-6">
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-foreground/10">
                <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-foreground/60">
                  <Images className="w-5 h-5 text-accent" />
                  {categoryProjects.length} cases
                </div>
                <Copy className="w-5 h-5 text-accent" />
              </div>
              <p className="pt-5 text-sm text-muted-foreground leading-relaxed">
                Link para enviar ao cliente:
              </p>
              <div className="mt-3 border border-foreground/10 bg-background px-4 py-3 text-sm font-mono text-foreground/80 break-all">
                tuliorangeldesigner.com.br{sharePath}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {categoryProjects.map((project, index) => {
              if (!project) return null;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.04, duration: 0.5 }}
                >
                  <Link
                    to={`/work/${project.id}`}
                    className="group block relative overflow-hidden border border-foreground/10 bg-card hover:border-accent/60 transition-colors duration-500"
                  >
                    <div className={`${aspectByFormat[group.format]} overflow-hidden bg-background`}>
                      <img
                        src={project.id === 'edicao-de-video' ? '/coveredicao.webp' : project.thumbnail}
                        alt={project.title}
                        loading={index < 3 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                    <div className="absolute left-3 top-3 px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-background/90 text-foreground border border-foreground/10">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 block mb-2">
                        {project.category}
                      </span>
                      <div className="flex items-end justify-between gap-3">
                        <h2 className="text-2xl md:text-3xl font-syne font-bold text-white leading-tight group-hover:text-accent transition-colors">
                          {project.title}
                        </h2>
                        <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectCategory;

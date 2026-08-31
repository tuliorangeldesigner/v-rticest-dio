import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedLine } from '@/components/AnimatedText';
import { projects } from '@/data/projects';
import { dropBanners } from '@/data/dropBanners';
import { esportsVariados } from '@/data/esportsVariados';
import { esportLogos } from '@/data/esportLogos';
import { thumbnails } from '@/data/thumbnails';
import { ArrowUpRight } from 'lucide-react';
import logosIdentityCover from '/imagens/voix/GfwygtztlfLljSp7FDfagoUqo8.webp?url';

interface CategoryCardProps {
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  image: string;
  images?: string[];
  index: number;
}

const CategoryCard = ({ title, eyebrow, description, href, image, images, index }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group ${index % 2 === 1 ? 'md:mt-32' : ''}`}
    >
      <Link to={href} className="block h-full">
        <div className="relative overflow-hidden aspect-[4/3] mb-8 rounded-none border border-foreground/10">
          {images?.length ? (
            <div className="grid grid-cols-2 h-full bg-black">
              {images.slice(0, 4).map((src, imageIndex) => (
                <motion.img
                  key={src}
                  src={src}
                  alt={`${title} ${imageIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                />
              ))}
            </div>
          ) : (
            <motion.img
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-24 h-24 rounded-full bg-background/95 ring-1 ring-foreground/10 shadow-xl flex items-center justify-center">
              <span className="text-sm font-mono uppercase tracking-widest text-foreground">Ver</span>
            </div>
          </div>
          <div className="absolute left-5 top-5 px-3 py-2 text-[10px] font-mono uppercase tracking-widest bg-background/90 text-foreground border border-foreground/10">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm font-mono">
            <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
            <div className="h-px w-8 bg-border" />
            <span className="text-muted-foreground uppercase tracking-wider">{eyebrow}</span>
          </div>

          <div className="border-b border-border pb-6 group-hover:border-accent/50 transition-colors duration-500">
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-syne font-bold leading-tight group-hover:text-accent transition-colors duration-300">
                {title}
              </h3>
              <ArrowUpRight className="w-8 h-8 shrink-0 text-muted-foreground group-hover:text-accent group-hover:-translate-y-2 group-hover:translate-x-2 transition-all duration-300 mb-1" />
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const getProject = (id: string) => projects.find((project) => project.id === id);
  const esportLogoCover = esportLogos.find((logo) => logo.fileName === 'Logos1 (4).webp')?.src;
  const esportsVariadosCover = esportsVariados.find((item) => item.fileName === '2 (5).webp')?.src;
  const categoryCards = [
    {
      title: 'Logos e Identidade Visual',
      eyebrow: 'Branding',
      description: 'Projetos de marca, símbolo e identidade visual para empresas que precisam parecer mais fortes no primeiro contato.',
      href: '/work/logos',
      image: logosIdentityCover,
    },
    {
      title: 'Sites e Landing Pages',
      eyebrow: 'Web Design',
      description: 'Páginas criadas para apresentar oferta, elevar percepção de valor e conduzir o visitante para a próxima ação.',
      href: '/work/sites',
      image: getProject('naturis')?.thumbnail,
    },
    {
      title: 'Social Media',
      eyebrow: 'Conteúdo',
      description: 'Criativos, posts e direção visual para marcas que precisam chamar atenção e comunicar com mais clareza.',
      href: '/work/social-media',
      image: getProject('burger-zone')?.thumbnail ?? getProject('zenith')?.thumbnail,
    },
    {
      title: 'Edição de Vídeo e Motion',
      eyebrow: 'Vídeo',
      description: 'Edição, ritmo e motion design para vídeos com mais retenção, acabamento e resposta do público.',
      href: '/work/edicao-de-video',
      image: getProject('edicao-de-video')?.id ? '/coveredicao.webp' : getProject('edicao-de-video')?.thumbnail,
    },
    {
      title: 'Banners E-commerce',
      eyebrow: 'Conversão',
      description: 'Banners para lojas, vitrines e ofertas que precisam destacar produto, benefício e chamada de compra.',
      href: '/banners-ecommerce-dropshipping',
      image: dropBanners[0]?.src,
    },
    {
      title: 'Thumbnails',
      eyebrow: 'Clique',
      description: 'Capas pensadas para parar o scroll, comunicar promessa rápido e aumentar intenção de clique.',
      href: '/thumbnail',
      image: thumbnails[0]?.src,
    },
    {
      title: 'Logos E-sport',
      eyebrow: 'Gaming',
      description: 'Identidades competitivas com impacto, leitura rápida e presença forte para times, players e creators.',
      href: '/logos-e-sport',
      image: esportLogoCover,
    },
    {
      title: 'E-Sports Variados',
      eyebrow: 'Gaming',
      description: 'Artes para players, campeonatos e comunidades que precisam parecer profissionais antes do primeiro clique.',
      href: '/e-sports-variados',
      image: esportsVariadosCover,
    },
  ].filter((category): category is Omit<typeof category, 'image'> & { image: string } => Boolean(category.image));

  return (
    <section id="work" ref={ref} className="section-padding bg-secondary/30 relative overflow-hidden">
      
      {/* Decorative large text background */}
      <div className="absolute top-20 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none">
         <h2 className="text-[20vw] font-syne font-black leading-none whitespace-nowrap animate-marquee">
            PROJETOS SELECIONADOS • PROJETOS SELECIONADOS •
         </h2>
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 items-end">
          <div className="md:col-span-8">
            <div className="flex items-center gap-4 mb-6">
               <span className="w-3 h-3 bg-accent rounded-full animate-pulse"></span>
               <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Operações Selecionadas</span>
            </div>
            <AnimatedLine>
              <h2 className="font-syne font-bold text-5xl md:text-7xl tracking-tighter leading-[0.9]">
                Engenharia de<br />
                <span className="text-accent">Autoridade Digital.</span>
              </h2>
            </AnimatedLine>
            <p className="text-muted-foreground mt-6 max-w-2xl">
              Cada elemento visual. Cada estrutura de página. Cada criativo.
              <br />
              Projetado para aumentar percepção de valor e gerar resultado real.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
             <Link
              to="/work"
              className="group inline-flex flex-col items-end gap-2"
            >
              <span className="text-sm font-bold uppercase tracking-widest border-b border-foreground/20 pb-1 group-hover:border-accent transition-colors">Ver Projetos</span>
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground mb-14 -mt-10">
          Escolha rapidamente o tipo de projeto que você procura.
        </p>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          {categoryCards.map((category, index) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              eyebrow={category.eyebrow}
              description={category.description}
              href={category.href}
              image={category.image}
              images={category.images}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;


import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { getBlogPostById, getRelatedPosts } from '@/data/blog';
import SEO from '@/components/SEO';
import { ArticleSchema, BreadcrumbSchema } from '@/components/StructuredData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://trdesigner.vercel.app').replace(/\/$/, '');
const inlineImagesByPost: Record<string, { src: string; alt: string }[]> = {
  'marcas-comuns-brigam-por-preco': [
    { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80', alt: 'Reunião estratégica de posicionamento de marca' },
    { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80', alt: 'Análise de métricas e performance digital' },
  ],
  'site-nao-converte': [
    { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80', alt: 'Painel de métricas de conversão e tráfego' },
    { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80', alt: 'Análise de dados para otimização de funil' },
  ],
  'percepcao-define-preco': [
    { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80', alt: 'Ambiente premium reforçando percepção de valor' },
    { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80', alt: 'Reunião executiva sobre estratégia de precificação' },
  ],
  'criativo-engenharia-atencao': [
    { src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=80', alt: 'Planejamento criativo para anúncios de performance' },
    { src: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=900&q=80', alt: 'Produção visual para campanhas digitais' },
  ],
  'autoridade-visual-feed': [
    { src: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=900&q=80', alt: 'Curadoria visual de conteúdo para redes sociais' },
    { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', alt: 'Planejamento de identidade visual para presença digital' },
  ],
  'branding-sem-estrategia': [
    { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80', alt: 'Workshop de branding orientado por estratégia' },
    { src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80', alt: 'Definição de identidade visual e posicionamento de marca' },
  ],
  'ia-amplifica-estrategia': [
    { src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80', alt: 'Aplicação de IA em fluxos de marketing e conteúdo' },
    { src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80', alt: 'Tecnologia e análise para escalar estratégia digital' },
  ],
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = getBlogPostById(id || '');
  const relatedPosts = post ? getRelatedPosts(post.id, post.category) : [];
  const inlineImages = post ? inlineImagesByPost[post.id] ?? [] : [];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-[60px] font-syne font-bold mb-4 leading-tight">Post não encontrado</h1>
            <Link to="/blog" className="text-accent hover:underline flex items-center justify-center gap-2 link-hover">
              <ArrowLeft className="w-4 h-4" /> Voltar para o blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-accent/20 flex flex-col">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.image}
        url={`${SITE_URL}/blog/${post.id}`}
        type="article"
        author={post.author.name}
        publishedTime={post.date}
        section={post.category}
        tags={[post.category, 'Design', 'Digital']}
      />
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        image={post.image}
        datePublished={post.date}
        author={{ name: post.author.name }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Início', url: SITE_URL },
          { name: 'Blog', url: `${SITE_URL}/blog` },
          { name: post.title, url: `${SITE_URL}/blog/${post.id}` },
        ]}
      />
      
      {/* Minimal Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      <Navigation />

      <main className="flex-1 pt-24 pb-20">
        
        {/* 1. Header Section - Clean & Modernist */}
        <header className="container-wide mb-16 md:mb-24 relative">
           
           {/* Top Meta Bar */}
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-foreground/10 mb-12">
              <Link to="/blog" className="group flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-foreground/60 hover:text-accent transition-colors">
                 <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                 <span>Voltar para o Blog</span>
              </Link>
              
              <div className="flex items-center gap-6 mt-4 md:mt-0 text-xs font-mono uppercase tracking-widest text-foreground/40">
                 <span>{post.date}</span>
                 <span className="w-1 h-1 bg-accent rounded-full"></span>
                 <span>{post.readTime}</span>
              </div>
           </div>

           {/* Title & Intro Grid */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
              <div className="lg:col-span-8">
                 <span className="inline-block px-3 py-1 mb-6 border border-foreground/20 rounded-full text-xs font-bold uppercase tracking-widest text-accent">
                    {post.category}
                 </span>
                 <motion.h1 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6 }}
                   className="text-[40px] md:text-[50px] lg:text-[60px] font-epic font-bold leading-[1.05] tracking-tight text-foreground uppercase"
                 >
                   {post.title}
                 </motion.h1>
              </div>
              
              <div className="lg:col-span-4 lg:pb-2">
                 <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-light">
                   {post.excerpt}
                 </p>
              </div>
           </div>
        </header>

        {/* 2. Offset Image Section */}
        <section className="container-wide mb-24">
           <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[16/9] md:aspect-[2.4/1] overflow-hidden rounded-sm"
           >
              <img 
                src={post.image} 
                alt={post.title} 
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Info Box on Image */}
              <div className="absolute bottom-0 right-0 bg-background p-6 md:p-8 max-w-xs border-t border-l border-foreground/10 hidden md:block">
                 <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-3">Autor</p>
                 <div className="flex items-center gap-3">
                    <img 
                       src={post.author.image} 
                       alt={post.author.name} 
                       loading="lazy"
                       decoding="async"
                       className="w-10 h-10 rounded-full object-cover" 
                    />
                    <div>
                       <p className="font-syne font-bold leading-none mb-1">{post.author.name}</p>
                       <p className="text-xs text-foreground/60">{post.author.role}</p>
                    </div>
                 </div>
              </div>
           </motion.div>
        </section>

        {/* 3. Main Content Grid - Sticky TOC + Article */}
        <section className="container-wide">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              
              {/* Left: Sticky Table of Contents & Share */}
              <aside className="lg:col-span-3 lg:col-start-1 relative">
                 <div className="sticky top-32 space-y-12">
                    {/* Mobile-only Author (visible on small screens) */}
                    <div className="md:hidden mb-8 pb-8 border-b border-foreground/10">
                       <div className="flex items-center gap-3">
                          <img src={post.author.image} alt={post.author.name} loading="lazy" decoding="async" className="w-10 h-10 rounded-full object-cover" />
                          <div>
                             <p className="font-bold">{post.author.name}</p>
                             <p className="text-xs text-foreground/60">{post.author.role}</p>
                          </div>
                       </div>
                    </div>

                    {/* TOC */}
                    <div>
                       <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-6">Conteúdo</p>
                       <ul className="space-y-4 text-sm font-medium text-foreground/60">
                          <li className="flex items-center gap-3 text-accent cursor-pointer">
                             <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                             Introdução
                          </li>
                          <li className="flex items-center gap-3 hover:text-accent cursor-pointer transition-colors group">
                             <span className="w-1.5 h-1.5 bg-foreground/20 group-hover:bg-accent rounded-full transition-colors"></span>
                             Conceitos-chave
                          </li>
                          <li className="flex items-center gap-3 hover:text-accent cursor-pointer transition-colors group">
                             <span className="w-1.5 h-1.5 bg-foreground/20 group-hover:bg-accent rounded-full transition-colors"></span>
                             Implementação
                          </li>
                          <li className="flex items-center gap-3 hover:text-accent cursor-pointer transition-colors group">
                             <span className="w-1.5 h-1.5 bg-foreground/20 group-hover:bg-accent rounded-full transition-colors"></span>
                             Resumo
                          </li>
                       </ul>
                    </div>

                    {/* Share */}
                    <div>
                       <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-6">Compartilhar</p>
                       <div className="flex gap-4">
                          <button className="w-10 h-10 border border-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground hover:text-background transition-all">
                             <Twitter className="w-4 h-4" />
                          </button>
                          <button className="w-10 h-10 border border-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground hover:text-background transition-all">
                             <Linkedin className="w-4 h-4" />
                          </button>
                          <button className="w-10 h-10 border border-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground hover:text-background transition-all">
                             <Share2 className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 </div>
              </aside>

              {/* Right: Article Content */}
              <article className="lg:col-span-8 lg:col-start-5 prose prose-lg prose-headings:font-syne prose-headings:font-bold prose-headings:text-[32px] prose-p:text-foreground/80 prose-p:leading-8 prose-img:rounded-sm">
                 {post.content.map((paragraph, index) => (
                    <div key={index}>
                       <p>{paragraph}</p>
                       {index === 1 && (
                          <div className="my-12 p-8 bg-foreground/5 border-l-2 border-accent">
                             <p className="font-syne font-bold text-2xl italic m-0 text-foreground">
                                "Good design is obvious. Great design is transparent."
                             </p>
                          </div>
                       )}
                       {index === 3 && (
                          <div className="my-12 grid grid-cols-2 gap-4 not-prose">
                             {inlineImages.slice(0, 2).map((image) => (
                               <div key={image.src} className="aspect-square rounded-sm overflow-hidden bg-foreground/5">
                                  <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                  />
                               </div>
                             ))}
                          </div>
                       )}
                    </div>
                 ))}
              </article>

           </div>
        </section>

        {/* 4. Footer Navigation - Simple & Direct */}
        <section className="container-wide mt-32 border-t border-foreground/10 pt-16">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <h3 className="font-syne font-bold text-3xl">Continue Lendo</h3>
              <Link to="/blog" className="mt-4 md:mt-0 text-sm font-mono uppercase tracking-widest border-b border-accent pb-1 hover:text-accent transition-colors">
                 Ver Todos os Artigos
              </Link>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((post) => (
                 <Link key={post.id} to={`/blog/${post.id}`} className="group block">
                    <div className="aspect-[16/9] overflow-hidden bg-foreground/5 mb-6 rounded-sm">
                       <img 
                          src={post.image} 
                          alt={post.title} 
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                       />
                    </div>
                    <div className="flex justify-between items-start">
                       <div className="max-w-md">
                          <span className="text-xs font-mono text-accent uppercase mb-2 block">{post.category}</span>
                          <h4 className="font-syne font-bold text-2xl leading-tight group-hover:text-accent transition-colors mb-3">
                             {post.title}
                          </h4>
                          <p className="text-sm text-foreground/60 line-clamp-2">
                             {post.excerpt}
                          </p>
                       </div>
                       <div className="w-10 h-10 border border-foreground/10 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all shrink-0 ml-4">
                          <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                       </div>
                    </div>
                 </Link>
              ))}
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;








import { useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProjectById, projects } from '@/data/projects';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProjectById(id || '');

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-syne font-bold mb-4">Projeto não encontrado</h1>
            <Link to="/" className="text-accent hover:underline flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Voltar para a Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const nextProject = getProjectById(project.nextProject);
  const prevProject = getProjectById(project.prevProject);

  return (
      <div className="min-h-screen bg-background selection:bg-accent/20 flex flex-col">
      <Navigation />
      <Helmet>
        <title>{project.title} | STUDIO Case Study</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <CustomCursor />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      <main className="flex-1 pt-24 md:pt-32">
        {/* Swiss Grid Layout Wrapper (Similar to Blog, but adapted for Project) */}
        <div className="container-wide max-w-[90rem] mx-auto px-4 sm:px-6 mb-20">
          
          {/* Grid Container */}
          <div className="border border-foreground/10 bg-background relative z-10">
            
            {/* 1. Header Grid Row */}
            <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-foreground/10">
              {/* Breadcrumbs / Back */}
              <div className="col-span-1 lg:col-span-3 p-6 border-b lg:border-b-0 lg:border-r border-foreground/10 flex items-center">
                <Link to="/work" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-accent transition-colors">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Voltar para Projetos
                </Link>
                <span className="mx-4 text-foreground/20">/</span>
                <span className="text-sm text-foreground/40 uppercase tracking-wider">{project.category}</span>
              </div>
              
              {/* Year Cell */}
              <div className="col-span-1 p-6 flex items-center justify-between lg:justify-center text-sm font-medium text-foreground/80">
                <span className="lg:hidden text-foreground/40 uppercase tracking-wider">Ano</span>
                <div className="flex items-center gap-2 font-mono">
                   {project.year}
                </div>
              </div>
            </div>

            {/* 2. Title Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-12 p-6 md:p-12 lg:p-16 border-b border-foreground/10">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-syne font-bold leading-[0.9] tracking-tight text-foreground uppercase"
                >
                  {project.title}
                </motion.h1>
                
                <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <p className="text-lg md:text-xl text-foreground/60 max-w-2xl leading-relaxed">
                     {project.description}
                   </p>
                   <div className="flex items-center gap-3">
                      <div className="px-4 py-2 rounded-full border border-foreground/10 text-xs font-bold uppercase tracking-widest bg-foreground/5">
                        Estudo de Caso
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* 3. Hero Image - Full Grid Width */}
            <div className="w-full border-b border-foreground/10 overflow-hidden bg-foreground/5">
               <motion.div
                 initial={{ scale: 1.05, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 0.8 }}
                 className="aspect-[16/9] md:aspect-[21/9] w-full relative"
               >
                 <img 
                   src={project.heroImage} 
                   alt={project.title}
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
               </motion.div>
            </div>

            {/* 4. Content Area Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[50vh]">
              
              {/* Left Sidebar - Project Metadata */}
              <div className="lg:col-span-3 border-r border-foreground/10 bg-background">
                <div className="sticky top-24">
                  <div className="flex flex-col">
                     {/* Client Block */}
                     <div className="p-6 border-b border-foreground/10 relative group hover:bg-foreground/5 transition-colors">
                        <span className="absolute top-6 right-6 text-[10px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity">01</span>
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 mb-3">Cliente</h4>
                        <p className="text-lg font-syne font-bold leading-tight group-hover:translate-x-1 transition-transform duration-300">
                           {project.client}
                        </p>
                     </div>

                     {/* Services Block - Digital Tags */}
                     <div className="p-6 relative group hover:bg-foreground/5 transition-colors">
                        <span className="absolute top-6 right-6 text-[10px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity">02</span>
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 mb-4">Escopo</h4>
                        <div className="flex flex-wrap gap-2">
                           {project.services.map((service, idx) => (
                              <span 
                                 key={idx} 
                                 className="inline-block px-3 py-1 border border-foreground/10 text-[11px] font-mono uppercase tracking-wide rounded-sm text-foreground/70 hover:border-accent hover:text-accent hover:bg-background transition-colors cursor-default"
                              >
                                 {service}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9 p-6 md:p-12 lg:p-16">
                <motion.article 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="prose prose-lg md:prose-xl max-w-none prose-headings:font-syne prose-headings:font-bold prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-none prose-img:border prose-img:border-foreground/10"
                >
                  {/* Challenge Section */}
                  <h3 className="text-2xl md:text-3xl font-syne font-bold mb-6">O Desafio</h3>
                  <p className="mb-12 text-foreground/80 leading-relaxed">
                    {project.challenge}
                  </p>

                  {/* Solution Section */}
                  <h3 className="text-2xl md:text-3xl font-syne font-bold mb-6">A Solução</h3>
                  <p className="mb-12 text-foreground/80 leading-relaxed">
                    {project.solution}
                  </p>
                  
                  {/* Impact / Results Highlight */}
                  <div className="my-16 p-8 border border-foreground/10 bg-foreground/5 rounded-none">
                     <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-8">Principais Resultados</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
                        {project.results.map((result, i) => (
                           <div key={i}>
                              <span className="block text-4xl md:text-5xl font-syne font-bold mb-2">{result.split(' ')[0]}</span>
                              <span className="text-xs font-mono uppercase tracking-widest text-foreground/60">{result.split(' ').slice(1).join(' ')}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                </motion.article>

                {/* Gallery - Visual Archive Layout */}
                <div className="mt-12">
                  <div className="flex items-end justify-between mb-16">
                     <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-foreground/40 block mb-2">Arquivo Visual</span>
                        <h3 className="text-3xl font-syne font-bold">Artefatos do Projeto</h3>
                     </div>
                     <span className="hidden md:block text-xs font-mono uppercase tracking-widest text-foreground/40">
                        {project.gallery.length} Ativos Processados
                     </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {project.gallery.map((image, i) => (
                        <div 
                           key={i} 
                           className={`group relative overflow-hidden bg-foreground/5 ${
                              i === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'
                           }`}
                        >
                           <img 
                              src={image} 
                              alt={`Gallery image ${i+1}`} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                           />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="px-4 py-2 bg-background text-foreground text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                 Ver Completo
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Key Takeaways - Compact Accent Card (No Border) */}
                  {project.keyTakeaways && (
                     <div className="mt-24 relative overflow-hidden bg-accent text-accent-foreground p-8 md:p-12 selection:bg-white selection:text-accent rounded-sm">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 md:items-start">
                           <div className="md:w-[30%] pb-6 md:pb-0 md:pr-6">
                              <span className="text-3xl md:text-4xl font-syne font-black block leading-none mb-2 whitespace-nowrap">Insight</span>
                              <span className="text-xs font-mono uppercase tracking-widest font-bold opacity-70">Retrospectiva</span>
                           </div>
                           <div className="md:w-[70%] md:pl-4">
                              <p className="text-xl md:text-2xl font-syne font-bold leading-snug mb-4">
                                 "{project.keyTakeaways}"
                              </p>
                              <div className="flex items-center gap-4">
                                 <div className="h-px w-8 bg-accent-foreground"></div>
                                 <span className="text-xs font-mono uppercase tracking-widest font-bold">Insights</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <section className="border-t border-foreground/10 bg-foreground/5 py-20">
          <div className="container-wide max-w-[90rem] mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-syne font-bold uppercase">Próximo Projeto</h2>
              <Link to="/work" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors">
                Ver Todos os Projetos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {nextProject ? (
               <Link 
                  to={`/work/${nextProject.id}`} 
                  className="group block border border-foreground/10 bg-background p-8 hover:border-accent transition-colors relative overflow-hidden"
               >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                     <div className="aspect-[16/9] overflow-hidden bg-foreground/5">
                        <img
                          src={nextProject.heroImage}
                          alt={nextProject.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                     </div>
                     <div>
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4">
                          <span className="text-accent">{nextProject.category}</span>
                          <span>{nextProject.year}</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-syne font-bold leading-tight group-hover:text-accent transition-colors mb-6">
                          {nextProject.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                           Ver Estudo de Caso <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </div>
                     </div>
                  </div>
               </Link>
            ) : (
               <div className="text-center py-12 text-foreground/40 italic">
                  Fim do portfólio.
               </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      </div>
  );
};

export default CaseStudy;


import { useState, useMemo, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const categories = ['TODOS', 'POSICIONAMENTO', 'PRESENÇA DIGITAL', 'CONVERSÃO', 'PERFORMANCE'];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('TODOS');
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const postsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const postsInView = useInView(postsRef, { once: true, margin: '-100px' });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.toLowerCase());
  }, []);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    if (activeCategory !== 'TODOS') {
      posts = posts.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery) ||
          p.excerpt.toLowerCase().includes(searchQuery) ||
          p.category.toLowerCase().includes(searchQuery) ||
          p.author.name.toLowerCase().includes(searchQuery)
      );
    }

    return posts;
  }, [activeCategory, searchQuery]);

  const featuredPost = blogPosts.find((p) => p.featured);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: (e.clientX - window.innerWidth / 2) / 30,
      y: (e.clientY - window.innerHeight / 2) / 30,
    });
  };

  return (
    <div className="min-h-screen bg-background" onMouseMove={handleMouseMove}>
      <Navigation />

      <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
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

        <motion.div
          className="absolute top-32 right-[10%] w-20 h-20 border border-accent/20"
          style={{ transform: 'rotate(45deg)', x: mousePosition.x * 2, y: mousePosition.y * 2 }}
        />
        <motion.div
          className="absolute bottom-20 left-[15%] w-32 h-32 rounded-full border border-accent/10"
          style={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
        />

        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
          style={{ top: '20%', right: '10%', x: mousePosition.x * 3, y: mousePosition.y * 3 }}
        />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-sm font-mono text-accent">01</span>
            <div className="h-px w-12 bg-accent" />
            <span className="text-sm font-mono text-muted-foreground tracking-wider">BLOG</span>
          </motion.div>

          <div>
            {['Estratégia &', 'Autoridade.'].map((text, index) => (
              <div key={text} className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={heroInView ? { y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                  className={`font-epic font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] ${
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
            Reflexões estratégicas sobre branding, percepção de valor, conversão e presença digital.
            <br />
            <br />
            Nada aqui é tendência passageira.
            <br />
            É fundamento para quem quer crescer com autoridade.
          </motion.p>
        </div>
      </section>

      {featuredPost && (
        <section className="pb-16 md:pb-24 pt-16">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-mono text-accent">02</span>
                <div className="h-px w-12 bg-accent" />
                <span className="text-sm font-mono text-muted-foreground tracking-wider">EM DESTAQUE</span>
              </div>

              <Link
                to={`/blog/${featuredPost.id}`}
                className="group block bg-card border border-border overflow-hidden transition-colors hover:border-accent/50"
              >
                <div className="flex flex-col md:flex-row h-full md:h-[400px]">
                  <div className="w-full md:w-2/5 relative overflow-hidden h-[250px] md:h-full border-b md:border-b-0 md:border-r border-border">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-background/90 backdrop-blur text-xs font-mono font-bold uppercase tracking-wider border border-border">
                        ESTRATÉGIA
                      </span>
                    </div>
                    <motion.img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-6 text-accent">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 bg-accent"></span>
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Artigo em Destaque</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-syne font-bold leading-tight mb-4 group-hover:text-accent transition-colors duration-300">
                      {featuredPost.title}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-3">{featuredPost.excerpt}</p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredPost.author.image}
                          alt={featuredPost.author.name}
                          className="w-8 h-8 object-cover border border-border"
                        />
                        <div>
                          <p className="text-sm font-bold text-foreground">{featuredPost.author.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {featuredPost.date} • {featuredPost.readTime}
                          </p>
                        </div>
                      </div>

                      <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      <section ref={postsRef} className="pb-16">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={postsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-mono text-accent">03</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">ARTIGOS</span>
            </div>

            <div className="border border-border bg-card">
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:flex md:items-center md:min-h-[4rem]">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`group relative w-full h-14 md:h-16 px-6 md:px-8 flex items-center justify-start md:justify-center text-left md:text-center text-sm font-mono uppercase tracking-wider transition-all hover:bg-accent hover:text-accent-foreground whitespace-normal border-b md:border-b-0 md:border-r border-border last:border-b-0 last:border-r-0 ${
                          activeCategory === category
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground bg-transparent'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-[400px] relative group bg-background/50 hover:bg-background transition-colors">
                  <div className="relative h-16 flex items-center px-6">
                    <Search className="w-5 h-5 text-muted-foreground mr-4" />
                    <input
                      type="text"
                      placeholder="Buscar artigos..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-foreground placeholder:text-muted-foreground/50 h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="container-wide">
          <div className="flex flex-col border-t border-border/50">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative border-b border-border/50 py-12 md:py-20 transition-all hover:bg-muted/30"
                >
                  <Link to={`/blog/${post.id}`} className="grid md:grid-cols-12 gap-8 items-start md:items-center">
                    <div className="md:col-span-1 hidden md:block">
                      <span className="text-sm font-mono text-accent/50 group-hover:text-accent transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="md:col-span-2 flex flex-row md:flex-col justify-between items-center md:items-start w-full">
                      <span className="md:hidden text-sm font-mono text-accent/50">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex flex-col gap-2 items-end md:items-start">
                        <span className="px-3 py-1 border border-border bg-background text-xs font-mono uppercase tracking-wider text-muted-foreground group-hover:border-accent group-hover:text-accent transition-colors">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground/60 hidden md:block">{post.date}</span>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-4">
                      <h3 className="text-3xl md:text-5xl font-syne font-bold leading-tight group-hover:text-accent transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 max-w-xl text-lg group-hover:text-foreground transition-colors">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground md:hidden pt-2">
                        <span>{post.date}</span>
                        <span></span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="md:col-span-3 relative hidden md:block aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        <ArrowUpRight className="w-5 h-5 text-foreground" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 border-b border-border/50">
                <p className="text-muted-foreground text-lg">Nenhum artigo encontrado para este filtro.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-foreground/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-foreground/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        <div className="container-wide text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <span className="text-sm font-mono text-accent mb-6 block">PRÓXIMO PASSO</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">Transforme Conteúdo Em Posicionamento.</h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Se os artigos fizeram sentido para o momento da sua marca,
              <br />
              o próximo passo é estruturar isso na prática.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full"
            >
              Agendar Diagnóstico Estratégico
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;






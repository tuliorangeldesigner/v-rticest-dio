import { useState, useMemo, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blog';
import PageTransition from '@/components/PageTransition';
import SearchInput from '@/components/SearchInput';
import NewsletterForm from '@/components/NewsletterForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
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
    
    if (activeCategory !== 'All') {
      posts = posts.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery) {
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(searchQuery) ||
        p.excerpt.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery) ||
        p.author.name.toLowerCase().includes(searchQuery)
      );
    }
    
    return posts;
  }, [activeCategory, searchQuery]);

  const featuredPost = blogPosts.find(p => p.featured);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: (e.clientX - window.innerWidth / 2) / 30,
      y: (e.clientY - window.innerHeight / 2) / 30,
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background" onMouseMove={handleMouseMove}>
        <Navigation />

        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
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
          </div>

          {/* Floating shapes */}
          <motion.div
            className="absolute top-40 right-[20%] w-20 h-20 rounded-full border border-accent/20"
            style={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          />
          <motion.div
            className="absolute bottom-20 left-[15%] w-3 h-3 bg-accent/40 rounded-full"
            style={{ x: mousePosition.x * -3, y: mousePosition.y * -3 }}
          />

          {/* Accent orb */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
            style={{ top: '10%', right: '5%' }}
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
              <span className="text-sm font-mono text-muted-foreground tracking-wider">BLOG</span>
            </motion.div>

            <div className="max-w-4xl">
              {['Insights &', 'Perspectives'].map((text, index) => (
                <div key={text} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={heroInView ? { y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                    className={`font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] ${
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
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-8"
            >
              Thoughts on design, branding, technology, and the future 
              of digital experiences from our team.
            </motion.p>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="pb-16 md:pb-24">
            <div className="container-wide">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-sm font-mono text-accent">02</span>
                  <div className="h-px w-12 bg-accent" />
                  <span className="text-sm font-mono text-muted-foreground tracking-wider">FEATURED</span>
                </div>

                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium">
                      Featured
                    </div>
                    {/* Corner decorations */}
                    <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-accent mb-4 block">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-syne font-bold mb-4 group-hover:text-accent transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 pt-6 border-t border-border">
                      <img
                        src={featuredPost.author.image}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{featuredPost.author.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {featuredPost.date} · {featuredPost.readTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Search and Category Filter */}
        <section ref={postsRef} className="pb-8">
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
                <span className="text-sm font-mono text-muted-foreground tracking-wider">ALL ARTICLES</span>
              </div>

              <SearchInput
                placeholder="Search articles..."
                onSearch={handleSearch}
                className="max-w-md"
              />
              
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={postsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.05 }}
                    className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-card border border-border text-muted-foreground hover:border-accent hover:text-foreground'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12 md:py-16">
          <div className="container-wide">
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={postsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/blog/${post.id}`} className="block">
                      <div className="relative overflow-hidden aspect-[16/10] mb-5">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 text-xs font-mono text-foreground/80 bg-background/80 backdrop-blur-sm px-2 py-1">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <motion.div
                          className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-accent"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                        />
                      </div>
                      <span className="text-xs font-mono text-accent mb-2 block">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-syne font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.author.image}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm text-muted-foreground">{post.author.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 border border-border"
              >
                <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`grid-${i}`}
                className="absolute left-0 right-0 h-px bg-foreground/5"
                style={{ top: `${25 * (i + 1)}%` }}
              />
            ))}
          </div>

          <div className="container-wide text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto"
            >
              <span className="text-sm font-mono text-accent mb-6 block">NEWSLETTER</span>
              <h2 className="text-3xl md:text-4xl font-syne font-bold mb-4">
                Stay in the loop
              </h2>
              <p className="text-muted-foreground mb-8">
                Get the latest insights on design, branding, and digital trends 
                delivered straight to your inbox.
              </p>
              <NewsletterForm variant="inline" />
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Blog;

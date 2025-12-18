import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import PageTransition from '@/components/PageTransition';
import Breadcrumbs from '@/components/Breadcrumbs';

const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return blogPosts;
    return blogPosts.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const featuredPost = blogPosts.find(p => p.featured);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 py-6 md:py-8 bg-background/80 backdrop-blur-sm">
          <div className="container-wide flex items-center justify-between">
            <Link to="/" className="font-syne text-xl md:text-2xl font-bold tracking-tight">
              STUDIO<span className="text-accent">.</span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <h1 className="heading-xl mb-6">
              Insights &<br />
              <span className="text-accent">Perspectives</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl">
              Thoughts on design, branding, technology, and the future 
              of digital experiences from our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-16 md:pb-24">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to={`/blog/${featuredPost.id}`}
                className="group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-background text-xs font-medium rounded-full">
                    Featured
                  </div>
                </div>
                <div>
                  <span className="text-accent text-sm uppercase tracking-widest mb-4 block">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-syne font-bold mb-4 group-hover:text-accent transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-foreground/60 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={featuredPost.author.image}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{featuredPost.author.name}</p>
                      <p className="text-foreground/50 text-sm">
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

      {/* Category Filter */}
      <section className="pb-8">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-foreground text-background'
                    : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-accent text-xs uppercase tracking-widest mb-2 block">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-syne font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-foreground/70">{post.author.name}</span>
                    </div>
                    <span className="text-xs text-foreground/50">{post.readTime}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 md:py-32 bg-foreground/[0.02] border-y border-foreground/10">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-syne font-bold mb-4">
              Stay in the loop
            </h2>
            <p className="text-foreground/60 mb-8">
              Get the latest insights on design, branding, and digital trends 
              delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-background border border-foreground/10 rounded-full focus:outline-none focus:border-foreground/30 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-accent transition-colors flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/10 py-8">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-syne font-bold">STUDIO<span className="text-accent">.</span></span>
          <span className="text-sm text-foreground/50">© 2024 All rights reserved.</span>
        </div>
      </footer>
      </div>
    </PageTransition>
  );
};

export default Blog;

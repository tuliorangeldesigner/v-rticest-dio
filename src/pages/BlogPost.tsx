import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { getBlogPostById, getRelatedPosts } from '@/data/blog';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = getBlogPostById(id || '');
  const relatedPosts = post ? getRelatedPosts(post.id, post.category) : [];

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-syne font-bold mb-4">Post not found</h1>
          <Link to="/blog" className="text-accent hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 md:py-8 bg-background/80 backdrop-blur-sm">
        <div className="container-wide flex items-center justify-between">
          <Link to="/" className="font-syne text-xl md:text-2xl font-bold tracking-tight">
            STUDIO<span className="text-accent">.</span>
          </Link>
          <Link 
            to="/blog" 
            className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="container-wide max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="text-accent text-sm uppercase tracking-widest mb-4 block">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-syne font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-foreground/60">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{post.author.name}</p>
                  <p className="text-sm">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{post.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12 md:pb-16">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl aspect-[21/9]"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 md:pb-24">
        <div className="container-wide max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            {post.content.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-foreground/80 leading-relaxed mb-6 text-lg"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Share & Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-foreground/10"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-foreground/50">Category:</span>
                <span className="px-4 py-1.5 bg-foreground/5 text-sm rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-foreground/50">Share:</span>
                <div className="flex gap-2">
                  {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
                    <button
                      key={platform}
                      className="px-4 py-1.5 bg-foreground/5 text-sm rounded-full hover:bg-foreground/10 transition-colors"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Author Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 p-8 rounded-2xl bg-foreground/[0.02] border border-foreground/10"
          >
            <div className="flex items-start gap-6">
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-syne font-bold mb-1">{post.author.name}</h3>
                <p className="text-accent text-sm mb-3">{post.author.role}</p>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Passionate about creating meaningful digital experiences that connect 
                  brands with their audiences in authentic and memorable ways.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 md:py-32 bg-foreground/[0.02] border-y border-foreground/10">
          <div className="container-wide">
            <h2 className="text-2xl md:text-3xl font-syne font-bold mb-12 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${relatedPost.id}`} className="group block">
                    <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-5">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-accent text-xs uppercase tracking-widest mb-2 block">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-xl font-syne font-bold group-hover:text-accent transition-colors">
                      {relatedPost.title}
                    </h3>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Article CTA */}
      <section className="py-16 md:py-24">
        <div className="container-wide text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-accent transition-colors"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
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
  );
};

export default BlogPost;

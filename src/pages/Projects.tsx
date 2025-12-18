import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { ArrowLeft } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import Breadcrumbs from '@/components/Breadcrumbs';

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 py-6 md:py-8">
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
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <h1 className="heading-xl mb-6">
              Our Work
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl">
              A collection of projects that showcase our passion for creating 
              meaningful digital experiences and brand transformations.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-12"
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

      {/* Masonry Grid */}
      <section className="pb-24 md:pb-32">
        <div className="container-wide">
          <motion.div 
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  className="break-inside-avoid"
                >
                  <Link
                    to={`/work/${project.id}`}
                    className="group block relative overflow-hidden rounded-xl"
                    data-cursor="view"
                  >
                    {/* Image with varying heights for masonry effect */}
                    <div 
                      className={`relative overflow-hidden ${
                        index % 3 === 0 ? 'aspect-[3/4]' : 
                        index % 3 === 1 ? 'aspect-square' : 
                        'aspect-[4/3]'
                      }`}
                    >
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <span className="text-xs uppercase tracking-widest text-accent mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-syne font-bold text-foreground">
                          {project.title}
                        </h3>
                        <p className="text-sm text-foreground/70 mt-2 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom info bar - always visible */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-syne font-semibold">{project.title}</h3>
                        <span className="text-xs text-foreground/50">{project.year}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-foreground/50 text-lg">No projects found in this category.</p>
            </motion.div>
          )}
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

export default Projects;

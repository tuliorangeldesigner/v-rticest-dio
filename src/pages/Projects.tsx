import { useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import PageTransition from '@/components/PageTransition';
import SearchInput from '@/components/SearchInput';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const heroRef = useRef(null);
  const projectsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.toLowerCase());
  }, []);

  const filteredProjects = useMemo(() => {
    let result = projects;
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);

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

          {/* Floating shapes */}
          <motion.div
            className="absolute top-40 right-[15%] w-20 h-20 border border-accent/20"
            style={{ transform: 'rotate(45deg)', x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          />
          <motion.div
            className="absolute bottom-20 left-[10%] w-32 h-32 rounded-full border border-accent/10"
            style={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
          />

          {/* Accent orb */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
            style={{ top: '10%', right: '-5%' }}
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
              <span className="text-sm font-mono text-muted-foreground tracking-wider">PORTFOLIO</span>
            </motion.div>

            <div className="max-w-4xl">
              {['Our', 'Work'].map((text, index) => (
                <div key={text} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={heroInView ? { y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                    className={`font-syne font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] ${
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
              A collection of projects that showcase our passion for creating 
              meaningful digital experiences and brand transformations.
            </motion.p>
          </div>
        </section>

        {/* Search and Category Filter */}
        <section ref={projectsRef} className="pb-8">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-mono text-accent">02</span>
                <div className="h-px w-12 bg-accent" />
                <span className="text-sm font-mono text-muted-foreground tracking-wider">BROWSE PROJECTS</span>
              </div>

              <SearchInput
                placeholder="Search projects..."
                onSearch={handleSearch}
                className="max-w-md"
              />
              
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={projectsInView ? { opacity: 1, y: 0 } : {}}
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

        {/* Projects Grid */}
        <section className="pb-24 md:pb-32">
          <div className="container-wide">
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="group"
                  >
                    <Link
                      to={`/work/${project.id}`}
                      className="block relative overflow-hidden"
                    >
                      <div 
                        className={`relative overflow-hidden ${
                          index % 3 === 0 ? 'aspect-[3/4]' : 
                          index % 3 === 1 ? 'aspect-square' : 
                          'aspect-[4/3]'
                        }`}
                      >
                        <motion.img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          animate={{ scale: hoveredProject === project.id ? 1.1 : 1 }}
                          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                        />
                        
                        {/* Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                          transition={{ duration: 0.4 }}
                        />

                        {/* Number badge */}
                        <span className="absolute top-4 left-4 text-xs font-mono text-foreground/80 bg-background/80 backdrop-blur-sm px-2 py-1">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Corner decorations */}
                        <motion.div
                          className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-accent"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: hoveredProject === project.id ? 1 : 0, scale: hoveredProject === project.id ? 1 : 0.8 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-accent"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: hoveredProject === project.id ? 1 : 0, scale: hoveredProject === project.id ? 1 : 0.8 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Hover content */}
                        <motion.div 
                          className="absolute inset-0 p-6 flex flex-col justify-end"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: hoveredProject === project.id ? 1 : 0,
                            y: hoveredProject === project.id ? 0 : 20
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <span className="text-xs font-mono text-accent mb-2">
                            {project.category}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-syne font-bold text-foreground">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {project.description}
                          </p>
                        </motion.div>
                      </div>

                      {/* Bottom info bar */}
                      <motion.div 
                        className="pt-4 pb-2"
                        animate={{ opacity: hoveredProject === project.id ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-syne font-semibold mb-1">{project.title}</h3>
                            <span className="text-sm text-muted-foreground">{project.category}</span>
                          </div>
                          <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1">
                            {project.year}
                          </span>
                        </div>
                      </motion.div>

                      {/* Bottom line */}
                      <motion.div
                        className="h-px bg-accent origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredProject === project.id ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      />
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
                className="text-center py-20 border border-border"
              >
                <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
              </motion.div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Projects;

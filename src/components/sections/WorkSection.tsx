import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedLine } from '@/components/AnimatedText';
import { projects } from '@/data/projects';

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to={`/work/${project.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="absolute inset-0"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Hover content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: isHovered ? 1 : 0, rotate: isHovered ? 0 : -45 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="w-20 h-20 rounded-full bg-accent flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent-foreground">
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 flex items-center gap-3">
            <span className="text-xs font-mono text-foreground/80 bg-background/80 backdrop-blur-sm px-2 py-1">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <motion.div
            className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-accent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-accent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Info */}
        <div className="pt-6 pb-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <motion.h3
                animate={{ x: isHovered ? 8 : 0 }}
                transition={{ duration: 0.3 }}
                className="font-syne font-bold text-xl md:text-2xl mb-2 group-hover:text-accent transition-colors duration-300"
              >
                {project.title}
              </motion.h3>
              <span className="text-muted-foreground">{project.category}</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1">
              {project.year}
            </span>
          </div>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="h-px bg-accent origin-left"
        />
      </Link>
    </motion.div>
  );
};

export const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" ref={ref} className="section-padding bg-secondary/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`v-line-${i}`}
            className="absolute top-0 bottom-0 w-px bg-foreground/5"
            style={{ left: `${25 * (i + 1)}%` }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 1.5 }}
          />
        ))}
      </div>

      {/* Floating shapes */}
      <motion.div
        className="absolute top-32 left-16 w-24 h-24 border border-accent/10"
        style={{ transform: 'rotate(45deg)' }}
        animate={{ rotate: [45, 90, 45] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-sm font-mono text-accent">03</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">SELECTED WORK</span>
            </motion.div>

            <AnimatedLine delay={0.3}>
              <h2 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1]">
                Projects that define our craft.
              </h2>
            </AnimatedLine>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              to="/work"
              className="group inline-flex items-center gap-3 px-6 py-3 border border-foreground/20 rounded-full hover:border-accent hover:bg-accent/5 transition-all duration-300"
            >
              <span className="font-medium">View All Projects</span>
              <motion.div
                className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300"
                whileHover={{ rotate: 45 }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:text-accent-foreground transition-colors">
                  <path
                    d="M2 10L10 2M10 2H4M10 2V8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;

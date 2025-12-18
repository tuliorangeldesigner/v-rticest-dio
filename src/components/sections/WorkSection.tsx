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
      data-cursor="view"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.19, 1, 0.22, 1] }}
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
          
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="w-24 h-24 rounded-full bg-accent flex items-center justify-center"
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
            </motion.span>
          </motion.div>

          {/* Number Badge */}
          <div className="absolute top-6 left-6">
            <span className="label text-foreground/60">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="pt-6 flex items-start justify-between">
          <div>
            <motion.h3
              animate={{ x: isHovered ? 10 : 0 }}
              transition={{ duration: 0.3 }}
              className="heading-md mb-2"
            >
              {project.title}
            </motion.h3>
            <span className="body-md text-muted-foreground">{project.category}</span>
          </div>
          <span className="label text-muted-foreground">{project.year}</span>
        </div>

        {/* Underline Animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="h-px bg-accent mt-6 origin-left"
        />
      </Link>
    </motion.div>
  );
};

export const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" ref={ref} className="section-padding bg-secondary/20">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-20 gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <AnimatedLine delay={0.2}>
              <span className="label text-accent mb-6 block">Selected Work</span>
            </AnimatedLine>
            <AnimatedLine delay={0.4}>
              <h2 className="heading-xl">
                Projects that define our craft.
              </h2>
            </AnimatedLine>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              to="/work/luminary"
              className="link-hover text-foreground font-medium inline-flex items-center gap-2 group"
            >
              View All Projects
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M4 10H16M16 10L11 5M16 10L11 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;

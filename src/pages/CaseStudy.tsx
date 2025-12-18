import { useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProjectById, projects } from '@/data/projects';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import MagneticButton from '@/components/MagneticButton';
import { AnimatedLine } from '@/components/AnimatedText';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageTransition from '@/components/PageTransition';

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProjectById(id || '');

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="heading-xl mb-4">Project Not Found</h1>
          <Link to="/" className="text-accent link-hover">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const nextProject = getProjectById(project.nextProject);
  const prevProject = getProjectById(project.prevProject);

  return (
    <PageTransition>
      <Helmet>
        <title>{project.title} | STUDIO Case Study</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <CustomCursor />

      <SmoothScroll>
        <div className="noise-overlay" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="fixed top-8 left-6 md:left-12 z-50"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="label">Back</span>
          </button>
        </motion.div>

        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative h-screen flex items-end overflow-hidden"
        >
          {/* Background Image */}
          <motion.div
            style={{ scale: heroScale, y: heroY }}
            className="absolute inset-0"
          >
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </motion.div>

          {/* Hero Content */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="container-wide relative z-10 pb-16 md:pb-24"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="label text-accent mb-4 block"
            >
              {project.category} — {project.year}
            </motion.span>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="heading-display"
              >
                {project.title}
              </motion.h1>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent"
            />
          </motion.div>
        </motion.section>

        {/* Project Info */}
        <section ref={contentRef} className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: -30 }}
                animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="lg:col-span-4 space-y-8"
              >
                <div>
                  <span className="label text-muted-foreground mb-2 block">Client</span>
                  <p className="body-lg">{project.client}</p>
                </div>
                <div>
                  <span className="label text-muted-foreground mb-2 block">Year</span>
                  <p className="body-lg">{project.year}</p>
                </div>
                <div>
                  <span className="label text-muted-foreground mb-2 block">Services</span>
                  <ul className="space-y-1">
                    {project.services.map((service) => (
                      <li key={service} className="body-md">{service}</li>
                    ))}
                  </ul>
                </div>
              </motion.aside>

              {/* Main Content */}
              <div className="lg:col-span-8 space-y-16">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                >
                  <p className="heading-md text-balance">{project.description}</p>
                </motion.div>

                {/* Challenge */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                  <AnimatedLine>
                    <h2 className="heading-lg mb-6">The Challenge</h2>
                  </AnimatedLine>
                  <p className="body-lg text-muted-foreground">{project.challenge}</p>
                </motion.div>

                {/* Solution */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                  <AnimatedLine>
                    <h2 className="heading-lg mb-6">The Solution</h2>
                  </AnimatedLine>
                  <p className="body-lg text-muted-foreground">{project.solution}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-12 md:py-24">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-6">
              {project.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                  className={`relative overflow-hidden ${index === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}
                >
                  <img
                    src={image}
                    alt={`${project.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <AnimatedLine>
              <h2 className="heading-xl mb-16 text-center">The Results</h2>
            </AnimatedLine>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {project.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                  className="text-center"
                >
                  <span className="heading-md text-accent block mb-2">
                    {result.split(' ')[0]}
                  </span>
                  <span className="body-md text-muted-foreground">
                    {result.split(' ').slice(1).join(' ')}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Next Project Navigation */}
        <section className="py-24 md:py-32 border-t border-border">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              {/* Previous */}
              {prevProject && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center md:text-left"
                >
                  <span className="label text-muted-foreground mb-2 block">Previous</span>
                  <Link
                    to={`/work/${prevProject.id}`}
                    className="heading-md link-hover inline-flex items-center gap-3 group"
                  >
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
                    {prevProject.title}
                  </Link>
                </motion.div>
              )}

              {/* Divider */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden md:block w-px h-16 bg-border"
              />

              {/* Next */}
              {nextProject && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-center md:text-right"
                >
                  <span className="label text-muted-foreground mb-2 block">Next</span>
                  <Link
                    to={`/work/${nextProject.id}`}
                    className="heading-md link-hover inline-flex items-center gap-3 group"
                  >
                    {nextProject.title}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="section-padding border-t border-border">
          <div className="container-wide text-center">
            <AnimatedLine>
              <h2 className="heading-xl mb-8">Have a project in mind?</h2>
            </AnimatedLine>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <MagneticButton
                onClick={() => navigate('/#contact')}
                className="px-12 py-6 bg-accent text-accent-foreground font-syne font-semibold text-lg"
              >
                Let's Talk
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </SmoothScroll>
    </PageTransition>
  );
};

export default CaseStudy;

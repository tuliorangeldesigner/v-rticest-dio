import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { ArrowRight, Linkedin, Twitter } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MagneticButton from '@/components/MagneticButton';

const teamMembers = [
  {
    name: 'Alexandra Chen',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    bio: 'Former design lead at Google with 15+ years shaping digital experiences.',
    linkedin: '#',
    twitter: '#',
    number: '01',
  },
  {
    name: 'Marcus Williams',
    role: 'Head of Strategy',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Brand strategist who has worked with Fortune 500 companies worldwide.',
    linkedin: '#',
    twitter: '#',
    number: '02',
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Lead Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80',
    bio: 'Award-winning designer specializing in brand identity and digital products.',
    linkedin: '#',
    twitter: '#',
    number: '03',
  },
  {
    name: 'James Park',
    role: 'Technical Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Full-stack architect with a passion for performant, accessible web experiences.',
    linkedin: '#',
    twitter: '#',
    number: '04',
  },
  {
    name: 'Emma Thompson',
    role: 'Motion Designer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Bringing brands to life through animation and interactive storytelling.',
    linkedin: '#',
    twitter: '#',
    number: '05',
  },
  {
    name: 'David Kim',
    role: 'Senior Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    bio: 'React specialist focused on building scalable, maintainable applications.',
    linkedin: '#',
    twitter: '#',
    number: '06',
  },
];

const values = [
  {
    title: 'Craft Over Speed',
    description: 'We believe in taking the time to get things right. Quality and attention to detail are never sacrificed for quick deliveries.',
    icon: '◇',
    number: '01',
  },
  {
    title: 'Bold Simplicity',
    description: 'The best solutions are often the simplest. We strip away the unnecessary to reveal what truly matters.',
    icon: '○',
    number: '02',
  },
  {
    title: 'Honest Collaboration',
    description: 'We work as partners, not vendors. Open communication and transparency guide every relationship.',
    icon: '△',
    number: '03',
  },
  {
    title: 'Continuous Growth',
    description: 'The digital landscape evolves constantly. We stay curious, learning and adapting to serve our clients better.',
    icon: '□',
    number: '04',
  },
];

const milestones = [
  { year: '2018', event: 'Studio founded in San Francisco' },
  { year: '2019', event: 'First Awwwards recognition' },
  { year: '2020', event: 'Expanded to 10 team members' },
  { year: '2021', event: 'Opened remote-first operations globally' },
  { year: '2022', event: 'Reached 100+ completed projects' },
  { year: '2023', event: 'Named Top 50 Design Agency' },
  { year: '2024', event: 'Launched strategic partnerships program' },
];

const About = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroInView = useInView(heroRef, { once: true });
  const storyInView = useInView(storyRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });

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
        <section ref={heroRef} className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
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
            className="absolute top-32 right-[15%] w-24 h-24 border border-accent/20"
            style={{ transform: 'rotate(45deg)', x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          />
          <motion.div
            className="absolute bottom-20 left-[10%] w-4 h-4 bg-accent/30 rounded-full"
            style={{ x: mousePosition.x * -3, y: mousePosition.y * -3 }}
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
              <span className="text-sm font-mono text-muted-foreground tracking-wider">ABOUT US</span>
            </motion.div>

            <div className="max-w-5xl">
              {["We're a team of", 'dreamers &', 'makers'].map((text, index) => (
                <div key={text} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={heroInView ? { y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                    className={`font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] ${
                      index === 2 ? 'text-accent' : 'text-foreground'
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
              className="text-lg md:text-xl text-muted-foreground max-w-xl mt-8"
            >
              Founded in 2018, we&apos;ve grown from a small studio into a globally distributed team united by our passion for exceptional digital experiences.
            </motion.p>
          </div>
        </section>

        {/* Story Section */}
        <section ref={storyRef} className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px bg-foreground/5"
                style={{ left: `${25 * (i + 1)}%` }}
                initial={{ scaleY: 0 }}
                animate={storyInView ? { scaleY: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 1.2 }}
              />
            ))}
          </div>

          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-16"
            >
              <span className="text-sm font-mono text-accent">02</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">OUR STORY</span>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight">
                  Born from a belief that design can change everything
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Studio began in a small San Francisco apartment with a simple mission: 
                    to create digital experiences that truly matter. We were tired of seeing 
                    beautiful design sacrificed for speed, and meaningful strategy lost to trends.
                  </p>
                  <p>
                    Today, we work with forward-thinking brands across the globe, from ambitious 
                    startups to established enterprises. Our approach remains the same—every project 
                    receives our full attention, creativity, and strategic thinking.
                  </p>
                </div>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={storyInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="relative pl-12 group"
                    >
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-background border-2 border-accent/50 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <span className="text-accent font-syne font-bold text-lg">{milestone.year}</span>
                      <p className="text-muted-foreground mt-1">{milestone.event}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-24 md:py-32 relative overflow-hidden">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
            style={{ top: '20%', right: '-10%' }}
          />

          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={valuesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-sm font-mono text-accent">03</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">WHAT WE BELIEVE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-syne font-bold text-4xl md:text-5xl mb-16"
            >
              Our Values
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group relative p-8 border border-border/50 bg-card/30 hover:border-accent/30 hover:bg-accent/5 transition-all duration-500"
                >
                  <span className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/40 group-hover:text-accent transition-colors">
                    {value.number}
                  </span>
                  <motion.span 
                    className="text-4xl mb-6 block text-accent/60 group-hover:text-accent transition-colors"
                    whileHover={{ rotate: 180, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {value.icon}
                  </motion.span>
                  <h3 className="text-xl font-syne font-bold mb-3 group-hover:text-accent transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef} className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`grid-${i}`}
                className="absolute left-0 right-0 h-px bg-foreground/5"
                style={{ top: `${20 * (i + 1)}%` }}
                initial={{ scaleX: 0 }}
                animate={teamInView ? { scaleX: 1 } : {}}
                transition={{ delay: i * 0.05, duration: 1.2 }}
              />
            ))}
          </div>

          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={teamInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-sm font-mono text-accent">04</span>
              <div className="h-px w-12 bg-accent" />
              <span className="text-sm font-mono text-muted-foreground tracking-wider">THE PEOPLE</span>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-syne font-bold text-4xl md:text-5xl"
              >
                Meet Our Team
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-muted-foreground max-w-md"
              >
                A diverse group of thinkers, makers, and strategists united by our love for great design.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden mb-5 aspect-[4/5]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Number */}
                    <span className="absolute top-4 left-4 text-xs font-mono text-foreground/80 bg-background/80 backdrop-blur-sm px-2 py-1">
                      {member.number}
                    </span>

                    {/* Corner decoration */}
                    <motion.div
                      className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    />
                    
                    {/* Social Links */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <a 
                        href={member.linkedin}
                        className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a 
                        href={member.twitter}
                        className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-syne font-bold mb-1 group-hover:text-accent transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-accent text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="container-wide">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {[
                { number: '100+', label: 'Projects Completed' },
                { number: '50+', label: 'Happy Clients' },
                { number: '15+', label: 'Awards Won' },
                { number: '6', label: 'Years of Excellence' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group text-center p-6 border border-transparent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                >
                  <span className="text-4xl md:text-6xl font-syne font-bold text-foreground group-hover:text-accent transition-colors">
                    {stat.number}
                  </span>
                  <p className="text-muted-foreground mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-background/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          <div className="container-wide text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-mono text-accent mb-6 block">JOIN US</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
                Want to join our team?
              </h2>
              <p className="text-background/60 max-w-xl mx-auto mb-10">
                We're always looking for talented individuals who share our 
                passion for exceptional design. Check out our open positions.
              </p>
              <MagneticButton>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full"
                >
                  Get in Touch
                  <motion.div
                    className="w-6 h-6 rounded-full bg-accent-foreground/20 flex items-center justify-center"
                    whileHover={{ rotate: 45 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;

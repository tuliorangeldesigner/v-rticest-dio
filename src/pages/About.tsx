import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { ArrowRight, Linkedin, Twitter } from 'lucide-react';
import Footer from '@/components/Footer';
import MagneticButton from '@/components/MagneticButton';
import Navigation from '@/components/Navigation';

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
      <div className="min-h-screen bg-background" onMouseMove={handleMouseMove}>
        <Navigation />

        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
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
            className="absolute top-32 right-[10%] w-20 h-20 border border-accent/20"
            style={{ transform: 'rotate(45deg)', x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          />
          <motion.div
            className="absolute bottom-20 left-[15%] w-32 h-32 rounded-full border border-accent/10"
            style={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
          />

          {/* Accent orb */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
            style={{ top: '20%', right: '10%', x: mousePosition.x * 3, y: mousePosition.y * 3 }}
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
          <div className="container-wide relative z-10">
            {/* Narrative Header */}
            <div className="max-w-4xl mx-auto text-center mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <span className="text-sm font-mono text-accent">02</span>
                <div className="h-px w-12 bg-accent" />
                <span className="text-sm font-mono text-muted-foreground tracking-wider">OUR STORY</span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-syne font-bold text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
              >
                Born from a belief that design can change everything.
              </motion.h2>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 text-lg text-muted-foreground leading-relaxed"
              >
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
              </motion.div>
            </div>

            {/* Architectural Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 40 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="group relative pt-8 border-t border-border hover:border-accent transition-colors duration-500"
                >
                  <div className="flex flex-col gap-4">
                    <span className="text-5xl md:text-6xl font-syne font-bold text-foreground/20 group-hover:text-accent transition-colors duration-500">
                      {milestone.year}
                    </span>
                    <p className="text-foreground/80 font-medium leading-relaxed max-w-xs group-hover:text-foreground transition-colors duration-300">
                      {milestone.event}
                    </p>
                  </div>
                  
                  {/* Decorative dot */}
                  <div className="absolute top-[-5px] right-0 w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-24 md:py-32 relative overflow-hidden">
          <div className="container-wide mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-sm font-mono text-accent">03</span>
                <div className="h-px w-12 bg-accent" />
                <span className="text-sm font-mono text-muted-foreground tracking-wider">WHAT WE BELIEVE</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-syne font-bold">
                Principles that guide us.
              </h2>
            </motion.div>
          </div>

          <div className="w-full border-y border-border">
            <div className="flex flex-col lg:flex-row h-auto lg:h-[600px] divide-y lg:divide-y-0 lg:divide-x divide-border">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="group relative flex-1 p-8 lg:p-12 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-[3] bg-background hover:bg-accent/5 overflow-hidden flex flex-col justify-between min-h-[300px] lg:min-h-0"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-mono text-accent">
                      {value.number}
                    </span>
                    <span className="text-3xl text-foreground/20 group-hover:text-accent transition-colors duration-500 transform group-hover:rotate-180">
                      {value.icon}
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className="text-2xl lg:text-4xl font-syne font-bold mb-4 whitespace-nowrap group-hover:text-accent transition-colors duration-300">
                      {value.title}
                    </h3>
                    <div className="lg:max-w-md lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-8 lg:group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef} className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
          <div className="container-wide relative z-10">
            {/* Centered Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 md:mb-24"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-sm font-mono text-accent">04</span>
                <div className="h-px w-12 bg-accent" />
                <span className="text-sm font-mono text-muted-foreground tracking-wider">THE PEOPLE</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-syne font-bold max-w-3xl mx-auto leading-tight">
                Meet the dreamers & makers behind the screens.
              </h2>
            </motion.div>

            {/* Horizontal Scroll Gallery */}
            <div className="relative">
              {/* Fade masks for scroll indicators */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background/50 to-transparent z-10 pointer-events-none md:hidden" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background/50 to-transparent z-10 pointer-events-none md:hidden" />

              <motion.div 
                className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scrollbar-none -mx-6 px-6 md:mx-0 md:px-0"
                initial={{ opacity: 0, x: 50 }}
                animate={teamInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {teamMembers.map((member, index) => (
                  <div
                    key={member.name}
                    className="flex-none w-[280px] md:w-[360px] snap-center group relative overflow-hidden rounded-sm cursor-pointer"
                  >
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-xs font-mono text-accent mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          {member.role}
                        </span>
                        <h3 className="text-2xl font-syne font-bold text-white mb-2">
                          {member.name}
                        </h3>
                        <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                          {member.bio}
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                          <a href={member.linkedin} className="text-white hover:text-accent transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </a>
                          <a href={member.twitter} className="text-white hover:text-accent transition-colors">
                            <Twitter className="w-5 h-5" />
                          </a>
                        </div>
                      </div>

                      {/* Number Top Right */}
                      <span className="absolute top-4 right-4 text-xs font-mono text-white/50 border border-white/20 px-2 py-1 rounded-full">
                        {member.number}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              {[
                { number: '100', suffix: '+', label: 'Projects' },
                { number: '50', suffix: '+', label: 'Clients' },
                { number: '15', suffix: '+', label: 'Awards' },
                { number: '06', suffix: '', label: 'Years' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
                  className="group aspect-square rounded-full border border-border flex flex-col items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-500 cursor-default relative overflow-hidden"
                >
                  <div className="relative z-10 text-center">
                    <div className="flex items-start justify-center gap-1 leading-none">
                      <span className="text-4xl md:text-6xl font-syne font-bold tracking-tighter">
                        {stat.number}
                      </span>
                      <span className="text-2xl md:text-3xl font-syne font-medium text-accent group-hover:text-background transition-colors duration-500">
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="text-xs font-mono uppercase tracking-widest mt-3 text-muted-foreground group-hover:text-background/70 transition-colors duration-500">
                      {stat.label}
                    </p>
                  </div>
                  
                  {/* Ripple effect circle */}
                  <div className="absolute inset-0 rounded-full border border-accent/0 group-hover:border-accent/50 group-hover:scale-110 transition-all duration-700" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-foreground/10"
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
              <p className="text-muted-foreground max-w-xl mx-auto mb-10">
                We're always looking for talented individuals who share our 
                passion for exceptional design. Check out our open positions.
              </p>
              <MagneticButton>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full"
                >
                  Get in Touch
                  <motion.div
                    className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center"
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
  );
};

export default About;

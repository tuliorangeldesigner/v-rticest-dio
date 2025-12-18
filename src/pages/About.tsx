import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Linkedin, Twitter } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import Breadcrumbs from '@/components/Breadcrumbs';

const teamMembers = [
  {
    name: 'Alexandra Chen',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    bio: 'Former design lead at Google with 15+ years shaping digital experiences.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Marcus Williams',
    role: 'Head of Strategy',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Brand strategist who has worked with Fortune 500 companies worldwide.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Lead Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80',
    bio: 'Award-winning designer specializing in brand identity and digital products.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'James Park',
    role: 'Technical Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Full-stack architect with a passion for performant, accessible web experiences.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Emma Thompson',
    role: 'Motion Designer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Bringing brands to life through animation and interactive storytelling.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'David Kim',
    role: 'Senior Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    bio: 'React specialist focused on building scalable, maintainable applications.',
    linkedin: '#',
    twitter: '#',
  },
];

const values = [
  {
    title: 'Craft Over Speed',
    description: 'We believe in taking the time to get things right. Quality and attention to detail are never sacrificed for quick deliveries.',
    icon: '✦',
  },
  {
    title: 'Bold Simplicity',
    description: 'The best solutions are often the simplest. We strip away the unnecessary to reveal what truly matters.',
    icon: '◯',
  },
  {
    title: 'Honest Collaboration',
    description: 'We work as partners, not vendors. Open communication and transparency guide every relationship.',
    icon: '△',
  },
  {
    title: 'Continuous Growth',
    description: 'The digital landscape evolves constantly. We stay curious, learning and adapting to serve our clients better.',
    icon: '□',
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
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-4xl"
          >
            <h1 className="heading-xl mb-6">
              We're a team of<br />
              <span className="text-accent">dreamers & makers</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl">
              Founded in 2018, we've grown from a small studio into a 
              globally distributed team united by our passion for exceptional 
              digital experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 bg-foreground/[0.02] border-y border-foreground/10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent text-sm uppercase tracking-widest mb-4 block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-syne font-bold mb-6">
                Born from a belief that design can change everything
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
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
                <p>
                  We believe the best work happens when strategy and creativity collide, when 
                  constraints become opportunities, and when clients become collaborators.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute left-4 top-0 bottom-0 w-px bg-foreground/10" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-accent font-syne font-bold text-lg">{milestone.year}</span>
                    <p className="text-foreground/70 mt-1">{milestone.event}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-accent text-sm uppercase tracking-widest mb-4 block">
              What We Believe
            </span>
            <h2 className="text-3xl md:text-4xl font-syne font-bold">
              Our Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20 transition-colors"
              >
                <span className="text-4xl mb-6 block">{value.icon}</span>
                <h3 className="text-xl font-syne font-bold mb-3">{value.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32 bg-foreground/[0.02] border-y border-foreground/10">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-accent text-sm uppercase tracking-widest mb-4 block">
              The People
            </span>
            <h2 className="text-3xl md:text-4xl font-syne font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              A diverse group of thinkers, makers, and strategists 
              united by our love for great design.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl mb-5 aspect-[4/5]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <a 
                      href={member.linkedin}
                      className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-accent hover:text-background transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a 
                      href={member.twitter}
                      className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-accent hover:text-background transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-xl font-syne font-bold mb-1">{member.name}</h3>
                <p className="text-accent text-sm mb-2">{member.role}</p>
                <p className="text-foreground/60 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32">
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
                className="text-center"
              >
                <span className="text-4xl md:text-6xl font-syne font-bold text-accent">
                  {stat.number}
                </span>
                <p className="text-foreground/60 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-syne font-bold mb-6">
              Want to join our team?
            </h2>
            <p className="text-background/60 max-w-xl mx-auto mb-10">
              We're always looking for talented individuals who share our 
              passion for exceptional design. Check out our open positions.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background font-medium rounded-full hover:bg-accent/90 transition-colors"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/10 py-8 bg-background">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-syne font-bold">STUDIO<span className="text-accent">.</span></span>
          <span className="text-sm text-foreground/50">© 2024 All rights reserved.</span>
        </div>
      </footer>
      </div>
    </PageTransition>
  );
};

export default About;

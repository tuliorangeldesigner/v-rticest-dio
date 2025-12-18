import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import MagneticButton from '@/components/MagneticButton';
import TrustBadges from '@/components/TrustBadges';
import ClientLogos from '@/components/ClientLogos';
import NewsletterForm from '@/components/NewsletterForm';

const footerLinks = {
  navigation: [
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Web Design', href: '/services#web-design' },
    { name: 'Branding', href: '/services#branding' },
    { name: 'UI/UX Design', href: '/services#ui-ux' },
    { name: 'Development', href: '/services#development' },
  ],
  social: [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'Dribbble', href: 'https://dribbble.com' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ],
};

export const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 30);
      mouseY.set((clientY / innerHeight - 0.5) * 30);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-20 right-40 w-16 h-16 border border-primary/10 rotate-45"
        style={{ x: smoothX, y: smoothY }}
      />
      <motion.div
        className="absolute top-1/2 left-20 w-12 h-12 bg-accent/5 rounded-full"
        style={{ x: smoothX, y: smoothY }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-8 h-8 border border-accent/20"
        style={{ x: smoothX, y: smoothY }}
      />

      {/* Client Logos Section */}
      <div className="relative py-20 border-b border-border">
        <div className="container-wide">
          <ClientLogos />
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative py-20 md:py-24 border-b border-border">
        {/* Section background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container-wide relative">
          {/* Section Number */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-xs font-mono text-primary tracking-wider">08</span>
            <div className="w-12 h-[1px] bg-primary/30" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Newsletter</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Decorative line */}
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-primary/50 to-transparent mx-auto mb-8" />
            
            <h3 className="text-3xl md:text-4xl font-syne font-bold mb-4 tracking-tight">
              Stay in the <span className="text-primary">loop</span>
            </h3>
            <p className="text-muted-foreground mb-10 font-mono text-sm">
              Get the latest insights, trends, and inspiration delivered straight to your inbox.
            </p>
            <NewsletterForm variant="inline" />
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative py-20 md:py-28">
        <div className="container-wide">
          {/* Time display */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="absolute top-8 right-8 hidden lg:block"
          >
            <div className="text-right">
              <p className="text-xs font-mono text-muted-foreground mb-1">LOCAL TIME</p>
              <p className="text-sm font-mono text-primary">
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-12 mb-20">
            {/* Logo & Tagline */}
            <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link to="/" className="group inline-block mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <span className="font-syne text-lg font-bold text-primary">S</span>
                    </div>
                    <span className="font-syne text-2xl font-bold tracking-tight">
                      STUDIO<span className="text-accent">.</span>
                    </span>
                  </div>
                </Link>
                
                <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
                  A creative digital agency crafting immersive experiences 
                  that captivate and inspire. We transform ideas into 
                  remarkable digital realities.
                </p>
                
                <MagneticButton className="group relative px-8 py-4 bg-foreground text-background font-syne font-bold overflow-hidden">
                  <div className="absolute inset-0 bg-primary translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative flex items-center gap-2">
                    Start a Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-primary">01</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  Links
                </span>
              </div>
              <ul className="space-y-4">
                {footerLinks.navigation.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className="group text-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      <span className="w-0 h-[1px] bg-primary group-hover:w-4 transition-all duration-300" />
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-primary">02</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  Services
                </span>
              </div>
              <ul className="space-y-4">
                {footerLinks.services.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className="group text-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      <span className="w-0 h-[1px] bg-primary group-hover:w-4 transition-all duration-300" />
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-primary">03</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  Social
                </span>
              </div>
              <ul className="space-y-4">
                {footerLinks.social.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group text-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      <span className="w-0 h-[1px] bg-primary group-hover:w-4 transition-all duration-300" />
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-primary">04</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  Contact
                </span>
              </div>
              <div className="space-y-4">
                <motion.a
                  href="mailto:hello@studio.com"
                  whileHover={{ x: 5 }}
                  className="group flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 border border-border group-hover:border-primary/50 flex items-center justify-center transition-colors">
                    <Mail className="w-3 h-3" />
                  </div>
                  <span className="text-sm">hello@studio.com</span>
                </motion.a>
                <motion.a
                  href="tel:+1234567890"
                  whileHover={{ x: 5 }}
                  className="group flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 border border-border group-hover:border-primary/50 flex items-center justify-center transition-colors">
                    <Phone className="w-3 h-3" />
                  </div>
                  <span className="text-sm">+1 (234) 567-890</span>
                </motion.a>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3 h-3" />
                  </div>
                  <span className="text-sm">
                    123 Creative Street<br />
                    New York, NY 10001
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative py-10 border-y border-border mb-10"
          >
            {/* Section label */}
            <div className="absolute -top-3 left-0 bg-card px-4">
              <span className="text-xs font-mono text-primary">CREDENTIALS</span>
            </div>
            <TrustBadges variant="horizontal" />
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-primary animate-pulse" />
              <p className="text-sm text-muted-foreground font-mono">
                © {new Date().getFullYear()} STUDIO. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group text-sm text-muted-foreground hover:text-primary transition-colors font-mono flex items-center gap-2"
              >
                Back to Top
                <span className="inline-block group-hover:-translate-y-1 transition-transform">↑</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  );
};

export default Footer;
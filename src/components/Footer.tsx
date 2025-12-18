import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MagneticButton from '@/components/MagneticButton';
import TrustBadges from '@/components/TrustBadges';

const footerLinks = {
  navigation: [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ],
  social: [
    { name: 'Instagram', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Dribbble', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ],
};

export const Footer = () => {
  return (
    <footer className="py-16 md:py-24 border-t border-border">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="md:col-span-5">
            <a href="#" className="font-syne text-2xl font-bold tracking-tight inline-block mb-6">
              STUDIO<span className="text-accent">.</span>
            </a>
            <p className="body-md text-muted-foreground max-w-sm mb-8">
              A creative digital agency crafting immersive experiences 
              that captivate and inspire.
            </p>
            <MagneticButton className="px-8 py-4 bg-foreground text-background font-medium hover:bg-accent transition-colors duration-300">
              Start a Project
            </MagneticButton>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <span className="label text-muted-foreground mb-6 block">Navigation</span>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="link-hover text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <span className="label text-muted-foreground mb-6 block">Social</span>
            <ul className="space-y-4">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="link-hover text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <span className="label text-muted-foreground mb-6 block">Get in Touch</span>
            <div className="space-y-4">
              <a
                href="mailto:hello@studio.com"
                className="link-hover block text-foreground/80 hover:text-foreground transition-colors"
              >
                hello@studio.com
              </a>
              <a
                href="tel:+1234567890"
                className="link-hover block text-foreground/80 hover:text-foreground transition-colors"
              >
                +1 (234) 567-890
              </a>
              <p className="text-muted-foreground">
                123 Creative Street<br />
                New York, NY 10001
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mb-12">
          <TrustBadges variant="horizontal" />
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} STUDIO. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

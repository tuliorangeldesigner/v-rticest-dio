import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Work', href: '/work', isRoute: true },
  { name: 'About', href: '/about', isRoute: true },
  { name: 'Services', href: '/services', isRoute: true },
  { name: 'Blog', href: '/blog', isRoute: true },
  { name: 'Contact', href: '/contact', isRoute: true },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-4' : 'py-6 md:py-8'
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          <Link to="/" className="font-syne text-xl md:text-2xl font-bold tracking-tight">
            STUDIO<span className="text-accent">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="link-hover text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
            <MagneticButton className="px-6 py-3 bg-foreground text-background text-sm font-medium hover:bg-accent transition-colors duration-300">
              <Link to="/contact">Let's Talk</Link>
            </MagneticButton>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-foreground origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-foreground"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-foreground origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="heading-md text-foreground"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WorkSection from '@/components/sections/WorkSection';
import ProcessSection from '@/components/sections/ProcessSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Helmet>
        <title>STUDIO | Award-Winning Digital Agency</title>
        <meta name="description" content="A creative digital studio crafting immersive digital products, brands, and experiences that captivate and inspire. Web design, branding, and digital marketing." />
        <meta name="keywords" content="digital agency, web design, branding, creative studio, UI/UX design, web development" />
        <link rel="canonical" href="https://studio.com" />
      </Helmet>

      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SmoothScroll>
          {/* Noise overlay for texture */}
          <div className="noise-overlay" />
          
          <Navigation />
          
          <main>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <WorkSection />
            <ProcessSection />
            <TestimonialsSection />
            <CTASection />
          </main>
          
          <Footer />
        </SmoothScroll>
      </motion.div>
    </>
  );
};

export default Index;

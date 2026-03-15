import { motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { OrganizationSchema, WebsiteSchema, ProfessionalServiceSchema } from '@/components/StructuredData';
import DeferredSection from '@/components/DeferredSection';

const CustomCursor = lazy(() => import('@/components/CustomCursor'));
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const ServicesSection = lazy(() => import('@/components/sections/ServicesSection'));
const WorkSection = lazy(() => import('@/components/sections/WorkSection'));
const ProcessSection = lazy(() => import('@/components/sections/ProcessSection'));
const TestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection'));
const CTASection = lazy(() => import('@/components/sections/CTASection'));

const SectionFallback = ({ className, minHeight }: { className?: string; minHeight: string }) => (
  <div className={className} style={{ minHeight }} aria-hidden="true" />
);

const Index = () => {
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateCursor = () => setShowCustomCursor(mediaQuery.matches);

    updateCursor();
    mediaQuery.addEventListener('change', updateCursor);

    return () => mediaQuery.removeEventListener('change', updateCursor);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="TR Designer"
        description="Estúdio criativo focado em branding, websites e performance para marcas que querem crescer com percepção premium."
        image="https://trdesigner.vercel.app/dc2.webp"
        url="https://trdesigner.vercel.app/"
      />
      <OrganizationSchema />
      <WebsiteSchema />
      <ProfessionalServiceSchema />

      {showCustomCursor ? (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      ) : null}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="noise-overlay" />

        <Navigation />

        <main>
          <HeroSection />
          <DeferredSection className="bg-secondary/30" minHeight="980px">
            <Suspense fallback={<SectionFallback className="bg-secondary/30" minHeight="980px" />}>
              <AboutSection />
            </Suspense>
          </DeferredSection>
          <DeferredSection className="bg-background" minHeight="1100px">
            <Suspense fallback={<SectionFallback className="bg-background" minHeight="1100px" />}>
              <ServicesSection />
            </Suspense>
          </DeferredSection>
          <DeferredSection className="bg-secondary/30" minHeight="1180px">
            <Suspense fallback={<SectionFallback className="bg-secondary/30" minHeight="1180px" />}>
              <WorkSection />
            </Suspense>
          </DeferredSection>
          <DeferredSection className="bg-background" minHeight="980px">
            <Suspense fallback={<SectionFallback className="bg-background" minHeight="980px" />}>
              <ProcessSection />
            </Suspense>
          </DeferredSection>
          <DeferredSection className="bg-secondary/30" minHeight="980px">
            <Suspense fallback={<SectionFallback className="bg-secondary/30" minHeight="980px" />}>
              <TestimonialsSection />
            </Suspense>
          </DeferredSection>
          <DeferredSection className="bg-background" minHeight="720px">
            <Suspense fallback={<SectionFallback className="bg-background" minHeight="720px" />}>
              <CTASection />
            </Suspense>
          </DeferredSection>
        </main>

        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;

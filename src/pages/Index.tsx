import { lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { OrganizationSchema, WebsiteSchema, ProfessionalServiceSchema } from '@/components/StructuredData';
import DeferredSection from '@/components/DeferredSection';
import ConditionalCustomCursor from '@/components/ConditionalCustomCursor';

const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const ServicesSection = lazy(() => import('@/components/sections/ServicesSection'));
const WorkSection = lazy(() => import('@/components/sections/WorkSection'));
const ProcessSection = lazy(() => import('@/components/sections/ProcessSection'));
const TestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection'));
const FAQSection = lazy(() => import('@/components/sections/FAQSection'));
const CTASection = lazy(() => import('@/components/sections/CTASection'));

const SectionFallback = ({ className, minHeight }: { className?: string; minHeight: string }) => (
  <div className={className} style={{ minHeight }} aria-hidden="true" />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Branding, Sites e Criativos de Performance"
        description="Sou Túlio Rangel, designer estratégico à frente da TR Designer. Crio identidades visuais, sites de alta conversão e criativos de performance para marcas que querem crescer com autoridade."
        image="/dc2-social.jpg"
        url="/"
      />
      <OrganizationSchema />
      <WebsiteSchema />
      <ProfessionalServiceSchema />
      <ConditionalCustomCursor />

      <div>
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
          <DeferredSection className="bg-secondary/30" minHeight="960px">
            <Suspense fallback={<SectionFallback className="bg-secondary/30" minHeight="960px" />}>
              <FAQSection />
            </Suspense>
          </DeferredSection>
          <DeferredSection className="bg-background" minHeight="720px">
            <Suspense fallback={<SectionFallback className="bg-background" minHeight="720px" />}>
              <CTASection />
            </Suspense>
          </DeferredSection>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;

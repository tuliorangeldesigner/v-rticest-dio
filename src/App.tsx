import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useMemo } from "react";
import BackToTop from "./components/BackToTop";
import SmoothScroll from "./components/SmoothScroll";
import DeferredAnalytics from "./components/DeferredAnalytics";
import GoogleAdSense from "./components/GoogleAdSense";
import { LanguageProvider } from "@/lib/language";

const Toaster = lazy(() => import("@/components/ui/toaster").then((module) => ({ default: module.Toaster })));
const PortfolioAssistant = lazy(() => import("@/components/PortfolioAssistant"));
const SiteAnalyticsTracker = lazy(() => import("@/components/SiteAnalyticsTracker"));
const Index = lazy(() => import("./pages/Index"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Thumbnail = lazy(() => import("./pages/Thumbnail"));
const LogosEsport = lazy(() => import("./pages/LogosEsport"));
const DropBanners = lazy(() => import("./pages/DropBanners"));
const EsportsVariados = lazy(() => import("./pages/EsportsVariados"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectCategory = lazy(() => import("./pages/ProjectCategory"));
const Contact = lazy(() => import("./pages/Contact"));
const Diagnosis = lazy(() => import("./pages/Diagnosis"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const SeoService = lazy(() => import("./pages/SeoService"));
const WebDesign = lazy(() => import("./pages/WebDesign"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ClientPortal = lazy(() => import("./pages/ClientPortal"));
const AlgorithmPortal = lazy(() => import("./pages/AlgorithmPortal"));
const ClariceNejarBriefing = lazy(() => import("./pages/ClariceNejarBriefing"));
const MdfTransportesBriefing = lazy(() => import("./pages/MdfTransportesBriefing"));
const MichelQueirozAssisBriefing = lazy(() => import("./pages/MichelQueirozAssisBriefing"));
const TarggLogisticaBriefing = lazy(() => import("./pages/TarggLogisticaBriefing"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AnalyticsAdmin = lazy(() => import("./pages/AnalyticsAdmin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const router = useMemo(
    () => (
      <BrowserRouter>
        <SmoothScroll>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/work" element={<Projects />} />
              <Route path="/work/logos" element={<ProjectCategory />} />
              <Route path="/work/sites" element={<ProjectCategory />} />
              <Route path="/work/social-media" element={<ProjectCategory />} />
              <Route path="/work/video" element={<ProjectCategory />} />
              <Route path="/thumbnail" element={<Thumbnail />} />
              <Route path="/logos-e-sport" element={<LogosEsport />} />
              <Route path="/banners-ecommerce-dropshipping" element={<DropBanners />} />
              <Route path="/e-sports-variados" element={<EsportsVariados />} />
              <Route path="/work/:id" element={<CaseStudy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/diagnostico" element={<Diagnosis />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/servicos/:slug" element={<SeoService />} />
              <Route path="/webdesign" element={<WebDesign />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/briefing/clarice-nejar" element={<ClariceNejarBriefing />} />
              <Route path="/briefing/mdf-transportes" element={<MdfTransportesBriefing />} />
              <Route path="/briefing/michel-queiroz-assis" element={<MichelQueirozAssisBriefing />} />
              <Route path="/briefing/targglogistica" element={<TarggLogisticaBriefing />} />
              <Route path="/targglogistica" element={<TarggLogisticaBriefing />} />
              <Route path="/portal/algoritmo" element={<AlgorithmPortal />} />
              <Route path="/portal/:slug" element={<ClientPortal />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/admin/analytics" element={<AnalyticsAdmin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BackToTop />
            <SiteAnalyticsTracker />
            <PortfolioAssistant />
          </Suspense>
        </SmoothScroll>
      </BrowserRouter>
    ),
    []
  );

  return (
    <HelmetProvider>
      <TooltipProvider>
        <LanguageProvider>
          <GoogleAdSense />
          <Suspense fallback={null}>
            <Toaster />
          </Suspense>
          {router}
          <DeferredAnalytics />
        </LanguageProvider>
      </TooltipProvider>
    </HelmetProvider>
  );
};

export default App;

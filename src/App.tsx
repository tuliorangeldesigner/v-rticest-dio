import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import BackToTop from "./components/BackToTop";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";

const Index = lazy(() => import("./pages/Index"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ClientPortal = lazy(() => import("./pages/ClientPortal"));
const AlgorithmPortal = lazy(() => import("./pages/AlgorithmPortal"));
const ClariceNejarBriefing = lazy(() => import("./pages/ClariceNejarBriefing"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const getInitialLoadingState = () => {
  try {
    return sessionStorage.getItem("preloader-seen") !== "true";
  } catch {
    return true;
  }
};

const App = () => {
  const [isLoading, setIsLoading] = useState(getInitialLoadingState);
  const router = useMemo(
    () => (
      <BrowserRouter>
        <SmoothScroll>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/work" element={<Projects />} />
              <Route path="/work/:id" element={<CaseStudy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/briefing/clarice-nejar" element={<ClariceNejarBriefing />} />
              <Route path="/portal/algoritmo" element={<AlgorithmPortal />} />
              <Route path="/portal/:slug" element={<ClientPortal />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BackToTop />
          </Suspense>
        </SmoothScroll>
      </BrowserRouter>
    ),
    []
  );

  const handlePreloaderComplete = () => {
    try {
      sessionStorage.setItem("preloader-seen", "true");
    } catch {
      // ignore
    }
    setIsLoading(false);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <AnimatePresence mode="wait">
            {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
          </AnimatePresence>

          {router}
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;

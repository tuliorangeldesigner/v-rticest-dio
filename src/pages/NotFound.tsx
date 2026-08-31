import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Página não encontrada"
        description="A página solicitada não foi encontrada no site da TR Designer."
        url={location.pathname}
        robots="noindex, nofollow"
      />
      <Navigation />
      <div className="flex min-h-[80vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Ops! Página não encontrada</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Voltar para a Home
        </a>
      </div>
      </div>
    </div>
  );
};

export default NotFound;

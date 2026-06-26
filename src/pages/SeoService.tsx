import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from '@/components/StructuredData';
import { getSeoService } from '@/data/seoServices';
import NotFound from './NotFound';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.tuliorangeldesigner.com.br').replace(/\/$/, '');

const SeoService = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getSeoService(slug || '');

  if (!service) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <SEO title={service.title} description={service.description} url={`/servicos/${service.slug}`} />
      <ServiceSchema name={service.title} description={service.description} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: SITE_URL },
        { name: 'Serviços', url: `${SITE_URL}/services` },
        { name: service.title, url: `${SITE_URL}/servicos/${service.slug}` },
      ]} />
      <FaqSchema items={service.faqs} />
      <Navigation />
      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <section className="container-wide mb-16 md:mb-24">
          <p className="mb-6 text-sm font-mono tracking-wider text-accent">SERVIÇO</p>
          <h1 className="mb-6 max-w-5xl font-epic text-4xl font-black uppercase leading-[1.05] sm:text-5xl md:text-7xl">{service.title}</h1>
          <p className="max-w-4xl text-lg leading-relaxed text-muted-foreground">{service.introduction}</p>
        </section>
        <section className="container-wide grid gap-6 md:grid-cols-3">
          {service.sections.map((section) => <article key={section.title} className="border border-border/60 bg-card/20 p-8"><h2 className="mb-4 font-syne text-2xl font-bold">{section.title}</h2><p className="leading-relaxed text-muted-foreground">{section.content}</p></article>)}
        </section>
        <section className="container-wide mt-16 md:mt-20">
          <h2 className="mb-8 font-syne text-3xl font-bold md:text-4xl">Perguntas frequentes</h2>
          <div className="grid gap-4">
            {service.faqs.map((faq) => <article key={faq.question} className="border border-border/60 p-6"><h3 className="mb-3 font-syne text-xl font-bold">{faq.question}</h3><p className="leading-relaxed text-muted-foreground">{faq.answer}</p></article>)}
          </div>
        </section>
        <section className="container-wide mt-16 md:mt-20"><div className="flex flex-col justify-between gap-6 border border-border/60 p-8 md:flex-row md:items-center"><div><p className="mb-2 text-sm font-mono tracking-wider text-accent">PRÓXIMO PASSO</p><h2 className="font-syne text-2xl font-bold md:text-4xl">Vamos entender o momento da sua empresa.</h2></div><Link to={service.primaryService} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-black">{service.primaryServiceLabel}<ArrowRight className="h-4 w-4" /></Link></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default SeoService;

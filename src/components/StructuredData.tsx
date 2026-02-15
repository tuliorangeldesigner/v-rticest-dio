import { Helmet } from 'react-helmet-async';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://verticestudio.vercel.app').replace(/\/$/, '');

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  socialLinks?: string[];
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo?: string;
  };
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: string;
  areaServed?: string;
  priceRange?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

// Organization Schema - for the agency
export const OrganizationSchema = ({
  name = 'Vértice Studio™',
  url = SITE_URL,
  logo = `${SITE_URL}/favicon.svg`,
  description = 'Branding estratégico, sites de alta conversão e criativos orientados por performance para marcas que querem crescer com percepção premium.',
  email = 'tuliorangeldesigner@gmail.com',
  address = {
    streetAddress: 'Morretes',
    addressLocality: 'Morretes',
    addressRegion: 'PR',
    postalCode: '83350-000',
    addressCountry: 'BR',
  },
  socialLinks = [
    'https://www.linkedin.com/in/t%C3%BAlio-rangel-designer1/',
    'https://www.instagram.com/tulio_rangel_designer/',
  ],
}: OrganizationSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    email,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    sameAs: socialLinks,
    contactPoint: {
      '@type': 'ContactPoint',
      email,
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: ['Portuguese'],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Article Schema - for blog posts
export const ArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher = {
    name: 'Vértice Studio™',
    logo: `${SITE_URL}/favicon.svg`,
  },
}: ArticleSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': typeof window !== 'undefined' ? window.location.href : SITE_URL,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Service Schema - for services page
export const ServiceSchema = ({
  name,
  description,
  provider = 'Vértice Studio™',
  areaServed = 'BR',
  priceRange = '$$$',
}: ServiceSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    areaServed,
    priceRange,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Breadcrumb Schema
export const BreadcrumbSchema = ({ items }: { items: BreadcrumbItem[] }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// WebSite Schema
export const WebsiteSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vértice Studio™',
    url: SITE_URL,
    description: 'Branding estratégico, sites de alta conversão e criativos orientados por performance.',
    inLanguage: 'pt-BR',
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Professional Service Schema - for agency homepage
export const ProfessionalServiceSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Vértice Studio™',
    image: `${SITE_URL}/og-vertice.webp`,
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: '+55-41-98744-8273',
    email: 'tuliorangeldesigner@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Morretes',
      addressLocality: 'Morretes',
      addressRegion: 'PR',
      postalCode: '83350-000',
      addressCountry: 'BR',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    areaServed: 'BR',
    priceRange: '$$$',
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

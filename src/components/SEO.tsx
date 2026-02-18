import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  robots?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://verticestudio.vercel.app').replace(/\/$/, '');

const defaultMeta = {
  siteName: 'TR Designer',
  title: 'TR Designer',
  description: 'Branding estratégico, sites de alta conversão e criativos orientados por performance para marcas que querem crescer com percepção premium.',
  image: `${SITE_URL}/og-vertice.jpg`,
  url: SITE_URL,
  twitterHandle: '@verticestudio',
  locale: 'pt_BR',
  language: 'pt-BR',
};

const SEO = ({
  title,
  description = defaultMeta.description,
  image = defaultMeta.image,
  url,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${defaultMeta.siteName}` : defaultMeta.title;
  const resolvedUrl = url
    ? (url.startsWith('http') ? url : `${defaultMeta.url}${url.startsWith('/') ? url : `/${url}`}`)
    : (typeof window !== 'undefined' ? `${defaultMeta.url}${window.location.pathname}` : defaultMeta.url);
  const resolvedImage = image.startsWith('http')
    ? image
    : `${defaultMeta.url}${image.startsWith('/') ? image : `/${image}`}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="author" content={author || defaultMeta.siteName} />
      <meta name="robots" content={robots} />
      <meta name="language" content={defaultMeta.language} />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={resolvedUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:locale" content={defaultMeta.locale} />

      {/* Article specific (for blog posts) */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={resolvedUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      <meta name="twitter:site" content={defaultMeta.twitterHandle} />
      <meta name="twitter:creator" content={defaultMeta.twitterHandle} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#0a0a0a" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Helmet>
  );
};

export default SEO;



import { en } from '@/content/en';
import { es } from '@/content/es';
import { site } from '@/content/site';

export const dynamic = 'force-static';

// A description of the public website, not an API catalog.
export function GET() {
  const description = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: en.meta.description,
    inLanguage: ['en', 'es'],
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      sameAs: [site.instagram],
    },
    hasPart: [
      { '@type': 'WebPage', url: `${site.url}/en`, name: en.meta.title, inLanguage: 'en' },
      { '@type': 'WebPage', url: `${site.url}/es`, name: es.meta.title, inLanguage: 'es' },
    ],
    about: en.sessions.items.map(session => ({
      '@type': 'Service',
      name: session.title,
      description: session.description,
      serviceType: 'Janzu aquatic bodywork',
      areaServed: { '@type': 'Place', name: 'Riviera Maya, Mexico' },
    })),
  };

  return new Response(JSON.stringify(description), {
    headers: { 'Content-Type': 'application/ld+json; charset=utf-8' },
  });
}

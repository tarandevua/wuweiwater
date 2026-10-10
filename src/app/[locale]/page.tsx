import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, languages, locales } from '@/content/i18n';
import { offerings, site } from '@/content/site';
import { Landing } from '@/components/landing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const c = languages[locale].dictionary;
  const image = `/media/share-${locale}.png`;
  return {
    metadataBase: new URL(site.url),
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map(code => [code, `/${code}`])),
        'x-default': '/en',
      },
    },
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      url: `/${locale}`,
      siteName: site.name,
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_MX'],
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: c.meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.meta.title,
      description: c.meta.description,
      images: [image],
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const c = languages[locale].dictionary;
  const pageUrl = `${site.url}/${locale}`;
  const organizationId = `${site.url}/#organization`;
  const practitionerId = `${site.url}/#practitioner`;
  const serviceIds = offerings.map(offering => `${pageUrl}#${offering.id}`);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: site.name,
        url: site.url,
        description: c.meta.description,
        sameAs: [site.instagram],
        founder: { '@id': practitionerId },
      },
      {
        '@type': 'Person',
        '@id': practitionerId,
        name: 'Andre Ram',
        description: c.practitioner.paragraphs[0],
        worksFor: { '@id': organizationId },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: c.meta.title,
        description: c.meta.description,
        inLanguage: locale,
        isPartOf: { '@id': `${site.url}/#website` },
        about: serviceIds.map(id => ({ '@id': id })),
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { '@id': organizationId },
        inLanguage: locales,
      },
      ...c.sessions.items.map((session, index) => ({
        '@type': 'Service',
        '@id': serviceIds[index],
        name: session.title,
        description: session.description,
        serviceType: 'Janzu aquatic bodywork',
        provider: { '@id': organizationId },
        areaServed: { '@type': 'Place', name: 'Riviera Maya, Mexico' },
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
      })),
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <Landing copy={c} locale={locale} />
  </>;
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, languages, locales } from '@/content/i18n';
import { site } from '@/content/site';
import { Landing } from '@/components/landing';
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) notFound(); const c = languages[locale].dictionary; return { metadataBase: new URL(site.url), title: c.meta.title, description: c.meta.description, alternates: { canonical: `/${locale}`, languages: { ...Object.fromEntries(locales.map(l => [l, `/${l}`])), 'x-default': '/en' } }, openGraph: { title: c.meta.title, description: c.meta.description, url: `/${locale}`, siteName: site.name, type: 'website', images: [{ url: '/media/hero.jpg', width: 1920, height: 1080, alt: c.media.hero }] }, twitter: { card: 'summary_large_image', title: c.meta.title, description: c.meta.description, images: ['/media/hero.jpg'] } }; }
export default async function Page({ params }: Props) { const { locale } = await params; if (!isLocale(locale)) notFound(); const c = languages[locale].dictionary; const schema = { '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url, description: c.meta.description, areaServed: 'Playa del Carmen, Mexico', sameAs: [site.instagram] }; return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/><Landing copy={c} locale={locale}/></>; }

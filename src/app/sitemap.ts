import type { MetadataRoute } from 'next';
import { locales } from '@/content/i18n';
import { site } from '@/content/site';
export default function sitemap(): MetadataRoute.Sitemap { return locales.map(locale => ({ url: `${site.url}/${locale}`, alternates: { languages: Object.fromEntries(locales.map(l => [l, `${site.url}/${l}`])) } })); }

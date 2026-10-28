import type { MetadataRoute } from 'next';
import { locales, localePath } from '@/content/i18n';
import { site } from '@/content/site';
export default function sitemap(): MetadataRoute.Sitemap { return locales.map(locale => ({ url: new URL(localePath(locale), site.url).toString(), alternates: { languages: { ...Object.fromEntries(locales.map(l => [l, new URL(localePath(l), site.url).toString()])), 'x-default': site.url + '/' } } })); }

import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { contentSignal } from '@/content/usage';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      other: { 'Content-Signal': contentSignal },
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

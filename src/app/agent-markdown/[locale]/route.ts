import { isLocale } from '@/content/i18n';
import { renderPageMarkdown } from '@/content/markdown';
import { siteDiscoveryLinks } from '@/content/discovery';
import { contentSignal } from '@/content/usage';

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response('Not found', { status: 404 });

  return new Response(renderPageMarkdown(locale), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Link: siteDiscoveryLinks,
      Vary: 'Accept',
      'Cache-Control': 'private, no-store',
      'Content-Signal': contentSignal,
    },
  });
}

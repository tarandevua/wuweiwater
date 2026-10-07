import { siteDiscoveryLinks } from '@/content/discovery';
import { contentSignal } from '@/content/usage';

export function GET() {
  return new Response(null, {
    status: 307,
    headers: {
      Location: '/en',
      Link: siteDiscoveryLinks,
      Vary: 'Accept',
      'Content-Signal': contentSignal,
    },
  });
}

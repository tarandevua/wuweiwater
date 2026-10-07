import { site } from '@/content/site';

const catalogPath = '/.well-known/api-catalog';
const catalogHeaders = {
  'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
  Link: `<${catalogPath}>; rel="api-catalog"`,
};

export function GET() {
  return new Response(JSON.stringify({
    linkset: [{
      anchor: `${site.url}/api/v1`,
      'service-desc': [{ href: `${site.url}/api/openapi.json`, type: 'application/json' }],
      'service-doc': [{ href: `${site.url}/api/docs`, type: 'text/markdown' }],
      status: [{ href: `${site.url}/api/v1/health`, type: 'application/json' }],
    }],
  }), { headers: catalogHeaders });
}

export function HEAD() {
  return new Response(null, { headers: catalogHeaders });
}

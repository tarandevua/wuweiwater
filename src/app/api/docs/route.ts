export function GET() {
  const markdown = `# Wu Wei Water Public API

This read-only API returns published Janzu session information. It does not provide live availability, booking, or payments. No authentication is required.

## Endpoints

- [GET /api/v1](/api/v1) — API index and version.
- [GET /api/v1/offerings?locale=en](/api/v1/offerings?locale=en) — English sessions. Use \`locale=es\` for Spanish; an unsupported locale returns HTTP 400.
- [GET /api/v1/health](/api/v1/health) — basic API reachability check.

Session data reflects the public website. Prices and availability are not included. Follow the \`pageUrl\` in the offerings response for booking information.

[OpenAPI 3.1 specification](/api/openapi.json) · [API catalog](/.well-known/api-catalog)
`;

  return new Response(markdown, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}

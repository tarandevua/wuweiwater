import { apiVersion } from '@/content/api';

export function GET() {
  return Response.json({
    name: 'Wu Wei Water Public API',
    version: apiVersion,
    description: 'Read-only information about published Janzu sessions.',
    endpoints: {
      offerings: '/api/v1/offerings?locale=en',
      health: '/api/v1/health',
    },
  });
}

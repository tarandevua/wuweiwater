import { apiVersion } from '@/content/api';
import { site } from '@/content/site';

export function GET() {
  return Response.json({
    openapi: '3.1.0',
    info: {
      title: 'Wu Wei Water Public API',
      version: apiVersion,
      description: 'Read-only information about Janzu sessions published by Wu Wei Water. This API does not provide availability or booking transactions.',
    },
    servers: [{ url: site.url }],
    paths: {
      '/api/v1': {
        get: {
          summary: 'Discover the public API',
          operationId: 'getApiIndex',
          responses: {
            '200': {
              description: 'API name, version, and endpoint paths.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiIndex' } } },
            },
          },
        },
      },
      '/api/v1/offerings': {
        get: {
          summary: 'List published Janzu sessions',
          operationId: 'listOfferings',
          parameters: [{
            name: 'locale',
            in: 'query',
            description: 'Language for session titles and descriptions. Defaults to en.',
            required: false,
            schema: { type: 'string', enum: ['en', 'es'], default: 'en' },
          }],
          responses: {
            '200': {
              description: 'Published session information in the requested language.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/OfferingsResponse' } } },
            },
            '400': {
              description: 'Unsupported locale.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
          },
        },
      },
      '/api/v1/health': {
        get: {
          summary: 'Check that the API responds',
          operationId: 'getHealth',
          description: 'A basic reachability check. It does not verify external booking or messaging services.',
          responses: {
            '200': {
              description: 'The API handler is reachable.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Health' } } },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        ApiIndex: {
          type: 'object',
          required: ['name', 'version', 'description', 'endpoints'],
          properties: {
            name: { type: 'string' },
            version: { type: 'string' },
            description: { type: 'string' },
            endpoints: {
              type: 'object',
              required: ['offerings', 'health'],
              properties: {
                offerings: { type: 'string' },
                health: { type: 'string' },
              },
            },
          },
        },
        Offering: {
          type: 'object',
          required: ['id', 'title', 'duration', 'description'],
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            duration: { type: ['string', 'null'], description: 'Null when no duration is published.' },
            description: { type: 'string' },
          },
        },
        OfferingsResponse: {
          type: 'object',
          required: ['locale', 'items', 'pageUrl'],
          properties: {
            locale: { type: 'string', enum: ['en', 'es'] },
            items: { type: 'array', items: { $ref: '#/components/schemas/Offering' } },
            pageUrl: { type: 'string', format: 'uri' },
          },
        },
        Health: {
          type: 'object',
          required: ['status'],
          properties: { status: { type: 'string', const: 'ok' } },
        },
        Error: {
          type: 'object',
          required: ['error'],
          properties: { error: { type: 'string' } },
        },
      },
    },
  });
}

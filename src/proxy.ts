import { NextResponse, type NextRequest } from 'next/server';

function acceptsMarkdown(header: string | null) {
  return header?.split(',').some(range => {
    const [mediaType, ...parameters] = range.trim().split(';');
    if (mediaType.trim().toLowerCase() !== 'text/markdown') return false;

    const quality = parameters.find(parameter => parameter.trim().toLowerCase().startsWith('q='));
    return !quality || Number(quality.trim().slice(2)) > 0;
  }) ?? false;
}

export function proxy(request: NextRequest) {
  if (!acceptsMarkdown(request.headers.get('accept'))) {
    const response = NextResponse.next();
    response.headers.append('Vary', 'Accept');
    return response;
  }

  const locale = request.nextUrl.pathname === '/es' ? 'es' : 'en';
  return NextResponse.rewrite(new URL(`/agent-markdown/${locale}`, request.url));
}

export const config = { matcher: ['/', '/en', '/es'] };

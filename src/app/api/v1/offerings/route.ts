import { getPublicOfferings } from '@/content/api';
import { isLocale } from '@/content/i18n';

export function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get('locale') ?? 'en';
  if (!isLocale(locale)) {
    return Response.json({ error: 'Unsupported locale. Use en or es.' }, { status: 400 });
  }

  return Response.json(getPublicOfferings(locale));
}

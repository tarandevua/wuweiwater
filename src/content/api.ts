import { languages, type Locale } from './i18n';
import { offerings, site } from './site';

export const apiVersion = '1.0.0';

export function getPublicOfferings(locale: Locale) {
  const items = languages[locale].dictionary.sessions.items;
  return {
    locale,
    items: items.map((item, index) => ({
      id: offerings[index].id,
      title: item.title,
      duration: item.duration || null,
      description: item.description,
    })),
    pageUrl: `${site.url}/${locale}#sessions`,
  };
}

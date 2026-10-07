import { languages, type Locale } from './i18n';
import { bookingUrl, site } from './site';

export function renderPageMarkdown(locale: Locale) {
  const c = languages[locale].dictionary;
  const pageUrl = `${site.url}/${locale}`;
  const hero = `${c.hero.before}${c.hero.emphasis}${c.hero.after}`;
  const lines = [
    '---',
    `title: ${JSON.stringify(c.meta.title)}`,
    `description: ${JSON.stringify(c.meta.description)}`,
    `url: ${JSON.stringify(pageUrl)}`,
    '---',
    '',
    `# ${hero}`,
    '',
    c.hero.description,
    '',
    `## ${c.janzu.title}`,
    '',
    ...c.janzu.paragraphs.flatMap(paragraph => [paragraph, '']),
    `## ${c.experience.title}`,
    '',
    ...c.experience.steps.flatMap(step => [`### ${step.title}`, '', step.description, '']),
    `## ${c.reasons.label}`,
    '',
    `${c.reasons.intro}: ${c.reasons.items.join(', ')}.`,
    '',
    `## ${c.sessions.title}`,
    '',
    ...c.sessions.items.flatMap(session => [
      `### ${session.title}`,
      '',
      ...(session.duration ? [session.duration, ''] : []),
      session.description,
      '',
      `[${session.cta}](<${bookingUrl(`${c.contact.message} — ${session.title}`)}>)`,
      '',
    ]),
    `## ${c.philosophy.title}`,
    '',
    ...c.philosophy.paragraphs.flatMap(paragraph => [paragraph, '']),
    `## ${c.practitioner.title}`,
    '',
    ...c.practitioner.paragraphs.flatMap(paragraph => [paragraph, '']),
    `## ${c.testimonials.label}`,
    '',
    c.testimonials.note,
    '',
    ...c.testimonials.items.flatMap(item => [`> ${item.quote}`, '']),
    `## ${c.location.title}`,
    '',
    c.location.description,
    '',
    `## ${c.faq.title}`,
    '',
    ...c.faq.items.flatMap(item => [`### ${item.question}`, '', item.answer, '']),
    `## ${c.contact.title}`,
    '',
    ...c.contact.lines,
    '',
    `[${site.whatsapp ? c.contact.cta : c.contact.instagramCta}](<${site.whatsapp ? bookingUrl(c.contact.message) : site.instagram}>)`,
    '',
  ];

  return lines.join('\n');
}

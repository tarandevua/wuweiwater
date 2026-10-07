import Image from 'next/image';
import type { Dictionary } from '@/content/en';
import { languages, locales, type Locale } from '@/content/i18n';
import { bookingUrl, offerings, site } from '@/content/site';
import { Navigation } from './navigation';
import { Testimonials } from './testimonials';
import { ArrowUpRight, Instagram, MessageCircle } from "@deemlol/next-icons";
function Label({ children }: { children: React.ReactNode }) { return <p className="eyebrow">{children}</p>; }
function Paragraphs({ items }: { items: string[] }) { return <div className="prose">{items.map(p => <p key={p}>{p}</p>)}</div>; }
export function Landing({ copy: c, locale }: { copy: Dictionary; locale: Locale }) {
 const booking = bookingUrl(c.contact.message);
 return <><a className="skip-link" href="#main">{c.skip}</a><Navigation locale={locale} options={locales.map(code => ({ code, label: languages[code].label }))} copy={c} booking={booking}/><main id="main">
  <section className="hero" id="top"><Image src="/media/hero.jpg" alt={c.media.hero} fill preload sizes="100vw" className="hero-image"/><div className="hero-shade"/><div className="container hero-content"><h1>{c.hero.before}<em>{c.hero.emphasis}</em>{c.hero.after}</h1><p className="hero-description">{c.hero.description}</p><div className="hero-actions"><a className="button" href={booking}>{c.hero.book}<ArrowUpRight/></a><a className="text-link" href="#janzu">{c.hero.discover}<span aria-hidden="true">↓</span></a></div><div className="hero-bottom"><span>{c.hero.label}</span><span>{c.hero.location}</span></div></div></section>
  <section className="section" id="janzu"><div className="container split"><div><Label>{c.janzu.label}</Label><h2>{c.janzu.title}</h2><Paragraphs items={c.janzu.paragraphs}/></div><div className="practice-photo"><Image src="/media/janzu.jpg" alt={c.media.janzu} fill sizes="(max-width: 767px) 90vw, 45vw"/></div></div><blockquote className="practice-quote container">{c.janzu.quote[0]}<br/><em>{c.janzu.quote[1]}</em></blockquote></section>
  <section className="experience-section" id="experience"><div className="wave" aria-hidden="true"/><div className="container section"><Label>{c.experience.label}</Label><h2>{c.experience.title}</h2><ol className="journey"><svg className="journey-line" viewBox="0 0 24 400" preserveAspectRatio="none" aria-hidden="true"><path d="M12,0 C24,50 0,100 12,150 C24,200 0,250 12,300 C24,350 0,380 12,400" fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke"/></svg>{c.experience.steps.map((step,i) => <li key={step.title}><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></div></section>
  <section className="reasons"><div className="container"><Label>{c.reasons.label}</Label><p>{c.reasons.intro}</p><ul className="reason-list">{c.reasons.items.map(item => <li key={item}>{item}</li>)}</ul><p className="large-statement">{c.reasons.statement.map((line,i) => <span key={line} className={i === 2 ? 'soft' : ''}>{line}</span>)}</p></div></section>
  <section className="section" id="sessions"><div className="container"><Label>{c.sessions.label}</Label><h2>{c.sessions.title}</h2><div className="session-list">{c.sessions.items.map((session,i) => <a className="session-row" key={offerings[i].id} href={bookingUrl(`${c.contact.message} — ${session.title}`)}><span className="session-number"></span><div><h3>{session.title}</h3>{session.duration && <p className="duration">{session.duration}</p>}{offerings[i].price && <p>{offerings[i].price}</p>}</div><p className="session-description">{session.description}</p><span className="session-cta">{session.cta}<ArrowUpRight/></span></a>)}</div></div></section>
  <section className="philosophy dark section"><span className="water-symbol" aria-hidden="true">無為</span><div className="container philosophy-grid"><div><Label>{c.philosophy.label}</Label><h2>{c.philosophy.title}</h2></div><div><div className="philosophy-copy"><p>{c.philosophy.paragraphs[0]}</p><div className="flow-lines">{c.philosophy.paragraphs[1].split(/(?<=\.)\s+/).map((line,i) => <p key={line} style={{ paddingInlineStart: `${i * 1.2}rem` }}>{line}</p>)}</div><Paragraphs items={c.philosophy.paragraphs.slice(2)}/></div><p className="philosophy-statement">{c.philosophy.statement[0]}<br/><em>{c.philosophy.statement[1]}</em></p></div></div></section>
  <section className="section practitioner" id="about"><div className="container split"><div className="portrait"><Image src="/media/practitioner.jpg" alt={c.media.practitioner} fill sizes="(max-width: 767px) 90vw, 40vw"/></div><div><Label>{c.practitioner.label}</Label><h2>{c.practitioner.title}</h2><Paragraphs items={c.practitioner.paragraphs}/></div></div></section>
  <Testimonials copy={c.testimonials}/>
  <section className="location dark"><div className="location-photo"><Image src="/media/location.jpg" alt={c.media.location} fill sizes="(max-width: 767px) 100vw, 50vw"/></div><div className="location-content"><Label>{c.location.label}</Label><h2>{c.location.title}</h2><p>{c.location.description}</p><p className="current-location"><span aria-hidden="true"/>{c.location.current}</p></div></section>
  <section className="section" id="faq"><div className="container faq-grid"><div><Label>{c.faq.label}</Label><h2>{c.faq.title}</h2></div><div className="faq-list">{c.faq.items.map(item => <details key={item.question} name="faq"><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div></section>
  <section className="contact dark section" id="contact">
    <div className="narrow">
        <Label>{c.contact.label}</Label>
        <h2>{c.contact.title}</h2>
        <p>{c.contact.lines[0]}<br/>{c.contact.lines[1]}</p>
        <a className="button" href={site.whatsapp ? booking : site.instagram} target="_blank" rel="noopener noreferrer">{site.whatsapp ? c.contact.cta : c.contact.instagramCta}<ArrowUpRight/></a>
        {!site.whatsapp && <p className="contact-note">{c.contact.fallback}</p>}
        <div className="social-links">
            {site.whatsapp && <a href={booking} target="_blank" rel="noopener noreferrer">WhatsApp<MessageCircle/></a>}
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram<Instagram/></a>
        </div>
    </div>
 </section>
 </main><footer className="dark"><div className="container footer-inner"><div><a href="#top" className="footer-brand">Wu Wei Water</a><p>{c.tagline}</p></div><p className="copyright">© {new Date().getFullYear()} Wu Wei Water</p></div></footer></>;
}

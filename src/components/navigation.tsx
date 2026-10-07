'use client';
import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/content/en';
import type { Locale } from '@/content/i18n';
const anchors = ['janzu', 'experience', 'sessions', 'about', 'faq'];
export function Navigation({ locale, options, copy, booking }: { locale: Locale; options: { code: string; label: string }[]; copy: Pick<Dictionary, 'nav' | 'book' | 'menu' | 'close' | 'language'>; booking: string }) {
  const switchLanguage = options.find(option => option.code !== locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 40); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  return <header className={`header ${scrolled || open ? 'solid' : ''}`} onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); trigger.current?.focus(); } }}>
    <div className="nav-inner"><a href="#top" className="wordmark" onClick={() => setOpen(false)}>Wu Wei Water</a>
      <nav aria-label={copy.menu} className="desktop-nav">{copy.nav.map((label, i) => <a key={anchors[i]} href={`#${anchors[i]}`}>{label}</a>)}</nav>
      <div className="nav-actions">{switchLanguage && <a className="language-switch" href={`/${switchLanguage.code}`} hrefLang={switchLanguage.code} lang={switchLanguage.code} aria-label={`${copy.language}: ${switchLanguage.label}`} onClick={e => { if (window.location.hash) { e.preventDefault(); window.location.assign(`/${switchLanguage.code}${window.location.hash}`); } }}>{switchLanguage.label}</a>}<a className="book-small" href={booking}>{copy.book}</a><button ref={trigger} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? copy.close : copy.menu} onClick={() => setOpen(!open)}>{open ? '×' : <><span/><span/></>}</button></div>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label={copy.menu}>{copy.nav.map((label, i) => <a key={anchors[i]} href={`#${anchors[i]}`} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">↗</span></a>)}</nav>}
  </header>;
}

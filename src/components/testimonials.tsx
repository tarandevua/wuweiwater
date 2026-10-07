'use client';
import { useState } from 'react';
import type { Dictionary } from '@/content/en';
export function Testimonials({ copy }: { copy: Dictionary['testimonials'] }) {
  const [index, setIndex] = useState(0);
  return <section className="section testimonials" aria-label={copy.label}><div className="narrow"><span className="quote-mark" aria-hidden="true">“</span><div aria-live="polite" aria-atomic="true"><blockquote key={index}>{copy.items[index].quote}</blockquote></div><p className="sample-note">{copy.note}</p><div className="dots">{copy.items.map((_, i) => <button key={i} aria-label={`${copy.selector} ${i + 1}`} aria-pressed={index === i} onClick={() => setIndex(i)}><span/></button>)}</div></div></section>;
}

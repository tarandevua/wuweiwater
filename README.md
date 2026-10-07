# Wu Wei Water

Next.js 16 App Router, React 19, TypeScript and Tailwind CSS 4. An English/Spanish recreation of https://janzu.lovable.app/ with extensible locale routing.

## Run

```sh
npm install
npm run dev
npm run build
npm start
```

Open http://127.0.0.1:3000. `/` redirects to `/en`; Spanish lives at `/es`. Node 20.9+ is required. Dependencies are pinned by package-lock.json. The production build uses Webpack because this workstation's sandbox caused a Turbopack process-binding error.

## Structure and editing

- `src/app/[locale]/`: localized pages, HTML language, metadata and fonts.
- `src/content/en.ts`, `es.ts`: every visible string, image descriptions, session copy, FAQs and sample reflections.
- `src/content/i18n.ts`: locale registry. Add a new dictionary satisfying `Dictionary`, import it and register its code/label here. Routes, switcher, sitemap and hreflang derive from this registry.
- `src/content/site.ts`: brand, contact destinations and offering IDs/optional prices. Future modalities can be added independently of the brand.
- `src/components/landing.tsx`: semantic landing sections and reusable text helpers.
- `src/components/navigation.tsx`: scroll-aware header, mobile menu and locale links.
- `src/components/testimonials.tsx`: manually controlled accessible reflection carousel; no distracting auto-advance.
- `src/app/globals.css`: palette, responsive editorial layout and reduced-motion rules.
- `public/media/`: replaceable reference images. See its README for specifications.
- `public/fonts/`: locally hosted Cormorant Garamond and Manrope from the reference's Google Fonts assets.

## Design

The reference's warm off-white `oklch(.966 .008 100)`, ocean ink `oklch(.26 .045 215)`, mist `oklch(.935 .02 205)` and deep teal `oklch(.36 .06 215)` are preserved. Cormorant Garamond supplies light editorial headings and italic accents; Manrope supplies body/UI text. Desktop sections use generous 128–160px spacing and a 1200px content area; mobile uses 20px side margins, stacked content and a single-column timeline. Order: hero, practice, experience, reasons, sessions, philosophy, practitioner, reflections, location, FAQ, contact.

Images use Next Image with explicit containers and responsive sizes. Only navigation and the reflection selector hydrate. The hero drifts slowly using transform only; reduced-motion disables animation and smooth scrolling. Native details/summary provides keyboard-operable FAQ disclosure without extra JavaScript.

## Before publishing

Copy `.env.example` to `.env.local` and set the real public origin, WhatsApp number (international digits only) and verified Instagram URL. Rebuild after environment changes. Until WhatsApp is set, book links lead to the contact section and its Instagram link; no placeholder phone number is used.

Replace or approve the reference imagery, especially the illustrative practitioner portrait. Replace the explicitly labeled sample reflections with actual approved client quotes and update their caption. Review translated copy, session details, pool temperatures and suitability guidance. No payments, live availability or booking database are connected. Prices remain hidden until configured. Confirm the final domain before indexing; local development uses the configured public origin for canonical URLs.

The site renders English and Spanish content as static HTML with canonical URLs, hreflang links, a sitemap, and Organization, Person, WebPage, WebSite and Service JSON-LD. Its default public origin is `https://wuweiwater.art`; set `NEXT_PUBLIC_SITE_URL` if the published origin changes. After deployment, verify the domain in Google Search Console and submit `/sitemap.xml`. Check the live page in Google's URL Inspection tool and validate the JSON-LD against the visible copy. If Wu Wei Water has a Google Business Profile, keep its location and contact details accurate there too. Search and AI answer inclusion is decided by the search providers and cannot be guaranteed by markup.

`/`, `/en`, and `/es` return `Link` response headers for `/site-info.json` (`describedby`) and `/.well-known/api-catalog` (`api-catalog`). The root route issues the `/en` redirect so the links are present on that response too. The catalog lists the read-only public API at `/api/v1`, its OpenAPI specification at `/api/openapi.json`, Markdown documentation at `/api/docs`, and a basic health endpoint. The API exposes published session names, durations, and descriptions in English or Spanish; it does not expose live availability, booking, payments, or private data. `/.well-known/api-catalog` responds to GET with an RFC 9264 JSON Linkset and to HEAD with an `api-catalog` Link header.

Those same URLs return localized Markdown when the request includes `Accept: text/markdown` with nonzero quality. HTML remains the default; `/` redirects to `/en` for ordinary browser requests. The Markdown response has `Content-Type: text/markdown; charset=utf-8` and `Vary: Accept`. Next.js replaces `Vary` on prerendered HTML responses, so both formats use `Cache-Control: private, no-store` to keep shared caches from mixing or retaining stale variants. There is no tokenizer dependency, so the site does not send an estimated `x-markdown-tokens` header.

`robots.txt` and HTTP responses declare `Content-Signal: ai-train=no, search=yes, ai-input=yes`. This expresses a preference against model training while allowing search results and real-time agent answers. Edit `src/content/usage.ts` to change all declarations together. Content Signals are an emerging convention and do not enforce crawler behavior.

## Verification

`npm run typecheck` and production build; browser checks for English/Spanish rendering, mobile menu, FAQ consent content, reflection selection, local navigation, image loading and overflow at mobile/desktop widths. No Lighthouse/Core Web Vitals field measurements or screen-reader audit has been performed.

## V2

Add a content CMS when editing frequency warrants it; introduce real availability/booking; add approved testimonials and professional media; create translated modality/workshop/retreat pages using the existing locale shell. Keep Wu Wei Water as the umbrella brand.

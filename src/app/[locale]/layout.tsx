import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { isLocale, locales } from '@/content/i18n';
import '../globals.css';
const display = localFont({ src: [{ path: '../../../public/fonts/cormorant.woff2', weight: '300 400', style: 'normal' }, { path: '../../../public/fonts/cormorant-italic.woff2', weight: '300 400', style: 'italic' }], variable: '--font-display', display: 'swap' });
const sans = localFont({ src: '../../../public/fonts/manrope.woff2', variable: '--font-sans', weight: '300 500', display: 'swap' });
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-WWV2ZPNMGN" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-WWV2ZPNMGN');`}
      </Script>
    </html>
  );
}

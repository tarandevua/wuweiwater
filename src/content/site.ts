export const site = {
  name: 'Wu Wei Water',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://wuweiwater.art').replace(/\/$/, ''),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/wuweiwater/',
};
// Prices are optional; add a formatted price only when ready to publish.
export const offerings: { id: string; price?: string }[] = [
  { id: 'janzu-experience' }, { id: 'deep-water-journey' }, { id: 'janzu-for-two' },
];
export function bookingUrl(message: string) {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}` : '#contact';
}

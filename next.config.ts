import type { NextConfig } from 'next';
import { siteDiscoveryLinks } from './src/content/discovery';
import { contentSignal } from './src/content/usage';

const config: NextConfig = {
  async headers() {
    return [
      { source: '/:path*', headers: [{ key: 'Content-Signal', value: contentSignal }] },
      ...['/en', '/es'].map(source => ({
        source,
        headers: [
          { key: 'Link', value: siteDiscoveryLinks },
          // Next replaces Vary on prerendered HTML; keep that variant out of shared caches.
          { key: 'Cache-Control', value: 'private, no-store' },
        ],
      })),
    ];
  },
};

export default config;

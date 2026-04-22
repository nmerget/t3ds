import { ManifestOptions } from 'vite-plugin-pwa';
import config from './intlayer.config';

export const APP_NAME = 'TanStack Directus';
export const APP_SHORT_NAME = 'TanStack Directus';
export const APP_DESCRIPTION =
  'A modern TanStack application with Directus CMS integration';
export const THEME_COLOR = '#422ad5';
export const BACKGROUND_COLOR = '#ffffff';

const manifest: Partial<ManifestOptions> = {
  name: APP_NAME,
  short_name: APP_SHORT_NAME,
  description: APP_DESCRIPTION,
  start_url: '/',
  display: 'standalone',
  background_color: BACKGROUND_COLOR,
  theme_color: THEME_COLOR,
  lang: config.internationalization?.defaultLocale || 'en',
  scope: '/',
  icons: [
    {
      src: '/icons/manifest-icon-192.maskable.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/icons/manifest-icon-512.maskable.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
};

export default manifest;

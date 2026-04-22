import { getIntlayer } from 'intlayer';
import { APP_URL } from './constants';
import { THEME_COLOR, APP_NAME } from '../../../manifest';

export const getMetaTags = (locale?: string) => {
  const metaContent = getIntlayer('app', locale);

  return [
    // Basic meta tags
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    { title: metaContent.title },
    { content: metaContent.meta.description, name: 'description' },
    {
      lang: locale || 'en',
    },

    // SEO meta tags
    { name: 'referrer', content: 'origin' },
    { name: 'creator', content: APP_NAME },
    { name: 'robots', content: 'index, follow' },
    { google: 'notranslate' },

    // Open Graph meta tags
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: metaContent.title },
    {
      property: 'og:description',
      content: metaContent.meta.description,
    },
    { property: 'og:url', content: APP_URL },
    {
      property: 'og:locale',
      content: locale || 'en',
    },

    // PWA meta tags
    { property: 'theme-color', content: THEME_COLOR },
    { name: 'mobile-web-app-capable', content: 'yes' },
  ];
};

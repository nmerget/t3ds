import config from '../../../intlayer.config';

const locales = config.internationalization?.locales || ['en'];
const LANGUAGES = locales.map((locale) => String(locale));

export const getHeadLanguages = (appUrl: string) => [
  { rel: 'canonical', href: appUrl },
  ...LANGUAGES.map((lang) => ({
    rel: 'alternate',
    hrefLang: lang,
    href: `${appUrl}/${lang}`,
  })),
  { rel: 'alternate', hrefLang: 'x-default', href: `${appUrl}/en` },
];

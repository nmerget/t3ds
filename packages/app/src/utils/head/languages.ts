import config from '../../../intlayer.config';

const locales = config.internationalization?.locales || ['en'];
const LANGUAGES = locales.map((locale) => String(locale));

export const getHeadLanguages = (appUrl: string, pathname?: string) => [
  { rel: 'canonical', href: pathname ? `${appUrl}${pathname}` : appUrl },
  ...LANGUAGES.map((lang) => ({
    rel: 'alternate',
    hrefLang: lang,
    href: `${appUrl}/${lang}`,
  })),
  { rel: 'alternate', hrefLang: 'x-default', href: `${appUrl}/en` },
];

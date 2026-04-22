import config from '../../../intlayer.config';
import { APP_URL } from './constants';

const locales = config.internationalization?.locales || ['en'];
const LANGUAGES = locales.map((locale) => String(locale));

export const HeadLanguages = [
  { rel: 'canonical', href: APP_URL },
  ...LANGUAGES.map((lang) => ({
    rel: 'alternate',
    hrefLang: lang,
    href: `${APP_URL}/${lang}`,
  })),
  { rel: 'alternate', hrefLang: 'x-default', href: `${APP_URL}/en` },
];

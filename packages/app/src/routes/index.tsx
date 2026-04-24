import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import {
  LANDING_VISITED_COOKIE,
  LANGUAGE_COOKIE,
  serverCookies,
} from '@/utils/cookie';
import config from '../../intlayer.config';

const locales = (config.internationalization?.locales || ['en']).map(String);
const defaultLocale = String(
  config.internationalization?.defaultLocale || 'en',
);

const getRedirectPath = createServerFn({ method: 'GET' }).handler(async () => {
  const { getCookie, getRequestHeader } = await serverCookies();

  const languageCookie = getCookie(LANGUAGE_COOKIE);
  const acceptLanguage = getRequestHeader('Accept-Language') ?? '';
  const browserLang = acceptLanguage.split(',')[0]?.split('-')[0];
  const language =
    languageCookie ||
    (browserLang && locales.includes(browserLang) ? browserLang : null) ||
    defaultLocale;

  const hasLandingCookie = getCookie(LANDING_VISITED_COOKIE);
  return hasLandingCookie ? `/${language}` : `/${language}/landing`;
});

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const destination = await getRedirectPath();
    throw redirect({ href: destination });
  },
});

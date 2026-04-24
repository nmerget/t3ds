import { getHTMLTextDir } from 'intlayer';
import { useEffect } from 'react';
import { useLocale } from 'react-intlayer';
import { setCookie, LANGUAGE_COOKIE } from '@/utils/cookie';

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
    setCookie(LANGUAGE_COOKIE, locale);
  }, [locale]);
};

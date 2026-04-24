import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useLocale } from 'react-intlayer';
import { getCookie } from '@/utils/cookie';

function RedirectPage() {
  const { defaultLocale } = useLocale();
  const navigate = useNavigate();

  useEffect(() => {
    const languageCookie = getCookie('language');
    const language =
      languageCookie ||
      navigator.language.split('-')[0] ||
      defaultLocale ||
      'en';

    const hasLandingCookie = getCookie('landing_visited');
    const destination = hasLandingCookie
      ? `/${language}`
      : `/${language}/landing`;

    void navigate({ to: destination });
  }, [navigate, defaultLocale]);

  return null;
}

export default RedirectPage;

import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useLocale } from 'react-intlayer';
import { useCookie } from '@/hooks/useCookie';

function Redirect() {
  const { defaultLocale } = useLocale();
  const navigate = useNavigate();
  const { getCookie } = useCookie();

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
  }, [navigate, defaultLocale, getCookie]);

  return null;
}

export default Redirect;

export function useCookie() {
  const getCookie = (name: string): string | undefined => {
    if (typeof document === 'undefined') return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const setCookie = (name: string, value: string, maxAge?: number) => {
    if (typeof document === 'undefined') return;
    const ageString = maxAge ? `; max-age=${maxAge}` : '';
    document.cookie = `${name}=${value}; path=/${ageString}`;
  };

  const hasCookie = (name: string): boolean => {
    if (typeof document === 'undefined') return false;
    return document.cookie
      .split('; ')
      .some((cookie) => cookie.startsWith(`${name}=`));
  };

  return { getCookie, setCookie, hasCookie };
}

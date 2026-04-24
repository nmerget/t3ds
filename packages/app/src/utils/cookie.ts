export const LANDING_VISITED_COOKIE = 'landing_visited';
export const LANGUAGE_COOKIE = 'language';

export const serverCookies = () =>
  import('@tanstack/react-start/server').then((m) => ({
    getCookie: m.getCookie,
    setCookie: m.setCookie,
    getRequestHeader: m.getRequestHeader,
  }));

export const setCookie = (name: string, value: string, maxAge?: number) => {
  if (typeof document === 'undefined') return;
  const ageString = maxAge ? `; max-age=${maxAge}` : '';
  document.cookie = `${name}=${value}; path=/${ageString}`;
};

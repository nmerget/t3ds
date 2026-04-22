import {
  authentication,
  AuthenticationData,
  createDirectus,
  readMe,
  refresh,
  rest,
} from '@directus/sdk';
import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import {
  DIRECTUS_REFRESH_TOKEN,
  DIRECTUS_SESSION_TOKEN,
  DIRECTUS_TOKEN_EXPIRES_AT,
  Schema,
} from '@t3ds/directus';

let _cachedDirectusUrl: string | undefined;

const getDirectusUrl = () => {
  if (_cachedDirectusUrl) return _cachedDirectusUrl;
  if (typeof window === 'undefined') {
    const url = process.env.NITRO_DIRECTUS_URL || 'http://localhost:8055';
    _cachedDirectusUrl = url;
    return url;
  }
  return _cachedDirectusUrl || 'http://localhost:8055';
};

export const getClient = () =>
  createDirectus<Schema>(getDirectusUrl())
    .with(rest())
    .with(authentication('json'));

export const getCookieToken = createServerFn().handler(async () => {
  return getCookie(DIRECTUS_SESSION_TOKEN);
});
export const getRefreshToken = createServerFn().handler(async () => {
  return getCookie(DIRECTUS_REFRESH_TOKEN);
});

export const setCookieToken = createServerFn()
  .inputValidator((data: AuthenticationData) => data)
  .handler(async ({ data }) => {
    const { access_token, expires, refresh_token } = data;
    if (!access_token || !expires || !refresh_token) return;

    const now = Date.now();
    const expires_at = new Date(now + expires).toISOString();

    const cookies = {
      [DIRECTUS_REFRESH_TOKEN]: refresh_token,
      [DIRECTUS_TOKEN_EXPIRES_AT]: expires_at,
      [DIRECTUS_SESSION_TOKEN]: access_token,
    };

    Object.entries(cookies).forEach(([key, value]) => {
      setCookie(key, value, {
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'lax', // CSRF protection
        httpOnly: true, // XSS protection
        expires: new Date(expires_at),
      });
    });
  });

export const isTokenExpiringSoon = createServerFn().handler(async () => {
  const expiresAt = getCookie(DIRECTUS_TOKEN_EXPIRES_AT);
  if (!expiresAt) return false;

  const expiryTime = new Date(expiresAt).getTime();
  const currentTime = Date.now();
  const fiveMinutes = 5 * 60 * 1000;

  return expiryTime - currentTime < fiveMinutes;
});

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    let token = await getCookieToken();
    if (!token) return false;

    const tokenExpiringSoon = await isTokenExpiringSoon();

    if (tokenExpiringSoon) {
      const refresh_token = await getRefreshToken();
      if (refresh_token) {
        const result = await getClient().request(
          refresh({ mode: 'json', refresh_token }),
        );
        if (result.access_token) {
          await setCookieToken({ data: result });
          token = result.access_token;
        } else {
          console.log('Token refresh failed', result);
        }
      }
    }

    const c = getClient();
    await c.setToken(token);
    await c.request(readMe());
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

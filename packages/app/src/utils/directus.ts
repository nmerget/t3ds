import {
  authentication,
  type AuthenticationData,
  createDirectus,
  readMe,
  refresh,
  rest,
  type RestCommand,
  withToken,
} from '@directus/sdk';
import { createServerFn } from '@tanstack/react-start';
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

const serverCookies = () =>
  import('@tanstack/react-start/server').then((m) => ({
    getCookie: m.getCookie,
    setCookie: m.setCookie,
  }));

export const getCookieToken = createServerFn().handler(async () => {
  const { getCookie } = await serverCookies();
  return getCookie(DIRECTUS_SESSION_TOKEN);
});

export const directusRequest = async <Output extends object>(
  command: RestCommand<Output, Schema>,
  auth = false,
): Promise<Output | null> => {
  if (!auth) return await getClient().request(command);
  const token = await getCookieToken();
  if (!token) return null;
  return await getClient().request(withToken(token, command));
};

export const setCookieToken = createServerFn()
  .inputValidator((data: AuthenticationData) => data)
  .handler(async ({ data }) => {
    const { access_token, expires, refresh_token } = data;
    if (!access_token || !expires || !refresh_token) return;

    const { setCookie } = await serverCookies();
    const now = Date.now();
    const expires_at = new Date(now + expires).toISOString();

    const cookies = {
      [DIRECTUS_REFRESH_TOKEN]: refresh_token,
      [DIRECTUS_TOKEN_EXPIRES_AT]: expires_at,
      [DIRECTUS_SESSION_TOKEN]: access_token,
    };

    Object.entries(cookies).forEach(([key, value]) => {
      setCookie(key, value, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
        expires: new Date(expires_at),
      });
    });
  });

export const isAuthenticated = createServerFn({ method: 'GET' }).handler(
  async (): Promise<boolean> => {
    const { getCookie } = await serverCookies();
    try {
      const token = getCookie(DIRECTUS_SESSION_TOKEN);
      if (!token) return false;

      const expiresAt = getCookie(DIRECTUS_TOKEN_EXPIRES_AT);
      const isExpiringSoon =
        expiresAt && new Date(expiresAt).getTime() - Date.now() < 5 * 60 * 1000;

      if (isExpiringSoon) {
        const refresh_token = getCookie(DIRECTUS_REFRESH_TOKEN);
        if (refresh_token) {
          const result = await getClient().request(
            refresh({ mode: 'json', refresh_token }),
          );
          if (result.access_token) {
            await setCookieToken({ data: result });
          }
        }
      }

      const currentToken = getCookie(DIRECTUS_SESSION_TOKEN);
      if (!currentToken) return false;
      await getClient().request(withToken(currentToken, readMe()));
      return true;
    } catch {
      return false;
    }
  },
);

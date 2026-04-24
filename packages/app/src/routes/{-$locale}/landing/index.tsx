import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { LandingPage } from './landing.page';
import { LANDING_VISITED_COOKIE, serverCookies } from '@/utils/cookie';

const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;

const setLandingCookie = createServerFn({ method: 'GET' }).handler(async () => {
  const { setCookie } = await serverCookies();
  setCookie(LANDING_VISITED_COOKIE, 'true', {
    maxAge: ONE_YEAR_IN_SECONDS,
    path: '/',
  });
});

export const Route = createFileRoute('/{-$locale}/landing/')({
  beforeLoad: async () => {
    await setLandingCookie();
  },
  component: LandingPage,
});

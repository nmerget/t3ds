import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { LANDING_VISITED_COOKIE, serverCookies } from '@/utils/cookie';
import { HomePage } from './home.page';

const hasLandingCookie = createServerFn({ method: 'GET' }).handler(async () => {
  const { getCookie } = await serverCookies();
  return !!getCookie(LANDING_VISITED_COOKIE);
});

export const Route = createFileRoute('/{-$locale}/')({
  beforeLoad: async ({ params }) => {
    if (!(await hasLandingCookie())) {
      throw redirect({
        to: '/{-$locale}/landing',
        params: { locale: params.locale || 'en' },
      });
    }
  },
  component: HomePage,
});

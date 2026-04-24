import { createFileRoute } from '@tanstack/react-router';
import { LandingPage } from './landing.page';
import { setCookie } from '@/utils/cookie';

const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;

export const Route = createFileRoute('/{-$locale}/landing/')({
  beforeLoad: () => {
    setCookie('landing_visited', 'true', ONE_YEAR_IN_SECONDS);
  },
  component: LandingPage,
});

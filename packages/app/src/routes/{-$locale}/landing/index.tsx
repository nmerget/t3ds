import { createFileRoute } from '@tanstack/react-router';
import { LandingPage } from './landing.page';
import { setCookie } from '@/utils/cookie';

export const Route = createFileRoute('/{-$locale}/landing/')({
  beforeLoad: () => {
    setCookie('landing_visited', 'true', 31536000);
  },
  component: LandingPage,
});

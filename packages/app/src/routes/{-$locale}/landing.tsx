import { createFileRoute } from '@tanstack/react-router';
import { LandingPage } from '@/pages/LandingPage';
import { useCookie } from '@/hooks/useCookie';

export const Route = createFileRoute('/{-$locale}/landing')({
  beforeLoad: () => {
    const { setCookie } = useCookie();
    setCookie('landing_visited', 'true', 31536000);
  },
  component: LandingPage,
});

import { createFileRoute, redirect } from '@tanstack/react-router';
import { IndexPage } from '@/pages/IndexPage';
import { useCookie } from '@/hooks/useCookie';

export const Route = createFileRoute('/{-$locale}/')({
  beforeLoad: ({ params }) => {
    const { hasCookie } = useCookie();
    if (!hasCookie('landing_visited')) {
      throw redirect({
        to: '/{-$locale}/landing',
        params: { locale: params.locale || 'en' },
      });
    }
  },
  component: IndexPage,
});

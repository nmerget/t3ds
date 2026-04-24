import { createFileRoute, redirect } from '@tanstack/react-router';

import { hasCookie } from '@/utils/cookie';
import { HomePage } from './home.page';

export const Route = createFileRoute('/{-$locale}/')({
  beforeLoad: ({ params }) => {
    if (!hasCookie('landing_visited')) {
      throw redirect({
        to: '/{-$locale}/landing',
        params: { locale: params.locale || 'en' },
      });
    }
  },
  component: HomePage,
});

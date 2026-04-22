import { createFileRoute, redirect } from '@tanstack/react-router';
import { isAuthenticated } from '@/utils/directus';

export const Route = createFileRoute('/{-$locale}/_authenticated')({
  beforeLoad: async ({ location, params }) => {
    if (!(await isAuthenticated())) {
      throw redirect({
        to: '/{-$locale}/login',
        params: { locale: params.locale },
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

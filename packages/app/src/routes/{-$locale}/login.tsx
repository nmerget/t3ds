import { createFileRoute } from '@tanstack/react-router';
import { setCookieToken } from '@/utils/directus';
import { LoginPage } from '@/pages/LoginPage';

export const Route = createFileRoute('/{-$locale}/login')({
  component: () => {
    const { redirect } = Route.useSearch();
    const { locale } = Route.useParams();
    return <LoginPage redirect={redirect} path={`/${locale}/login`} />;
  },
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: (search.redirect as string) || '/',
  }),
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { getClient } = await import('@/utils/directus');
        const body = await request.json();
        const { email, password } = body;
        const data = await getClient().login(
          {
            email,
            password,
          },
          { mode: 'json' },
        );

        let success = false;
        if (data.access_token) {
          await setCookieToken({ data });
          success = true;
        }
        return new Response(JSON.stringify({ success }));
      },
    },
  },
});

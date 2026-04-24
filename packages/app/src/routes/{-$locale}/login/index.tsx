import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from './login.page';
import { getClient, setCookieToken } from '@/utils/directus';

export const Route = createFileRoute('/{-$locale}/login/')({
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
        try {
          const body = await request.json();
          const { email, password } = body;

          const client = getClient();
          const result = await client.login(
            {
              email,
              password,
            },
            { mode: 'json' },
          );

          let success = false;
          if (result.access_token) {
            await setCookieToken({ data: result });
            success = true;
          }

          return new Response(JSON.stringify({ success }));
        } catch (error) {
          console.error(error);
          return new Response(
            JSON.stringify({ success: false, error: 'Login failed' }),
            {
              status: 500,
            },
          );
        }
      },
    },
  },
});

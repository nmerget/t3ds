import { createFileRoute } from '@tanstack/react-router';
import { UserPage } from '@/pages/_authenticated/UserPage';
import { client } from '@/utils/directus.ts';
import { readMe } from '@directus/sdk';

export const Route = createFileRoute('/{-$locale}/_authenticated/user')({
  component: () => {
    const user = Route.useLoaderData();
    return <UserPage user={user} />;
  },
  loader: async () => {
    try {
      return await client.request(readMe());
    } catch (e) {
      console.log(e);
      return {};
    }
  },
});

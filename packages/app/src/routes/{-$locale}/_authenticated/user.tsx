import { createFileRoute } from '@tanstack/react-router';
import { UserPage, User } from '@/pages/_authenticated/UserPage';
import { client } from '@/utils/directus';
import { readMe } from '@directus/sdk';

export const Route = createFileRoute('/{-$locale}/_authenticated/user')({
  component: () => {
    const user = Route.useLoaderData();
    if (!user) return null;
    return <UserPage user={user} />;
  },
  loader: async (): Promise<User | null> => {
    try {
      return await client.request(readMe()) as unknown as User;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
});

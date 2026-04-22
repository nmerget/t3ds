import { createFileRoute } from '@tanstack/react-router';
import { UserPage, User } from '@/pages/_authenticated/UserPage';
import { getClient } from '@/utils/directus';
import { readMe } from '@directus/sdk';

export const Route = createFileRoute('/{-$locale}/_authenticated/user')({
  component: () => {
    const user = Route.useLoaderData();
    if (!user) return null;
    return <UserPage user={user} />;
  },
  loader: async (): Promise<User | null> => {
    try {
      return (await getClient().request(readMe())) as unknown as User;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
});

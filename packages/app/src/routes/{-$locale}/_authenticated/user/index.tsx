import { createFileRoute } from '@tanstack/react-router';
import { UserPage } from './user.page';
import { getCurrentUser, User } from './user.data';

export const Route = createFileRoute('/{-$locale}/_authenticated/user/')({
  component: () => {
    const user = Route.useLoaderData();
    if (!user) return null;
    return <UserPage user={user} />;
  },
  loader: async (): Promise<User | null> => {
    return await getCurrentUser();
  },
});

import { createFileRoute } from '@tanstack/react-router';
import { SongsPage } from './songs.page';
import { getPrivateSongs, getPublicSongs } from './songs.data';

export const Route = createFileRoute('/{-$locale}/demo/songs/')({
  component: () => {
    const songs = Route.useLoaderData();
    return <SongsPage songs={songs} />;
  },
  validateSearch: (search: Record<string, unknown>) => ({
    private: Boolean(search.private),
  }),
  loaderDeps: ({ search }) => {
    return { private: search.private };
  },
  loader: async ({ deps }) => {
    try {
      if (deps.private) {
        return await getPrivateSongs();
      }
      return await getPublicSongs();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
});

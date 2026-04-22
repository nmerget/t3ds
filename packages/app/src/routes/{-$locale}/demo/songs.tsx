import { createFileRoute } from '@tanstack/react-router';
import { SongsPage } from '@/pages/demo/SongsPage';
import { getPrivateSongs, getPublicSongs } from '@/data/demo/songs.ts';

export const Route = createFileRoute('/{-$locale}/demo/songs')({
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

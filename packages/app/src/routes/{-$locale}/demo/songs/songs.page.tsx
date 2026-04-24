import { Song } from '@t3ds/directus';
import { Card } from '@/components/daisyui';

export function SongsPage({ songs }: { songs: Song[] }) {
  return (
    <div className="mx-auto max-w-4xl">
      <Card title="Full SSR - Punk Songs" className="mb-6">
        <ul className="space-y-3">
          {songs?.map((song: Song) => (
            <li
              key={song.id}
              className="rounded-lg border border-base-100 bg-base-300 p-4"
            >
              <span className="text-lg font-medium">{song.name}</span>
              <span className="text-base-content/60"> - {song.artist}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

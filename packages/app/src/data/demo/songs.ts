import { createServerFn } from '@tanstack/react-start';
import { readItems } from '@directus/sdk';
import { getClient } from '@/utils/directus';

export const getPublicSongs = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await getClient().request(readItems('songs', {}));
});

export const getPrivateSongs = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await getClient().request(readItems('private', {}));
});

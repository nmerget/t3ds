import { createServerFn } from '@tanstack/react-start';
import { readItems } from '@directus/sdk';
import { client } from '@/utils/directus';

export const getPublicSongs = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await client.request(readItems('songs', {}));
});

export const getPrivateSongs = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await client.request(readItems('private', {}));
});

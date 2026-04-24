import { createServerFn } from '@tanstack/react-start';
import { readItems } from '@directus/sdk';
import { directusRequest } from '@/utils/directus';

export const getPublicSongs = createServerFn({
  method: 'GET',
}).handler(async () => {
  return (await directusRequest(readItems('songs', {}))) ?? [];
});

export const getPrivateSongs = createServerFn({
  method: 'GET',
}).handler(async () => {
  return (await directusRequest(readItems('private', {}), true)) ?? [];
});

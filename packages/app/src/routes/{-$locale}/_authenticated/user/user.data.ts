import { createServerFn } from '@tanstack/react-start';
import { readMe } from '@directus/sdk';
import { directusRequest } from '@/utils/directus';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  location: string | null;
  title: string | null;
  description: string | null;
  avatar: string | null;
  language: string | null;
  status: string;
  role: string;
  last_access: string;
  provider: string;
  email_notifications: boolean;
}

export const getCurrentUser = createServerFn({
  method: 'GET',
}).handler(async (): Promise<User | null> => {
  try {
    return (await directusRequest(readMe(), true)) as unknown as User;
  } catch (e) {
    console.log(e);
    return null;
  }
});

import { api } from '../client.js';

interface CreateComposeInput {
  name: string;
  environmentId: string;
  appName?: string;
}

export const createCompose = (input: CreateComposeInput) =>
  api<{ composeId: string }>('/compose.create', {
    method: 'POST',
    body: JSON.stringify({
      ...input,
      composeType: 'docker-compose',
    }),
  });

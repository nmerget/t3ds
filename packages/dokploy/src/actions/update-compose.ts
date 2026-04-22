import { api } from '../client.js';

export const updateCompose = (
  composeId: string,
  data: Record<string, unknown>,
) =>
  api('/compose.update', {
    method: 'POST',
    body: JSON.stringify({ composeId, ...data }),
  });

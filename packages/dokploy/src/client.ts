const getConfig = () => {
  const apiKey = process.env.DOKPLOY_API_KEY;
  const apiUrl = process.env.DOKPLOY_API_URL;

  if (!apiKey || apiKey === 'xxx') {
    throw new Error('DOKPLOY_API_KEY is not set. Add it to .env');
  }
  if (!apiUrl) {
    throw new Error('DOKPLOY_API_URL is not set.');
  }
  if (!apiUrl.endsWith('/api')) {
    throw new Error('DOKPLOY_API_URL must end with /api');
  }

  return { apiKey, apiUrl };
};

export const api = async <T = unknown>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  const { apiKey, apiUrl } = getConfig();
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  };

  const res = await fetch(`${apiUrl}${path}`, { headers, ...options });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${body}`);
  }
  return res.json() as Promise<T>;
};

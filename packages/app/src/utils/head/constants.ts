let _cachedAppUrl: string | undefined;

export const getAppUrl = () => {
  if (_cachedAppUrl) return _cachedAppUrl;
  if (typeof window === 'undefined') {
    const url = process.env.NITRO_APP_URL || 'http://localhost:3000';
    _cachedAppUrl = url;
    return url;
  }
  return _cachedAppUrl || 'http://localhost:3000';
};

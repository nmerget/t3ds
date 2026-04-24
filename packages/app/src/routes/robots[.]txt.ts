import { createFileRoute } from '@tanstack/react-router';
import { getAppUrl } from '@/utils/head/constants';

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => {
        const appUrl = getAppUrl();

        const robots = `User-agent: *
Allow: /
Disallow: /*/login
Disallow: /*/landing
Disallow: /*/user/

Sitemap: ${appUrl}/sitemap.xml`;

        return new Response(robots, {
          headers: { 'Content-Type': 'text/plain' },
        });
      },
    },
  },
});

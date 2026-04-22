import { createFileRoute } from '@tanstack/react-router';
import { getAppUrl } from '@/utils/head/constants';
import config from '../../intlayer.config';

const locales = config.internationalization?.locales || ['en'];
const EXCLUDED = ['/login', '/landing'];

const collectPaths = (
  node: Record<
    string,
    { fullPath?: string; children?: Record<string, unknown> }
  >,
): string[] => {
  const paths: string[] = [];
  for (const route of Object.values(node)) {
    if (route.fullPath) paths.push(route.fullPath);
    if (route.children)
      paths.push(
        ...collectPaths(
          route.children as Record<
            string,
            { fullPath?: string; children?: Record<string, unknown> }
          >,
        ),
      );
  }
  return paths;
};

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const appUrl = getAppUrl();
        const routeTree = await import('@/routeTree.gen');
        const routeMap =
          (
            routeTree.routeTree as {
              children?: Record<string, { fullPath?: string }>;
            }
          ).children ?? {};

        const allPaths = collectPaths(routeMap);
        const routeSuffixes = [
          ...new Set(
            allPaths
              .filter((p) => p.startsWith('/{-$locale}'))
              .map((p) => p.replace('/{-$locale}', '').replace(/\/$/, ''))
              .filter((p) => !EXCLUDED.includes(p)),
          ),
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${locales
  .map((locale) =>
    routeSuffixes
      .map(
        (route) => `  <url>
    <loc>${appUrl}/${locale}${route}</loc>
${locales.map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${appUrl}/${alt}${route}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${appUrl}/en${route}" />
  </url>`,
      )
      .join('\n'),
  )
  .join('\n')}
</urlset>`;

        return new Response(sitemap, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});

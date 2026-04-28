import { type ReactNode, useEffect } from 'react';
import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
  useMatches,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { IntlayerProvider, useLocale } from 'react-intlayer';
import { HeadIcons, getHeadLanguages, getMetaTags } from '@/utils/head';
import { getAppUrl } from '@/utils/head/constants';

import appCss from '../index.css?url';
import { useI18nHTMLAttributes } from '@/hooks/useI18nHTMLAttributes';
import Header from '@/components/Header';

export const Route = createRootRoute({
  loader: () => ({
    appUrl: getAppUrl(),
  }),
  head: ({ loaderData, params, matches }) => {
    const { locale } = params as { locale?: string };
    const appUrl = loaderData?.appUrl || 'http://localhost:3000';
    const pathname = matches[matches.length - 1]?.pathname;

    return {
      meta: getMetaTags(locale, appUrl),
      links: [
        ...getHeadLanguages(appUrl, pathname),
        ...HeadIcons,
        { rel: 'preload', href: appCss, as: 'style' },
        { rel: 'stylesheet', href: appCss },
        {
          rel: 'manifest',
          href: '/manifest.webmanifest',
          crossOrigin: 'use-credentials',
        },
      ],
    };
  },

  component: RootComponent,
});

function RootComponent() {
  useI18nHTMLAttributes(); // add this line

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('virtual:pwa-register').then(({ registerSW }) => {
      const updateSW = registerSW({
        onNeedRefresh() {
          if (confirm('Update available. Reload?')) {
            void updateSW(true);
          }
        },
      });
    });
  }, []);
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams() as { locale?: string };

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </IntlayerProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const matches = useMatches();
  const hideShell = matches.some(
    (match) =>
      match.routeId === '/{-$locale}/landing/' || match.routeId === '/',
  );

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className={!hideShell ? 'shell' : ''}>
        {!hideShell && <Header />}
        <main className="main">{children}</main>
        <TanStackDevtools
          config={{
            position: 'top-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

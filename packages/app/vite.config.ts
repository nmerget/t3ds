import { defineConfig, loadEnv } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nitro } from 'nitro/vite';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest';
import { intlayer } from 'vite-intlayer';

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000,
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      devtools(),
      nitro({
        ...(process.env.NODE_ENV === 'production'
          ? {
              publicAssets: [
                {
                  baseURL: 'images',
                  dir: 'public/images',
                  maxAge: 60 * 60 * 24 * 100,
                },
              ],
            }
          : {}),
      }),
      tailwindcss(),
      tanstackStart({
        router: {
          routeFileIgnorePattern: '\.page\.(tsx|ts)$|\.(data|types)\.(tsx|ts)$',
        },
      }),
      viteReact(),
      VitePWA({
        workbox: {
          globPatterns: ['**/*'],
        },
        includeAssets: ['**/*'],
        manifest,
      }),
      intlayer(),
    ],
  };
});

export default config;

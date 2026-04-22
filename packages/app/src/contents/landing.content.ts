import type { Dictionary } from 'intlayer';
import { t } from 'intlayer';

const landingContent = {
  content: {
    title: t({
      en: 'Welcome to TanStack Directus',
      de: 'Willkommen bei TanStack Directus',
    }),
    subtitle: t({
      en: 'A modern monorepo with TanStack Router, Query, and Directus CMS',
      de: 'Ein modernes Monorepo mit TanStack Router, Query und Directus CMS',
    }),
    features: {
      router: {
        title: t({
          en: '🚀 TanStack Router',
          de: '🚀 TanStack Router',
        }),
        description: t({
          en: 'File-based routing with type-safe navigation and data loading',
          de: 'Dateibasiertes Routing mit typsicherer Navigation und Datenladen',
        }),
        button: t({
          en: 'View Demo',
          de: 'Demo ansehen',
        }),
      },
      directus: {
        title: t({
          en: '📦 Directus CMS',
          de: '📦 Directus CMS',
        }),
        description: t({
          en: 'Headless CMS with powerful SDK and type generation',
          de: 'Headless CMS mit leistungsstarkem SDK und Typgenerierung',
        }),
        button: t({
          en: 'Coming Soon',
          de: 'Demnächst',
        }),
      },
      daisyui: {
        title: t({
          en: '🎨 DaisyUI',
          de: '🎨 DaisyUI',
        }),
        description: t({
          en: 'Beautiful UI components built with Tailwind CSS',
          de: 'Schöne UI-Komponenten mit Tailwind CSS',
        }),
        button: t({
          en: 'Explore',
          de: 'Erkunden',
        }),
      },
      i18n: {
        title: t({
          en: '🌍 Internationalization',
          de: '🌍 Internationalisierung',
        }),
        description: t({
          en: 'Multi-language support with Intlayer',
          de: 'Mehrsprachige Unterstützung mit Intlayer',
        }),
        button: t({
          en: 'Learn More',
          de: 'Mehr erfahren',
        }),
      },
      react: {
        title: t({
          en: '⚡ React 19',
          de: '⚡ React 19',
        }),
        description: t({
          en: 'Latest React features with TypeScript 5.9',
          de: 'Neueste React-Funktionen mit TypeScript 5.9',
        }),
        button: t({
          en: 'Documentation',
          de: 'Dokumentation',
        }),
      },
      auth: {
        title: t({
          en: '🔐 Authentication',
          de: '🔐 Authentifizierung',
        }),
        description: t({
          en: 'Secure user authentication and protected routes',
          de: 'Sichere Benutzerauthentifizierung und geschützte Routen',
        }),
        button: t({
          en: 'Login',
          de: 'Anmelden',
        }),
      },
    },
  },
  key: 'landing',
} satisfies Dictionary;

export default landingContent;

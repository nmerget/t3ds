import type { Dictionary } from 'intlayer';
import { t } from 'intlayer';

const appContent = {
  content: {
    meta: {
      description: t({
        en: 'A modern TanStack application with Directus CMS integration',
        de: 'Eine moderne TanStack-Anwendung mit Directus CMS-Integration',
      }),
    },
    title: t({
      en: 'T3DS',
      de: 'T3DS',
    }),
    menu: t({
      en: 'Menu',
      de: 'Menü',
    }),
    settings: t({
      en: 'Settings',
      de: 'Einstellungen',
    }),
    navigation: {
      home: t({
        en: 'Home',
        de: 'Startseite',
      }),
      songs: t({
        en: 'Songs',
        de: 'Lieder',
      }),
      user: t({
        en: 'User',
        de: 'Benutzer',
      }),
    },
  },
  key: 'app',
} satisfies Dictionary;

export default appContent;

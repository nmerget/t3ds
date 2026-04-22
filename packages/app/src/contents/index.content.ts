import type { Dictionary } from 'intlayer';
import { t } from 'intlayer';

const indexContent = {
  content: {
    title: t({
      en: 'Home',
      de: 'Startseite',
    }),
    welcome: t({
      en: 'Welcome back! This is your home page.',
      de: 'Willkommen zurück! Dies ist Ihre Startseite.',
    }),
  },
  key: 'index',
} satisfies Dictionary;

export default indexContent;

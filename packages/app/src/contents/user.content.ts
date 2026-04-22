import type { Dictionary } from 'intlayer';
import { t } from 'intlayer';

const userContent = {
  content: {
    title: t({
      en: 'User Profile',
      de: 'Benutzerprofil',
    }),
    firstName: t({
      en: 'First Name',
      de: 'Vorname',
    }),
    lastName: t({
      en: 'Last Name',
      de: 'Nachname',
    }),
    email: t({
      en: 'Email',
      de: 'E-Mail',
    }),
    status: t({
      en: 'Status',
      de: 'Status',
    }),
    provider: t({
      en: 'Provider',
      de: 'Anbieter',
    }),
    lastAccess: t({
      en: 'Last Access',
      de: 'Letzter Zugriff',
    }),
    emailNotifications: t({
      en: 'Email Notifications',
      de: 'E-Mail-Benachrichtigungen',
    }),
    enabled: t({
      en: 'Enabled',
      de: 'Aktiviert',
    }),
    disabled: t({
      en: 'Disabled',
      de: 'Deaktiviert',
    }),
  },
  key: 'user',
} satisfies Dictionary;

export default userContent;

import type { IntlayerConfig } from 'intlayer';

import { Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.GERMAN],
  },
};

export default config;

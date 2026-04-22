# App

Example application demonstrating authentication with email/password and data fetching using TanStack Router, Query, and Directus CMS.

## Demo Features

- **Authentication** - Login with email/password, protected routes via `_authenticated.tsx`
- **Data Fetching** - SSR data loading with TanStack Router loaders (see Songs page)
- **Landing Page** - First-time visitor flow with cookie-based detection
- **DaisyUI Components** - Reusable Button, Input, Card, and Navigation components

## Project Structure

```
src/
├── components/      # Frontend components (Header, DaisyUI wrappers)
├── contents/        # Intlayer translation files
├── data/            # Server functions to fetch data
├── hooks/           # Reusable React hooks
├── pages/           # Frontend pages (mirrors routes structure)
├── routes/          # File-based routes for TanStack Start
└── utils/           # Utility functions
```

| Directory     | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| `components/` | Reusable UI components (DaisyUI wrappers, Header, etc.)       |
| `data/`       | Server functions for fetching data from Directus              |
| `hooks/`      | Reusable React hooks (e.g. `useCookie`)                       |
| `pages/`      | Page components that reflect the `routes/` structure          |
| `routes/`     | File-based routing for TanStack Start (defines URL structure) |

## Customization

### App Manifest (`manifest.ts`)

Update the PWA manifest settings for your app:

```typescript
export const APP_NAME = 'Your App Name';
export const APP_SHORT_NAME = 'Short Name';
export const APP_DESCRIPTION = 'Your app description';
export const THEME_COLOR = '#422ad5';
export const BACKGROUND_COLOR = '#ffffff';
```

### App Icon

1. Replace `public/app-icon.png` with your own icon
2. Generate all manifest icons:

```bash
pnpm run generate:manifest-icons
```

### Languages (`intlayer.config.ts`)

Configure supported languages and the default locale:

```typescript
const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.GERMAN],
  },
};
```

### Translations (`src/contents/`)

Each content file provides translations for a page or component:

| File                 | Scope              |
| -------------------- | ------------------ |
| `app.content.ts`     | Header, navigation |
| `landing.content.ts` | Landing page       |
| `index.content.ts`   | Home page          |
| `user.content.ts`    | User profile       |

Add translations using `getIntlayer` with the `locale` parameter:

```typescript
const { locale } = useParams({ strict: false });
const { title } = getIntlayer('app', locale);
```

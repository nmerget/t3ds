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
├── components/      # Reusable UI components (Header, DaisyUI wrappers)
├── contents/        # Intlayer translation files
├── hooks/           # Reusable React hooks
├── routes/          # Feature-based file structure with co-located components
│   ├── {-$locale}/
│   │   ├── _authenticated/
│   │   │   ├── index.tsx              # Layout route definition
│   │   │   └── user/
│   │   │       ├── index.tsx          # Route definition
│   │   │       ├── user.page.tsx      # UI component
│   │   │       └── user.data.ts       # Server functions & types
│   │   ├── demo/
│   │   │   └── songs/
│   │   │       ├── index.tsx          # Route definition
│   │   │       ├── songs.page.tsx     # UI component
│   │   │       └── songs.data.ts      # Server functions & types
│   │   ├── login/
│   │   │   ├── index.tsx              # Route definition
│   │   │   └── login.page.tsx         # UI component
│   │   ├── landing/
│   │   │   ├── index.tsx              # Route definition
│   │   │   └── landing.page.tsx       # UI component
│   │   └── index.tsx                  # Root route definition
└── utils/           # Utility functions
```

| Directory     | Description                                               |
| ------------- | --------------------------------------------------------- |
| `components/` | Reusable UI components (DaisyUI wrappers, Header, etc.)   |
| `routes/`     | Feature-based routing with co-located components and data |
| `hooks/`      | Reusable React hooks (e.g. `useCookie`)                   |
| `utils/`      | Utility functions and configurations                      |

**File Conventions:**

- `index.tsx` files: TanStack Router definitions, handle routing and data loading
- `[feature].page.tsx` files: UI components that focus purely on rendering
- `[feature].data.ts` files: Server functions, type definitions, and business logic
- Files with `.page.tsx`, `.data.ts`, or `.types.ts` extensions are automatically excluded from route generation

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

# T3DS - TanStack Dokploy Directus DaisyUI Starter

This is a pnpm workspace monorepo containing:

- **packages/app**: Main TanStack application with React 19, Router, Query, and DaisyUI
- **packages/directus**: Directus SDK configuration, types and migration script
- **packages/dokploy**: Dokploy deployment configuration, with init script

## Features

- 🚀 **TanStack Router** - File-based routing with type-safe navigation
- 📦 **Directus CMS** - Headless CMS with powerful SDK
- 🎨 **DaisyUI** - Beautiful UI components built with Tailwind CSS 4
- 🌍 **Internationalization** - Multi-language support with Intlayer
- ⚡ **React 19** - Latest React features with TypeScript 5.9
- 🔐 **Authentication** - Secure user authentication and protected routes
- 🍪 **Landing Page Flow** - First-time visitor detection with cookie management

## Getting Started

To run the **frontend** local:

```bash
pnpm install
pnpm dev
```

To run the **backend** local:

```bash
cd local
docker-compose up
```

### Initial startup

After starting the backend for the first time, run the migration to create all Directus collections:
See [packages/directus/README.md](packages/directus/README.md#migration--initialize) for details on configuring collections.

> **NOTE:** You need to add some data to `songs` or `private` collections to see them in the frontend.

## Deployment

Read [packages/dokploy/README.md](packages/dokploy/README.md) how to deploy you the tech stack.

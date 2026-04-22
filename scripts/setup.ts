import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const rl = createInterface({ input: process.stdin, output: process.stdout });

let cancelled = true;

rl.on('close', () => {
  if (cancelled) {
    console.log('\n\nSetup cancelled.');
    process.exit(0);
  }
});

const ask = (question: string): Promise<string> =>
  new Promise((resolve) => rl.question(question, resolve));

const replace = (filePath: string, replacements: [string, string][]) => {
  let content = readFileSync(filePath, 'utf-8');
  for (const [from, to] of replacements) {
    content = content.replaceAll(from, to);
  }
  writeFileSync(filePath, content);
};

const main = async () => {
  console.log('\n🚀 T3DS Project Setup\n');

  const name = await ask('Project name (e.g. my-app): ');
  const namespace =
    (await ask(`Package namespace [default: @${name}]: `)) || `@${name}`;
  const description = (await ask('Project description: ')) || '';
  const appName = (await ask('App display name (for PWA manifest): ')) || name;
  const appShortName =
    (await ask(`App short name [default: ${appName}]: `)) || appName;
  const author = (await ask('Author name: ')) || '';

  cancelled = false;
  rl.close();

  const oldNamespace = '@t3ds';
  const oldName = 't3ds';

  console.log('\nUpdating package.json files...');

  // Root package.json
  replace(resolve(root, 'package.json'), [
    [`"name": "${oldName}"`, `"name": "${name}"`],
    [`pnpm --filter ${oldNamespace}/app`, `pnpm --filter ${namespace}/app`],
    [
      'TanStack Dokploy Directus DaisyUI Starter - A modern full-stack monorepo with TanStack Router, Query, Directus CMS, and DaisyUI components',
      description,
    ],
  ]);

  // App package.json
  replace(resolve(root, 'packages/app/package.json'), [
    [`"name": "${oldNamespace}/app"`, `"name": "${namespace}/app"`],
    [
      `"${oldNamespace}/directus": "workspace:*"`,
      `"${namespace}/directus": "workspace:*"`,
    ],
  ]);

  // Directus package.json
  replace(resolve(root, 'packages/directus/package.json'), [
    [`"name": "${oldNamespace}/directus"`, `"name": "${namespace}/directus"`],
  ]);

  // Dokploy package.json
  replace(resolve(root, 'packages/dokploy/package.json'), [
    [`"name": "${oldNamespace}/dokploy"`, `"name": "${namespace}/dokploy"`],
  ]);

  console.log('Updating imports...');

  // App tsconfig paths
  replace(resolve(root, 'packages/app/tsconfig.json'), [
    [`"${oldNamespace}/directus"`, `"${namespace}/directus"`],
  ]);

  // App source imports
  const appSrcFiles = [
    'packages/app/src/pages/demo/SongsPage.tsx',
    'packages/app/src/utils/directus.ts',
  ];
  for (const file of appSrcFiles) {
    replace(resolve(root, file), [
      [`${oldNamespace}/directus`, `${namespace}/directus`],
    ]);
  }

  console.log('Updating manifest...');

  replace(resolve(root, 'packages/app/manifest.ts'), [
    [
      "export const APP_NAME = 'TanStack Directus'",
      `export const APP_NAME = '${appName}'`,
    ],
    [
      "export const APP_SHORT_NAME = 'TanStack Directus'",
      `export const APP_SHORT_NAME = '${appShortName}'`,
    ],
  ]);

  if (description) {
    replace(resolve(root, 'packages/app/manifest.ts'), [
      [
        "'A modern TanStack application with Directus CMS integration'",
        `'${description}'`,
      ],
    ]);
  }

  console.log('Updating documentation...');

  // Dokploy README
  replace(resolve(root, 'packages/dokploy/README.md'), [
    [`${oldNamespace}/dokploy`, `${namespace}/dokploy`],
  ]);

  // Dokploy tests
  replace(resolve(root, 'packages/dokploy/tests/init.test.ts'), [
    [`{ name: '${oldName}' }`, `{ name: '${name}' }`],
    [`name: '${oldName}'`, `name: '${name}'`],
  ]);

  // Directus README
  replace(resolve(root, 'packages/directus/README.md'), [
    [`${oldNamespace}/directus`, `${namespace}/directus`],
  ]);

  // llms.txt
  replace(resolve(root, 'llms.txt'), [
    ['T3DS - TanStack Dokploy Directus DaisyUI Starter', name],
    [`${oldNamespace}/app`, `${namespace}/app`],
    [`${oldNamespace}/directus`, `${namespace}/directus`],
    [oldName, name],
  ]);

  // Root README.md
  replace(resolve(root, 'README.md'), [
    ['T3DS - TanStack Dokploy Directus DaisyUI Starter', name],
  ]);

  if (author) {
    replace(resolve(root, 'LICENSE'), [['Nicolas Merget', author]]);
  }

  console.log(`\n✅ Project "${name}" is ready!\n`);
  console.log('Next steps:');
  console.log('  1. pnpm install');
  console.log('  2. Replace packages/app/public/app-icon.png with your icon');
  console.log(`  3. pnpm --filter ${namespace}/app generate:manifest-icons`);
  console.log('  4. Update packages/app/intlayer.config.ts for your languages');
  console.log('  5. pnpm dev\n');
};

void main();

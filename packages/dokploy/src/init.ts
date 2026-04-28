import { readFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getProjects } from './actions/get-projects.js';
import { createProject } from './actions/create-project.js';
import { getProject } from './actions/get-project.js';
import { createCompose } from './actions/create-compose.js';
import { updateCompose } from './actions/update-compose.js';
import { createDomain } from './actions/create-domain.js';
import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pkgJson = JSON.parse(
  readFileSync(resolve(__dirname, '../../../package.json'), 'utf-8'),
);
const projectName = pkgJson.name as string;

const directusComposeFile = readFileSync(
  resolve(__dirname, '../docker-compose.directus.yaml'),
  'utf-8',
);

const appComposeFile = readFileSync(
  resolve(__dirname, '../docker-compose.app.yaml'),
  'utf-8',
);

if (existsSync('../../.env')) {
  loadEnvFile('../../.env');
}

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set in .env`);
  }
  return value;
};

export const init = async () => {
  try {
    const appUrl = requireEnv('APP_URL');
    const appTag = requireEnv('APP_TAG');
    const appImage = requireEnv('APP_IMAGE');
    const directusUrl = requireEnv('DIRECTUS_URL');

    // Check if project already exists
    console.log(`Checking for existing project: ${projectName}`);
    const projects = await getProjects();
    let project = projects.find((p) => p.name === projectName);

    if (project) {
      console.log(`Project already exists: ${project.projectId}`);
    } else {
      console.log(`Creating project: ${projectName}`);
      project = await createProject(projectName);
      console.log(`Project created: ${project.projectId}`);
    }

    // Get the environment ID from the project
    const projectDetails = await getProject(project.projectId);
    const environment = projectDetails.environments[0];
    const environmentId = environment?.environmentId;

    if (!environmentId) {
      throw new Error('No environment found for project');
    }

    const existingServices = environment.compose ?? [];
    const existingDirectus = existingServices.find(
      (c) => c.name === 'directus',
    );
    const existingApp = existingServices.find((c) => c.name === 'app');

    // Create Directus compose service
    let directusComposeId: string;
    if (existingDirectus) {
      console.log(
        `Directus compose already exists: ${existingDirectus.composeId}`,
      );
      directusComposeId = existingDirectus.composeId;
    } else {
      console.log('Creating Directus compose service...');
      const directusCompose = await createCompose({
        name: 'directus',
        environmentId,
        appName: `${projectName}-directus`,
      });
      directusComposeId = directusCompose.composeId;
      console.log(`Directus compose created: ${directusComposeId}`);
    }

    const databasePassword = randomBytes(24).toString('base64url');
    const directusSecret = randomBytes(32).toString('base64');
    const directusEnv = [
      `DATABASE_PASSWORD=${databasePassword}`,
      `DIRECTUS_SECRET=${directusSecret}`,
      `ADMIN_EMAIL=admin@example.com`,
      `ADMIN_PASSWORD=d1r3ctu5`,
      `APP_URL=${appUrl}`,
    ].join('\n');

    console.log('Setting Directus compose file and environment...');
    await updateCompose(directusComposeId, {
      composeFile: directusComposeFile,
      env: directusEnv,
      sourceType: 'raw',
    });

    // Create Directus domain if not exists
    const directusHost = new URL(directusUrl).hostname;
    if (existingDirectus) {
      console.log(`Directus domain already exists: ${directusHost}`);
    } else {
      console.log(`Creating Directus domain: ${directusHost}`);
      await createDomain({
        host: directusHost,
        port: 8055,
        https: true,
        certificateType: 'letsencrypt',
        composeId: directusComposeId,
        serviceName: 'directus',
        domainType: 'compose',
      });
    }

    // Create App compose service
    let appComposeId: string;
    if (existingApp) {
      console.log(`App compose already exists: ${existingApp.composeId}`);
      appComposeId = existingApp.composeId;
    } else {
      console.log('Creating App compose service...');
      const appCompose = await createCompose({
        name: 'app',
        environmentId,
        appName: `${projectName}-app`,
      });
      appComposeId = appCompose.composeId;
      console.log(`App compose created: ${appComposeId}`);
    }

    const appEnv = [
      `APP_IMAGE=${appImage}:${appTag}`,
      `DIRECTUS_URL=${directusUrl}`,
      `APP_URL=${appUrl}`,
      `APP_HOST=${new URL(appUrl).hostname}`,
      `APP_NAME=${projectName}-app`,
    ].join('\n');

    console.log('Setting App compose file and environment...');
    await updateCompose(appComposeId, {
      composeFile: appComposeFile,
      env: appEnv,
      sourceType: 'raw',
    });

    // Create App domain if not exists
    const appHost = new URL(appUrl).hostname;
    if (existingApp) {
      console.log(`App domain already exists: ${appHost}`);
    } else {
      console.log(`Creating App domain: ${appHost}`);
      await createDomain({
        host: appHost,
        port: 3000,
        https: true,
        certificateType: 'letsencrypt',
        composeId: appComposeId,
        serviceName: 'app',
        domainType: 'compose',
      });
    }

    console.log('Initialization complete.');
  } catch (error) {
    console.error('Error initializing Dokploy:', error);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') {
  void init();
}

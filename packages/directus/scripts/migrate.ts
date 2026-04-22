import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../../../.env');

if (existsSync(envPath)) {
  loadEnvFile(envPath);
}

import {
  createCollection,
  createDirectus,
  createField,
  readCollections,
  readFieldsByCollection,
  rest,
  staticToken,
} from '@directus/sdk';
import { getDirectusUrl, Schema, schemaDefinition, songDefinition } from '../src';
import { PartialDirectusField } from '../src/types';

const accessToken = process.env.DIRECTUS_STATIC_TOKEN ?? null;

if (!accessToken) {
  throw new Error(
    'No Directus static token found. Please provide one via DIRECTUS_STATIC_TOKEN environment variable.',
  );
}

export const initializeCollections = async () => {
  const url = getDirectusUrl();
  console.log(`Connecting to Directus at ${url}`);

  const client = createDirectus<Schema>(url)
    .with(staticToken(accessToken))
    .with(rest());

  try {
    const result = await client.request(readCollections());
    const existingCollections = new Set(
      result
        .filter((c) => !c.collection.startsWith('directus_'))
        .map((c) => c.collection),
    );

    const schemaCollections = Object.keys(schemaDefinition) as (keyof Schema)[];

    for (const collectionName of schemaCollections) {
      const collection = collectionName as string;
      if (!existingCollections.has(collectionName)) {
        console.log(`Creating collection: ${collection}`);
        await client.request(
          createCollection({
            collection,
            schema: { name: collection },
            meta: { collection, icon: 'box' } as any,
          }),
        );
      } else {
        console.log(`Collection already exists: ${collection}`);
      }

      const existingFields = await client.request(
        readFieldsByCollection(collection),
      );
      const existingFieldNames = new Set(existingFields.map((f) => f.field));

      const fields: PartialDirectusField[] = Object.values(songDefinition);

      for (const field of fields) {
        if (!existingFieldNames.has(field.field!)) {
          console.log(`  Adding field: ${field.field}`);
          await client.request(createField(collectionName, field as any));
        }
      }
    }

    console.log('Initialization complete.');
  } catch (error) {
    console.error('Error initializing collections:', error);
  }
};

if (process.env.NODE_ENV !== 'test') {
  void initializeCollections();
}

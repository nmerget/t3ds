import {
  CollectionDefinition,
  FromDefinition,
  SchemaDefinition,
} from './types';

export const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';

export const DIRECTUS_SESSION_TOKEN = 'directus_session_token';
export const DIRECTUS_REFRESH_TOKEN = 'directus_refresh_token';
export const DIRECTUS_TOKEN_EXPIRES_AT = 'directus_token_expires_at';

export const songDefinition: CollectionDefinition = {
  id: {
    field: 'id',
    type: 'integer',
    schema: { is_primary_key: true, has_auto_increment: true },
    meta: { readonly: true },
  },
  name: {
    field: 'name',
    type: 'string',
    meta: { required: true },
  },
  artist: {
    field: 'artist',
    type: 'string',
    meta: {},
  },
  isNew: {
    field: 'isNew',
    type: 'boolean',
    meta: {},
  },
};

export const schemaDefinition: SchemaDefinition = {
  songs: songDefinition,
  private: songDefinition,
};

export type Song = FromDefinition<typeof songDefinition>;

export type Schema = {
  [K in keyof typeof schemaDefinition]: FromDefinition<
    (typeof schemaDefinition)[K]
  >[];
};

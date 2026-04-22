import { DirectusField } from '@directus/sdk';

export type PartialDirectusField = {
  type: DirectusField['type'];
  field: DirectusField['field'];
  schema?: Partial<DirectusField['schema']>;
  meta: Partial<DirectusField['meta']>;
};

type DirectusTypeMap = {
  integer: number;
  string: string;
  boolean: boolean;
};

export type CollectionDefinition = Record<string, PartialDirectusField>;
export type SchemaDefinition = Record<string, CollectionDefinition>;

export type FromDefinition<T extends CollectionDefinition> = {
  [K in keyof T as T[K] extends { meta: { required: true } }
    ? K
    : never]: T[K]['type'] extends keyof DirectusTypeMap
    ? DirectusTypeMap[T[K]['type']]
    : never;
} & {
  [K in keyof T as T[K] extends { meta: { required: true } }
    ? never
    : K]?: T[K]['type'] extends keyof DirectusTypeMap
    ? DirectusTypeMap[T[K]['type']]
    : never;
};

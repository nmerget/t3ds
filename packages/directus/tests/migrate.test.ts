import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockReadCollections = vi.fn();
const mockCreateCollection = vi.fn();
const mockReadFieldsByCollection = vi.fn();
const mockCreateField = vi.fn();

vi.mock('node:fs', () => ({
  existsSync: vi.fn(() => false),
}));

vi.mock('node:process', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:process')>();
  return { ...actual, loadEnvFile: vi.fn() };
});

vi.mock('@directus/sdk', () => ({
  createDirectus: () => ({
    with: function () {
      return this;
    },
    request: (fn: () => unknown) => fn(),
  }),
  rest: vi.fn(),
  staticToken: vi.fn(),
  readCollections: () => mockReadCollections,
  createCollection: () => mockCreateCollection,
  readFieldsByCollection: () => mockReadFieldsByCollection,
  createField: () => mockCreateField,
}));

describe('Directus Migration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('DIRECTUS_STATIC_TOKEN', 'test-token');
  });

  it('should create missing collections', async () => {
    mockReadCollections.mockResolvedValue([]);
    mockCreateCollection.mockResolvedValue({});
    mockReadFieldsByCollection.mockResolvedValue([]);
    mockCreateField.mockResolvedValue({});

    const { initializeCollections } = await import('../scripts/migrate.js');
    await initializeCollections();

    expect(mockCreateCollection).toHaveBeenCalledTimes(2);
  });

  it('should skip existing collections', async () => {
    mockReadCollections.mockResolvedValue([
      { collection: 'songs' },
      { collection: 'private' },
    ]);
    mockReadFieldsByCollection.mockResolvedValue([]);
    mockCreateField.mockResolvedValue({});

    const { initializeCollections } = await import('../scripts/migrate.js');
    await initializeCollections();

    expect(mockCreateCollection).not.toHaveBeenCalled();
  });

  it('should create missing fields for collections', async () => {
    mockReadCollections.mockResolvedValue([{ collection: 'songs' }]);
    mockReadFieldsByCollection.mockResolvedValue([]);
    mockCreateCollection.mockResolvedValue({});
    mockCreateField.mockResolvedValue({});

    const { initializeCollections } = await import('../scripts/migrate.js');
    await initializeCollections();

    // 4 fields (id, name, artist, isNew) per collection that needs fields
    expect(mockCreateField).toHaveBeenCalled();
  });

  it('should skip existing fields', async () => {
    mockReadCollections.mockResolvedValue([
      { collection: 'songs' },
      { collection: 'private' },
    ]);
    mockReadFieldsByCollection.mockResolvedValue([
      { field: 'id' },
      { field: 'name' },
      { field: 'artist' },
      { field: 'isNew' },
    ]);

    const { initializeCollections } = await import('../scripts/migrate.js');
    await initializeCollections();

    expect(mockCreateField).not.toHaveBeenCalled();
  });

  it('should handle errors gracefully', async () => {
    mockReadCollections.mockRejectedValue(new Error('Connection refused'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { initializeCollections } = await import('../scripts/migrate.js');
    await initializeCollections();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error initializing collections:',
      expect.any(Error),
    );
    consoleSpy.mockRestore();
  });
});

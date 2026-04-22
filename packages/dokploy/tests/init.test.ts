import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGetProjects = vi.fn();
const mockCreateProject = vi.fn();
const mockGetProject = vi.fn();
const mockCreateCompose = vi.fn();
const mockUpdateCompose = vi.fn();
const mockCreateDomain = vi.fn();

vi.mock('node:fs', () => ({
  readFileSync: vi.fn((path: string) => {
    if (path.endsWith('package.json')) {
      return JSON.stringify({ name: 't3ds' });
    }
    return 'compose-file-content';
  }),
  existsSync: vi.fn(() => false),
}));

vi.mock('node:process', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:process')>();
  return { ...actual, loadEnvFile: vi.fn() };
});

vi.mock('../src/actions/get-projects.js', () => ({
  getProjects: mockGetProjects,
}));

vi.mock('../src/actions/create-project.js', () => ({
  createProject: mockCreateProject,
}));

vi.mock('../src/actions/get-project.js', () => ({
  getProject: mockGetProject,
}));

vi.mock('../src/actions/create-compose.js', () => ({
  createCompose: mockCreateCompose,
}));

vi.mock('../src/actions/update-compose.js', () => ({
  updateCompose: mockUpdateCompose,
}));

vi.mock('../src/actions/create-domain.js', () => ({
  createDomain: mockCreateDomain,
}));

const newProjectEnv = {
  projectId: 'proj-1',
  environments: [{ environmentId: 'env-1', compose: [] }],
};

const existingProjectEnv = {
  projectId: 'proj-1',
  environments: [
    {
      environmentId: 'env-1',
      compose: [
        { composeId: 'compose-directus', name: 'directus' },
        { composeId: 'compose-app', name: 'app' },
      ],
    },
  ],
};

describe('Dokploy Initialization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    vi.stubEnv('APP_URL', 'https://app.example.com');
    vi.stubEnv('APP_TAG', 'latest');
    vi.stubEnv('APP_IMAGE', 'myapp');
    vi.stubEnv('DIRECTUS_URL', 'https://directus.example.com');
    vi.stubEnv('NODE_ENV', 'test');
  });

  it('should create a new project when none exists', async () => {
    mockGetProjects.mockResolvedValue([]);
    mockCreateProject.mockResolvedValue({ projectId: 'proj-1', name: 't3ds' });
    mockGetProject.mockResolvedValue(newProjectEnv);
    mockCreateCompose
      .mockResolvedValueOnce({ composeId: 'compose-directus' })
      .mockResolvedValueOnce({ composeId: 'compose-app' });
    mockUpdateCompose.mockResolvedValue({});
    mockCreateDomain.mockResolvedValue({ domainId: 'domain-1' });

    const { init } = await import('../src/init.js');
    await init();

    expect(mockCreateProject).toHaveBeenCalledWith('t3ds');
    expect(mockCreateCompose).toHaveBeenCalledTimes(2);
    expect(mockUpdateCompose).toHaveBeenCalledTimes(2);
    expect(mockCreateDomain).toHaveBeenCalledTimes(2);
  });

  it('should reuse existing project and not create it again', async () => {
    mockGetProjects.mockResolvedValue([
      { projectId: 'existing-1', name: 't3ds' },
    ]);
    mockGetProject.mockResolvedValue(newProjectEnv);
    mockCreateCompose
      .mockResolvedValueOnce({ composeId: 'compose-directus' })
      .mockResolvedValueOnce({ composeId: 'compose-app' });
    mockUpdateCompose.mockResolvedValue({});
    mockCreateDomain.mockResolvedValue({ domainId: 'domain-1' });

    const { init } = await import('../src/init.js');
    await init();

    expect(mockCreateProject).not.toHaveBeenCalled();
    expect(mockGetProject).toHaveBeenCalledWith('existing-1');
  });

  it('should skip compose and domain creation when services already exist', async () => {
    mockGetProjects.mockResolvedValue([{ projectId: 'proj-1', name: 't3ds' }]);
    mockGetProject.mockResolvedValue(existingProjectEnv);
    mockUpdateCompose.mockResolvedValue({});

    const { init } = await import('../src/init.js');
    await init();

    expect(mockCreateCompose).not.toHaveBeenCalled();
    expect(mockCreateDomain).not.toHaveBeenCalled();
    expect(mockUpdateCompose).toHaveBeenCalledTimes(2);
  });

  it('should still update compose file and env when services exist', async () => {
    mockGetProjects.mockResolvedValue([{ projectId: 'proj-1', name: 't3ds' }]);
    mockGetProject.mockResolvedValue(existingProjectEnv);
    mockUpdateCompose.mockResolvedValue({});

    const { init } = await import('../src/init.js');
    await init();

    expect(mockUpdateCompose).toHaveBeenCalledWith(
      'compose-directus',
      expect.objectContaining({
        composeFile: 'compose-file-content',
        sourceType: 'raw',
      }),
    );
    expect(mockUpdateCompose).toHaveBeenCalledWith(
      'compose-app',
      expect.objectContaining({
        composeFile: 'compose-file-content',
        sourceType: 'raw',
      }),
    );
  });

  it('should set correct environment variables', async () => {
    mockGetProjects.mockResolvedValue([]);
    mockCreateProject.mockResolvedValue({ projectId: 'proj-1', name: 't3ds' });
    mockGetProject.mockResolvedValue(newProjectEnv);
    mockCreateCompose
      .mockResolvedValueOnce({ composeId: 'compose-directus' })
      .mockResolvedValueOnce({ composeId: 'compose-app' });
    mockUpdateCompose.mockResolvedValue({});
    mockCreateDomain.mockResolvedValue({ domainId: 'domain-1' });

    const { init } = await import('../src/init.js');
    await init();

    const directusCall = mockUpdateCompose.mock.calls[0];
    expect(directusCall[1].env).toContain('DATABASE_PASSWORD=');
    expect(directusCall[1].env).toContain('DIRECTUS_SECRET=');
    expect(directusCall[1].env).toContain('APP_URL=https://app.example.com');

    const appCall = mockUpdateCompose.mock.calls[1];
    expect(appCall[1].env).toContain('APP_IMAGE=myapp:latest');
  });

  it('should create domains with correct hostnames for new services', async () => {
    mockGetProjects.mockResolvedValue([]);
    mockCreateProject.mockResolvedValue({ projectId: 'proj-1', name: 't3ds' });
    mockGetProject.mockResolvedValue(newProjectEnv);
    mockCreateCompose
      .mockResolvedValueOnce({ composeId: 'compose-directus' })
      .mockResolvedValueOnce({ composeId: 'compose-app' });
    mockUpdateCompose.mockResolvedValue({});
    mockCreateDomain.mockResolvedValue({ domainId: 'domain-1' });

    const { init } = await import('../src/init.js');
    await init();

    expect(mockCreateDomain).toHaveBeenCalledWith(
      expect.objectContaining({
        host: 'directus.example.com',
        port: 8055,
        composeId: 'compose-directus',
        serviceName: 'directus',
      }),
    );
    expect(mockCreateDomain).toHaveBeenCalledWith(
      expect.objectContaining({
        host: 'app.example.com',
        port: 3000,
        composeId: 'compose-app',
        serviceName: 'app',
      }),
    );
  });

  it('should throw when environment is missing', async () => {
    mockGetProjects.mockResolvedValue([{ projectId: 'proj-1', name: 't3ds' }]);
    mockGetProject.mockResolvedValue({
      projectId: 'proj-1',
      environments: [],
    });

    const mockExit = vi
      .spyOn(process, 'exit')
      .mockImplementation(() => undefined as never);

    const { init } = await import('../src/init.js');
    await init();

    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });
});

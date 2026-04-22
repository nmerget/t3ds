import { api } from '../client.js';
import type { Project } from './get-projects.js';

interface CreateProjectResponse {
  project: Project;
  environment: {
    environmentId: string;
    name: string;
    projectId: string;
  };
}

export const createProject = async (name: string): Promise<Project> => {
  const response = await api<CreateProjectResponse>('/project.create', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  return response.project;
};

import { api } from '../client.js';

export interface ProjectDetails {
  projectId: string;
  environments: {
    environmentId: string;
    compose: {
      composeId: string;
      name: string;
    }[];
  }[];
}

export const getProject = (projectId: string) =>
  api<ProjectDetails>(`/project.one?projectId=${projectId}`);

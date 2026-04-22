import { api } from '../client.js';

export interface Project {
  name: string;
  projectId: string;
}

export const getProjects = () => api<Project[]>('/project.all');

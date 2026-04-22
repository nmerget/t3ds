import { api } from '../client.js';

interface CreateDomainInput {
  host: string;
  port: number;
  https: boolean;
  certificateType: 'letsencrypt' | 'none' | 'custom';
  composeId: string;
  serviceName: string;
  domainType: 'compose' | 'application' | 'preview';
}

export const createDomain = (input: CreateDomainInput) =>
  api<{ domainId: string }>('/domain.create', {
    method: 'POST',
    body: JSON.stringify(input),
  });

import connector from './connector';

import { Build } from 'types';

export const getBuild = async (buildId: string): Promise<Build> => {
  const { data } = await connector.get(`/build/${buildId}`);
  return data;
};

export const createBuild = async (body: number[]) => {
  const { data } = await connector.post('/build/create/', body);
  return data;
};

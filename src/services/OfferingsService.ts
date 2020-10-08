import connector from './connector';

export const getCpus = async () => {
  const { data } = await connector.get('/offerings/cpu/');
  return data;
};

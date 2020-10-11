import connector from './connector';

export const getCpus = async () => {
  const { data } = await connector.get('/offerings/cpu/');
  return data;
};

export const getMemory = async () => {
  const { data } = await connector.get('/offerings/memory/');
  return data;
};

export const getCpuCoolers = async () => {
  const { data } = await connector.get('/offerings/cpuCooler/');
  return data;
};

export const getGpu = async () => {
  const { data } = await connector.get('/offerings/gpu/');
  return data;
};

export const getSsd = async () => {
  const { data } = await connector.get('/offerings/ssd/');
  return data;
};

export const getHdd = async () => {
  const { data } = await connector.get('/offerings/hdd/');
  return data;
};

export const getCase = async () => {
  const { data } = await connector.get('/offerings/case/');
  return data;
};

export const getPsu = async () => {
  const { data } = await connector.get('/offerings/psu/');
  return data;
};

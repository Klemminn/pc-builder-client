import connector from './connector';
import {
  CpuContainer,
  CpuCoolerContainer,
  MemoryContainer,
  MotherboardContainer,
  GpuContainer,
  SsdContainer,
  HddContainer,
  CaseContainer,
  PsuContainer,
} from 'types';

export const getCpus = async (): Promise<CpuContainer> => {
  const { data } = await connector.get('/offerings/cpu/');
  return data;
};

export const getCpuCoolers = async (): Promise<CpuCoolerContainer> => {
  const { data } = await connector.get('/offerings/cpuCooler/');
  return data;
};

export const getMemory = async (): Promise<MemoryContainer> => {
  const { data } = await connector.get('/offerings/memory/');
  return data;
};

export const getMotherboard = async (): Promise<MotherboardContainer> => {
  const { data } = await connector.get('/offerings/motherboard/');
  return data;
};

export const getGpu = async (): Promise<GpuContainer> => {
  const { data } = await connector.get('/offerings/gpu/');
  return data;
};

export const getSsd = async (): Promise<SsdContainer> => {
  const { data } = await connector.get('/offerings/ssd/');
  return data;
};

export const getHdd = async (): Promise<HddContainer> => {
  const { data } = await connector.get('/offerings/hdd/');
  return data;
};

export const getCase = async (): Promise<CaseContainer> => {
  const { data } = await connector.get('/offerings/case/');
  return data;
};

export const getPsu = async (): Promise<PsuContainer> => {
  const { data } = await connector.get('/offerings/psu/');
  return data;
};

import { Offering } from './Offering';

export type Component = Cpu & {
  [x: string]: string;
};

export type ComponentContainer = CpuContainer;

export type Cpu = {
  vendor: string;
  name: string;
  cpuSocket: string;
  cores: number;
  threads: number;
  coreClock: number;
  boostClock: number | null;
  tdp: number;
  graphics: string | null;
  image: string;
  offerings: Offering[];
};

export type CpuContainer = {
  vendor: string[];
  cpuSocket: string[];
  retailer: string[];
  items: Cpu[];
  [x: string]: Cpu[] | string[];
};

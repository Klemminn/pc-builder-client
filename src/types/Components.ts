import { Offering } from './Offering';

export type ComponentTypes =
  | 'cpu'
  | 'cpuCooler'
  | 'motherboard'
  | 'memory'
  | 'gpu'
  | 'ssd'
  | 'hdd'
  | 'case'
  | 'psu';

export type Component = (
  | Cpu
  | CpuCooler
  | Motherboard
  | Memory
  | Gpu
  | Ssd
  | Hdd
  | Case
  | Psu
) & {
  [x: string]: string;
};

export type Cpu = {
  id: string;
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
  minPrice: number;
  offerings: Offering[];
  selectedOffering?: Offering[];
};

export type CpuContainer = {
  vendor: string[];
  retailer: string[];
  cpuSocket: string[];
  items: Cpu[];
};

export type Memory = {
  id: string;
  vendor: string;
  name: string;
  frequency: number;
  type: string;
  modules: number;
  size: number;
  cas: number;
  minPrice: number;
  image: string;
  offerings: Offering[];
  selectedOffering?: Offering[];
};

export type MemoryContainer = {
  vendor: string[];
  retailer: string[];
  type: string[];
  frequency: number[];
  size: number[];
  items: Memory[];
};

export type CpuCooler = {
  id: string;
  vendor: string;
  name: string;
  frequency: number;
  type: string;
  modules: number;
  size: number;
  cas: number;
  minPrice: number;
  image: string;
  offerings: Offering[];
  selectedOffering?: Offering[];
};

export type CpuCoolerContainer = {
  vendor: string[];
  retailer: string[];
  fans: number[];
  fanSize: number[];
  items: Memory[];
};

export type Motherboard = {
  id: string;
  vendor: string;
  name: string;
  motherboardFormFactor: string;
  chipset: string;
  cpuSocket: string;
  memoryType: string;
  ramSlots: number;
  m2Slots: number;
  minPrice: number;
  image: string;
  offerings: Offering[];
  selectedOffering?: Offering[];
};

export type MotherboardContainer = {
  vendor: string[];
  retailer: string[];
  motherboardFormFactor: string[];
  cpuSocket: string[];
  chipset: string[];
  items: Gpu[];
};

export type Gpu = {
  id: string;
  vendor: string;
  name: string;
  type: string;
  pcieSixPin: number;
  pcieEightPin: number;
  minPrice: number;
  image: string;
  offerings: Offering[];
  selectedOffering?: Offering[];
};

export type GpuContainer = {
  vendor: string[];
  retailer: string[];
  type: string[];
  items: Gpu[];
};

export type Ssd = {
  id: string;
  vendor: string;
  name: string;
  type: string;
  capacity: number;
  readSpeed: number;
  writeSpeed: number;
  minPrice: number;
  image: string;
  offerings: Offering[];
  selectedOffering?: Offering[];
};

export type SsdContainer = {
  vendor: string[];
  retailer: string[];
  type: string[];
  capacity: number[];
  items: Gpu[];
};

export type Hdd = {
  id: string;
  vendor: string;
  name: string;
  type: string;
  capacity: number;
  format: string;
  minPrice: number;
  image: string;
  offerings: Offering[];
  selectedOffering?: Offering[];
};

export type HddContainer = {
  vendor: string[];
  retailer: string[];
  format: string[];
  capacity: number[];
  items: Gpu[];
};

export type Case = {
  id: string;
  vendor: string;
  name: string;
  motherboardFormFactor: string;
  psuFormFactor: string;
  minPrice: number;
  image: string;
  offerings: Offering[];
  selectedOffering?: Offering[];
};

export type CaseContainer = {
  vendor: string[];
  retailer: string[];
  motherboardFormFactor: string[];
  psuFormFactor: string[];
  items: Gpu[];
};

export type Psu = {
  id: string;
  vendor: string;
  name: string;
  pcieSixPin: number;
  pcieEightPin: number;
  psuFormFactor: string;
  rating: string;
  minPrice: number;
  image: string;
  offerings: Offering[];
  selectedOffering?: Offering[];
};

export type PsuContainer = {
  vendor: string[];
  retailer: string[];
  ratings: string[];
  psuFormFactor: string[];
  items: Gpu[];
};

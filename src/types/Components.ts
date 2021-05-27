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
  | 'psu'
  | 'monitor';

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
  | Monitor
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
  cpuSocket: Cpu['cpuSocket'][];
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
  type: Memory['type'][];
  frequency: Memory['frequency'][];
  size: Memory['size'][];
  items: Memory[];
};

export type CpuCooler = {
  id: string;
  vendor: string;
  name: string;
  fans: number;
  fanSize: number;
  minPrice: number;
  image: string;
  offerings: Offering[];
  selectedOffering?: Offering[];
};

export type CpuCoolerContainer = {
  vendor: string[];
  retailer: string[];
  fans: CpuCooler['fans'][];
  fanSize: CpuCooler['fanSize'][];
  items: CpuCooler[];
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
  motherboardFormFactor: Motherboard['motherboardFormFactor'][];
  cpuSocket: Motherboard['cpuSocket'][];
  chipset: Motherboard['chipset'][];
  items: Motherboard[];
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
  type: Gpu['type'][];
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
  type: Ssd['type'][];
  capacity: Ssd['capacity'][];
  items: Ssd[];
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
  format: Hdd['format'][];
  capacity: Hdd['capacity'][];
  items: Hdd[];
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
  motherboardFormFactor: Case['motherboardFormFactor'][];
  psuFormFactor: Case['psuFormFactor'][];
  items: Case[];
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
  rating: Psu['rating'][];
  psuFormFactor: Psu['psuFormFactor'][];
  items: Psu[];
};

export type Monitor = {
  id: string;
  vendor: string;
  name: string;
  resolution: string;
  panel: string;
  size: number;
  gsync: string;
  freesync: number;
  curved: boolean;
  refreshRate: number;
  image: string;
  offerings: Offering[];
  selectedOffering?: Offering[];
};

export type MonitorContainer = {
  vendor: Monitor['vendor'][];
  retailer: string[];
  resolution: Monitor['resolution'][];
  size: Monitor['size'][];
  panel: Monitor['panel'][];
  freesync: Monitor['freesync'][];
  gsync: Monitor['gsync'][];
  refreshRate: Monitor['refreshRate'][];
  items: Monitor[];
};

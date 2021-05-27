import * as Components from './Components';

export type Build = {
  buildId?: string;
  cpu?: Components.Cpu | null;
  cpuCooler?: Components.CpuCooler | null;
  motherboard?: Components.Motherboard | null;
  memory?: Components.Memory | null;
  gpu?: Components.Gpu | null;
  ssd?: Components.Ssd | null;
  hdd?: Components.Hdd | null;
  case?: Components.Case | null;
  psu?: Components.Psu | null;
  monitor?: Components.Monitor | null;
};

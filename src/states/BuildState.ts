import { createState, useState as useHookState, State } from '@hookstate/core';

import { Build } from 'types';

export const defaultBuild: Build = {
  buildId: '',
  cpu: null,
  cpuCooler: null,
  motherboard: null,
  memory: null,
  gpu: null,
  ssd: null,
  hdd: null,
  case: null,
  psu: null,
};

export const state = createState(defaultBuild);

const wrapState = (s: State<Build>) => ({
  get: () => s.value,
  set: (newState: Build) =>
    s.set(newState ? JSON.parse(JSON.stringify(newState)) : defaultBuild),
});

export const accessState = () => wrapState(state);
export const useState = () => wrapState(useHookState(state));

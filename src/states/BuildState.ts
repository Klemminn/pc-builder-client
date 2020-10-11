import { createState, useState as useHookState, State } from '@hookstate/core';

import { Component } from 'types';
import { StorageUtils } from 'utils';

type BuildState = {
  id?: string;
  cpu?: Component | null;
  cpuCooler?: Component | null;
  memory?: Component | null;
  gpu?: Component | null;
  ssd?: Component | null;
  hdd?: Component | null;
  case?: Component | null;
  psu?: Component | null;
};

const defaultState: BuildState = {
  id: '',
  cpu: null,
  cpuCooler: null,
  memory: null,
  gpu: null,
  ssd: null,
  hdd: null,
  case: null,
  psu: null,
};

const state = createState(defaultState);

const wrapState = (s: State<BuildState>) => ({
  get: () => s.value,
  set: (changes: BuildState) => {
    s.set((s) => {
      const newState = JSON.parse(JSON.stringify({ ...s, ...changes }));
      StorageUtils.setItem('build', newState);

      return newState;
    });
  },
});

export const accessState = () => wrapState(state);
export const useState = () => wrapState(useHookState(state));

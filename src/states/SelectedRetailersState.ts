import { createState, useState as useHookState, State } from '@hookstate/core';

type SelectedRetailers = string[];

const defaultState: SelectedRetailers = [];

export const state = createState(defaultState);

const wrapState = (s: State<SelectedRetailers>) => ({
  get: () => s.value,
  set: (newState?: string[]) => s.set(newState ?? defaultState),
});

export const accessState = () => wrapState(state);
export const useState = () => wrapState(useHookState(state));

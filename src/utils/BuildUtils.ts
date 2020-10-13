import { BuildState } from 'states';
import * as StorageUtils from './StorageUtils';
import { BuildService } from 'services';

export const updateState = async (changes: any, history?: any) => {
  const state = BuildState.accessState();
  // Need this hack, else hookstate crashes...
  const newState = { ...state.get(), ...changes };

  const offeringIds = [];
  for (const componentCode in newState) {
    const component = newState[componentCode];
    if (component && componentCode !== 'buildId') {
      offeringIds.push(component.selectedOffering.id);
    }
  }
  const buildId = await BuildService.createBuild(offeringIds);
  newState.buildId = buildId;

  await StorageUtils.setItem('buildId', buildId);
  state.set(newState);

  if (history) {
    history.push(`/build/${buildId}`);
  }
};

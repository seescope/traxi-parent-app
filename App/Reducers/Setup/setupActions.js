// @flow
import type { SetupAction, AppWithProgress } from './index';

export function nextStep(): SetupAction {
  return {
    type: 'NEXT_STEP',
  };
}

export function previousStep(): SetupAction {
  return {
    type: 'PREVIOUS_STEP',
  };
}

export function startedLoading(): SetupAction {
  return {
    type: 'STARTED_LOADING',
  };
}

export function stoppedLoading(): SetupAction {
  return {
    type: 'STOPPED_LOADING',
  };
}

export function fetchedApps(apps: AppWithProgress[]): SetupAction {
  return {
    type: 'FETCHED_APPS',
    apps,
  };
}

export function resetSetupState(): SetupAction {
  return {
    type: 'RESET_SETUP_STATE',
  };
}

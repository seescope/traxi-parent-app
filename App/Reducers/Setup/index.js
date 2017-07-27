// @flow
import type { Kid } from '../Kids';
type DeviceType = 'Android' | 'iPhone' | 'iPad' | 'unknown';

export type AppWithProgress = {
  name: string,
  logo: string,
  progress: number
};

export type SetupState = {
  step: number,
  kidUUID: ?string,
  setupID: ?number,
  deviceType: DeviceType,
  loading: boolean,
  sceneName: string,
  apps: ?(AppWithProgress[])
};

export type SetupAction =
  | {
      type: 'BEGIN_SETUP',
      kidUUID: string,
      setupID: number
    }
  | { type: 'BEGIN_DEEPLINK_SETUP', kid: Kid }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'STARTED_LOADING' }
  | { type: 'STOPPED_LOADING' }
  | { type: 'FETCHED_APPS', apps: AppWithProgress[] }
  | { type: 'RESET_SETUP_STATE' }
  | { type: 'FETCHED_APPS_STATUS', isFetchingApps: boolean };

const INITIAL_STATE = {
  step: 0,
  kidUUID: undefined,
  setupID: undefined,
  deviceType: 'unknown',
  loading: false,
  sceneName: 'loading',
  apps: undefined,
};

// const INITIAL_STATE = {
//   step: 0,
//   kidUUID: 'abc-123',
//   setupID: 1234,
//   deviceType: 'iPhone',
//   loading: false,
//   sceneName: 'loading',
// };

export default (
  state: SetupState = INITIAL_STATE,
  action: SetupAction
): SetupState => {
  switch (action.type) {
    case 'BEGIN_SETUP': {
      const { kidUUID, setupID } = action;
      return {
        ...INITIAL_STATE,
        setupID,
        kidUUID,
      };
    }
    case 'BEGIN_DEEPLINK_SETUP': {
      const { kid } = action;
      return {
        ...INITIAL_STATE,
        kidUUID: kid.UUID,
      };
    }
    case 'NEXT_STEP': {
      const { step } = state;
      return {
        ...state,
        step: step + 1,
      };
    }
    case 'PREVIOUS_STEP': {
      const { step } = state;
      return {
        ...state,
        step: step > 0 ? step - 1 : step,
      };
    }
    case 'STARTED_LOADING': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'STOPPED_LOADING': {
      return {
        ...state,
        loading: false,
      };
    }
    case 'FETCHED_APPS': {
      return {
        ...state,
        apps: action.apps,
      };
    }
    case 'ADDED_ADDITIONAL_CHILD': {
      const { UUID: kidUUID, setupID } = action;
      return {
        ...state,
        kidUUID,
        setupID,
        step: 0,
        apps: undefined,
      };
    }
    case 'REACT_NATIVE_ROUTER_FLUX_FOCUS': {
      const sceneName = action.scene && action.scene.name;
      return {
        ...state,
        sceneName,
      };
    }
    case 'RESET_SETUP_STATE': {
      return {
        ...state,
        step: 0,
      };
    }
    default:
      return state;
  }
};

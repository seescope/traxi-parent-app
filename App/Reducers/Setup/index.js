// @flow
import type { Kid } from '../Kids';
type DeviceType = 'Android' | 'iPhone' | 'iPad' | 'unknown';
export type SetupState = {
  step: number,
  kidUUID: ?string,
  setupID: ?number,
  deviceType: DeviceType,
  loading: boolean,
  sceneName: string
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
  | { type: 'STOPPED_LOADING' };

const INITIAL_STATE = {
  step: 0,
  kidUUID: undefined,
  setupID: undefined,
  deviceType: 'unknown',
  loading: false,
  sceneName: 'loading',
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
    case 'REACT_NATIVE_ROUTER_FLUX_FOCUS': {
      const sceneName = action.scene && action.scene.name;
      return {
        ...state,
        sceneName,
      };
    }
    default:
      return state;
  }
};

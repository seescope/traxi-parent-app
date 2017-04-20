// @flow
import type { Kid } from "../Kids";
type DeviceType = "Android" | "iPhone" | "iPad" | "unknown";
export type SetupState = {
  step: number,
  kidUUID: ?string,
  setupID: ?number,
  deviceType: DeviceType
};

export type SetupAction =
  | {
      type: "BEGIN_SETUP",
      kidUUID: string,
      setupID: number
    }
  | { type: "BEGIN_DEEPLINK_SETUP", kid: Kid }
  | { type: "NEXT_STEP" };

const INITIAL_STATE = {
  step: 0,
  kidUUID: undefined,
  setupID: undefined,
  deviceType: "unknown"
};

export default (
  state: SetupState = INITIAL_STATE,
  action: SetupAction
): SetupState => {
  switch (action.type) {
    case "BEGIN_SETUP": {
      const { kidUUID, setupID } = action;
      return {
        ...INITIAL_STATE,
        setupID,
        kidUUID
      };
    }
    case "BEGIN_DEEPLINK_SETUP": {
      const { kid } = action;
      return {
        ...INITIAL_STATE,
        kidUUID: kid.UUID
      };
    }
    case "NEXT_STEP": {
      const { step } = state;
      return {
        ...state,
        step: step + 1
      };
    }
    default:
      return state;
  }
};

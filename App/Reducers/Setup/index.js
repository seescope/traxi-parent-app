// @flow

export type SetupState = {
  step: number,
  kidUUID: ?string
};

export type SetupAction =
  | {
      type: "BEGIN_SETUP",
      kidUUID: string
    }
  | { type: "NEXT_STEP" };

const INITIAL_STATE = {
  step: 0,
  kidUUID: undefined
};

export default (
  state: SetupState = INITIAL_STATE,
  action: SetupAction
): SetupState => {
  switch (action.type) {
    case "BEGIN_SETUP": {
      const { kidUUID } = action;
      return {
        ...state,
        kidUUID
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

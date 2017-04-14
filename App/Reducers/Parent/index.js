// @flow
type ParentState = {
  name: ?String,
  UUID: ?String,
  email: ?String,
  kids: Array<String>
};

type ParentAction =
  | { type: "SET_NAME", name: String }
  | { type: "BEGIN_SETUP", parentUUID: String, kidUUID: String };

export const INITIAL_STATE = {
  name: undefined,
  UUID: undefined,
  email: undefined,
  kids: []
};

export default function parent(
  state: ParentState = INITIAL_STATE,
  action: ParentAction
): ParentState {
  switch (action.type) {
    case "BEGIN_SETUP": {
      const { parentUUID, kidUUID } = action;
      return {
        ...state,
        UUID: parentUUID,
        kids: [kidUUID]
      };
    }
    default:
      return state;
  }
}

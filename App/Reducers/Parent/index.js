// @flow
import type { KidsState } from '../Kids';

export type ParentState = {
  name: ?string,
  UUID: ?string,
  email: ?string,
  kids: Array<string>,
  password: ?string,
};

export type ParentAction =
  | { type: 'SET_PARENT_NAME', name: string }
  | { type: 'BEGIN_SETUP', parentUUID: string, kidUUID: string }
  | { type: 'BEGIN_DEEPLINK_SETUP', parent: ParentState }
  | { type: 'SET_EMAIL', email: string }
  | { type: 'PROFILE_MIGRATED', kids: KidsState, parent: ParentState }
  | { type: 'SET_PASSWORD', password: string };

export const INITIAL_STATE = {
  name: undefined,
  UUID: undefined,
  email: undefined,
  password: undefined,
  kids: [],
};
// export const INITIAL_STATE = {
//   name: undefined,
//   UUID: 'fda-123',
//   email: undefined,
//   password: undefined,
//   kids: ['abc-123'],
// };

export default function parent(
  state: ParentState = INITIAL_STATE,
  action: ParentAction,
): ParentState {
  switch (action.type) {
    case 'BEGIN_SETUP': {
      const { parentUUID, kidUUID } = action;
      return {
        ...INITIAL_STATE,
        UUID: parentUUID,
        kids: [kidUUID],
      };
    }
    case 'SET_PARENT_NAME': {
      const { name } = action;
      return {
        ...state,
        name,
      };
    }
    case 'SET_EMAIL': {
      const { email } = action;
      return {
        ...state,
        email,
      };
    }
    case 'SET_PASSWORD': {
      const { password } = action;
      return {
        ...state,
        password,
      };
    }
    case 'BEGIN_DEEPLINK_SETUP': {
      return action.parent;
    }
    default:
      return state;
  }
}

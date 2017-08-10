// @flow
import type { KidsState } from '../Kids';

export type ParentState = {
  name: ?string,
  UUID: ?string,
  email: ?string,
  kids: Array<string>,
  transactions: ?Array<string>,
  password: ?string,
  upgradedAt: ?string,
  createdAt: ?string,
  activatedAt: ?string
};

export type ParentAction =
  | { type: 'SET_PARENT_NAME', name: string }
  | {
      type: 'BEGIN_SETUP',
      parentUUID: string,
      kidUUID: string,
      setupID: number
    }
  | { type: 'BEGIN_DEEPLINK_SETUP', parent: ParentState }
  | { type: 'SET_EMAIL', email: string }
  | { type: 'PROFILE_MIGRATED', kids: KidsState, parent: ParentState }
  | { type: 'IMPERSONATED_PARENT', kids: KidsState, parent: ParentState }
  | { type: 'SET_PASSWORD', password: string }
  | { type: 'ADDED_ADDITIONAL_CHILD', UUID: string, setupID: number }
  | { type: 'USER_LOGGED_IN', parent: ParentState }
  | { type: 'ACCOUNT_UPGRADED', upgradedAt: string, orderId: string }
  | { type: 'ACCOUNT_CREATED' }
  | { type: 'ACTIVATED_PARENT', activatedAt: string };

export const INITIAL_STATE = {
  name: undefined,
  UUID: undefined,
  email: undefined,
  password: undefined,
  upgradedAt: undefined,
  createdAt: undefined,
  activatedAt: undefined,
  transactions: undefined,
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
  action: ParentAction
): ParentState {
  switch (action.type) {
    case 'BEGIN_SETUP': {
      const { parentUUID, kidUUID } = action;
      return {
        ...INITIAL_STATE,
        UUID: parentUUID,
        kids: [kidUUID],
        createdAt: new Date().toISOString(),
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
    case 'PROFILE_MIGRATED': {
      return action.parent;
    }
    case 'IMPERSONATED_PARENT': {
      return action.parent;
    }
    case 'ADDED_ADDITIONAL_CHILD': {
      const { UUID } = action;
      return {
        ...state,
        kids: [...state.kids, UUID],
      };
    }
    case 'ACCOUNT_UPGRADED': {
      const { upgradedAt, orderId } = action;
      const transactions = state.transactions || [];
      return {
        ...state,
        upgradedAt,
        transactions: [...transactions, orderId],
      };
    }
    case 'ACTIVATED_PARENT': {
      const { activatedAt } = action;
      return {
        ...state,
        activatedAt,
      };
    }
    default:
      return state;
  }
}

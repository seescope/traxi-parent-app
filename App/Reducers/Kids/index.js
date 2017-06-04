// @flow
export type DeviceType = 'iPhone' | 'Android' | 'iPad' | 'unknown';
export type Kid = {
  name: ?string,
  UUID: string,
  deviceType: DeviceType,
  installed: boolean,
  avatarURL: ?string
};

export type KidsState = {
  [string]: Kid
};

export type KidsAction =
  | {
      type: 'BEGIN_SETUP',
      kidUUID: string
    }
  | { type: 'SET_KID_NAME', name: string, UUID: string }
  | { type: 'KID_UPDATED', kid: Kid, UUID: string }
  | { type: 'BEGIN_DEEPLINK_SETUP', kid: Kid }
  | { type: 'PROFILE_MIGRATED', kids: KidsState }
  | { type: 'SET_KID_IMAGE', avatarURL: string, UUID: string };

const createNewKid = (UUID: string): Kid => ({
  name: undefined,
  UUID,
  deviceType: 'unknown',
  installed: false,
  avatarURL: '',
});

const INITIAL_STATE = {};
// const INITIAL_STATE = {
//   'abc-123': {
//     ...createNewKid('abc-123'),
//     deviceType: 'Android',
//     name: 'Test Kid',
//   },
// };

export default (
  state: KidsState = INITIAL_STATE,
  action: KidsAction
): KidsState => {
  switch (action.type) {
    case 'BEGIN_SETUP': {
      const { kidUUID } = action;
      return {
        [kidUUID]: createNewKid(kidUUID),
      };
    }
    case 'BEGIN_DEEPLINK_SETUP': {
      const { kid } = action;
      const { UUID } = kid;

      if (!UUID) return state;

      return {
        [UUID]: kid,
      };
    }
    case 'SET_KID_NAME': {
      const { name, UUID } = action;
      const kid = state[UUID];

      if (!kid) return state;

      const updatedKid = {
        ...kid,
        name,
      };

      return {
        ...state,
        [UUID]: updatedKid,
      };
    }
    case 'KID_UPDATED': {
      const { kid, UUID } = action;
      return {
        ...state,
        [UUID]: kid,
      };
    }
    case 'SET_KID_IMAGE': {
      const { avatarURL, UUID } = action;
      const kid = state[UUID];

      if (!kid) return state;

      const updatedKid = {
        ...kid,
        avatarURL,
      };

      return {
        ...state,
        [UUID]: updatedKid,
      };
    }
    case 'PROFILE_MIGRATED': {
      return action.kids;
    }
    case 'IMPERSONATED_PARENT': {
      return action.kids;
    }
    default:
      return state;
  }
};

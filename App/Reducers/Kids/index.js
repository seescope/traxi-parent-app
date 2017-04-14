// @flow
export type DeviceType = "iPhone" | "Android" | "iPad" | "unknown";
export type Kid = {
  name: ?string,
  UUID: ?string,
  deviceType: DeviceType,
  installed: boolean
};

export type KidsState = {
  [string]: Kid
};

export type KidsAction =
  | {
      type: "BEGIN_SETUP",
      kidUUID: string,
      parentUUID: string
    }
  | { type: "SET_KID_NAME", name: string, UUID: string };

const createNewKid = (UUID: string): Kid => ({
  name: undefined,
  UUID,
  deviceType: "unknown",
  installed: false
});

export default (state: KidsState, action: KidsAction) => {
  switch (action.type) {
    case "BEGIN_SETUP": {
      const { kidUUID } = action;
      return {
        ...state,
        [kidUUID]: createNewKid(kidUUID)
      };
    }
    case "SET_KID_NAME": {
      const { name, UUID } = action;
      const kid = state[UUID];

      if (!kid) return state;

      const updatedKid = {
        ...kid,
        name
      };

      return {
        ...state,
        [UUID]: updatedKid
      };
    }
    default:
      return state;
  }
};

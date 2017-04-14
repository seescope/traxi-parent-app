// @flow
export type DeviceType = "iPhone" | "Android" | "iPad" | "unknown";
export type Kid = {
  name: ?string,
  UUID: ?string,
  deviceType: DeviceType,
  installed: boolean
};

export type KidsState = Map<string, Kid>;
export type KidsAction = {
  type: "BEGIN_SETUP",
  kidUUID: string,
  parentUUID: string
};

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
    default:
      return state;
  }
};

// @flow
import type { KidsAction } from "./index";

export function setKidName(name: string, UUID: string): KidsAction {
  return {
    type: "SET_KID_NAME",
    name,
    UUID
  };
}

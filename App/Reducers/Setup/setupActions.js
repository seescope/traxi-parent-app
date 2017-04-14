// @flow
import type { SetupAction } from "./index";

export function nextStep(): SetupAction {
  return {
    type: "NEXT_STEP"
  };
}

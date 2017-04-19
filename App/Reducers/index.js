/* eslint no-duplicate-imports: 0 */

import { combineReducers } from "redux";
import parent from "./Parent";
import kids from "./Kids";
import setup from "./Setup";

import type { ParentState } from "./Parent";
import type { KidsState } from "./Kids";
import type { SetupState } from "./Setup";

export type RootState = {
  parentState: ParentState,
  kidsState: KidsState,
  setupState: SetupState
};

const rootState: RootState = {
  parentState: parent,
  kidsState: kids,
  setupState: setup
};

export default combineReducers(rootState);

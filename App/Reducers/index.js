// @flow
/* eslint no-duplicate-imports: 0, no-use-before-define: 0 */

import { combineReducers } from 'redux';
import parent from './Parent';
import kids from './Kids';
import setup from './Setup';
import reports from './Reports';

import type { ParentState, ParentAction } from './Parent';
import type { KidsState, KidsAction } from './Kids';
import type { SetupState, SetupAction } from './Setup';
import type { ReportsState, ReportsAction } from './Reports';

export type RootState = {
  parentState: ParentState,
  kidsState: KidsState,
  setupState: SetupState,
  reportsState: ReportsState
};

export type Action = ParentAction | KidsAction | SetupAction | ReportsAction;
export type Dispatch = (action: Action | ThunkAction) => any;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type GetState = () => RootState;

const rootState = {
  parentState: parent,
  kidsState: kids,
  setupState: setup,
  reportsState: reports,
};

export default combineReducers(rootState);

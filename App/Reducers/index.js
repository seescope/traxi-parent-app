// @flow
/* eslint no-duplicate-imports: 0 */

import { combineReducers } from 'redux';
import parent from './Parent';
import kids from './Kids';
import setup from './Setup';
import reports from './Reports';

import type { ParentState } from './Parent';
import type { KidsState } from './Kids';
import type { SetupState } from './Setup';
import type { ReportsState } from './Reports';

export type RootState = {
  parentState: ParentState,
  kidsState: KidsState,
  setupState: SetupState,
  reportsState: ReportsState
};

const rootState = {
  parentState: parent,
  kidsState: kids,
  setupState: setup,
  reportsState: reports,
};

export default combineReducers(rootState);

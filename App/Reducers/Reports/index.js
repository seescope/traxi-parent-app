// @flow
export type ReportsState = {
  [string]: any
};
export type ReportsAction = { type: "FETCHED_REPORTS", reports: ?ReportsState };

const INITIAL_STATE = {};

export default (
  state: ReportsState = INITIAL_STATE,
  action: ReportsAction
): ReportsState => {
  switch (action.type) {
    case "FETCHED_REPORTS": {
      return action.reports || {};
    }
    default:
      return state;
  }
};

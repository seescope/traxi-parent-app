// @flow
export type ReportsState = {
  [string]: any,
  loading: boolean,
};
export type ReportsAction =
  | { type: 'FETCHED_REPORTS', reports: ?ReportsState }
  | { type: 'FETCHING_REPORTS' };

const INITIAL_STATE = {
  loading: false,
};

export default (
  state: ReportsState = INITIAL_STATE,
  action: ReportsAction,
): ReportsState => {
  switch (action.type) {
    case 'FETCHED_REPORTS': {
      return {
        ...action.reports,
        loading: false,
      };
    }
    case 'FETCHING_REPORTS': {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

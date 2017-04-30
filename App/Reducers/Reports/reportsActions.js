// @flow
import type { Reports, ReportsAction } from './index';

export function fetchedReports(reports: Reports): ReportsAction {
  return {
    type: 'FETCHED_REPORTS',
    reports,
  };
}

export function fetchingReports(): ReportsAction {
  return {
    type: 'FETCHING_REPORTS',
  };
}

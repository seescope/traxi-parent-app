// @flow
type Reports = any; // FIXME: Get a real type.
import type { ReportsAction } from './index';

export function fetchedReports(reports: Reports): ReportsAction {
  return {
    type: 'FETCHED_REPORTS',
    reports,
  };
}

// @flow

export type TopApp = {
  name: string,
  logoURL: string,
  usage: number,
  max: number,
};

export type TopCategory = {
  category: string,
  usage: number,
  max: number,
};

export type PeakTime = {
  name: string,
  usage: number,
  max: number,
};

export type RecentApp = {
  name: string,
  logoURL: string,
  time: string,
};

export type ReportItem = TopApp | TopCategory | PeakTime | RecentApp;

export type CardWithDate<R> = {
  week: ?Array<R>,
  yesterday: ?Array<R>,
  today: ?Array<R>,
};

export type CardData = CardWithDate<ReportItem> | Array<ReportItem>;

export type Report = {
  topApps: CardWithDate<TopApp>,
  topCategories: CardWithDate<TopCategory>,
  peakTimes: CardWithDate<PeakTime>,
  recentApps: Array<RecentApp>,
};

export type Reports = {
  [string]: Report,
};

export type ReportsState = {
  [string]: Report,
  loading: boolean,
};
export type ReportsAction =
  | { type: 'FETCHED_REPORTS', reports: Reports }
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

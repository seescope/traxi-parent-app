// @flow
/* eslint flowtype/require-parameter-type: [2, { "excludeArrowFunctions": "expressionsOnly"}] */
/* eslint flowtype/require-return-type: [2, "always", { "excludeArrowFunctions": "expressionsOnly"}] */

import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { logError } from '../Utils';
import { fetchedApps } from '../Reducers/Setup/setupActions';

import type { RootState } from '../Reducers';
import type { SetupAction, AppWithProgress } from '../Reducers/Setup';

const DEV_API_GATEWAY_URL = 'https://fvfydckah0.execute-api.ap-southeast-2.amazonaws.com/dev?UUID=';
const PROD_API_GATEWAY_URL = 'https://fshfq7krz5.execute-api.ap-southeast-2.amazonaws.com/prod?UUID=';
const API_GATEWAY_URL = __DEV__ ? DEV_API_GATEWAY_URL : PROD_API_GATEWAY_URL;

type GetState = () => RootState;
type AsyncAction = (action: any, getState: GetState) => Promise<void>;
type Dispatch = (action: SetupAction | AsyncAction) => void;
type App = {
  Name: string,
  TimeUsed: number,
  Logo: string
};

const hasEnoughUsage = (apps: AppWithProgress[]): boolean =>
  apps.filter(a => a.progress >= 100).length > 1;

const groupAppsByName = (apps: App[]): App[] =>
  apps.reduce(
    (previous: App[], app: App): App[] => {
      const { Name: name, TimeUsed: timeUsed } = app;

      const index = _.findIndex(previous, ['Name', name]);

      if (index !== -1) {
        const modifiedPrevious = [...previous];
        modifiedPrevious[index].TimeUsed += timeUsed;

        return modifiedPrevious;
      }
      return [...previous, app];
    },
    []
  );

const getUpdatedProgress = (
  previous: AppWithProgress,
  newApp: AppWithProgress
): number => {
  // If the data fetched from AppState has more progress than what we currently have,
  // then use this data.
  if (newApp.progress >= previous.progress) return newApp.progress;

  // The other possible (but less likely) case is that the session we were previously
  // tracking has now ended, so we need to combine the usage of our previous session
  // with the new one.
  return previous.progress + newApp.progress;
};

const combineProgress = (
  accumulator: AppWithProgress[],
  app: AppWithProgress
): AppWithProgress[] => {
  if (!accumulator.length) return [app];

  const previous = _.head(accumulator);
  if (app.name !== previous.name) return [app, ...accumulator];

  const updated = {
    ...previous,
    progress: getUpdatedProgress(previous, app),
  };

  return [updated, ..._.tail(accumulator)];
};

// Functional programming, bitch.
const mergeWithAppsFromState = (
  previousApps: AppWithProgress[],
  newApps: AppWithProgress[]
): AppWithProgress[] =>
  _.chain(previousApps)
    .union(newApps)
    .sortBy('name')
    .reduce(combineProgress, [])
    .value();

const getProgressValue = (timeUsed: number): number => {
  if (timeUsed >= 60) return 100;
  const percentage = timeUsed / 60 * 100;
  return Math.round(percentage);
};

const parseApp = (app: App): AppWithProgress => ({
  name: app.Name,
  logo: app.Logo,
  progress: getProgressValue(app.TimeUsed),
});

const parseApps = (apps: App[]): AppWithProgress[] =>
  groupAppsByName(apps).filter(a => a.TimeUsed > 5).map(parseApp);

const getInitialUsage = () =>
  (dispatch: Dispatch, getState: GetState): Promise<void> => {
    const state = getState();
    const UUID = state.parentState.kids[0];

    if (!UUID) throw new Error('No UUID for parent while getting InitialUsage');

    const url = `${API_GATEWAY_URL}${UUID}`;

    return fetch(url)
      .then((response: Response): App[] => {
        if (!response.ok) {
          console.log('Error response', response);
          throw new Error(
            `Error fetching data from Lambda endpoint: code ${response.code} statusText: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((rawApps: App[]) => {
        const apps = parseApps(rawApps);

        if (hasEnoughUsage(apps)) {
          Actions.setupCompletion();
          return;
        }

        if (!state.setupState.apps) {
          dispatch(fetchedApps(apps));
          dispatch(getInitialUsage());
          return;
        }

        const mergedApps = mergeWithAppsFromState(state.setupState.apps, apps);
        dispatch(fetchedApps(mergedApps));

        if (hasEnoughUsage(mergedApps)) {
          Actions.setupCompletion();
          return;
        }

        dispatch(getInitialUsage());
      })
      .catch(error => logError(error));
  };

export default getInitialUsage;

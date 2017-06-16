// @flow

import { logError } from '../Utils';
import { fetchedApps, fetchingApps } from '../Reducers/Setup/setupActions';
import _ from 'lodash';

import type { RootState } from '../Reducers';
import type { SetupAction } from '../Reducers/Setup';

const DEV_API_GATEWAY_URL = 'https://fvfydckah0.execute-api.ap-southeast-2.amazonaws.com/dev?UUID=';
const PROD_API_GATEWAY_URL = 'https://fshfq7krz5.execute-api.ap-southeast-2.amazonaws.com/prod?UUID=';
const API_GATEWAY_URL = __DEV__ ? DEV_API_GATEWAY_URL : PROD_API_GATEWAY_URL;

type Dispatch = (action: SetupAction) => void;
type GetState = () => RootState;

const groupAppsByName = apps =>
  apps.reduce(
    (previous, app) => {
      const { Name: name, TimeUsed: timeUsed } = app;

      const index = _.findIndex(previous, ['Name', name]);

      if (index !== -1) {
        const modifiedPrevious = [...previous];
        modifiedPrevious[index].TimeUsed += timeUsed;

        return modifiedPrevious;
      }
      return [...previous, app];
    },
    [],
  );

const removeLowUsage = apps =>
  apps.reduce(
    (previous, app) => {
      const { TimeUsed: timeUsed } = app;

      if (timeUsed < 5) return previous;

      return [...previous, app];
    },
    [],
  );

const addPreviousProgress = (apps, previousApps) =>
  previousApps.reduce(
    (previous, app) => {
      const { name, progress } = app;

      const index = _.findIndex(apps, ['name', name]);

      if (index !== -1) {
        const oldProgress = apps[index].progress;
        if (oldProgress < progress) {
          let sum = oldProgress + progress;
          if (sum > 100) sum = 100;
          return [...previous, { ...app, progress: sum }];
        }
      }
      return [...previous, app];
    },
    [],
  );

const getProgressValue = timeUsed => {
  if (timeUsed >= 60) return 100;
  const percentage = timeUsed / 60 * 100;
  return Math.round(percentage);
};

const getAppsInformations = apps =>
  apps.map(app => ({
    name: app.Name,
    logo: app.Logo,
    progress: getProgressValue(app.TimeUsed),
  }));

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    dispatch(fetchingApps(true));

    const state = getState();
    const UUID = state.parentState.kids[0];

    if (!UUID) throw new Error('No UUID for parent while getting InitialUsage');

    const url = `${API_GATEWAY_URL}${UUID}`;

    return fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.statusCode !== 200) {
          throw new Error(
            `Error fetching onboarding data ${JSON.stringify(json)}`,
          );
        }
        return JSON.parse(json.body);
      })
      .then(apps => {
        const appsGrouped = groupAppsByName(apps);
        const appsWithoutLowUsage = removeLowUsage(appsGrouped);
        const appsCleaned = getAppsInformations(appsWithoutLowUsage);

        if (!state.setupState || !state.setupState.apps) {
          dispatch(fetchedApps(appsCleaned));
        } else {
          const previousAppsFromState = state.setupState.apps;
          const appsWithOldProgress = addPreviousProgress(
            appsCleaned,
            previousAppsFromState,
          );

          dispatch(fetchedApps(appsWithOldProgress));
        }

        dispatch(fetchingApps(false));
      })
      .catch(error => {
        logError(error);
      });
  };

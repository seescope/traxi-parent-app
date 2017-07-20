// @flow
import Analytics from 'react-native-analytics';

import type { RootState } from '../Reducers';
import type { ParentAction } from '../Reducers/Parent';
import type { KidsAction } from '../Reducers/Kids';
import type { ReportsAction } from '../Reducers/Reports';
import type { SetupAction } from '../Reducers/Setup';

type Store = {
  getState: () => RootState
};

type Action = ParentAction | KidsAction | ReportsAction | SetupAction;

type NextAction = {};

type Next = (Action) => NextAction;

export default (store: Store) =>
  (next: Next) =>
    (action: Action): NextAction => {
      // Don't track in debug.
      if (__DEV__) return next(action);

      if (action.type === 'NEXT_STEP') {
        const { setupState } = store.getState();
        const { step } = setupState;
        Analytics.track('Advanced Through Walkthrough', { currentStep: step });
      }

      if (action.type === 'KID_UPDATED') {
        const { kid } = action;
        const { deviceType, installed } = kid;
        if (deviceType !== 'unknown' && !installed) {
          Analytics.track('Verified Device', kid);
        }
      }

      if (action.type === 'BEGIN_SETUP') {
        const { kidUUID, setupID } = action;
        Analytics.track('Started Setup', { kidUUID, setupID });
      }

      if (action.type === 'BEGIN_DEEPLINK_SETUP') {
        const { parentState, kidsState } = store.getState();
        Analytics.track('Started Deeplink Setup', { parentState, kidsState });
      }

      if (action.type === 'PREVIOUS_STEP') {
        const { setupState } = store.getState();
        const { step } = setupState;
        Analytics.track('Went Back in Walkthrough', { currentStep: step });
      }

      // Log screen changes in Segment
      if (action.type === 'REACT_NATIVE_ROUTER_FLUX_FOCUS') {
        const { scene } = action;
        Analytics.screen(scene.name);
      }

      if (action.type === 'FETCHED_REPORTS') {
        const { parentState } = store.getState();
        const { kids } = parentState;
        const { reports } = action;

        const isEmpty = kids.filter(k => {
          const report = reports[k];

          // Could be null or empty.
          return report.topApps.today
            ? report.topApps.today.length === 0
            : true;
        }).length > 0;

        if (isEmpty) Analytics.track('Received Empty Report');
        else Analytics.track('Received Valid Report');
      }

      if (action.type === 'FETCHED_APPS') {
        Analytics.track('Received Initial Apps', { apps: action.apps.length });
      }

      if (action.type === 'ACCOUNT_UPGRADED') {
        Analytics.track('Account Upgraded', { revenue: 1.99 });
      }

      if (action.type === 'ACTIVATED_PARENT') {
        Analytics.track('Completed Setup');
      }

      // Fall through
      return next(action);
    };

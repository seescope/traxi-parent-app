// @flow
import { database } from 'firebase';

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
      const { parentState } = store.getState();
      const { UUID } = parentState;
      if (!UUID || __DEV__) return next(action);

      const ref = database().ref(`parentAppActions/${UUID}`).push();
      ref.set({
        action: JSON.stringify(action),
        currentState: JSON.stringify(store.getState()),
        timestamp: new Date().toISOString(),
      });

      return next(action);
    };

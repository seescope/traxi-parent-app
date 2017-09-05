// @flow
import moment from 'moment';
import _ from 'lodash';
import { database } from 'firebase';
import { Actions } from 'react-native-router-flux';

type Action = {
  [string]: any,
  type: string
};

type StoredAction = {
  action: string,
  timestamp: string
};

type FirebaseActions = {
  [string]: StoredAction
};

type Dispatch = (action: Action) => any;

const PUSH = 'REACT_NATIVE_ROUTER_FLUX_PUSH';
const RESET = 'REACT_NATIVE_ROUTER_FLUX_RESET';
const REPLACE = 'REACT_NATIVE_ROUTER_FLUX_REPLACE';
const BACK = 'REACT_NATIVE_ROUTER_FLUX_BACK_ACTION';

const getSetupState = (actions: StoredAction[]): Action => {
  const userLoggedIn = actions.filter(a => a.action.match(/USER_LOGGED_IN/))[0];
  const action = JSON.parse(userLoggedIn.action);
  const { parent } = action;

  return {
    type: 'BEGIN_SETUP',
    parentUUID: parent.UUID,
    kidUUID: parent.kids[0],
    setupID: 1234,
  };
};

const handleAction = (action: Action, dispatch: Dispatch) => {
  if (action.type === PUSH) Actions[action.key]();
  if (action.type === RESET) Actions[action.key]({ type: 'reset' });
  if (action.type === REPLACE) Actions[action.key]({ type: 'replace' });
  if (action.type === BACK) Actions.pop();
  else dispatch(action);
};

const dispatchActions = (actions: StoredAction[], dispatch: Dispatch) => {
  if (!actions.length) return;

  const { action, timestamp } = actions[0];
  const parsedAction = JSON.parse(action);
  console.log('Replaying action', parsedAction);

  handleAction(parsedAction, dispatch);

  if (actions.length < 2) {
    console.warn('Finished replaying actions');
    return;
  }

  const startTime = moment(timestamp);
  const nextTime = moment(actions[1].timestamp);
  const delta = nextTime.diff(startTime);

  // If the next action is longer than a minute away, let's just say it's 5 seconds.
  const timeout = delta > 60000 ? 5000 : delta;
  if (delta > 60000) console.log('Long pause', delta / 1000, 'seconds');
  console.log('Playing next action in', timeout / 1000, 'seconds');

  setTimeout(() => dispatchActions(actions.slice(1), dispatch), timeout);
};

const fetchActions = (UUID: string): ?FirebaseActions =>
  database().ref(`parentAppActions/${UUID}`).once('value').then(s => s.val());

export default async (uuid: string, dispatch: Dispatch) => {
  console.warn('Replaying actions for', uuid);
  const actionsForUUID = await fetchActions(uuid);
  if (!actionsForUUID) {
    console.error('No actions found!');
    return;
  }

  const actionsArray = _.sortBy(
    Object.keys(actionsForUUID).map(k => actionsForUUID[k]),
    'timestamp'
  );
  console.log(`Replaying ${actionsArray.length} actions for ${uuid}`);

  const setupStateAction = getSetupState(actionsArray);
  dispatch(setupStateAction);

  dispatchActions(actionsArray, dispatch);
};

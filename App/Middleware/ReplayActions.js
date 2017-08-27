// @flow
import moment from 'moment';
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
  [string]: ?{
    [string]: StoredAction
  }
};

type Dispatch = (action: Action) => any;

const SCREEN_CHANGE = /REACT_NATIVE_ROUTER_FLUX_(REPLACE|PUSH|RESET)/;

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
  if (action.type.match(SCREEN_CHANGE)) Actions[action.key]();
  if (action.type === 'REACT_NATIVE_ROUTER_FLUX_BACK_ACTION') Actions.pop();
  else dispatch(action);
};

const dispatchActions = (actions: StoredAction[], dispatch: Dispatch) => {
  if (!actions.length) return;

  const { action, timestamp } = actions[0];
  const parsedAction = JSON.parse(action);
  console.log('Replaying action', parsedAction);

  handleAction(parsedAction, dispatch);

  if (actions.length < 2) return;

  const startTime = moment(timestamp);
  const nextTime = moment(actions[1].timestamp);
  const delta = nextTime.diff(startTime);

  setTimeout(() => dispatchActions(actions.slice(1), dispatch), delta);
};

export default (uuid: string, actions: FirebaseActions, dispatch: Dispatch) => {
  const actionsForUUID = actions[uuid];
  if (!actionsForUUID) return;

  const actionsArray = Object.keys(actionsForUUID).map(k => actionsForUUID[k]);

  const setupStateAction = getSetupState(actionsArray);
  dispatch(setupStateAction);

  dispatchActions(actionsArray, dispatch);
};

import Intercom from 'react-native-intercom';
import Analytics from 'react-native-analytics';

import { TEST_UUID, TEST_REPORTS } from '../Mocks';
import parentAppReducer from '../../App/Reducers/ParentAppReducer';
import {
  RESET_STATE,
  enterKidName,
  selectKidImage,
  deviceUpdated,
  addKid,
  selectKid,
} from '../../App/Actions/Actions';

beforeEach(() => {
  Analytics.track.mockClear();
});

it('FETCHED_REPORT', () => {
  const state = { reports: {} };
  const FETCHED_REPORT = { type: 'FETCHED_REPORT', report: TEST_REPORTS, UUID: TEST_UUID };
  const newState = parentAppReducer(state, FETCHED_REPORT);

  expect(newState).toMatchSnapshot();
});

it('RESET_STATE', () => {
  const dirtyState = { kidSuggestions: ['abc123'], selectedKid: 'alice', step: 99 };
  const newState = parentAppReducer(dirtyState, RESET_STATE);

  expect(newState).toMatchSnapshot();
});

it('ENTER_KID_NAME', () => {
  const oldState = { selectedKid: { name: 'Jeff', UUID: '123' } };
  const newState = parentAppReducer(oldState, enterKidName('Bob'));

  expect(newState).toMatchSnapshot();
});

it('SELECT_KID', () => {
  const TEST_KID = { UUID: 'abc123' };
  const oldState = { selectedKid: TEST_KID };
  const newState = parentAppReducer(oldState, selectKid(TEST_KID));

  expect(newState).toMatchSnapshot();
});

it('SELECT_KID_IMAGE', () => {
  const oldState = { selectedKid: {} };
  const newState = parentAppReducer(oldState, selectKidImage('file://something'));

  expect(newState).toMatchSnapshot();
});

it('ADD_KID', () => {
  const oldState = { selectedKid: { UUID: 'nope' }, kids: [] };
  const newState = parentAppReducer(oldState, addKid('new-UUID', 'setupID'));

  expect(newState).toMatchSnapshot();
});

it('DEVICE_UPDATED', () => {
  const oldState = { selectedKid: { UUID: 'nope' }, kids: [], step: 1 };
  const newState = parentAppReducer(
    oldState, deviceUpdated({ UUID: 'surprise', deviceType: 'unknown' })
  );

  expect(newState).toMatchSnapshot();
  expect(Analytics.track).not.toHaveBeenCalled();

  const updatedDevice = { UUID: 'surprise', deviceType: 'Android' };
  const anotherState = parentAppReducer(newState,
    deviceUpdated(updatedDevice)
  );
  expect(anotherState).not.toEqual(newState);
  expect(anotherState).toMatchSnapshot();
  expect(Analytics.track).toHaveBeenCalledWith('Verified Device', updatedDevice);
});

it('LOGGED_IN', () => {
  const oldState = { profile: { UUID: 'nope' }, kids: [], step: 1, price: 'one dollar' };
  const newState = parentAppReducer(oldState, { type: 'LOGGED_IN', profile: {
    name: 'Jim Bob',
    kids: ['hey', 'ho'],
    UUID: 'orange',
  } });

  expect(newState).toMatchSnapshot();
  expect(Intercom.registerIdentifiedUser).toHaveBeenCalledWith({ userId: 'orange' });
});

it('REACT_NATIVE_ROUTER_FLUX_PUSH', () => {
  const oldState = { sceneName: 'something', other: 'remains' };
  const newState = parentAppReducer(
    oldState, { type: 'REACT_NATIVE_ROUTER_FLUX_PUSH', key: 'hey' }
  );

  expect(newState).toMatchSnapshot();
});

it('PREVIOUS_STEP', () => {
  const oldState = { step: 1 };

  const newState = parentAppReducer(
    oldState, { type: 'PREVIOUS_STEP' }
  );

  expect(newState).toMatchSnapshot();

  const sameState = parentAppReducer(
    newState, { type: 'PREVIOUS_STEP' }
  );
  expect(newState).toEqual(sameState);
});

it('NEXT_STEP', () => {
  const oldState = { step: 1 };
  const newState = parentAppReducer(
    oldState, { type: 'NEXT_STEP' }
  );

  expect(newState.step).toEqual(2);
  expect(Analytics.track.mock.calls).toMatchSnapshot();
});

import moment from 'moment';
import Analytics from 'react-native-analytics';
import { TEST_CONTACTS, TEST_UUID, TEST_REPORTS } from '../Mocks';
import ParentAppReducer from '../../App/Reducers/ParentAppReducer';
import {
  RESET_STATE,
  enterKidName,
  selectKidImage,
  selectDevice,
  selectPrice,
  selectKid,
  deviceUpdated,
  addIpad,
} from '../../App/Actions/Actions';

it('SMS_SENT', () => {
  const SMS_SENT = { type: 'SMS_SENT', UUID: TEST_UUID };
  const state = { step: 0, selectedKid: { a: 'b' }, reports: [], kids: [] };

  const newState = ParentAppReducer(state, SMS_SENT);
  expect(newState).toMatchSnapshot();
});

it('SEARCH_FOR_KID', () => {
  const state = { contacts: TEST_CONTACTS };

  let SEARCH_FOR_KID = { type: 'SEARCH_FOR_KID', hint: 'marc' };
  let newState = ParentAppReducer(state, SEARCH_FOR_KID);
  expect(newState.kidSuggestions.length).toBe(1);

  SEARCH_FOR_KID = { type: 'SEARCH_FOR_KID', hint: 'M' };
  newState = ParentAppReducer(state, SEARCH_FOR_KID);
  expect(newState.kidSuggestions.length).toBe(1);

  SEARCH_FOR_KID = { type: 'SEARCH_FOR_KID', hint: 'MAr' };
  newState = ParentAppReducer(state, SEARCH_FOR_KID);
  expect(newState.kidSuggestions.length).toBe(1);

  SEARCH_FOR_KID = { type: 'SEARCH_FOR_KID', hint: 'maRc' };
  newState = ParentAppReducer(state, SEARCH_FOR_KID);
  expect(newState.kidSuggestions.length).toBe(1);
});

it('FETCHED_REPORT', () => {
  const state = { reports: {} };
  const FETCHED_REPORT = { type: 'FETCHED_REPORT', report: TEST_REPORTS, UUID: TEST_UUID };
  const newState = ParentAppReducer(state, FETCHED_REPORT);

  expect(newState).toMatchSnapshot();
});

it('RESET_STATE', () => {
  const dirtyState = { kidSuggestions: ['abc123'], selectedKid: 'alice', step: 99 };
  const newState = ParentAppReducer(dirtyState, RESET_STATE);

  expect(newState).toMatchSnapshot();
});

it('ENTER_KID_NAME', () => {
  const oldState = { selectedKid: { name: 'Jeff', UUID: '123' } };
  const newState = ParentAppReducer(oldState, enterKidName('Bob'));

  expect(newState).toMatchSnapshot();
});

it('SELECT_KID_IMAGE', () => {
  const oldState = { selectedKid: {} };
  const newState = ParentAppReducer(oldState, selectKidImage('file://something'));

  expect(newState).toMatchSnapshot();
});

it('SELECT_KID', () => {
  const TEST_KID = { UUID: 'abc123' };
  const oldState = { selectedKid: TEST_KID };
  const newState = ParentAppReducer(oldState, selectKid(TEST_KID));

  expect(newState).toMatchSnapshot();
});

it('SELECT_DEVICE', () => {
  const oldState = { selectedKid: { deviceType: 'something', UUID: 'abc123' } };
  const newState = ParentAppReducer(oldState, selectDevice('iPad'));

  expect(newState).toMatchSnapshot();
});

it('ADD_IPAD', () => {
  const oldState = { selectedKid: { UUID: 'nope'}, kids: [] };
  const newState = ParentAppReducer(oldState, addIpad('new-UUID', 'setupID'));

  expect(newState).toMatchSnapshot();
});

it('DEVICE_UPDATED', () => {
  const oldState = { selectedKid: { UUID: 'nope'}, kids: [], step: 1 };
  const newState = ParentAppReducer(oldState, deviceUpdated({ UUID: 'surprise' }));

  expect(newState).toMatchSnapshot();
});

it('LOGGED_IN', () => {
  const oldState = { profile: { UUID: 'nope'}, kids: [], step: 1, price: 'one dollar' };
  const newState = ParentAppReducer(oldState, { type: 'LOGGED_IN', profile: {
    name: 'Jim Bob',
    kids: ['hey', 'ho'],
    UUID: 'orange',
  }});

  expect(newState).toMatchSnapshot();
});

it('FOCUS', () => {
  const oldState = { sceneName: 'something', other: 'remains' };
  const newState = ParentAppReducer(oldState, { type: 'focus', scene: { name: 'hey' }});

  expect(newState).toMatchSnapshot();
});

it('SELECT_PRICE', () => {
  const oldState = { };
  const newState = ParentAppReducer(oldState, selectPrice('one dollar'));

  expect(newState).toMatchSnapshot();
});

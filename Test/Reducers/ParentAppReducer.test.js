import { TEST_UUID, TEST_REPORTS } from '../Mocks';
import parentAppReducer from '../../App/Reducers/ParentAppReducer';
import {
  RESET_STATE,
  enterKidName,
  selectKidImage,
  selectPrice,
  deviceUpdated,
  addKid,
} from '../../App/Actions/Actions';

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
  const newState = parentAppReducer(oldState, deviceUpdated({ UUID: 'surprise' }));

  expect(newState).toMatchSnapshot();
});

it('LOGGED_IN', () => {
  const oldState = { profile: { UUID: 'nope' }, kids: [], step: 1, price: 'one dollar' };
  const newState = parentAppReducer(oldState, { type: 'LOGGED_IN', profile: {
    name: 'Jim Bob',
    kids: ['hey', 'ho'],
    UUID: 'orange',
  } });

  expect(newState).toMatchSnapshot();
});

it('FOCUS', () => {
  const oldState = { sceneName: 'something', other: 'remains' };
  const newState = parentAppReducer(oldState, { type: 'focus', scene: { name: 'hey' } });

  expect(newState).toMatchSnapshot();
});

it('SELECT_PRICE', () => {
  const oldState = { };
  const newState = parentAppReducer(oldState, selectPrice('one dollar'));

  expect(newState).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';

jest.mock('../../App/AsyncActions/SelectImage', () =>
  () => 'TEST_SELECT_IMAGE');
jest.mock('../../App/AsyncActions/PersistKid', () => () => 'TEST_PERSIST_KID');
jest.mock('../../App/AsyncActions/FetchReports', () =>
  () => 'TEST_FETCH_REPORTS');

import SetImageComponent, {
  mapStateToProps,
  mapDispatchToProps,
} from '../../App/Containers/SetImage';

const mockStore = configureStore([thunk]);
const testStore = mockStore({
  parentState: {},
  kidsState: {
    'abc-123': {
      name: 'John Bobson',
    },
  },
  setupState: {
    kidUUID: 'abc-123',
  },
});

const SetImage = () => (
  <Provider store={testStore}>
    <SetImageComponent />
  </Provider>
);

it('renders the <SetImage> component correctly without deeplink', () => {
  const tree = renderer.create(<SetImage />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('onPress', () => {
  beforeEach(() => {
    Actions.setupCompletion.mockClear();
    Actions.dashboard.mockClear();
  });

  it('dispatches SelectImage and PersistKid then navigates to SetupCompletion if the parent is not already set up', () => {
    const mockDispatch = jest.fn(() => Promise.resolve());
    const { onPress } = mapDispatchToProps(mockDispatch);

    return onPress(true).then(() => {
      expect(mockDispatch).toHaveBeenCalledWith('TEST_SELECT_IMAGE');
      expect(mockDispatch).toHaveBeenCalledWith('TEST_PERSIST_KID');
      expect(Actions.setupCompletion).toHaveBeenCalled();
    });
  });

  it('dispatches SelectImage, PersistKid and FetchReports, then navigates to Dashboard if the parent is already set up', () => {
    const mockDispatch = jest.fn(() => Promise.resolve());
    const { onPress } = mapDispatchToProps(mockDispatch);

    return onPress(true, true).then(() => {
      expect(mockDispatch).toHaveBeenCalledWith('TEST_SELECT_IMAGE');
      expect(mockDispatch).toHaveBeenCalledWith('TEST_PERSIST_KID');
      expect(mockDispatch).toHaveBeenCalledWith('TEST_FETCH_REPORTS');
      expect(Actions.setupCompletion).not.toHaveBeenCalled();
      expect(Actions.dashboard).toHaveBeenCalled();
    });
  });
});

describe('mapStateToProps', () => {
  it('defines isInstalled as true when the parent has their name, email and password defined', () => {
    const { isInstalled } = mapStateToProps({
      kidsState: { a: { name: 'A' } },
      setupState: { kidUUID: 'a' },
      parentState: { name: 'A', email: 'B', password: 'C' },
    });
    expect(isInstalled).toBeTruthy();
  });

  it('defines isInstalled as false when the parent has their name, email and password are not defined', () => {
    const { isInstalled } = mapStateToProps({
      kidsState: { a: { name: 'A' } },
      setupState: { kidUUID: 'a' },
      parentState: { name: null, email: null, password: null },
    });
    expect(isInstalled).toBeFalsy();
  });
});

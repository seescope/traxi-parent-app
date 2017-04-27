import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';

jest.mock('../../App/AsyncActions/SelectImage', () =>
  () =>
    dispatch => {
      dispatch('TEST_IMAGE_SELECTED');
    });

import SetImageComponent, {
  mapDispatchToProps,
} from '../../App/Containers/SetImage';

const mockStore = configureStore([thunk]);
const testStore = mockStore({
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

it('calls Select Image then navigates to SetupCompletion', () => {
  const mockDispatch = jest.fn(() => Promise.resolve());
  const { onPress } = mapDispatchToProps(mockDispatch);
  onPress(true);

  expect(Actions.setupCompletion).toHaveBeenCalled();
});

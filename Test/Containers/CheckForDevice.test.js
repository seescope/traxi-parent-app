import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CheckForDevice from '../../App/Containers/CheckForDevice';

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

const CheckForDeviceComponent = () => (
  <Provider store={testStore}>
    <CheckForDevice />
  </Provider>
);

it('renders the <SetName> component', () => {
  const tree = renderer.create(<CheckForDeviceComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});

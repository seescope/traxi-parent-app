import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import CongratulationsComponent from '../../App/Containers/Congratulations';

const mockStore = configureStore();
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

const Congratulations = () => (
  <Provider store={testStore}>
    <CongratulationsComponent />
  </Provider>
);

describe('<Congratulations />', () => {
  it('renders the Congratulations component', () => {
    const tree = renderer.create(<Congratulations />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

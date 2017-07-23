import React from 'react';
import renderer from 'react-test-renderer';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
jest.mock('../../App/AsyncActions/RequestReminder', () =>
  jest.fn(email => Promise.resolve({ type: 'REMINDER_REQUESTED', email })));
import RequestReminder from '../../App/AsyncActions/RequestReminder';

import SendReminder, { mergeProps } from '../../App/Containers/SendReminder';

const mockStore = configureStore([thunk]);
const testStore = mockStore({
  parentState: {
    email: 'some@email.com',
  },
  kidsState: {
    'abc-123': {
      name: 'John Bobson',
    },
  },
  setupState: {
    kidUUID: 'abc-123',
  },
});

const SendReminderComponent = () => (
  <Provider store={testStore}>
    <SendReminder />
  </Provider>
);

it('renders the <SendReminder> component', () => {
  const tree = renderer.create(<SendReminderComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('sends a reminder then shows an alert', () => {
  Alert.alert = jest.fn();
  const mockDispatch = jest.fn(v => v);

  const { onPress } = mergeProps(
    { email: 'test@email.com' },
    { dispatch: mockDispatch }
  );

  return onPress().then(() => {
    expect(RequestReminder).toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalled();
  });
});

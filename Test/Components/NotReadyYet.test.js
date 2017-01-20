import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import NotReadyYet, { remindMeTomorrow } from '../../App/Components/NotReadyYet';

jest.mock('../../App/Actions/SendPhoneNumberToSlack', () => () => Promise.resolve());

it('renders the <NotReadyYet> component', () => {
  const store = configureMockStore()();
  const tree = renderer.create(
    <Provider store={store}>
      <NotReadyYet />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('posts a number to Slack', () => {
  const mockDispatch = jest.fn(() => Promise.resolve());
  remindMeTomorrow('0401633346')(mockDispatch);
  expect(mockDispatch.mock.calls).toMatchSnapshot();
});

jest.mock('../../App/Utils', () => ({
  sendPhoneNumberToSlack: jest.fn(() => Promise.resolve()),
}));

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Actions } from 'react-native-router-flux';
import { sendPhoneNumberToSlack } from '../../App/Utils';

import NotReadyYet, { remindMeTomorrow } from '../../App/Components/NotReadyYet';

it('renders the <NotReadyYet> component', () => {
  const store = configureMockStore()();
  const tree = renderer.create(
    <Provider store={store}>
      <NotReadyYet />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('posts a number to Slack', () => remindMeTomorrow('0401633346').then(() => {
  expect(sendPhoneNumberToSlack.mock.calls).toMatchSnapshot();
  expect(Actions.thankyou).toHaveBeenCalled();
}));

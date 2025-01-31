import React, { PropTypes } from 'react';
import { View } from 'react-native';

export const Actions = {
  androidBack: jest.fn(),
  createKid: jest.fn(),
  walkthrough: jest.fn(),
  thankyou: jest.fn(),
  areYouReady: jest.fn(),
  intro: jest.fn(),
  dashboard: jest.fn(() => 'hey there fancy pants'),
  setupCompletion: jest.fn(),
  setName: jest.fn(),
  deviceSetup: jest.fn(),
  splashScreen: jest.fn(),
  setKidImage: jest.fn(),
  checkForDevice: jest.fn(),
  initialUsage: jest.fn(),
  upgrade: jest.fn(),
  pop: jest.fn(),
};

export const Scene = props => <View {...props} />;

export const Router = ({ children }) => <View>{children}</View>;

Router.propTypes = {
  children: PropTypes.array.isRequired,
};

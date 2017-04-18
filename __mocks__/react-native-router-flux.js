import React, { PropTypes } from "react";
import { View } from "react-native";

export const Actions = {
  createKid: jest.fn(),
  walkthrough: jest.fn(),
  congratulations: jest.fn(),
  thankyou: jest.fn(),
  areYouReady: jest.fn(),
  intro: jest.fn(),
  dashboard: jest.fn(),
  setupCompletion: jest.fn(),
  setName: jest.fn(),
  deviceSetup: jest.fn()
};

export const Scene = props => <View {...props} />;

export const Router = ({ children }) => <View>{children}</View>;

Router.propTypes = {
  children: PropTypes.array.isRequired
};

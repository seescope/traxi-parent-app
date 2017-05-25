/* @flow */

const OneSignal = {
  addEventListener: () => {},
  removeEventListener: () => {},
  registerForPushNotifications: jest.fn(),
  sendTags: jest.fn(),
};

export default OneSignal;

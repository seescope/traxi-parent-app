/* eslint no-native-reassign: "off" */

import sendSMS from '../../App/Actions/SendSMS';
import { mockSet } from 'firebase';

describe('sendSMS', () => {
  it('dispatches a SENDING_SMS action, calls fetch, then dispatches SMS_SENT', () => {
    const TEST_KID = { name: 'Test Name', phoneNumber: '+61401633346' };
    const mockDispatch = jest.fn();

    fetch = jest.fn(() => Promise.resolve());

    return sendSMS(TEST_KID)(mockDispatch).then(() => {
      expect(fetch.mock.calls).toMatchSnapshot();
      expect(mockDispatch.mock.calls).toMatchSnapshot();
      expect(mockSet.mock.calls).toMatchSnapshot();
    });
  });
});

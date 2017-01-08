/* eslint no-native-reassign: "off" */

import sendSMS from '../../App/Actions/SendSMS';
import { mockSet } from 'firebase';
// import nodeFetch from 'node-fetch';
// import nodeFormData from 'form-data';

describe('sendSMS', () => {
  it('dispatches a SENDING_SMS action, calls fetch, then dispatches SMS_SENT', () => {
    const TEST_KID = { name: 'Test Name', phoneNumber: '+60 11 2116 4143' };
    const mockDispatch = jest.fn();

    fetch = jest.fn(() => Promise.resolve({
      status: 201,
      json: () => Promise.resolve(),
    }));


    return sendSMS(TEST_KID)(mockDispatch).then(() => {
      expect(fetch.mock.calls).toMatchSnapshot();
      expect(mockDispatch.mock.calls).toMatchSnapshot();
      expect(mockSet.mock.calls).toMatchSnapshot();
    });
  });

  it('handles Twilio errors', () => {
    mockSet.mockReset();

    const TEST_KID = { name: 'Test Name', phoneNumber: '+60 11 2116 4143' };
    const mockDispatch = jest.fn();

    fetch = jest.fn(() => Promise.resolve({
      status: 400,
      json: () => Promise.resolve({
        message: 'An error message',
      }),
    }));

    return sendSMS(TEST_KID)(mockDispatch).then(() => {
      expect(fetch.mock.calls).toMatchSnapshot();
      expect(mockDispatch.mock.calls).toMatchSnapshot();
      expect(mockSet).not.toHaveBeenCalled();
    });
  });
});

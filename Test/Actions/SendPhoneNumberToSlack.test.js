import sendPhoneNumberToSlack from '../../App/Actions/SendPhoneNumberToSlack';

global.Promise = require.requireActual('promise');

it('sends a phone number to Slack', () => {
  const phoneNumber = '+61401633346';

  const mockDispatch = jest.fn();
  fetch = jest.fn(() => Promise.resolve());

  return sendPhoneNumberToSlack(phoneNumber)().then(() => {
    expect(mockDispatch.mock.calls).toMatchSnapshot();
    expect(fetch.mock.calls).toMatchSnapshot();
  });
});

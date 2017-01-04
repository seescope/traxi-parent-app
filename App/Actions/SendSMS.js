/* eslint-disable max-len */
import base64 from 'base-64';
import uuid from 'uuid';
import Firebase from 'firebase';
const firstName = (kid) => kid.name.split(' ')[0];

const sendSMS = (kid) => {
  const KID_NAME = firstName(kid);
  const TWILLIO_SID = 'ACc04c9d7b6237604d95c65a9d3b991c0c';
  const UUID = uuid.v4();
  const TWILLIO_TOKEN = '913d983370eed59f0e428a6c0f809616';
  const BASIC_AUTH_STRING = base64.encode(`${TWILLIO_SID}:${TWILLIO_TOKEN}`);
  const TWILLIO_URL = `https://api.twilio.com/2010-04-01/Accounts/${TWILLIO_SID}/Messages`;
  const SMS_LINK = `https://gettraxi.com/#${UUID}`;
  const SMS_BODY = new FormData();

  SMS_BODY.append('To', kid.phoneNumber);
  SMS_BODY.append('From', 'traxi');
  SMS_BODY.append('Body', `Hi, ${KID_NAME}! Welcome to traxi. Tap the following link to get started: ${SMS_LINK}`);

  const TWILLIO_PARAMS = {
    headers: {
      Authorization: `Basic ${BASIC_AUTH_STRING}`,
    },
    method: 'POST',
    body: SMS_BODY,
  };

  return (dispatch) => {
    const sendSMSPromise = new Promise((resolve) => {
      dispatch({ type: 'SENDING_SMS' });
      resolve();
    });

    return sendSMSPromise
      .then(() => fetch(TWILLIO_URL, TWILLIO_PARAMS))
      .then(() => dispatch({ type: 'SMS_SENT', UUID })) // TODO: Handle failure.
      .then(() => {
        const firebase = new Firebase(`https://traxiapp.firebaseio.com/kids/${UUID}`);
        return new Promise((resolve, reject) => {
          const kidProfile = {
            ...kid,
            UUID,
            deviceType: 'unknown',
            status: 'DOWNLOADING',
          };
          firebase.set(kidProfile, error => {
            if (error) { reject(error); }
            resolve();
          });
        });
      })
      .catch(error => console.error('Error sending SMS:', error));
  };
};

export default sendSMS;

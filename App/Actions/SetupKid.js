import Firebase from 'firebase';
import { addKid } from './Actions';
import uuid from 'uuid';

const postSetupIdToFirebase = (setupRef, UUID) => new Promise((resolve, reject) =>
  setupRef.set(UUID, error => {
    if (error) reject(error);
    resolve();
  })
);

const postKidToFirebase = (kidRef, kid) => new Promise((resolve, reject) =>
  kidRef.set(kid, error => {
    if (error) reject(error);
    resolve();
  })
);

export default () =>
  (dispatch, getState) => {
    const setupID = Math.round(Math.random() * 10000); // 4 Digit Random Number

    const { selectedKid } = getState();
    const kid = {
      ...selectedKid,
      UUID: uuid.v4(),
      setupID,
      deviceType: 'unknown',
      status: 'WAITING',
    };

    const setupRef = new Firebase(`https://traxiapp.firebaseio.com/setupIDs/${setupID}`);
    const kidRef = new Firebase(`https://traxiapp.firebaseio.com/kids/${kid.UUID}`);

    dispatch(addKid(kid.UUID, setupID));

    return postSetupIdToFirebase(setupRef, kid.UUID)
      .then(postKidToFirebase(kidRef, kid));
  };

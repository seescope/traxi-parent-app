import Firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import saveProfile from './SaveProfile';
import { deviceUpdated } from '../Actions/Actions';
import { logError } from '../Utils';
import _ from 'lodash';

const watchDevice = () => (dispatch, getState) => {
  const { selectedKid } = getState();
  const firebase = new Firebase(`https://traxiapp.firebaseio.com/kids/${selectedKid.UUID}`);
  const installPromise = new Promise((resolve, reject) => {
    firebase.on(
      'value',
      data => {
        const updatedKid = data.val();
        dispatch(deviceUpdated(updatedKid));

        if (updatedKid.status === 'INSTALLED') {
          const { profile } = getState();
          const kids = profile.kids ? profile.kids : [];
          const updatedKids = _.uniqBy([...kids, updatedKid], 'UUID');
          profile.kids = updatedKids;

          saveProfile(profile).then(() => {
            Actions.congratulations();
            dispatch({ type: 'LOGGED_IN', profile }); // Mm.. hacky.
            resolve();
            firebase.off('value');
          });
        }
      },
      e => {
        const error = new Error(`Error watching device ${selectedKid.UUID}: ${JSON.stringify(e)}`);
        reject(error);
        logError(error);
      }
    );
  });

  return installPromise;
};

export default watchDevice;

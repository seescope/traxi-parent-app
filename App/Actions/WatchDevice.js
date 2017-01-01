import Firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import saveProfile from './SaveProfile';
import { deviceUpdated } from '../Actions/Actions';

const watchDevice = () => (dispatch, getState) => {
  const { selectedKid } = getState();
  const firebase = new Firebase(`https://traxiapp.firebaseio.com/kids/${selectedKid.UUID}`);
  const installPromise = new Promise(resolve => {
    firebase.on(
      'value',
      data => {
        const updatedKid = data.val();
        dispatch(deviceUpdated(updatedKid));

        if (updatedKid.status === 'INSTALLED') {
          const { profile } = getState();
          const kids = profile.kids ? profile.kids : [];
          const updatedKids = [...kids, updatedKid];
          profile.kids = updatedKids;

          saveProfile(profile).then(() => {
            Actions.congratulations();
            dispatch({ type: 'LOGGED_IN', profile }); // Mm.. hacky.
            resolve();
          });
        }
      },
      console.error
    );
  });

  return installPromise;
};

export default watchDevice;

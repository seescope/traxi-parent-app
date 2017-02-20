import { AsyncStorage, NativeModules } from 'react-native';
import Firebase from 'firebase';

if (!NativeModules.NotificationManager) {
  NativeModules.NotificationManager = {
    register: () => Promise.resolve(),
  };
}

const saveProfileToFirebase = newProfile => new Promise((resolve, reject) => {
  const firebase = new Firebase(
    `https://traxiapp.firebaseio.com/parents/${newProfile.UUID}`,
  );
  firebase.set(newProfile, error => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
});

const saveProfileToStorage = profile =>
  AsyncStorage.setItem('profile', JSON.stringify(profile));

const saveProfile = profile => NativeModules.NotificationManager
  .register()
  .then(token => Promise.resolve({
    ...profile,
    token,
  }))
  .then(newProfile =>
    Promise.all([
      saveProfileToStorage(newProfile),
      saveProfileToFirebase(newProfile),
    ]));

export default saveProfile;

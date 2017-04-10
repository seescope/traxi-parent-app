import { AsyncStorage } from 'react-native';
import Firebase from 'firebase';

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

const saveProfile = profile => 
    Promise.all([
      saveProfileToStorage(profile),
      saveProfileToFirebase(profile),
    ]);

export default saveProfile;

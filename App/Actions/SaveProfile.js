// @flow

import { AsyncStorage } from "react-native";
import * as Firebase from "firebase";

const saveProfileToFirebase = newProfile =>
  Firebase.database().ref(`parents/${newProfile.UUID}`).set(newProfile);

const saveProfileToStorage = profile =>
  AsyncStorage.setItem("profile", JSON.stringify(profile));

const saveProfile = profile =>
  Promise.all([saveProfileToStorage(profile), saveProfileToFirebase(profile)]);

export default saveProfile;

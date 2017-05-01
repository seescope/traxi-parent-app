// @flow
import * as Firebase from 'firebase';
import lodash from 'lodash';
import type { Kid, KidsState, DeviceType } from '../Reducers/Kids';
import type { ParentState } from '../Reducers/Parent';
import { profileMigrated } from '../Reducers/Parent/parentActions';
import persistKid from './PersistKid';
import persistParent from './PersistParent';

type Dispatch = () => void;

type ProfileFromAsyncStorage = {
  UUID: string,
};
type KidFromFirebase = {
  name: string,
  avatarURL: string,
  UUID: string,
  deviceType: DeviceType,
  status: string,
};
type FirebaseKids = {
  [string]: KidFromFirebase,
};
type ProfileFromFirebase = {
  name: string,
  kids: FirebaseKids,
  UUID: string,
  email: ?string,
};

type ConvertedProfile = {
  parent: ParentState,
  kids: KidsState,
};

const getKidUUIDs = (kids: FirebaseKids): Array<string> =>
  lodash.chain(kids).mapValues('UUID').values().value();

const convertParent = (profile: ProfileFromFirebase): ParentState => ({
  UUID: profile.UUID,
  name: profile.name,
  email: profile.email || '',
  kids: getKidUUIDs(profile.kids),
  password: undefined,
});

const convertKid = (kid: KidFromFirebase): Kid => ({
  UUID: kid.UUID,
  name: kid.name,
  installed: kid.status === 'INSTALLED',
  avatarURL: kid.avatarURL,
  deviceType: kid.deviceType,
});

const reduceKid = (result: KidsState, kid) => ({
  ...result,
  [kid.UUID]: convertKid(kid),
});

const convertKids = (kids: FirebaseKids): KidsState =>
  lodash.reduce(kids, reduceKid, {});

const convertProfile = (profile: ProfileFromFirebase): ConvertedProfile => {
  const parent = convertParent(profile);
  const kids = convertKids(profile.kids);

  return {
    parent,
    kids,
  };
};

export default (profile: ProfileFromAsyncStorage) =>
  async (dispatch: Dispatch) => {
    const { UUID } = profile;
    const firebaseResult = await Firebase.database()
      .ref(`parents/${UUID}`)
      .once('value');

    const profileFromFirebase: ProfileFromFirebase = firebaseResult.val();
    const { parent, kids } = convertProfile(profileFromFirebase);

    dispatch(profileMigrated(parent, kids));

    Promise.all(lodash.values(kids).map(kid => dispatch(persistKid(kid))));
    return dispatch(persistParent());
  };

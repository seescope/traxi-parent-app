// @flow
const DEFAULT_IMAGE = 'http://i.imgur.com/PnREspe.png';

import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { isIOS, logError } from '../Utils';
import { setKidImage } from '../Reducers/Kids/kidsActions';

import type { KidsAction } from '../Reducers/Kids/index';
import type { Dispatch, GetState } from '../Reducers';

const getURI = (response): string => {
  if (isIOS) {
    return response.uri.replace('file://', '');
  }

  return response.uri;
};

export default (didSelectImage: boolean) =>
  (dispatch: Dispatch, getState: GetState): Promise<KidsAction> => {
    const { setupState } = getState();
    const { kidUUID } = setupState;

    if (!kidUUID) {
      return Promise.reject('No Kid UUID set!');
    }

    if (!didSelectImage) {
      return Promise.resolve(dispatch(setKidImage(DEFAULT_IMAGE, kidUUID)));
    }

    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
      },
    };

    return new Promise((resolve, reject) => {
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          reject();
          return;
        }

        if (response.error) {
          if (response.error === 'Photo library permissions not granted') {
            Alert.alert(
              'Unable to access your photos',
              'Please allow traxi to access your photos to continue.'
            );
          }

          logError(response.error);
          reject(response.error);
          return;
        }

        const URI = getURI(response);
        resolve(dispatch(setKidImage(URI, kidUUID)));
      });
    });
  };

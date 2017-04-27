const getSource = response => {
  let source;

  if (response.data) {
    if (isIOS) {
      source = {uri: response.uri.replace('file://', ''), isStatic: true};
    } else {
      source = {uri: response.uri, isStatic: true};
    }
  }

  return source;
};

export const selectImage = () => {
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
            'Please allow traxi to access your photos to continue.',
          );
        }

        logError(response.error);
        reject(error);
        return;
      }

      const source = getSource(response);
      resolve(source);
    });
  });
};

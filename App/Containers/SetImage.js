import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Dimensions, Text, View, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';

import { selectKidImage, NEXT_STEP } from '../Actions/Actions';
import setupKid from '../Actions/SetupKid';
import watchDevice from '../Actions/WatchDevice';
import Button from '../Components/Button';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import KidAvatar from '../Components/KidAvatar';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
import { isIOS, logError, firstName } from '../Utils';

const { width } = Dimensions.get('window');

const getSource = response => {
  let source;

  if (response.data) {
    if (isIOS) {
      source = { uri: response.uri.replace('file://', ''), isStatic: true };
    } else {
      source = { uri: response.uri, isStatic: true };
    }
  }

  return source;
};

export const selectImage = pickImage => dispatch => {
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
    },
  };

  if (!pickImage) {
    dispatch(selectKidImage('http://i.imgur.com/ZrwsRFD.png'));

    return dispatch(setupKid()).then(() => {
      dispatch(NEXT_STEP);
      dispatch(watchDevice());
    });
  }

  return ImagePicker.launchImageLibrary(options, response => {
    if (response.didCancel) {
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
      return;
    }

    const source = getSource(response);
    dispatch(selectKidImage(source.uri));
    dispatch(NEXT_STEP);

    dispatch(setupKid()).then(() => {
      dispatch(watchDevice());
    });
  });
};

const style = {
  container: {
    alignItems: 'center',
  },
  bodyText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: WHITE,
    backgroundColor: TRANSPARENT,
    textAlign: 'left',
  },
  buttonContainer: {
    width: width - 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

const SetImage = ({ parentName, kidName, onPress }) => (
  <View style={style.container}>
    <HeaderText>Thanks, {parentName}!</HeaderText>

    <Spacing height={32} />

    <KidAvatar
      size={204}
      avatarURL=""
    />

    <Spacing height={32} />

    <Text style={style.bodyText}>
      Now, let's set a picture for {kidName}.
    </Text>

    <Spacing />

    <Text style={style.bodyText}>
      Don't worry, only you will be able to see it.
    </Text>

    <Spacing height={32} />

    <View style={style.buttonContainer}>
      <Button primary={false} onPress={() => onPress(false)}>Not right now</Button>
      <Button onPress={() => onPress(true)}>Set a picture for {kidName}</Button>
    </View>

  </View>
);

SetImage.propTypes = {
  kidName: PropTypes.string.isRequired,
  parentName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  kidName: firstName(state.selectedKid.name),
  parentName: state.parentName,
});

const mapDispatchToProps = {
  onPress: selectImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetImage);

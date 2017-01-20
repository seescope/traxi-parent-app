import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, View, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';

import { selectKidImage, RESET_STATE } from '../Actions/Actions';
import setupKid from '../Actions/SetupKid';
import watchDevice from '../Actions/WatchDevice';
import Background from '../Components/Background';
import Button from '../Components/Button';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import { WHITE, TRAXI_BLUE, TRANSPARENT } from '../Constants/Colours';
import { isIOS, logError } from '../Utils';

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

  ImagePicker.launchImageLibrary(options, response => {
    // Just make sure we're in a clean state.
    dispatch(RESET_STATE);

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

    Actions.walkthrough();

    dispatch(setupKid()).then(() => {
      dispatch(watchDevice());
    });
  });
};

const style = {
  container: {
    backgroundColor: TRAXI_BLUE,
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  padding: {
    flex: 1,
  },
  bodyText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: WHITE,
    backgroundColor: TRANSPARENT,
    textAlign: 'left',
  },
  innerContainer: {
    flex: 4,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
};

const CreateKid = ({ parentName, kidName, onPress }) => (
  <Background style={style.container}>
    <View style={style.padding} />
    <View style={style.innerContainer}>
      <HeaderText>Thanks, {parentName}!</HeaderText>

      <Spacing />

      <Text style={style.bodyText}>
        Next, let's set a picture for {kidName} to make you feel more at home.
      </Text>

      <Spacing />

      <Text style={style.bodyText}>
        Don't worry, only you will be able to see it.
      </Text>

      <Spacing />

      <View style={style.buttonContainer}>
        <Button primary={false} onPress={() => onPress(false)}>Not right now</Button>
        <Button onPress={() => onPress(true)}>Set a picture</Button>
      </View>

    </View>
  </Background>
);

CreateKid.propTypes = {
  kidName: PropTypes.string.isRequired,
  parentName: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  kidName: state.selectedKid.name,
  parentName: state.parentName,
});

const mapDispatchToProps = {
  onPress: selectImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateKid);

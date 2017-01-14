import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Image, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';

import { enterKidName, selectKidImage } from '../Actions/Actions';
import setupKid from '../Actions/SetupKid';
import watchDevice from '../Actions/WatchDevice';
import Background from '../Components/Background';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import BodyText from '../Components/BodyText';
import SmallText from '../Components/SmallText';
import TextInput from '../Components/TextInput';
import { TRAXI_BLUE } from '../Constants/Colours';
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

export const selectImage = dispatch => {
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
    },
  };

  ImagePicker.launchImageLibrary(options, response => {
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
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};

const CreateKid = ({ parentName, onChangeText, onPress }) => (
  <Background style={style.container}>
    <HeaderText>Add your child, {parentName}</HeaderText>

    <Spacing />

    <BodyText>
      Type your child's name in the box below, then tap on the circle
      to add a picture.
    </BodyText>

    <Spacing />

    <SmallText>
      Don't worry, only you can see your child's picture. If you feel
      uncomfortable using their photo, you can use any image you like.
    </SmallText>

    <Spacing height={36} />

    <TextInput placeholder="eg. Jen Smith" onChangeText={onChangeText} />

    <Spacing height={16} />

    <TouchableOpacity onPress={onPress} style={style.deviceContainer}>
      <Image source={require('../Images/add_image.png')} />
    </TouchableOpacity>
  </Background>
);

CreateKid.propTypes = {
  parentName: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  parentName: state.parentName,
});

const mapDispatchToProps = dispatch => ({
  onChangeText: text => dispatch(enterKidName(text)),
  onPress: () => selectImage(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKid);

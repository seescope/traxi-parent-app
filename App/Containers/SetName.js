// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, View, Alert, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import { setKidName } from '../Reducers/Kids/kidsActions';
import persistKid from '../AsyncActions/PersistKid';
import watchKid from '../AsyncActions/WatchKid';
import Button from '../Components/Button';
import Background from '../Components/Background';
import TextInput from '../Components/TextInput';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import { GREY } from '../Constants/Colours';
import STYLES from '../Constants/Styles';

import type { Dispatch } from '../Reducers';

type DispatchProps = {
  dispatch: Dispatch
};

type StateProps = {
  kidName: string,
  kidUUID: string
};

type Props = {
  kidName: string,
  onPress: () => ?Promise<any>,
  onNameChanged: (name: string) => void
};

const style = {
  container: {
    marginTop: 32,
    paddingTop: 18,
    alignItems: 'center',
  },
  labelText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: GREY,
  },
  buttonContainer: {
    alignItems: 'center',
  },
};

// More than one character, excluding spaces.
const isValid = kidName => kidName.replace(' ', '').length > 1;

export const verifyName = (kidName: string): boolean => {
  Keyboard.dismiss();
  if (isValid(kidName)) {
    return true;
  }

  Alert.alert('Please enter your child\'s name');
  return false;
};

const SetName = ({ kidName, onPress, onNameChanged }: Props) => (
  <Background>
    <View style={style.container}>
      <HeaderText>{I18n.t('setName.header')}</HeaderText>

      <Spacing height={16} />

      <View style={[STYLES.CARD, style.container]} elevation={6}>
        <View>
          <Text allowFontScaling={false} style={style.labelText}>
            {I18n.t('setName.kidsName')}
          </Text>

          <TextInput
            value={kidName}
            onChangeText={onNameChanged}
            onSubmitEditing={() => onPress()}
          />
        </View>
      </View>

      <View style={style.buttonContainer}>
        <Button primary onPress={() => onPress()}>
          {I18n.t('general.nextStep')}
        </Button>
      </View>
    </View>
  </Background>
);

SetName.propTypes = {
  onNameChanged: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  kidName: PropTypes.string,
};

const mapStateToProps = state => {
  const { kidUUID } = state.setupState;
  const { name } = state.kidsState[kidUUID] || {};

  return {
    kidUUID,
    kidName: name || '',
  };
};

export const mergeProps = (
  { kidName, kidUUID }: StateProps,
  { dispatch }: DispatchProps
): Props => ({
  kidName,
  onPress: () => {
    if (!verifyName(kidName)) return null;

    Actions.checkForDevice();
    return dispatch(persistKid()).then(() => dispatch(watchKid()));
  },
  onNameChanged: (name: string) => dispatch(setKidName(name.trim(), kidUUID)),
});

// $FlowFixMe
export default connect(mapStateToProps, null, mergeProps)(SetName);

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, View, Alert, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { setEmail } from '../Reducers/Parent/parentActions';
import requestReminder from '../AsyncActions/RequestReminder';
import Button from '../Components/Button';
import Background from '../Components/Background';
import TextInput from '../Components/TextInput';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import { GREY } from '../Constants/Colours';
import { firstName } from '../Utils';
import isEmail from 'validator/lib/isEmail';
import STYLES from '../Constants/Styles';

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
  innerContainer: {
    paddingHorizontal: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
};

export const verifyEmail = email => {
  Keyboard.dismiss();
  if (isEmail(email)) {
    return true;
  }

  Alert.alert('Please enter a valid email address');
  return false;
};

const SendReminder = ({ kidName, onEmailChanged, onPress }) => (
  <Background>
    <View style={style.container}>
      <HeaderText>Get a reminder</HeaderText>

      <Spacing height={16} />

      <View style={[STYLES.CARD, style.container]} elevation={6}>
        <Text style={style.labelText}>
          Not ready yet? Enter your email address below and we’ll send you reminder for you to finish setting up
          {' '}
          {kidName}
          ’s device tomorrow.
        </Text>

        <Spacing height={16} />

        <TextInput
          refFunc={ref => {
            this.textInput = ref;
          }}
          onChangeText={onEmailChanged}
          onSubmitEditing={onPress}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <Spacing height={32} />

      <View style={style.buttonContainer}>
        <Button primary onPress={onPress}>
          Remind me tomorrow
        </Button>
      </View>
    </View>
  </Background>
);

SendReminder.propTypes = {
  kidName: PropTypes.string.isRequired,
  onEmailChanged: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { kidUUID } = state.setupState;
  const { email } = state.parentState;
  const { name } = state.kidsState[kidUUID] || {};

  return {
    email,
    kidUUID,
    kidName: firstName(name) || '',
  };
};

export const mergeProps = ({ email, kidName }, { dispatch }) => ({
  kidName,
  onPress: async () => {
    if (!verifyEmail(email)) return null;

    await dispatch(requestReminder());

    return Alert.alert(
      'Reminder requested',
      `A reminder will be sent to ${email} tomorrow.`,
      [
        {
          text: 'OK',
          onPress: () => Actions.splashScreen(),
        },
      ],
    );
  },
  onEmailChanged: updatedEmail => dispatch(setEmail(updatedEmail)),
});

export default connect(mapStateToProps, null, mergeProps)(SendReminder);

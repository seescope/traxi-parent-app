import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

import requestReminder from '../AsyncActions/RequestReminder';
import Button from '../Components/Button';
import Background from '../Components/Background';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import { GREY } from '../Constants/Colours';
import { firstName } from '../Utils';
import STYLES from '../Constants/Styles';

const style = {
  container: {
    marginTop: 32,
    paddingTop: 18,
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: 32,
    paddingTop: 18,
  },
  labelText: {
    textAlign: 'left',
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: GREY,
  },
  innerContainer: {
    paddingHorizontal: 16,
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
};

const SendReminder = ({ kidName, onPress }) => (
  <Background>
    <View style={style.container}>
      <HeaderText>Get a reminder</HeaderText>

      <Spacing height={16} />

      <View style={[STYLES.CARD, style.container]} elevation={6}>
        <Text style={style.labelText}>
          Not ready yet? No problem!
        </Text>

        <Spacing height={16} />

        <Text style={style.labelText}>
          Tap the button below and Traxi will send you a reminder to set up
          {' '}
          {kidName}
          ’s device tomorrow.
        </Text>

        <Spacing height={16} />
      </View>

      <Spacing height={32} />

      <View style={style.buttonsContainer}>
        <Button onPress={() => Actions.pop()}>
          Back
        </Button>
        <Button primary onPress={onPress}>
          Remind me tomorrow
        </Button>
      </View>
    </View>
  </Background>
);
SendReminder.propTypes = {
  kidName: PropTypes.string.isRequired,
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
    await dispatch(requestReminder());
    return Alert.alert(
      'Reminder requested',
      `A reminder will be sent to ${email} tomorrow.`,
      [
        {
          text: 'OK',
          onPress: () => Actions.pop(),
        },
      ]
    );
  },
});
export default connect(mapStateToProps, null, mergeProps)(SendReminder);

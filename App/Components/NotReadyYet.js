import React from 'react';
import { ActivityIndicator, TouchableOpacity, Image, Dimensions, Text, Platform, View, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { WHITE, NEUTRAL, TRANSPARENT, LIGHTEST_GREY } from '../Constants/Colours';
import Spacing from '../Components/Spacing';
import Button from '../Components/Button';
import { isIOS, logError, sendPhoneNumberToSlack } from '../Utils';

const { width } = Dimensions.get('window');

const handleError = error => {
  logError(error);
  alert('Sorry, there was an error saving your reminder. Please try again!');
};

const containerStyle = {
  backgroundColor: NEUTRAL,
  flex: 1,
  paddingHorizontal: 32,
  paddingTop: 32,
};

const headerStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: Platform.select({
    ios: 26,
    android: 24,
  }),
  textAlign: 'center',
  fontFamily: 'Raleway-ExtraBold',
};

const bodyStyle = {
  paddingBottom: 16,
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: Platform.select({
    ios: 16,
    android: 14,
  }),
  textAlign: 'left',
  fontFamily: 'Raleway-Regular',
};

const androidInputStyle = {
  color: WHITE,
  height: 42,
  width: width - 64,
};

const iosInputStyle = {
  color: NEUTRAL,
  paddingHorizontal: 8,
  height: 32,
  width: width - 64,
  backgroundColor: LIGHTEST_GREY,
  borderRadius: 4,
};

const textInputStyle = Platform.select({
  ios: iosInputStyle,
  android: androidInputStyle,
});

const buttonContainer = {
  alignItems: 'center',
};

const topContainerStyle = {
  justifyContent: 'space-between',
  flexDirection: 'row',
};

export const remindMeTomorrow = (component, phoneNumber) => {
  component.setState({ loading: true });
  return sendPhoneNumberToSlack(phoneNumber)
    .then(() => Actions.thankyou())
    .catch(handleError)
    .finally(() => {
      component.setState({ loading: false });
    });
};

class NotReadyYet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      phoneNumber: null,
    };
  }

  render() {
    return (
      <View style={containerStyle}>
        <View style={topContainerStyle}>
          {isIOS ?
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Image source={require('../Images/chevron_left.png')} />
            </TouchableOpacity> :
            <View />}
          <Text style={headerStyle}>
            Not ready yet?
          </Text>
          <View />
        </View>

        <Spacing height={32} />

        <Text style={bodyStyle}>
          If your kid isn't around right now or you don't have time to set up traxi, don't worry.
        </Text>

        <Text style={bodyStyle}>
          Enter your phone number below and we'll remind you tomorrow.
        </Text>

        <Text style={bodyStyle}>
          You can also come back to the app whenever you're ready.
        </Text>

        <Spacing height={16} />

        <TextInput
          onChangeText={phoneNumber => this.setState({ phoneNumber })}
          keyboardType="phone-pad"
          underlineColorAndroid={WHITE}
          style={textInputStyle}
        />

        <Spacing height={32} />

        {this.state.loading ?
          <ActivityIndicator size="large" /> :
          <View style={buttonContainer}>
            <Button onPress={() => remindMeTomorrow(this, this.state.phoneNumber)}>
              Remind me tomorrow
            </Button>
          </View>}
      </View>
    );
  }
}

export default NotReadyYet;

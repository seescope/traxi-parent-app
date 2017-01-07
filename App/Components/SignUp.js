/* eslint global-require: "off" */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import InAppBilling from 'react-native-billing';
import { Experiment, Variant } from 'react-native-ab';

import Button from '../Components/Button';
import Spacing from '../Components/Spacing';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
import loginWithMethod from '../Actions/LoginWithMethod';
import { selectPrice } from '../Actions/Actions';
import { logError } from '../Utils';


export const handleBillingError = error => {
  if (__DEV__) {
    console.log(`Ignoring InAppBilling error in DEV mode: ${error.message}`);
    return InAppBilling.close().then(Actions.selectDevice());
  }

  logError(`InAppBilling error: ${error.message}`);
  return null;
};

export const beginSetup = price =>
  dispatch => {
    if (price === 'free') {
      return dispatch(loginWithMethod('anonymous'))
        .then(() => Actions.selectDevice());
    }

    return dispatch(loginWithMethod('anonymous'))
      .then(() => InAppBilling.open())
      .then(() => InAppBilling.subscribe(price))
      .then(details => {
        console.log('Successful InAppBilling purchase!', details);
        return InAppBilling.close();
      })
      .then(() => Actions.selectDevice())
      .catch(handleBillingError);
  };

const onSelectPrice = price =>
  dispatch =>
    dispatch(selectPrice(price));

const logoStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: 26,
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'raleway',
  marginBottom: 16,
};

const subHeaderStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: 13,
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'raleway',
  marginBottom: 24,
};

const containerStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const SignUpComponent = ({ onPress, onChoice, price }) =>
  <Image
    source={require('../Images/signup_background.png')}
    style={containerStyle}
    resizeMode="cover"
  >
    <Text style={logoStyle}>Keep your children safe.</Text>
    <Experiment
      name="launch-pricing-experiment"
      onChoice={(experimentId, variantId) => onChoice(variantId)}
    >
      <Variant name="free">
        <Text style={subHeaderStyle}>Monitor unlimited devices free of charge.</Text>
      </Variant>
      <Variant name="subscription_one_dollar">
        <Text style={subHeaderStyle}>Monitor unlimited devices for just $0.99 per month.</Text>
      </Variant>
      <Variant name="subscription_five_dollars">
        <Text style={subHeaderStyle}>Monitor unlimited devices for just $4.99 per month.</Text>
      </Variant>
    </Experiment>

    <Spacing />

    <Button primary onPress={() => onPress(price)}>Start Monitoring</Button>
  </Image>;


const SignUp = connect(
  ({ price }) => ({ price }),
  {
    onPress: beginSetup,
    onChoice: onSelectPrice,
  }
)(SignUpComponent);

SignUpComponent.propTypes = {
  price: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  onChoice: PropTypes.func.isRequired,
};

export default SignUp;

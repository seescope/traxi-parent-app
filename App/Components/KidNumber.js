import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
import { isIOS } from '../Utils';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
// eslint-disable-next-line
import Locale from 'react-native-locale';

const getCountryCode = () => {
  const locale = Locale.constants();

  // The Locale library is guaranteed to produce a string like 'en_AU', this should be safe.
  return locale.localeIdentifier.split('_')[1];
};

const KidNumberStyle = StyleSheet.create({
  text: {
    color: WHITE,
    textAlign: 'center',
    fontFamily: 'Raleway-Light',
    fontSize: isIOS ? 17 : 12,
    backgroundColor: TRANSPARENT,
  },
});

const formatPhoneNumber = phoneNumber => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const parsed = phoneUtil.parse(phoneNumber, getCountryCode());

  return phoneUtil.format(parsed, PhoneNumberFormat.INTERNATIONAL);
};

const KidNumber = ({ children }) => (
  <Text style={KidNumberStyle.text}>{formatPhoneNumber(children)}</Text>
);

KidNumber.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

export default KidNumber;

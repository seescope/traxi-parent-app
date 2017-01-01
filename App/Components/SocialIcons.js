import React, { PropTypes } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TRAXI_ORANGE, TRANSPARENT } from '../Constants/Colours';

const IconStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 50,
    margin: 20,
    color: TRAXI_ORANGE,
    backgroundColor: TRANSPARENT,
  },
  boldIcon: {
    fontSize: 50,
    margin: 20,
    color: TRAXI_ORANGE,
    backgroundColor: TRANSPARENT,
  },
});

const SocialIcons = ({ onPress }) => (
  <View style={IconStyles.container}>
    <TouchableOpacity onPress={() => onPress('facebook')}>
      <Icon style={IconStyles.icon} name={'facebook-f'} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onPress('google-oauth2')}>
      <Icon style={IconStyles.icon} name={'google'} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onPress('email')}>
      <Icon style={IconStyles.boldIcon} name={'envelope-o'} />
    </TouchableOpacity>
  </View>
);

SocialIcons.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default SocialIcons;

import React, { PropTypes } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

import KidAvatar from '../Components/KidAvatar';
import HeaderText from '../Components/HeaderText';
import SubHeaderText from '../Components/SubHeaderText';
import { firstName, relativeDate, timeRange } from '../Utils';

const { width } = Dimensions.get('window');

const headerText = date => {
  if (date.length <= 4) {
    return timeRange(date);
  }

  return relativeDate(date);
};

const HEADER_STYLE = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    width,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  innerContainer: {
    marginLeft: 8,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export const Header = ({ kid, date }) => (
  <View style={HEADER_STYLE.container}>
    <TouchableOpacity onPress={() => Actions.pop()}>
      <Icon name="arrow-back" color="white" size={24} />
    </TouchableOpacity>
    <View style={HEADER_STYLE.innerContainer}>
      <HeaderText>{headerText(date)}</HeaderText>
      <SubHeaderText>{firstName(kid.name)}'s night time usage</SubHeaderText>
    </View>
    <KidAvatar avatarURL={kid.avatarURL} size={52} />
  </View>
);

Header.propTypes = {
  kid: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};

export default Header;

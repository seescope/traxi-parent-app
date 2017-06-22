// @flow

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TRAXI_BLUE, WHITE, TRANSPARENT } from '../Constants/Colours';
import { isIOS } from '../Utils';

const style = {
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: isIOS ? 72 : 56,
    backgroundColor: TRAXI_BLUE,
    paddingTop: isIOS && 16,
  },
  title: {
    color: WHITE,
    backgroundColor: TRANSPARENT,
    fontSize: 24,
    fontFamily: 'Raleway-ExtraBold',
    textAlign: 'center',
    flex: 1,
    marginRight: 25, // To align correctly with icon on left.
  },
};

type Props = {
  onPress: () => void,
  buttonIcon: string,
  title: string
};

export default ({ onPress, buttonIcon, title }: Props): React.Element<*> => (
  <View style={style.container}>
    <TouchableOpacity onPress={onPress}>
      <Icon size={25} color={WHITE} name={buttonIcon} />
    </TouchableOpacity>
    <Text style={style.title}>{title}</Text>
  </View>
);

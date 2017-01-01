/* eslint-disable global-require */

import React, { PropTypes } from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const TINT_COLOUR = 'rgba(0,0,0,0.4)';

const style = StyleSheet.create({
  innerView: {
    backgroundColor: TINT_COLOUR,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: width / 2,
    width,
  },
});

export const KidTile = ({ kid, children, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <Image source={{ uri: kid.avatarURL }}>
      <View style={style.innerView}>
        {children}
      </View>
    </Image>
  </TouchableHighlight>
);

KidTile.propTypes = {
  kid: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
};

export default KidTile;

/* eslint-disable */

import React from 'react';
import ReactNative, { View, Dimensions } from 'react-native';

const style = {
  container: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
};

const { width } = Dimensions.get('window');

class Playground extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <View style={style.container} />;
  }
}

export default Playground;

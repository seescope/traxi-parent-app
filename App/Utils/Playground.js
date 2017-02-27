/* eslint-disable */

import React from 'react';
import ReactNative, { View, Dimensions } from 'react-native';
import { configureNotificationEndpoint } from '../Utils/Notifications';

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
    configureNotificationEndpoint();
  }

  render() {
    return <View style={style.container} />;
  }
}

export default Playground;

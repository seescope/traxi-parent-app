/* eslint-disable */

import React, { Component } from 'react';
import { View, Linking, AppState } from 'react-native';

const style = {
  container: {
    backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
};

const getUrl = async () => {
  try {
    const URL = await Linking.getInitialURL();
    if (!URL) {
      console.log('no url');
      return null;
    }
    const link = URL.split('link=')[1];
    const email = link.split('/')[3];
    return email;
  } catch (error) {
    return null;
  }
};

class Playground extends Component {
  state = {
    appState: AppState.currentState,
  };

  // componentDidMount() {
  //   AppState.addEventListener('change', this.handleAppStateChange);
  // }
  //
  // componentWillUnmount() {
  //   AppState.removeEventListener('change', this.handleAppStateChange);
  // }
  //
  // handleAppStateChange = nextAppState => {
  //   if (
  //     this.state.appState.match(/inactive|background/) &&
  //     nextAppState === 'active'
  //   ) {
  //     console.log('App has come to the foreground!');
  //     getUrl();
  //   }
  //   this.setState({ appState: nextAppState });
  // };

  render() {
    const email = getUrl();

    return <View style={style.container} />;
  }
}

export default Playground;

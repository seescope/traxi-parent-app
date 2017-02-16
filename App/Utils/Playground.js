import React from 'react';
import ReactNative, { View, Dimensions } from 'react-native';
import AreYouReady from '../Components/AreYouReady';

const style = {
  container: {
    backgroundColor: '#111',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
};

const { width } = Dimensions.get('window');

class Playground extends React.Component  {
  constructor() {
    super();

  }

  render () {
    return (
      <View style={style.container}>
        <AreYouReady/>
      </View>
    );
  }
}

export default Playground

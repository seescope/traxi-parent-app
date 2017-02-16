import React from 'react';
import ReactNative, { View, Dimensions } from 'react-native';
import SetImage from '../Containers/SetImage';
//import SetImage from '../Containers/SetImage';

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
        <SetImage kidName={'Chris'} parentName={'Fred'}/>
      </View>
    );
  }
}

export default Playground

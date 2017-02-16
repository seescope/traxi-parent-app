import React from 'react';
import ReactNative, { View, Dimensions } from 'react-native';
import Congratulations from '../Containers/Congratulations';

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
        <Congratulations kidName={'Chris'} parentName={'Fred'}/>
      </View>
    );
  }
}

export default Playground

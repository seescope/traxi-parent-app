import React from 'react';
import { Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const imageStyle = {
  width,
  height,
};

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      screen: 0,
    };
  }

  render() {
    return (
      <Image
        resizeMode="cover"
        style={imageStyle}
        source={require('../Images/intro-step-1.png')}
      />
    );
  }
}

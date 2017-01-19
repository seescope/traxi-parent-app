import React from 'react';
import Spacing from '../Components/Spacing';
import { View, Image, Dimensions, Text } from 'react-native';
import { WHITE, TRANSPARENT } from '../Constants/Colours';

const { width, height } = Dimensions.get('window');
const imageStyle = {
  width,
  height,
};

const headerStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: 28,
  textAlign: 'center',
  fontFamily: 'Raleway-ExtraBold',
  marginHorizontal: 16,
  marginBottom: 16,
};

const subHeaderStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: 16,
  textAlign: 'center',
  fontFamily: 'Raleway-Regular',
  marginHorizontal: 16,
  marginBottom: 16,
};

const paddingStyle = {
  flex: 6,
};

const textContainer = {
  alignItems: 'center',
  flex: 3,
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
      >
        <View style={paddingStyle} />

        <View style={textContainer}>
          <Image source={require('../Images/progress-bar-1.png')} />

          <Spacing height={16} />

          <Text style={headerStyle}>First, get your kid's device</Text>

          <Text style={subHeaderStyle}>Don't worry, you can do this later if you like.</Text>
        </View>
      </Image>
    );
  }
}

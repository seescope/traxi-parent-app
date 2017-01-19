import React from 'react';
import Spacing from '../Components/Spacing';
import { Platform, View, Image, Dimensions, Text } from 'react-native';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
import Button from '../Components/Button';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');
const imageStyle = {
  marginTop: Platform.select({
    ios: 0,
  }),
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
  paddingHorizontal: 32,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
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
        <View style={paddingStyle}>
          <Image source={require('../Images/left-arrow.png')} />
          <Animatable.Image
            iterationCount="infinite"
            delay={2000}
            source={require('../Images/right-arrow.png')}
          />
        </View>

        <View style={textContainer}>
          <Animatable.Image
            easing="ease-out"
            animation="bounceInLeft"
            source={require('../Images/progress-bar-1.png')}
          />

          <Spacing height={32} />

          <Text style={headerStyle}>First, get your kid's device</Text>

          <Text style={subHeaderStyle}>Don't worry, you can do this later if you like.</Text>

          <Animatable.View
            animation="bounce"
            iterationCount="infinite"
          >
            <Button onPress={() => {}} primary={false}>Got it!</Button>
          </Animatable.View>
        </View>
      </Image>
    );
  }
}

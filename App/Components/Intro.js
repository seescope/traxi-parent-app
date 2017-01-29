import React from 'react';
import Spacing from '../Components/Spacing';
import { Actions } from 'react-native-router-flux';
import {
  Animated,
  TouchableOpacity,
  Platform,
  View,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Analytics from 'react-native-analytics';

import ProgressTrack from '../Components/ProgressTrack';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
import Button from '../Components/Button';

const containerStyle = {
  flex: 1,
};

const ANIMATION_DURATION = 500;

const { width, height } = Dimensions.get('window');
const imageStyle = {
  position: 'absolute',
  width,
  height,
};

const headerStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: Platform.select({
    ios: 28,
    android: 24,
  }),
  textAlign: 'center',
  fontFamily: 'Raleway-ExtraBold',
  marginHorizontal: 16,
  marginBottom: 16,
};

const subHeaderStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: Platform.select({
    ios: 16,
    android: 14,
  }),
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
  flex: 5,
};

const textContainer = {
  alignItems: 'center',
  flex: 3,
};

const STEP_IMAGES = [
  require('../Images/intro-step-1.png'),
  require('../Images/intro-step-2.png'),
  require('../Images/intro-step-3.png'),
  require('../Images/intro-step-4.png'),
];

const HEADER_TEXT = [
  'First, get your kid\'s device',
  'Then enter a PIN',
  'Follow the instructions',
  'Then you\'re all done!',
];

const SUBHEADER_TEXT = [
  'Don\'t worry, you can do this later if you like.',
  'We\'ll tell you what it is soon',
  'It only takes a couple of seconds',
  'Doesn\'t that look easy?',
];

export const onPress = () => {
  Analytics.track('Finished Intro');
  Actions.areYouReady();
};

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      step: 0,
    };

    this.animations = [
      new Animated.Value(1),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
    ];

    this.styles = [
      { opacity: this.animations[0] },
      { opacity: this.animations[1] },
      { opacity: this.animations[2] },
      { opacity: this.animations[3] },
    ];
  }

  nextStep() {
    const { step } = this.state;
    const newStep = step < 4 ? step + 1 : step;

    Animated.timing(
      this.animations[newStep],
      {
        toValue: 1,
        duration: ANIMATION_DURATION,
      }
    ).start();

    this.setState({
      step: newStep,
    });
  }

  previousStep() {
    const { step } = this.state;
    const newStep = step > 0 ? step - 1 : step;

    Animated.timing(
      this.animations[step],
      {
        toValue: 0,
        duration: ANIMATION_DURATION,
      }
    ).start();

    this.setState({
      step: newStep,
    });
  }

  render() {
    return (
      <View style={containerStyle}>
        <Animated.Image
          resizeMode="cover"
          style={[imageStyle, this.styles[0]]}
          source={STEP_IMAGES[0]}
        />
        <Animated.Image
          resizeMode="cover"
          style={[imageStyle, this.styles[1]]}
          source={STEP_IMAGES[1]}
        />
        <Animated.Image
          resizeMode="cover"
          style={[imageStyle, this.styles[2]]}
          source={STEP_IMAGES[2]}
        />
        <Animated.Image
          resizeMode="cover"
          style={[imageStyle, this.styles[3]]}
          source={STEP_IMAGES[3]}
        />

        <View style={paddingStyle}>
          {this.state.step > 0 ? <TouchableOpacity onPress={() => this.previousStep()}>
            <Image
              source={require('../Images/left-arrow.png')}
            />
          </TouchableOpacity> : <View />}
          {this.state.step < 3 ? <Animatable.View
            useNativeDriver
            animation="bounce"
            duration={2000}
            delay={3000}
          >
            <TouchableOpacity onPress={() => this.nextStep()}>
              <Image
                source={require('../Images/right-arrow.png')}
              />
            </TouchableOpacity>
          </Animatable.View> : <View />}
        </View>

        <View style={textContainer}>
          <Animatable.View
            useNativeDriver
            easing="ease-out"
            duration={1000}
            animation="bounceInLeft"
          >
            <ProgressTrack
              stage={this.state.step}
              width={width - 64}
            />
          </Animatable.View>

          <Spacing height={32} />

          <Text style={headerStyle}>{HEADER_TEXT[this.state.step]}</Text>

          <Text style={subHeaderStyle}>{SUBHEADER_TEXT[this.state.step]}</Text>

          <Spacing height={16} />

          {this.state.step === 3 && <Animatable.View
            useNativeDriver
            delay={1000}
            duration={1000}
            easing="ease-in-out"
            animation="bounceInUp"
          >
            <Button onPress={() => onPress()} primary={false}>Got it!</Button>
          </Animatable.View>}
        </View>
      </View>
    );
  }
}

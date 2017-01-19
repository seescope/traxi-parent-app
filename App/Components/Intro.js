import React from 'react';
import Spacing from '../Components/Spacing';
import { TouchableOpacity, Platform, View, Image, Dimensions, Text } from 'react-native';
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

const PROGRESS_IMAGES = [
  require('../Images/progress-bar-1.png'),
  require('../Images/progress-bar-2.png'),
  require('../Images/progress-bar-3.png'),
  require('../Images/progress-bar-4.png'),
];

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      step: 0,
    };
  }

  nextStep() {
    const { step } = this.state;
    const newStep = step < 4 ? step + 1 : step;
    this.setState({
      step: newStep,
    });
  }

  previousStep() {
    const { step } = this.state;
    const newStep = step > 0 ? step - 1 : step;
    this.setState({
      step: newStep,
    });
  }

  render() {
    return (
      <Image
        resizeMode="cover"
        style={imageStyle}
        source={STEP_IMAGES[this.state.step]}
      >
        <View style={paddingStyle}>
          {this.state.step > 0 ? <TouchableOpacity onPress={() => this.previousStep()}>
            <Image
              source={require('../Images/left-arrow.png')}
            />
          </TouchableOpacity> : <View />}
          {this.state.step < 3 ? <Animatable.View
            animation="bounce"
            duration={2000}
            iterationCount="infinite"
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
          <Animatable.Image
            easing="ease-out"
            duration={1000}
            delay={1000}
            animation="bounceInLeft"
            source={PROGRESS_IMAGES[this.state.step]}
          />

          <Spacing height={32} />

          <Text style={headerStyle}>First, get your kid's device</Text>

          <Text style={subHeaderStyle}>Don't worry, you can do this later if you like.</Text>

          <Spacing height={16} />

          {this.state.step === 3 && <Animatable.View
            animation="bounce"
          >
            <Button onPress={() => {}} primary={false}>Got it!</Button>
          </Animatable.View>}
        </View>
      </Image>
    );
  }
}

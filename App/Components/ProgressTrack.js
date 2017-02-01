import React, { PropTypes } from 'react';
import { View, Text, Easing, Animated } from 'react-native';
import { WHITE, TRAXI_BLUE } from '../Constants/Colours';

const TRACK_COLOUR = WHITE;
const TRACK_THICKNESS = 4;
const STAGES = [0, 1, 2, 3, 4];

const containerStyle = {
  height: 32,
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  paddingHorizontal: 14,
};

const trackStyle = width => ({
  top: (32 / 2) - (TRACK_THICKNESS / 2),
  position: 'absolute',
  backgroundColor: TRACK_COLOUR,
  height: TRACK_THICKNESS,
  left: 14,
  width: width - (14 * 2),
});

const circleStyle = {
  elevation: 5,
  alignItems: 'center',
  justifyContent: 'center',
  height: 14,
  width: 14,
  borderRadius: 7,
  backgroundColor: WHITE,
};

const textStyle = {
  fontWeight: 'bold',
  fontSize: 10, // Will be doubled by scaling
  color: TRAXI_BLUE,
};

class ProgressTrack extends React.Component {
  componentWillMount() {
    this.animatedValues = STAGES.map(() => new Animated.Value(0));

    const interpolationOptions = {
      inputRange: [0, 1],
      outputRange: [1, 2],
    };

    this.animatedCircleStyles = STAGES.map(i => ({
      transform: [{
        scale: this.animatedValues[i].interpolate(interpolationOptions),
      }],
    }));

    this.animatedTextStyles = STAGES.map(i => ({
      opacity: this.animatedValues[i],
    }));
  }

  componentDidMount() {
    this.animateCircles();
  }

  componentDidUpdate() {
    this.animateCircles();
  }

  animateCircles() {
    const { stage } = this.props;

    Animated.spring(this.animatedValues[stage], {
      toValue: 1,
      friction: 3,
      tension: 40,
    }).start();
  }

  render() {
    const { width } = this.props;

    return (
      <View style={{ width }}>
        <View style={containerStyle}>
          {STAGES.map(i =>
            <Animated.View key={i} style={[circleStyle, this.animatedCircleStyles[i]]}>
              <Animated.Text style={[textStyle, this.animatedTextStyles[i]]}>
                {i + 1}
              </Animated.Text>
            </Animated.View>
          )}
        </View>
        <View style={trackStyle(width)} />
      </View>
    );
  }
}

ProgressTrack.propTypes = {
  width: PropTypes.number.isRequired,
  stage: PropTypes.number.isRequired,
};

export default ProgressTrack;


import React, { PropTypes } from 'react';
import { View, Text, Easing, Animated } from 'react-native';
import { GOOD, WHITE, NEUTRAL, TRAXI_BLUE } from '../Constants/Colours';
import KidAvatar from './KidAvatar';

const TRACK_COLOUR = WHITE;
const TRACK_THICKNESS = 4;
const STAGES = [0, 1, 2, 3];

const containerStyle = {
  zIndex: 100,
  height: 50,
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  flexDirection: 'row',
};

const trackStyle = width => ({
  top: 11,
  position: 'absolute',
  backgroundColor: TRACK_COLOUR,
  height: TRACK_THICKNESS,
  width,
});

const circleStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: 26,
  width: 26,
  borderRadius: 13,
  backgroundColor: WHITE,
};

const textStyle = {
  fontWeight: 'bold',
  fontSize: 20,
  color: TRAXI_BLUE,
};

class ProgressTrack extends React.Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0.5);
  }

  componentDidMount() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
    }).start();
  }

  getProgressTrackStyle() {
    return {
      completedTrack: {
        backgroundColor: this.props.state === 'neutral' ? NEUTRAL : GOOD,
        height: TRACK_THICKNESS,
        width: this.state.completedTrackWidth,
      },
    };
  }

  animateTracks() {
    const { width, stage } = this.props;

    // Animated.parallel([
    //   Animated.timing(
    //     this.state.completedTrackWidth,
    //     {
    //       toValue: width * progress,
    //       easing: Easing.elastic(0.1),
    //     }
    //   ),
    //   Animated.timing(
    //     this.state.trackWidth,
    //     {
    //       toValue: width * (1 - progress),
    //       easing: Easing.elastic(0.1),
    //     }
    //   ),
    // ]).start();
  }

  render() {
    const { width } = this.props;
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }],
    };

    return (
      <View style={{ width }}>
        <View style={containerStyle}>
          {STAGES.map(i => <Animated.View key={i} style={[circleStyle, animatedStyle]}>
            <Text style={textStyle}>
              {i + 1}
            </Text>
          </Animated.View>)}
        </View>
        <View style={trackStyle(width)} />
      </View>
    );
  }
}

ProgressTrack.propTypes = {
  avatarURL: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  stage: PropTypes.number.isRequired,
  state: PropTypes.oneOf(['neutral', 'good']).isRequired,
};

export default ProgressTrack;


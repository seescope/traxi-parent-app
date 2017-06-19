import React from 'react';
import { Animated, Text, StyleSheet, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

import {
  LIGHT_GREY,
  GREY,
  TRAXI_BLUE,
  TRANSPARENT,
  GOOD,
} from '../../Constants/Colours';

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progress: {
    fontFamily: 'Raleway-Regular',
    backgroundColor: TRANSPARENT,
    color: GREY,
    fontWeight: '300',
  },
  logoContainer: {
    backgroundColor: TRANSPARENT,
    height: 40,
    width: 40,
    marginRight: 8,
  },
  logoPlaceholder: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    borderRadius: 8,
  },
  logo: {
    flex: 1,
    borderRadius: 8,
  },
  name: {
    fontFamily: 'Raleway-ExtraBold',
    backgroundColor: TRANSPARENT,
    color: GREY,
    marginBottom: 4,
    marginRight: 8,
  },
  informationContainer: {
    flexDirection: 'row',
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBarPlaceholder: {
    height: 20,
    flex: 1,
    backgroundColor: LIGHT_GREY,
    borderRadius: 4,
  },
  progressBar: {
    flex: 1,
    backgroundColor: TRAXI_BLUE,
  },
});

const getProgressBarStyle = value => {
  if (value === 100) {
    return {
      borderRadius: 4,
      backgroundColor: GOOD,
    };
  }
  return {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  };
};

export type Props = {
  name: string,
  progress: number,
  logo: ?string
};

class AppRow extends React.Component {
  state = {
    progressBarWidth: new Animated.Value(0),
  };

  componentDidMount() {
    this.animateProgressBar();
  }

  shouldComponentUpdate(nextProps) {
    const oldProgress = this.props.progress;
    const newProgress = nextProps.progress;

    if (oldProgress === newProgress) return false;

    return true;
  }

  componentDidUpdate() {
    this.animateProgressBar();
  }

  animateProgressBar() {
    Animated.timing(this.state.progressBarWidth, {
      toValue: this.props.progress,
      duration: 500,
    }).start();
  }

  props: Props;

  render() {
    const { progress, logo, name } = this.props;
    const { progressBarWidth } = this.state;

    const percentageWidth = progressBarWidth.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    });

    return (
      <Animatable.View
        useNativeDriver
        duration={1000}
        animation="fadeIn"
        style={styles.container}
      >

        <View style={styles.logoContainer}>
          {logo
            ? <Image style={styles.logo} source={{ uri: logo }} />
            : <View style={styles.logoPlaceholder} />}
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.informationContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.progress}>{progress}%</Text>
          </View>
          <View style={styles.progressBarPlaceholder}>
            <Animated.View
              style={[
                styles.progressBar,
                getProgressBarStyle(progress),
                {
                  width: percentageWidth,
                },
              ]}
            />
          </View>
        </View>
      </Animatable.View>
    );
  }
}

export default AppRow;

import React from 'react';
import { Animated, Text, StyleSheet, View, Image } from 'react-native';

import {
  LIGHT_GREY,
  GREY,
  TRAXI_BLUE,
  TRANSPARENT,
  GOOD,
} from '../../Constants/Colours';

const styles = StyleSheet.create({
  container: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressValue: {
    marginLeft: 10,
    width: 40,
    backgroundColor: TRANSPARENT,
    color: LIGHT_GREY,
  },
  logoPlaceholder: {
    height: 40,
    width: 40,
    backgroundColor: LIGHT_GREY,
    borderRadius: 8,
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 8,
  },
  name: {
    backgroundColor: TRANSPARENT,
    marginLeft: 10,
    color: GREY,
  },
  informationContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
    marginBottom: 8,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  progressBarPlaceholder: {
    marginLeft: 10,
    flex: 1,
    height: 20,
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

class AppRow extends React.Component {
  state = {
    progressBarWidth: new Animated.Value(0),
  };

  shouldComponentUpdate(nextProps, nextState) {
    const oldProgress = this.props.progress;
    const newProgress = nextProps.progress;

    if (oldProgress === newProgress) return false;

    return true;
  }

  componentDidMount() {
    this.animateProgressBar();
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

  props: {
    name: string,
    progress: number,
    logo: string,
  };

  render() {
    const { progress } = this.props;
    const { progressBarWidth } = this.state;

    const percentageWidth = progressBarWidth.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    });

    return (
      <View style={styles.container}>
        <View style={styles.logoPlaceholder}>
          {this.props.logo != null &&
            <Image style={styles.logo} source={{ uri: this.props.logo }} />}
        </View>

        <View style={styles.informationContainer}>
          <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
            {this.props.name}
          </Text>
          <View style={styles.progressContainer}>
            <Text style={styles.progressValue}>{progress} %</Text>
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
        </View>
      </View>
    );
  }
}

export default AppRow;

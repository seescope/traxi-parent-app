import React, { PropTypes } from 'react';
import { Easing, Animated, TouchableOpacity, ScrollView, Text, Dimensions } from 'react-native';
import SubHeaderText from '../Components/SubHeaderText';
import { GOOD, WHITE, BAD } from '../Constants/Colours';
import { Actions } from 'react-native-router-flux';
import { isIOS } from '../Utils';

const chartStyle = (report, width) => ({
  backgroundColor: BAD,
  width,
  height: 16,
  marginLeft: -16,
  borderRadius: 6,
});

const subheaderText = report => {
  const { apps, minutes } = report;
  if (!minutes) {
    return 'No usage';
  }

  if (!apps) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  return apps.map(a => a.label).join(', ');
};

const labelStyle = minutes => ({
  backgroundColor: 'transparent',
  fontSize: isIOS ? 28 : 20,
  fontWeight: isIOS ? '300' : '500',
  marginLeft: 16,
  color: minutes ? WHITE : GOOD,
});

const STYLE = {
  container: {
    marginBottom: 16,
  },
  subheader: {
    marginLeft: 16,
  },
};

export class UsageItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { report } = this.props;
    const { width } = Dimensions.get('window');
    if (report.minutes) {
      Animated.timing(
        this.state.width,
        {
          toValue: ((report.minutes / 60) * width) + 16,
          easing: Easing.elastic(1.5),
          duration: 1100,
        }
      ).start();
    }
  }

  render() {
    const { report } = this.props;
    const onPress = () =>
      report.apps && Actions.timeUsage({ report: report.apps, date: report.label });

    return (
      <TouchableOpacity
        style={STYLE.container}
        onPress={onPress}
      >
        <Text style={labelStyle(report.minutes)}>{report.label}</Text>
        {(report.minutes > 0) && <Animated.View style={chartStyle(report, this.state.width)} />}
        <SubHeaderText style={STYLE.subheader}>{subheaderText(report)}</SubHeaderText>
      </TouchableOpacity>
    );
  }
}

UsageItem.propTypes = {
  report: PropTypes.object.isRequired,
};

export const UsageItems = ({ report }) => (
  <ScrollView>
    {report.map((r, i) => <UsageItem key={i} report={r} />)}
  </ScrollView>
);

UsageItems.propTypes = {
  report: PropTypes.array.isRequired,
};

export default UsageItems;

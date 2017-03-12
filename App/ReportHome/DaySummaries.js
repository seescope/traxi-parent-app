import React, {PropTypes} from 'react';
import {ScrollView, Dimensions} from 'react-native';
import DaySummary from './DaySummary';

const dateComparator = (date1, date2) => date1 > date2 ? -1 : 1;

const sortReports = reports => Object.keys(reports).sort(dateComparator).map(d => [d, reports[d]]);

const {height, width} = Dimensions.get('window');

const style = {
  container: {
    minHeight: height - width / 2,
  },
};

const DaySummaries = ({reports}) => (
  <ScrollView style={style.container}>
    {reports &&
      sortReports(reports).map(([date, report]) => (
        <DaySummary key={date} date={date} circles={report.circles} />
      ))}
  </ScrollView>
);

DaySummaries.propTypes = {
  reports: PropTypes.object.isRequired,
};

export default DaySummaries;

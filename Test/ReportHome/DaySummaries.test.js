import React from 'react';
import renderer from 'react-test-renderer';
import DaySummaries from '../../App/ReportHome/DaySummaries';

it('Renders a list of day summaries', () => {
  const REPORT_DATA = {
    '2016-12-10': {
      circles: [],
    },
    '2016-12-11': {
      circles: [],
    },
    '2016-12-12': {
      circles: [],
    },
    '2016-12-13': {
      circles: [],
    },
  };

  const tree = renderer.create(<DaySummaries reports={REPORT_DATA} />).toJSON();
  expect(tree).toMatchSnapshot();
});

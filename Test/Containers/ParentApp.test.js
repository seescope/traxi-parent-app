import React from 'react';
import renderer from 'react-test-renderer';
import ParentApp from '../../App/Containers/ParentApp';

jest.mock('aws-sdk-react-native-dynamodb');

describe('<ParentApp />', () => {
  it(
    'renders the Parent with the ReportHome component active if installed',
    () => {
      const tree = renderer
        .create(<ParentApp profile={{ kids: [] }} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    },
  );

  it(
    'renders the Parent with the AreYouReady component if no kids in the profile',
    () => {
      const tree = renderer
        .create(<ParentApp profile={{ UUID: 'abc-123' }} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    },
  );

  it(
    'renders the Parent with the SplashScreen component active if not installed',
    () => {
      const tree = renderer.create(<ParentApp profile={{}} />).toJSON();
      expect(tree).toMatchSnapshot();
    },
  );
});

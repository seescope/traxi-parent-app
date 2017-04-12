import React from 'react';
import renderer from 'react-test-renderer';
import SplashScreen from '../../App/Components/SplashScreen';


it('renders the <SplashScreen> component', () => {
  const tree = renderer
    .create(<SplashScreen />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

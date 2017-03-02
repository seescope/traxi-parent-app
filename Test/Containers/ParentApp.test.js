import React from 'react';
import renderer from 'react-test-renderer';
import ParentApp from '../../App/Containers/ParentApp';

jest.mock('aws-sdk-react-native-dynamodb');

describe('<ParentApp />', () => {
  it('renders the Parent with the ReportHome component active if installed', () => {
    const tree = renderer.create(<ParentApp profile={{ kids: [] }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('renders the Parent with the AreYouReady component if no kids in the profile', () => {
    const tree = renderer.create(<ParentApp profile={{ UUID: 'abc-123' }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the Parent with the SplashScreen component active if not installed', () => {
    const tree = renderer.create(<ParentApp profile={{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ensures the correct components have their initial prop set', () => {
    const tree = renderer.create(<ParentApp profile={{}} />).toJSON();
    const initialProps = tree.children.map(c => c.props.initial);

    expect(initialProps[0]).toBeTruthy();

    initialProps.slice(1, initialProps.length).forEach(initial =>
        expect(initial).not.toBeTruthy()
    );
  });

  it('ensures the INITIAL_STATE is correct', () => {
    const parentApp = new ParentApp({ profile: {} });
    const initialState = parentApp.store.getState();

    expect(initialState.step).toEqual(0);
    expect(initialState.selectedKid).toEqual({});
    expect(initialState.kids).toEqual([]);
  });

  it('returns false when the backButtonHandler is pressed on the root scene', () => {
    const parentApp = new ParentApp({ profile: {} });
    expect(parentApp.backButtonHandler()).not.toBeTruthy();
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import ParentApp from '../../App/Containers/ParentApp';
import mockFetchReport from '../../App/Dashboard/Actions/FetchReport';

jest.mock('../../App/Dashboard/Actions/FetchReport', () =>
  jest.fn(() =>
    dispatch => {
      dispatch({
        type: 'FETCHING_REPORT',
      });
    }));

describe('<ParentApp />', () => {
  it('renders the Parent with the ReportHome component active if installed with no deeplink', () => {
    const tree = renderer
      .create(<ParentApp profile={{ kids: [] }} deeplink={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the Parent with the AreYouReady component if no kids in the profile and no deeplink', () => {
    const tree = renderer
      .create(<ParentApp profile={{ UUID: 'abc-123' }} deeplink={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the Parent with the SplashScreen component active if not installed and no deeplink', () => {
    const tree = renderer
      .create(<ParentApp profile={{}} deeplink={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the Parent with the SetupCompletion component if there is a deeplink', () => {
    const tree = renderer.create(<ParentApp profile={{}} deeplink />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ensures the correct components have their initial prop set', () => {
    const tree = renderer
      .create(<ParentApp profile={{}} deeplink={false} />)
      .toJSON();
    const initialProps = tree.children.map(c => c.props.initial);

    expect(initialProps[0]).toBeTruthy();

    initialProps
      .slice(1, initialProps.length)
      .forEach(initial => expect(initial).not.toBeTruthy());
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

  it('fetches reports', () => {
    const test = new ParentApp({
      profile: {
        kids: [{ UUID: '123' }, { UUID: '456' }],
      },
      deeplink: false,
    });

    expect(test).toBeTruthy(); // Appease ESLint
    expect(mockFetchReport).toHaveBeenCalledWith(['123', '456']);
  });
});

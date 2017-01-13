/* eslint-disable global-require */
/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */

import React, { PropTypes } from 'react';
import { BackAndroid } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ReduxThunk from 'redux-thunk';

import SignUp from '../Components/SignUp';
import CreateKid from './CreateKid';
import Walkthrough from './Walkthrough';
import Congratulations from './Congratulations';
import ReportHome from '../ReportHome';
import WeekView from '../ReportHome/WeekView';
import DayView from '../ReportHome/DayView';
import ParentAppReducer from '../Reducers/ParentAppReducer';
import fetchReportsAction from '../Actions/FetchReports';
import { loggingMiddleware, trackingMiddleware } from '../Utils';
import { AWSDynamoDB } from 'aws-sdk-react-native-dynamodb';
import { AWSCognitoCredentials } from 'aws-sdk-react-native-core';
import Timer from 'react-native-timer';

const COGNITO_REGION = 'ap-southeast-2';
const IDENTITY_POOL_ID = 'ap-southeast-2:a9998d71-cdf3-474f-a337-9c12289c833c';
const DYNAMODB_REGION = 'ap-southeast-2';
const REFRESH_INTERVAL = 30 * 1000; // 30 seconds
const TIMER_NAME = 'refreshReports';

const RouterWithRedux = connect()(Router);

class ParentApp extends React.Component {
  constructor(props) {
    super(props);

    const { profile } = props;
    const { kids } = profile;

    const INITIAL_STATE = {
      loading: false,
      profile,
      contacts: [],
      step: 0,
      kidSuggestions: [],
      kids: kids || [],
      selectedKid: kids && kids[0] || {},
      reports: {},
    };

    this.store = createStore(
      ParentAppReducer,
      INITIAL_STATE,
      applyMiddleware(ReduxThunk, loggingMiddleware, trackingMiddleware)
    );

    if (profile && profile.name) {
      this.store.dispatch({ type: 'LOGGED_IN', profile });
    }

    Promise.resolve(AWSCognitoCredentials.initWithOptions({
      region: COGNITO_REGION,
      identity_pool_id: IDENTITY_POOL_ID,
    }))
    .then(AWSDynamoDB.initWithOptions({ region: DYNAMODB_REGION }))
    .then(() => {
      this.fetchReports();
      Timer.setInterval(TIMER_NAME, this.fetchReports.bind(this), REFRESH_INTERVAL);
    });

    BackAndroid.addEventListener('hardwareBackPress', () => {
      const store = this.store;
      const { sceneName } = store.getState();

      if (sceneName === 'walkthrough') {
        store.dispatch({ type: 'PREVIOUS_STEP' });
      } else if (sceneName === 'congratulations') {
        return true;
      } else if (sceneName === 'reports') {
        BackAndroid.exitApp();
        return false;
      } else {
        Actions.pop();
      }

      return true;
    });
  }

  componentWillUnmount() {
    Timer.clearInterval(TIMER_NAME);
  }

  fetchReports() {
    const { profile } = this.store.getState();
    const kids = profile.kids;

    if (!kids) { return null; }

    kids.forEach(kid => {
      const action = fetchReportsAction(kid);
      this.store.dispatch(action);
    });

    return null;
  }

  render() {
    const { profile } = this.props;
    const isInstalled = profile.kids;

    return (
      <Provider store={this.store} onExitApp={false}>
        <RouterWithRedux hideNavBar>
          <Scene key="signup" initial={!isInstalled} component={SignUp} />
          <Scene key="createKid" component={CreateKid} />
          <Scene key="walkthrough" component={Walkthrough} />
          <Scene key="congratulations" component={Congratulations} />
          <Scene key="reports" initial={isInstalled} component={ReportHome} />
          <Scene key="weekView" component={WeekView} />
          <Scene key="dayView" component={DayView} />
        </RouterWithRedux>
      </Provider>
    );
  }
}

ParentApp.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ParentApp;

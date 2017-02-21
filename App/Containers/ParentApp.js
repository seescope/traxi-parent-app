import React, {PropTypes} from 'react';
import {BackAndroid} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
import {Scene, Router, Actions} from 'react-native-router-flux';
import ReduxThunk from 'redux-thunk';

import SplashScreen from './SplashScreen';
import AreYouReady from '../Components/AreYouReady';
import Intro from '../Components/Intro';
import NotReadyYet from '../Components/NotReadyYet';
import Thankyou from '../Components/Thankyou';
import SetName from './SetName';
import SetImage from './SetImage';
import Walkthrough from './Walkthrough';
import Congratulations from './Congratulations';
import ReportHome from '../ReportHome';
import WeekView from '../ReportHome/WeekView';
import DayView from '../ReportHome/DayView';
import ParentAppReducer from '../Reducers/ParentAppReducer';
import fetchReportsAction from '../Actions/FetchReports';
import {loggingMiddleware, trackingMiddleware} from '../Utils';
import {AWSDynamoDB} from 'aws-sdk-react-native-dynamodb';
import {AWSCognitoCredentials} from 'aws-sdk-react-native-core';
import Timer from 'react-native-timer';

import Playground from '../Utils/Playground';

const COGNITO_REGION = 'ap-southeast-2';
const IDENTITY_POOL_ID = 'ap-southeast-2:a9998d71-cdf3-474f-a337-9c12289c833c';
const DYNAMODB_REGION = 'ap-southeast-2';
const REFRESH_INTERVAL = 30 * 1000; // 30 seconds
const TIMER_NAME = 'refreshReports';

const CLOSING_SCENES = {
  reports: true,
  splashScreen: true,
  thankyou: true,
};

const RouterWithRedux = connect()(Router);

class ParentApp extends React.Component {
  constructor(props) {
    super(props);

    const {profile} = props;
    const {kids} = profile;

    const INITIAL_STATE = {
      loading: false,
      profile,
      step: 0,
      kids: kids || [],
      selectedKid: kids && kids[0] || {},
      reports: {},
    };

    this.store = createStore(
      ParentAppReducer,
      INITIAL_STATE,
      applyMiddleware(ReduxThunk, loggingMiddleware, trackingMiddleware),
    );

    if (profile && profile.name) {
      this.store.dispatch({type: 'LOGGED_IN', profile});
    }

    Promise
      .resolve(
        AWSCognitoCredentials.initWithOptions({
          region: COGNITO_REGION,
          identity_pool_id: IDENTITY_POOL_ID,
        }),
      )
      .then(AWSDynamoDB.initWithOptions({region: DYNAMODB_REGION}))
      .then(() => {
        this.fetchReports();
        Timer.setInterval(TIMER_NAME, this.fetchReports.bind(this), REFRESH_INTERVAL);
      });

    this.backButtonHandler = this.backButtonHandler.bind(this);
  }

  componentWillUnmount() {
    Timer.clearInterval(TIMER_NAME);
  }

  backButtonHandler() {
    const store = this.store;
    const {sceneName, step} = store.getState();

    if (sceneName === 'walkthrough') {
      if (step === 0) Actions.pop();
      else store.dispatch({type: 'PREVIOUS_STEP'});

      return true;
    } else if (sceneName === 'congratulations') {
      return true;
    } else if (CLOSING_SCENES[sceneName]) {
      BackAndroid.exitApp();
      return false;
    }

    Actions.pop();
    return true;
  }

  fetchReports() {
    const {profile} = this.store.getState();
    const kids = profile.kids;

    if (!kids) {
      return null;
    }

    kids.forEach(kid => {
      const action = fetchReportsAction(kid);
      this.store.dispatch(action);
    });

    return null;
  }

  render() {
    const {profile} = this.props;
    const isInstalled = !!profile.kids;
    const introSeen = !!profile.UUID;

    return (
      <Provider store={this.store} onExitApp={false}>
        <RouterWithRedux hideNavBar backAndroidHandler={this.backButtonHandler}>
          <Scene key="splashScreen" initial={!isInstalled} component={SplashScreen} />
          <Scene key="intro" component={Intro} />
          <Scene key="areYouReady" initial={introSeen} component={AreYouReady} />
          <Scene key="notReadyYet" component={NotReadyYet} />
          <Scene key="thankyou" component={Thankyou} />
          <Scene key="setName" component={SetName} />
          <Scene key="setImage" component={SetImage} />
          <Scene key="walkthrough" component={Walkthrough} />
          <Scene key="congratulations" component={Congratulations} />
          <Scene key="reports" initial={isInstalled} component={ReportHome} />
          <Scene key="weekView" component={WeekView} />
          <Scene key="dayView" component={DayView} />
          <Scene key="playground" initial={false} component={Playground} />
        </RouterWithRedux>
      </Provider>
    );
  }
}

ParentApp.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ParentApp;

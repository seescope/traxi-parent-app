import React, { PropTypes } from 'react';
import { BackAndroid } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ReduxThunk from 'redux-thunk';

import SplashScreen from './SplashScreen';
import NotReadyYet from '../Components/NotReadyYet';
import Thankyou from '../Components/Thankyou';
import Walkthrough from './Walkthrough';
import Congratulations from './Congratulations';
import Playground from '../Utils/Playground';
import Dashboard from '../Dashboard';
import SetupCompletion from './SetupCompletion';
// import Login from './Login';

import ParentAppReducer from '../Reducers/ParentAppReducer';
import fetchReportsAction from '../Dashboard/Actions/FetchReport';
import { loggingMiddleware, trackingMiddleware } from '../Utils';

const RouterWithRedux = connect()(Router);

class ParentApp extends React.Component {
  constructor(props) {
    super(props);

    const { profile, deeplink } = props;
    const { kids } = profile;

    const INITIAL_STATE = {
      loading: false,
      profile,
      deeplink,
      step: 0,
      kids: kids || [],
      selectedKid: (kids && kids[0]) || {},
      reports: {},
    };

    this.store = createStore(
      ParentAppReducer,
      INITIAL_STATE,
      applyMiddleware(ReduxThunk, loggingMiddleware, trackingMiddleware),
    );

    if (profile) {
      if (profile.name) {
        this.store.dispatch({ type: 'LOGGED_IN', profile });
      }
      this.fetchReports();
    }

    this.backButtonHandler = this.backButtonHandler.bind(this);
  }

  backButtonHandler() {
    const store = this.store;
    const { sceneName, step } = store.getState();

    if (sceneName === 'walkthrough') {
      if (step === 0) Actions.pop();
      else store.dispatch({ type: 'PREVIOUS_STEP' });

      return true;
    } else if (sceneName === 'congratulations') {
      return true;
    }

    try {
      Actions.pop();
    } catch (error) {
      // The user is in the root scene - exit the app.
      BackAndroid.exitApp();
      return false;
    }

    // Default
    return true;
  }

  fetchReports() {
    const { profile } = this.store.getState();
    const kids = profile.kids;

    if (!kids) return null;

    const UUIDs = kids.map(k => k.UUID);
    const action = fetchReportsAction(UUIDs);
    this.store.dispatch(action);

    return null;
  }

  render() {
    const { profile, deeplink } = this.props;
    const isInstalled = !!profile.kids;

    const shouldShowSetupCompletion = !!deeplink;
    const shouldShowSplashScreen = !isInstalled && !shouldShowSetupCompletion;
    const shouldShowDashboard = isInstalled && !deeplink;

    return (
      <Provider store={this.store} onExitApp={false}>
        <RouterWithRedux hideNavBar backAndroidHandler={this.backButtonHandler}>
          <Scene
            key="splashScreen"
            initial={shouldShowSplashScreen}
            component={SplashScreen}
          />
          <Scene key="notReadyYet" component={NotReadyYet} />
          <Scene key="thankyou" component={Thankyou} />
          <Scene key="walkthrough" component={Walkthrough} />
          <Scene key="congratulations" component={Congratulations} />
          <Scene
            key="dashboard"
            initial={shouldShowDashboard}
            component={Dashboard}
          />
          <Scene
            key="setupCompletion"
            initial={shouldShowSetupCompletion}
            component={SetupCompletion}
          />
          <Scene key="playground" initial={false} component={Playground} />
        </RouterWithRedux>
      </Provider>
    );
  }
}

ParentApp.propTypes = {
  profile: PropTypes.object.isRequired,
  deeplink: PropTypes.bool.isRequired,
};

export default ParentApp;

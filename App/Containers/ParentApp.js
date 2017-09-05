import React, { PropTypes } from 'react';
import { connect, Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';

import SplashScreen from '../Components/SplashScreen';
import Playground from '../Utils/Playground';
import Dashboard from '../Dashboard';
import SetImage from './SetImage';
import SetName from './SetName';
import SignUp from './SignUp';
import DeviceSetup from './DeviceSetup';
import Loading from '../Components/Loading';
import CheckForDevice from './CheckForDevice';
import InitialUsage from '../InitialUsage';
import SendReminder from './SendReminder';
import Settings from './Settings';
import Upgrade from './Upgrade';

const RouterWithRedux = connect()(Router);

const ParentApp = ({ store, backButtonHandler }) => (
  <Provider store={store}>
    <RouterWithRedux hideNavBar backAndroidHandler={backButtonHandler}>
      <Scene key="loading" initial component={Loading} />
      <Scene key="splashScreen" component={SplashScreen} />
      <Scene key="signUp" component={SignUp} />
      <Scene key="setName" component={SetName} />
      <Scene key="checkForDevice" component={CheckForDevice} />
      <Scene key="sendReminder" component={SendReminder} />
      <Scene key="deviceSetup" component={DeviceSetup} />
      <Scene key="setKidImage" component={SetImage} />
      <Scene key="dashboard" component={Dashboard} />
      <Scene key="playground" initial={false} component={Playground} />
      <Scene key="initialUsage" component={InitialUsage} />
      <Scene key="settings" component={Settings} />
      <Scene key="upgrade" component={Upgrade} />
    </RouterWithRedux>
  </Provider>
);

ParentApp.propTypes = {
  store: PropTypes.any.isRequired,
  backButtonHandler: PropTypes.func.isRequired,
};

export default ParentApp;

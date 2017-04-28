import React, { PropTypes } from 'react';
import { connect, Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';

import SplashScreen from '../Components/SplashScreen';
import SetName from './SetName';
import Congratulations from './Congratulations';
import Playground from '../Utils/Playground';
import Dashboard from '../Dashboard';
import SetImage from './SetImage';
import SetupCompletion from './SetupCompletion';
import DeviceSetup from './DeviceSetup';
import Loading from '../Components/Loading';
const RouterWithRedux = connect()(Router);

const ParentApp = ({ store, backButtonHandler }) => (
  <Provider store={store} onExitApp={false}>
    <RouterWithRedux hideNavBar backAndroidHandler={backButtonHandler}>
      <Scene key="loading" initial component={Loading} />
      <Scene key="splashScreen" component={SplashScreen} />
      <Scene key="setName" component={SetName} />
      <Scene key="deviceSetup" component={DeviceSetup} />
      <Scene key="congratulations" component={Congratulations} />
      <Scene key="setImage" component={SetImage} />
      <Scene key="setupCompletion" component={SetupCompletion} />
      <Scene key="dashboard" initial component={Dashboard} />
      <Scene key="playground" initial={false} component={Playground} />
    </RouterWithRedux>
  </Provider>
);

ParentApp.propTypes = {
  store: PropTypes.any.isRequired,
  backButtonHandler: PropTypes.func.isRequired,
};

export default ParentApp;

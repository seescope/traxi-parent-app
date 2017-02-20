import React, { PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Scene, Router } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import KidSetup from '../Components/KidSetup';
import KidReport from './KidReport';

const RouterWithRedux = connect()(Router);

const KidApp = ({ isInstalled, UUID }) => {
  const reducer = state => state;
  const initialState = {};
  const store = createStore(reducer, initialState, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <RouterWithRedux hideNavBar>
        <Scene
          key="setup"
          initial={!isInstalled}
          component={KidSetup}
          UUID={UUID}
        />
        <Scene
          key="kidReports"
          initial={isInstalled}
          component={KidReport}
          UUID={UUID}
        />
      </RouterWithRedux>
    </Provider>
  );
};

KidApp.propTypes = {
  isInstalled: PropTypes.bool.isRequired,
  UUID: PropTypes.string.isRequired,
};

export default KidApp;

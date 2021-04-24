import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {getStore, getPersistor} from './src/redux/store';

const store = getStore();
const myPersistor = getPersistor();

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate persistor={myPersistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);

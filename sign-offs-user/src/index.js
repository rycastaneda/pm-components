import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import api from '../../shared/api.config';
import axios from 'axios';
!window._babelPolyfill && require('babel-polyfill'); // prevent polyfill from importing twice

import SignOff from './containers/SignOff';
import './styles/index.scss';

// Add redux dev tools unless we have a production build
const enhance =
  process.env.NODE_ENV !== 'production' && window.devToolsExtension
    ? compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension && window.devToolsExtension()
      )
    : applyMiddleware(thunkMiddleware);

// Configure store with thunk middleware to allow async requests
const store = createStore(rootReducer, enhance);

let hostname = api.configureHostname();
let headers = api.configureHeaders();

axios.defaults.baseURL = hostname;
axios.defaults.headers.common = headers;

render(
  <Provider store={store}>
    <SignOff />
  </Provider>,
  document.querySelector('[data-component="staff-sign-offs"]')
);

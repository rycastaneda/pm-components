import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import api from '../../shared/api.config';
import axios from 'axios';
!window._babelPolyfill && require('babel-polyfill'); // prevent polyfill from importing twice

import Sections from './containers/Sections';
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

console.log('process.node.env', process.env.NODE_ENV); // eslint-disable-line no-console, quotes
axios.defaults.baseURL =
  process.env.NODE_ENV === 'test' ? 'http://httpbin.org/anything' : hostname;
axios.defaults.headers.common = headers;

render(
  <Provider store={store}>
    <Sections />
  </Provider>,
  document.querySelector('[data-component="sign-offs-default-assignment"]')
);

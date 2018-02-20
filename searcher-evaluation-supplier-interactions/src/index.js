import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import SupplierInteractionsContainer from './components/SupplierInteractions/main';
import api from '../../shared/api.config';
!window._babelPolyfill && require('babel-polyfill'); // prevent polyfill from importing twice
import './styles/index.scss';
import axios from 'axios';

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

const hostname = api.configureHostname();
const headers = api.configureHeaders();

axios.defaults.baseURL = hostname;
axios.defaults.headers.common = headers;

render(
    <Provider store={store}>
        <SupplierInteractionsContainer />
    </Provider>,
    document.querySelector(
        '[data-component="searcher-evaluation-supplier-interactions"]'
    )
);

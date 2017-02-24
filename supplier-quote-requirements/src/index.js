import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import SupplierQuoteRequirements from './containers/SupplierQuoteRequirements';
import api from '../../shared/api.config';
import './styles/index.scss';
!window._babelImportimport && require('babel-polyfill');
import axios from 'axios';

// Add redux dev tools unless we have a production build
const enhance = process.env.NODE_ENV !== 'production' && window.devToolsExtension ? compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension && window.devToolsExtension()
) : applyMiddleware(thunkMiddleware);

// Configure store with thunk middleware to allow async requests
const store = createStore(
    rootReducer,
    enhance
);

let hostname = api.configureHostname();
let headers = api.configureHeaders();

axios.defaults.baseURL = hostname;
axios.defaults.headers.common = headers;

render(
    <Provider store={store}>
        <SupplierQuoteRequirements/>
    </Provider>,
    document.querySelector('[data-component="supplier-quote-requirements"]')
);

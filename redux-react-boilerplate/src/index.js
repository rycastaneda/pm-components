import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import PmBoilerplateContent from './components/main';
import api from '../../shared/api.config';
import apiMiddleWare from './middleware/api';
import './styles/index.scss';
!window._babelPolyfill && require('babel-polyfill'); // prevent polyfill from importing twice
import axios from 'axios';

// Add redux dev tools unless we have a production build
const enhance = process.env.NODE_ENV !== 'production' && window.devToolsExtension ? compose(
    applyMiddleware(thunkMiddleware, apiMiddleWare),
    window.devToolsExtension && window.devToolsExtension()
) : applyMiddleware(thunkMiddleware, apiMiddleWare);

// Configure store with thunk middleware to allow async requests
const store = createStore(
    rootReducer,
    enhance
);

const hostname = api.configureHostname();
const headers = api.configureHeaders();

axios.defaults.baseURL = hostname;
axios.defaults.headers.common = headers;

ReactDOM.render(
    <Provider store={store}>
        <PmBoilerplateContent supplierId="8" />
    </Provider>,
    document.querySelector('[data-component="searcher-evaluation-supplier-interactions"]')
);

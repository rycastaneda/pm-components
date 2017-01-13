import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import DocumentUploader from './containers/DocumentUploader';
import { setEndpointHost, setEndpointPath, setHeaders } from 'redux-json-api';
import api from '../../shared/api.config';
import axios from 'axios';
import './styles/index.scss';

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

let headers = api.configureHeaders();
let hostname = api.configureHostname();

headers['Content-Type'] = 'application/json';

store.dispatch(setEndpointHost(hostname));
store.dispatch(setEndpointPath(''));
store.dispatch(setHeaders(headers));

axios.defaults.baseURL = hostname;
axios.defaults.headers.common = headers;

render(
    <Provider store={store}>
        <DocumentUploader/>
    </Provider>,
    document.querySelector('[data-component="document-uploader"]')
);
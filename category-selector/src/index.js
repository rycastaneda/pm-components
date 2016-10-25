import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import { setEndpointHost, setEndpointPath, setHeaders } from 'redux-json-api';
import api from '../../shared/api.config';
import CategorySelection from './containers/CategorySelection';
import './styles/index.scss';

// Configure store with thunk middleware to allow async requests
const store = createStore(
    rootReducer,
    window.devToolsExtension && window.devToolsExtension(),
    applyMiddleware(thunkMiddleware)
);

store.dispatch(setEndpointHost(api.configureHostname()));
store.dispatch(setEndpointPath(''));
store.dispatch(setHeaders(api.configureHeaders()));

render(
    <Provider store={store}>
        <CategorySelection/>
    </Provider>,
    document.querySelector('[data-component="category-selector"')
);
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import { setEndpointHost, setEndpointPath, setHeaders } from 'redux-json-api';
import api from '../../shared/api.config';
import Engagement from './containers/Engagement';
import { COMPONENT_SPOT } from './constants/ActionTypes';

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

store.dispatch(setEndpointHost(api.configureHostname()));
store.dispatch(setHeaders(api.configureHeaders()));
store.dispatch(setEndpointPath(''));

if (document.querySelector('[data-component="engagement-supplier-item"')) {
    store.dispatch({
        type: COMPONENT_SPOT,
        spot: 'supplier-item'
    });
    render(
        <Provider store={store}>
            <Engagement/>
        </Provider>,
        document.querySelector('[data-component="engagement-supplier-item"')
    );
} else {
    store.dispatch({
        type: COMPONENT_SPOT,
        spot: 'qr-details'
    });
    render(
        <Provider store={store}>
            <Engagement/>
        </Provider>,
        document.querySelector('[data-component="engagement"')
    );
}

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import { setEndpointHost, setEndpointPath, setHeaders } from 'redux-json-api';
import api from '../../shared/api.config';
import CategorySelection from './containers/CategorySelection';
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
store.dispatch(setEndpointPath(''));
store.dispatch(setHeaders(api.configureHeaders()));

render(
    <Provider store={store}>
        <CategorySelection/>
    </Provider>,
    document.querySelector('[data-component="category-selector"]')
);
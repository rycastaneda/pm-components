import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import CategorySelection from './containers/CategorySelection';
import { configureApi } from './api/api.config';
import './styles/index.scss';

// Configure store with thunk middleware to allow async requests
const store = createStore(
    rootReducer,
    window.devToolsExtension && window.devToolsExtension(),
    applyMiddleware(thunkMiddleware)
);
configureApi(store);

render(
    <Provider store={store}>
        <CategorySelection/>
    </Provider>,
    document.querySelector('[data-component="category-selector"')
);
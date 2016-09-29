import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { setEndpointHost, setEndpointPath } from 'redux-json-api';
import rootReducer from './reducers/index';
import CategorySelection from './containers/CategorySelection';
import * as styles from './styles/index.scss';

// Configure store with thunk middleware to allow async requests
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

store.dispatch(setEndpointHost('http://reqres.in'));
store.dispatch(setEndpointPath(''));

render(
    <Provider store={store}>
        <CategorySelection/>
    </Provider>,
    document.querySelector('#category-selector')
);
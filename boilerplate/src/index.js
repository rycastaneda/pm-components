import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import Boilerplate from './containers/Boilerplate';
import './styles/index.scss';

// Configure store with thunk middleware to allow async requests
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

render(
    <Provider store={store}>
        <Boilerplate/>
    </Provider>,
    document.querySelector('[data-component="boilerplate"')
);
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import Boilerplate from './containers/Boilerplate';
import './styles/index.scss';

// Add redux dev tools unless we have a production build
const enhance = process.env.NODE_ENV !== 'production' ? compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension && window.devToolsExtension()
) : applyMiddleware(thunkMiddleware);

// Configure store with thunk middleware to allow async requests
const store = createStore(
    rootReducer,
    enhance
);

render(
    <Provider store={store}>
        <Boilerplate/>
    </Provider>,
    document.querySelector('[data-component="boilerplate"')
);
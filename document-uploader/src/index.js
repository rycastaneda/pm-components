import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import DocumentGroup from './containers/DocumentGroup';
import './styles/index.scss';
import { configureApi } from './api/api.config';

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

configureApi(store);

render(
    <Provider store={store}>
        <DocumentGroup/>
    </Provider>,
    document.querySelector('[data-component="document-group"')
);
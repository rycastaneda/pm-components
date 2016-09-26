import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { setEndpointHost, setEndpointPath } from 'redux-json-api';

import CategorySelection from './CategorySelection';

const store = configureStore();

store.dispatch(setEndpointHost('http://reqres.in'));
store.dispatch(setEndpointPath(''));

render(
    <Provider store={store}>
        <CategorySelection/>
    </Provider>,
    document.querySelector('#category-selector')
);
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { readEndpoint, setEndpointHost, setEndpointPath, updateEntity } from 'redux-json-api';

import CategorySelection from './CategorySelection';

let store = configureStore();

store.dispatch(setEndpointHost('http://reqres.in'));
store.dispatch(setEndpointPath(''));

console.log(store.getState());
// store.dispatch(readEndpoint('api/users'));

console.log(store.getState());

render(
    <Provider store={store}>
        <CategorySelection/>
    </Provider>,
    document.querySelector('#category-selector')
);
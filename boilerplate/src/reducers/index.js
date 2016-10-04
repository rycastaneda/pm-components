import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { boilerplate } from './boilerplate';

export default combineReducers({
    api,
    boilerplate
});
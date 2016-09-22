import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import categories from './categories';

export default combineReducers({
    api,
    categories
});
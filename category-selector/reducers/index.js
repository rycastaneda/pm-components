import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { postsByCategoryType, selectedCategoryType } from './categories';

export default combineReducers({
    api,
    postsByCategoryType,
    selectedCategoryType
});
import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { fetchedCategoryTypes, categorySelector } from './categorySelector';

export default combineReducers({
    api,
    categorySelector,
    fetchedCategoryTypes
});
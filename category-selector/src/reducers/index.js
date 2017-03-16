import { combineReducers } from 'redux';
import { fetchedCategoryTypes, categorySelector } from './categorySelector';

export default combineReducers({
    categorySelector,
    fetchedCategoryTypes
});

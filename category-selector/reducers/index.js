import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { categoriesByCategoryType, selectedCategoryType } from './categories';
import { suggestions, inputs, selectedCategories } from './suggestions';

export default combineReducers({
    api,
    categoriesByCategoryType,
    selectedCategoryType,
    suggestions,
    inputs,
    selectedCategories
});
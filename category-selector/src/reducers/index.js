import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { selectedCategoryType, selectedCategories, fetchedCategoryTypes } from './categories';
import { suggestions, suggestionsCache, inputs } from './suggestions';

export default combineReducers({
    api,
    selectedCategoryType,
    suggestions,
    suggestionsCache,
    inputs,
    selectedCategories,
    fetchedCategoryTypes
});
import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { selectedCategoryFilter, selectedCategoriesByFilter, fetchedCategoriesByFilter } from './categories';
import { suggestions, inputs,  } from './suggestions';

export default combineReducers({
    api,
    selectedCategoryFilter,
    suggestions,
    inputs,
    selectedCategoriesByFilter,
    fetchedCategoriesByFilter
});
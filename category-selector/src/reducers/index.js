import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { selectedCategoryFilter, selectedCategoriesByFilter, fetchedCategoriesByFilter } from './categories';
import { suggestions, suggestionsList, inputs } from './suggestions';

export default combineReducers({
    api,
    selectedCategoryFilter,
    suggestions,
    suggestionsList,
    inputs,
    selectedCategoriesByFilter,
    fetchedCategoriesByFilter
});
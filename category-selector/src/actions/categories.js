import {
    SELECT_CATEGORY,
    SELECT_CATEGORY_TYPE,
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES
} from '../constants/ActionTypes';
import { prepopulateSuggestions } from './suggestions';
// import { readEndpoint } from 'redux-json-api';
import _categories from '../mocks/categories.json';


export function requestCategories(filterName) {
    return {
        type: REQUEST_CATEGORIES,
        filterName
    };
}

export function receiveCategories(filterName, categories) {
    return (dispatch) => {
        dispatch(prepopulateSuggestions(categories));

        return dispatch({
            type: RECEIVE_CATEGORIES,
            categories,
            // categories: categories.map(child => child),
            filterName
        });
    };
}

export function fetchCategories(categoryFilter) {
    return (dispatch) => {
        const filterName = categoryFilter.attributes.title;

        dispatch(requestCategories(filterName));
        return dispatch(receiveCategories(filterName, _categories.data));

        // return dispatch(readEndpoint(`api/users/`))
        //     .then(response => response)
        //     .then(json => dispatch(getCategories(json)));
    };
}

function shouldFetchCategories(state, categoryFilter) {
    const categoryList = state.fetchedCategoryTypes[categoryFilter];
    if (!categoryList) return true;
    else if (categoryList.isFetching) return false;
    else return; // some error console.log('terrr');
}

export function fetchCategoriesIfNeeded(categoryFilter) {
    return (dispatch, getState) => {
        if (shouldFetchCategories(getState(), categoryFilter)) {
            return dispatch(fetchCategories(categoryFilter));
        }
    };
}

export function selectCategoryFilter(filterName) {
    return {
        type: SELECT_CATEGORY_TYPE,
        filterName
    };
}

export function selectCategory(suggestion, index) {
    return (dispatch, getState) => {
        const categoryFilter = getState().selectedCategoryType;
        // We check if category has children
        // Ans prepopulate suggestions for the next drop down (index + 1)
        if (suggestion.related) {
            dispatch(prepopulateSuggestions(suggestion.related, index + 1));
        }

        return dispatch({
            type: SELECT_CATEGORY,
            category: suggestion,
            index,
            filterName: categoryFilter
        });
    };

}
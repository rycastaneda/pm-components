import {
    SELECT_CATEGORY,
    SELECT_CATEGORY_TYPE,
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
    SET_INITIAL_STATE
} from '../constants/ActionTypes';
import { updateSuggestionsCache } from './suggestions';
// import { readEndpoint } from 'redux-json-api';
import _categories from '../mocks/categories.json';


export function requestCategories(filterType) {
    return {
        type: REQUEST_CATEGORIES,
        filterType
    };
}

export function receiveCategories(filterType, categories) {
    return (dispatch) => {
        dispatch({
            type: RECEIVE_CATEGORIES,
            categories,
            // categories: categories.map(child => child),
            filterType
        });
        return dispatch(updateSuggestionsCache(categories));
    };
}

function fetchCategories(categoryFilter) {
    return (dispatch) => {
        const filterType = categoryFilter.attributes.title;

        dispatch(requestCategories(filterType));
        return dispatch(receiveCategories(filterType, _categories.data));

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

function resetSelectedTypes() {
    return {
        type: SET_INITIAL_STATE
    };
}

export function selectType(filterType) {
    return (dispatch) => {
        dispatch(resetSelectedTypes());

        return dispatch({
            type: SELECT_CATEGORY_TYPE,
            filterType
        });
    };
}

export function selectCategory(suggestion, index) {
    return (dispatch) => {
        // We check if category has children
        // Ans prepopulate suggestions for the next drop down (index + 1)
        if (suggestion.related) {
            dispatch(updateSuggestionsCache(suggestion.related, index + 1));
        }

        return dispatch({
            type: SELECT_CATEGORY,
            category: suggestion,
            index
        });
    };

}
import {
    SELECT_CATEGORY,
    SELECT_CATEGORY_TYPE,
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
    SET_INITIAL_CATEGORY_SELECTOR_STATE
} from '../constants/ActionTypes';
import { updateSuggestionsCache } from './suggestions';
// import { readEndpoint } from 'redux-json-api';
import _categories from '../mocks/categories.json';


export function requestCategories(categoryType) {
    return {
        type: REQUEST_CATEGORIES,
        categoryType
    };
}

export function receiveCategories(categoryType, categories) {
    return (dispatch) => {
        dispatch({
            type: RECEIVE_CATEGORIES,
            categories,
            // categories: categories.map(child => child),
            categoryType
        });
        // We populate suggestions cache to avoid traversing fetchedCategoryTypes deep 2-3 levels down
        // TODO: reconsider when we get api structure
        return dispatch(updateSuggestionsCache(categories));
    };
}

function fetchCategories(categoryType) {
    return (dispatch) => {
        const type = categoryType.attributes.title;

        dispatch(requestCategories(type));
        return dispatch(receiveCategories(type, _categories.data));

        // return dispatch(readEndpoint(`api/users/`))
        //     .then(response => response)
        //     .then(json => dispatch(getCategories(json)));
    };
}

function shouldFetchCategories(state, categoryType) {
    const categoryList = state.fetchedCategoryTypes[categoryType];
    // Check if we have already data in available in fetchedCategoryTypes 'cache'
    if (!categoryList) return true;
    else if (categoryList.isFetching) return false;
    // TODO: add some error handling if needed
    else return;
}

export function fetchCategoriesIfNeeded(categoryType) {
    return (dispatch, getState) => {
        if (shouldFetchCategories(getState(), categoryType)) {
            return dispatch(fetchCategories(categoryType));
        }
    };
}

export function resetSelectedTypes() {
    return {
        type: SET_INITIAL_CATEGORY_SELECTOR_STATE
    };
}

export function selectType(categoryType) {
    return (dispatch) => {
        dispatch(resetSelectedTypes());

        return dispatch({
            type: SELECT_CATEGORY_TYPE,
            categoryType
        });
    };
}

export function selectCategory(suggestion, index) {
    return (dispatch) => {
        // We check if category has children
        // And prepopulate suggestions for the next drop down (index + 1)
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
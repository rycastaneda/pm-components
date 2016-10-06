import {
    SELECT_CATEGORY,
    SELECT_CATEGORY_TYPE,
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
    SET_INITIAL_CATEGORY_SELECTOR_STATE,
    ADD_DROPDOWN
} from '../constants/ActionTypes';
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
            categoryType
        });

        // If we have any data to display
        if (categories.data.length > 0) {
            dispatch(addDropDown());
        }
    };
}

function fetchCategories(categoryType) {
    return (dispatch) => {
        const type = categoryType.attributes.title;

        dispatch(requestCategories(type));
        setTimeout(function() {
            dispatch(receiveCategories(type, _categories));
        }, 500);


        // return dispatch(receiveCategories(type, _categories.data));

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

function addDropDown(index = 0) {
    return {
        type: ADD_DROPDOWN,
        index
    };
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

export function selectCategory(category, index) {
    return (dispatch) => {
        const hasSubcategories = category.relationships.categories.data.length > 0;

        dispatch({
            type: SELECT_CATEGORY,
            category,
            index
        });

        if (hasSubcategories) {
            dispatch(addDropDown(index + 1));
        }
    };
}
import { SELECT_CATEGORY_TYPE, REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../constants/ActionTypes';
import { readEndpoint } from 'redux-json-api';
import _categories from '../mocks/categories.json';

function requestCategories(categoryType) {
    return {
        type: REQUEST_CATEGORIES,
        categoryType
    };
}

function receiveCategores(categoryType, json) {
    return {
        type: RECEIVE_CATEGORIES,
        categoryType,
        categories: json.data.map(child => child),
        receivedAt: Date.now()
    };
}

function fetchCategories(categoryType) {
    return (dispatch) => {
        dispatch(requestCategories(categoryType));

        return dispatch(receiveCategores(categoryType, _categories));

        // return dispatch(readEndpoint(`api/users/${categoryType}`))
            // .then(response => response)
            // .then(json => dispatch(receiveCategores(categoryType, json)));
    };
}

function shouldFetchCategories(state, categoryType) {
    const posts = state.postsByCategoryType[categoryType];
    if (!posts) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return console.log('terrr');
    }
}

export function fetchPostsIfNeeded(categoryType) {
    return (dispatch, getState) => {
        if (shouldFetchCategories(getState(), categoryType)) {
            return dispatch(fetchCategories(categoryType));
        }
    };
}

export function selectCategoryType(categoryType) {
    return {
        type: SELECT_CATEGORY_TYPE,
        categoryType
    };
}
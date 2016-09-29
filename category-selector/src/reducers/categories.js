import {
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
    SELECT_CATEGORY,
    SELECT_CATEGORY_FILTER
} from '../constants/ActionTypes';

export function selectedCategoryFilter(state = '', action) {
    switch (action.type) {
        case SELECT_CATEGORY_FILTER:
            return action.filterName;
        default:
            return state;
    }
}

function categories(state = { isFetching: false, error: false, categories: [] }, action) {
    switch (action.type) {
        case REQUEST_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: true,
                error: false
            });
        case RECEIVE_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: false,
                error: false,
                categories: action.categories
            });
        default:
            return state;
    }
}

export function fetchedCategoriesByFilter(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
        case REQUEST_CATEGORIES:
            return Object.assign({}, state, {
                [action.filterName]: categories(state[action.filterName], action)
            });
        default:
            return state;
    }

}

function selectedCategories(state = [], action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return [
                ...state.slice(0, action.index),
                action.category,
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
}

export function selectedCategoriesByFilter(state = {}, action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return Object.assign({}, state, {
                [action.filterName]: selectedCategories(state[action.filterName], action)
            });
        default:
            return state;
    }
}
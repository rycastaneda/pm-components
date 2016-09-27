import { SELECT_CATEGORY_TYPE, REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../constants/ActionTypes';


export function selectedCategoryType(state = 1, action) {
    switch (action.type) {
        case SELECT_CATEGORY_TYPE:
            return action.categoryType;
        default:
            return state;
    }
}

function categories(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.categories,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

export function categoriesByCategoryType(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
        case REQUEST_CATEGORIES:
            return Object.assign({}, state, {
                [action.categoryType]: categories(state[action.categoryType], action)
            });
        default:
            return state;
    }
}
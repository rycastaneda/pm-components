import {
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
    SELECT_CATEGORY,
    SELECT_CATEGORY_TYPE,
    UPDATE_INPUT,
    RECEIVE_SUGGESTIONS,
    RESET_SUGGESTIONS,
    SET_INITIAL_CATEGORY_SELECTOR_STATE,
    ADD_DROPDOWN,
    RESET_DROPDOWNS,
    REQUEST_FAILED
} from '../constants/ActionTypes';

const INITIAL_CATEGORY_SELECTOR_STATE = {
    selectedType: '',
    suggestions: [],
    dropDowns: []
};

const DEFAULT_DROPDOWN_STATE = {
    input: '',
    selectedCategory: {}
};

export function categorySelector(state = INITIAL_CATEGORY_SELECTOR_STATE, action) {
    switch (action.type) {
        case SELECT_CATEGORY_TYPE:
            return Object.assign({}, state, {
                selectedType: action.categoryType
            });
        case RECEIVE_SUGGESTIONS:
        case RESET_SUGGESTIONS:
            return Object.assign({}, state, {
                suggestions: action.suggestions
            });
        case SET_INITIAL_CATEGORY_SELECTOR_STATE:
            return Object.assign({}, state, INITIAL_CATEGORY_SELECTOR_STATE);
        case ADD_DROPDOWN:
        case RESET_DROPDOWNS:
        case UPDATE_INPUT:
        case SELECT_CATEGORY:
            return Object.assign({}, state, {
                dropDowns: dropDowns(state.dropDowns, action)
            });
        default:
            return state;
    }
}

function dropDowns(state = [], action) {
    switch (action.type) {
        case ADD_DROPDOWN:
            return [
                ...state.slice(0, action.index),
                DEFAULT_DROPDOWN_STATE,
                ...state.slice(action.index + 1)
            ];
        case RESET_DROPDOWNS:
            return state.slice(0, action.index);
        case UPDATE_INPUT:
            return state.map((dropDown, index) => {
                if (index === action.index) {
                    return Object.assign({}, dropDown, {
                        input: action.value
                    });
                }
                return dropDown;
            });
        case SELECT_CATEGORY:
            return state.map((dropDown, index) => {
                if (index === action.index) {
                    return Object.assign({}, dropDown, {
                        selectedCategory: action.category
                    });
                }
                return dropDown;
            });
        default:
            return state;
    }

}

function categories(state = { isFetching: false, categories: {}, isApiError: false }, action) {
    switch (action.type) {
        case REQUEST_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: true,
                isApiError: false
            });
        case RECEIVE_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: false,
                isApiError: false,
                categories: action.categories
            });
        // A bit of a hack around failed api calls
        case REQUEST_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                isApiError: true
            });
        default:
            return state;
    }
}

export function fetchedCategoryTypes(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
        case REQUEST_CATEGORIES:
        case REQUEST_FAILED:
            return Object.assign({}, state, {
                [action.categoryType]: categories(state[action.categoryType], action)
            });
        default:
            return state;
    }

}
